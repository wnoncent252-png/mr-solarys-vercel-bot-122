// Chatbot local (sans API) : détecte des mots-clés (français, créole, anglais) et répond.
const owner = () => global.ownername || 'MR SOLARYS'
const pick = a => a[Math.floor(Math.random() * a.length)]
const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’']/g, "'").trim()

const rules = [
    { re: /\b(salut|bonjour|bonsoir|coucou|hello|hi|hey|yo|slt|bjr|bonswa|bonjou|alo|sak pase|sa k pase|wesh)\b/,
      r: ["Salut ! 👋 Comment tu vas ?", "Hello ! 😊 Ravi de te lire. Comment se passe ta journée ?", "Coucou ! 🌟 Je t'écoute.", "Bonjou ! 👋 Kijan ou ye ?"] },
    { re: /(ca va|comment vas|comment tu vas|comment allez|tu vas bien|how are you|kijan ou ye|kouman ou ye|sa va)/,
      r: ["Je vais très bien, merci ! 😄 Et toi ?", "Tout roule de mon côté 🚀 Et de ton côté ?", "Mwen byen, mèsi ! 🙏 E ou menm ?"] },
    { re: /(je vais bien|ca va bien|tres bien|super bien|je suis bien|mwen byen|i'm fine|i am fine|i'm good)/,
      r: ["Ça fait plaisir à entendre ! 😊", "Super, continue comme ça ! 💪", "Bon tande sa ! 🙌"] },
    { re: /\b(merci|mesi|mèsi|thanks|thank you|thx)\b/,
      r: ["Avec plaisir ! 😊", "Pas de souci, c'est normal ! 🙌", "Pa gen pwoblèm ! 💙"] },
    { re: /(qui es[- ]tu|t'es qui|tu es qui|who are you|ki moun ou ye|c'est qui|tu es un bot|tu es un robot|es[- ]tu un bot|are you a bot)/,
      r: [`Je suis l'assistant automatique de ${owner()} 🤖 Je réponds pendant qu'il est occupé ou hors ligne.`] },
    { re: /(ou es[- ]tu|t'es ou|tu es ou|where are you|ki kote ou ye)/,
      r: [`Je suis en ligne, 24h/24 ⚡ ${owner()} te répondra personnellement dès qu'il sera disponible.`] },
    { re: /(proprietaire|owner|boss|createur|ton patron|mr solarys|solarys|patwon|mèt)/,
      r: [`Mon propriétaire est *${owner()}* 👑 Il verra ton message et te répondra dès que possible. Wa.me/${global.ownernumber || '50940008268'}`] },
    { re: /(menu|commandes|liste des commandes|help|aide)/,
      r: ["Tape *.menu* pour voir toutes mes commandes 📜"] },
    { re: /(musique|chanson|song|play|mizik)/,
      r: ["Pour une chanson, tape : *.play nom de la chanson* 🎵"] },
    { re: /(video|vidéo|videyo)/,
      r: ["Pour une vidéo, tape : *.video nom de la vidéo* 🎬"] },
    { re: /\b(image|photo|img|foto)\b/,
      r: ["Pour une image, tape : *.img ce que tu cherches* 🖼️"] },
    { re: /(je t'aime|jtm|je t aime|i love you|mwen renmen w|mwen renmen ou|ti amo)/,
      r: ["Aww 🥰 Merci, c'est adorable ! Je transmets le message à mon propriétaire. 💌", "Quelle gentille attention 💖 Pour un mot doux, tape *.love* !", "Mèsi, ou dous anpil ! 💕"] },
    { re: /\b(belle|beau|jolie|mignon|mignonne|cute|handsome|beautiful)\b/,
      r: ["Merci pour le compliment ! 😊✨", "Tu es trop gentil(le) ! 💖"] },
    { re: /(bonne nuit|bonne soiree|bonne nuit|good night|bonne nwit|bonswa|dodo)/,
      r: ["Bonne nuit ! 🌙 Fais de beaux rêves ✨", "Dors bien, à demain ! 😴", "Bòn nwit ! 🌙"] },
    { re: /(bonne journee|bon apres[- ]midi|good morning|good day|bon matin)/,
      r: ["Merci, très belle journée à toi aussi ! ☀️", "Pareillement ! 🌸"] },
    { re: /\b(ok|d'accord|dac|okay|oki|oke|entendu|kompri|compris)\b/,
      r: ["Parfait 👍", "Ça marche ✅", "Dakò 👌"] },
    { re: /(lol|mdr|haha|hihi|ptdr|😂|🤣)/,
      r: ["😂😂", "Haha, trop bien ! 😄", "😄"] },
    { re: /(urgent|important|urgence|rapidement|vite|c'est grave|ijan)/,
      r: [`J'ai bien noté que c'est important ⚠️ Je préviens ${owner()} : il te répondra dès qu'il pourra. Si c'est une vraie urgence, appelle-le.`] },
    { re: /(tu fais quoi|tu fais koi|what are you doing|ap fè kisa|kisa w ap fè)/,
      r: [`Je veille sur la conversation pendant que ${owner()} est occupé 😎 Et toi ?`] },
    { re: /\b(a plus|a bientot|bye|au revoir|ciao|orevwa)\b/,
      r: ["À bientôt ! 👋", "Prends soin de toi ! 💙", "Orevwa ! 👋"] }
]

const fallbacks = [
    `Message bien reçu 📩 ${'MR SOLARYS'} te répondra dès qu'il sera disponible.`,
    "Je t'ai lu 👀 Dis-m'en un peu plus ?",
    "Intéressant ! 🤔 Continue, je t'écoute.",
    "Bien reçu ✅ Mon propriétaire verra ton message.",
    "Mwen resevwa mesaj ou a 📩 Y ap reponn ou talè."
]

function match(text) {
    const t = norm(text)
    if (!t) return null
    for (const rule of rules) if (rule.re.test(t)) return pick(rule.r)
    return null
}
const fallback = () => pick(fallbacks).replace('MR SOLARYS', owner())
const reply = text => match(text) || (norm(text) ? fallback() : null)

module.exports = { reply, match, fallback, intro: () => `🤖 _Assistant automatique de ${owner()} : je réponds pendant qu'il est occupé ou hors ligne._` }
