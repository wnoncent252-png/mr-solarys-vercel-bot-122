// Panneau web : page d'accueil + connexion multi-utilisateurs par code de jumelage.
// Les fonctions de connexion sont fournies par index.js via panel.hooks.
const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || process.env.SERVER_PORT || 3000
const hooks = { pair: null, status: null, info: null }
const hits = new Map()

function limited(ip) {
    const now = Date.now(), win = 10 * 60 * 1000
    const list = (hits.get(ip) || []).filter(t => now - t < win)
    list.push(now); hits.set(ip, list)
    return list.length > 5
}
setInterval(() => { const now = Date.now(); for (const [ip, l] of hits) if (!l.some(t => now - t < 600000)) hits.delete(ip) }, 600000).unref()

const send = (res, code, body, type = 'application/json') => {
    res.writeHead(code, { 'Content-Type': type + '; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' })
    res.end(type === 'application/json' ? JSON.stringify(body) : body)
}

const server = http.createServer(async (req, res) => {
    try {
        const url = new URL(req.url, 'http://x')
        const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim()
        if (url.pathname === '/healthz') return send(res, 200, 'ok', 'text/plain')
        if (url.pathname === '/api/info') return send(res, 200, hooks.info ? hooks.info() : { ready: false })
        if (url.pathname === '/api/status') {
            const n = (url.searchParams.get('number') || '').replace(/\D/g, '')
            return send(res, 200, { status: hooks.status ? hooks.status(n) : 'none' })
        }
        if (url.pathname === '/api/pair' && req.method === 'POST') {
            if (limited(ip)) return send(res, 429, { ok: false, error: 'Trop de tentatives. Réessaie dans quelques minutes.' })
            let raw = ''
            for await (const c of req) { raw += c; if (raw.length > 2048) return send(res, 413, { ok: false, error: 'Requête trop grande.' }) }
            let body = {}
            try { body = JSON.parse(raw || '{}') } catch { return send(res, 400, { ok: false, error: 'Requête invalide.' }) }
            if (!hooks.pair) return send(res, 503, { ok: false, error: 'Le bot démarre, réessaie dans quelques secondes.' })
            try {
                const out = await hooks.pair(String(body.number || ''), String(body.code || ''))
                return send(res, 200, { ok: true, ...out })
            } catch (e) {
                return send(res, 400, { ok: false, error: e.message || 'Erreur.' })
            }
        }
        if (url.pathname === '/' || url.pathname === '/index.html') {
            return fs.readFile(path.join(__dirname, 'panel.html'), 'utf8', (err, html) => err ? send(res, 404, 'Not found', 'text/plain') : send(res, 200, html, 'text/html'))
        }
        send(res, 404, 'Not found', 'text/plain')
    } catch (e) {
        send(res, 500, { ok: false, error: 'Erreur serveur.' })
    }
})
server.listen(PORT, '0.0.0.0', () => console.log(`🌐 Panneau web sur le port ${PORT}`))

module.exports = { hooks, server }
