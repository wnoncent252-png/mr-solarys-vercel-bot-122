'use strict';
// MR SOLARYS MD — remplace l'ancienne marque (Elite Pro) partout :
//  1) dans le code distant avant exécution (si le texte est lisible)
//  2) dans TOUS les messages que le bot envoie (même si le code distant est obfusqué)
const Module = require('module');

const NAME = process.env.BOT_NAME || 'MR SOLARYS MD';
const NUMBER = process.env.OWNER_NUMBER || '50940008268';
const OLD_NUMBER = '2347047504860';

const NAME_RE = /(?<![\/.\w])elite[-\s]?pro(?:[-\s]?v[1i])?(?:[-\s]?techs?)?(?![\w])/gi;
// version « petites capitales » : ᴇʟɪᴛᴇ-ᴘʀᴏ-ᴛᴇᴄʜ, ᴇʟɪᴛᴇᴘʀᴏ…
const SC_RE = /ᴇʟɪᴛᴇ[-\s]?ᴘʀᴏ(?:[-\s]?ᴠ[1ɪ])?(?:[-\s]?ᴛᴇᴄʜꜱ?)?/g;
const SC_NAME = 'ᴍʀ ꜱᴏʟᴀʀʏꜱ ᴍᴅ';

function rebrandText(s) {
  if (typeof s !== 'string' || s.length < 5) return s;
  let out = s.replace(NAME_RE, NAME).replace(SC_RE, SC_NAME);
  if (out.indexOf('@') === -1) out = out.split(OLD_NUMBER).join(NUMBER);
  return out;
}

// 1) code distant lisible
function brand(code) {
  return code
    .replace(/(?<![\/@.\w-])(ELITE-PRO-V[1I]|ELITE-PRO|ELITE PRO|Elite Pro|Elite-Pro)(?![\w])/g, NAME)
    .split(OLD_NUMBER).join(NUMBER);
}

// 2) messages sortants
function walk(node, seen) {
  if (!node || typeof node !== 'object') return;
  if (seen.has(node)) return;
  if (Buffer.isBuffer(node) || node instanceof Uint8Array) return;
  if (typeof node.pipe === 'function') return; // flux
  seen.add(node);
  const keys = Array.isArray(node) ? node.keys() : Object.keys(node);
  for (const k of keys) {
    let v;
    try { v = node[k]; } catch (e) { continue; }
    if (typeof v === 'string') {
      const r = rebrandText(v);
      if (r !== v) { try { node[k] = r; } catch (e) {} }
    } else if (v && typeof v === 'object') {
      walk(v, seen);
    }
  }
}

function patchSock(sock) {
  if (!sock || sock.__mrsolarys) return sock;
  for (const fn of ['sendMessage', 'relayMessage']) {
    const orig = sock[fn];
    if (typeof orig !== 'function') continue;
    sock[fn] = function (...args) {
      try {
        const i = fn === 'sendMessage' ? 1 : 1;
        if (args[i] && typeof args[i] === 'object') walk(args[i], new WeakSet());
      } catch (e) {}
      return orig.apply(this, args);
    };
  }
  try { Object.defineProperty(sock, '__mrsolarys', { value: true }); } catch (e) {}
  return sock;
}

function wrapFactory(orig) {
  if (typeof orig !== 'function') return orig;
  const wrapped = function (...args) {
    const r = orig.apply(this, args);
    return patchSock(r);
  };
  try { Object.setPrototypeOf(wrapped, orig); Object.assign(wrapped, orig); } catch (e) {}
  return wrapped;
}

const proxies = new WeakMap();
function wrapBaileys(mod) {
  if (!mod || (typeof mod !== 'object' && typeof mod !== 'function')) return mod;
  if (proxies.has(mod)) return proxies.get(mod);
  const cache = {};
  const p = new Proxy(mod, {
    get(target, prop, receiver) {
      const val = Reflect.get(target, prop, receiver);
      if (prop === 'default' || prop === 'makeWASocket' || prop === 'makeWaSocket') {
        if (typeof val === 'function') return cache[prop] || (cache[prop] = wrapFactory(val));
      }
      return val;
    },
  });
  proxies.set(mod, p);
  return p;
}

if (!Module.prototype.__mrsolarysHook) {
  const origRequire = Module.prototype.require;
  Module.prototype.require = function (id) {
    const m = origRequire.apply(this, arguments);
    if (typeof id === 'string' && id[0] !== '.' && id[0] !== '/' && /baileys/i.test(id)) {
      try {
        if (typeof m === 'function') return wrapFactory(m);
        return wrapBaileys(m);
      } catch (e) { return m; }
    }
    return m;
  };
  Object.defineProperty(Module.prototype, '__mrsolarysHook', { value: true });
}

module.exports = brand;
module.exports.rebrandText = rebrandText;
