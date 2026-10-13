// API IA optionnelle. Si elle échoue ou est coupée, le bot retombe sur les textes locaux.
// Perso : mets AI_URL / AI_KEY / AI_MODEL dans .env (API compatible OpenAI). Sinon l'API gratuite ci-dessous est utilisée.
const axios = require('axios')
const FREE_API = 'https://eliteprotech-apis.zone.id/deepai?prompt='

async function ask(system, user) {
    try {
        // Groq : il suffit de définir GROQ_API_KEY (modèle par défaut : openai/gpt-oss-20b, modifiable avec AI_MODEL)
        const groq = process.env.GROQ_API_KEY
        const url = process.env.AI_URL || (groq ? 'https://api.groq.com/openai/v1/chat/completions' : '')
        const key = process.env.AI_KEY || groq
        if (url && key) {
            const { data } = await axios.post(url, {
                model: process.env.AI_MODEL || (groq ? 'openai/gpt-oss-20b' : 'auto-fast'),
                messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
                temperature: 0.9
            }, { headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }, timeout: 25000 })
            return String(data?.choices?.[0]?.message?.content || '').trim()
        }
        const r = await axios.get(FREE_API + encodeURIComponent(system + '\n\n' + user), {
            timeout: 15000, headers: { Accept: '*/*', 'User-Agent': 'Mozilla/5.0' }
        })
        return r?.data?.success && r.data.response ? String(r.data.response).trim() : ''
    } catch (e) {
        return ''
    }
}
module.exports = { ask }
