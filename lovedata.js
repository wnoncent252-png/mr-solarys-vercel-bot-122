// Bibliothèque locale du .love — aucune API, tout est ici. Ajoute tes propres lignes librement.
const phrases = [
    "Tu es la plus belle pensée de ma journée. 💖",
    "Avec toi, même le silence devient une jolie conversation. 💕",
    "Si je pouvais choisir un endroit où rester, ce serait près de ton sourire. 😍",
    "Tu es mon « bonjour » préféré et mon « bonne nuit » le plus doux. 🌙",
    "Je ne sais pas ce que demain nous réserve, mais je veux le vivre avec toi. 💞",
    "Ton rire est ma chanson préférée. 🎶",
    "Chaque jour à tes côtés est un cadeau que je ne me lasse pas d'ouvrir. 🎁",
    "Tu fais battre mon cœur comme si c'était la première fois. 💓",
    "Dans un monde plein de bruit, ta voix est mon endroit calme. 🕊️",
    "Je t'aime pas seulement pour ce que tu es, mais pour ce que je deviens quand je suis avec toi. 🌹",
    "Tu es la raison pour laquelle je crois encore aux belles histoires. ✨",
    "Même à des kilomètres, mon cœur sait toujours où te trouver. 📍❤️",
    "Tu es mon plus beau hasard et ma plus belle certitude. 🍀",
    "Si l'amour était une étoile, tu serais tout mon ciel. 🌌",
    "Mon cœur t'a choisie, et il ne regrette jamais. 💘",
    "Rien n'est plus doux que de penser à toi avant de dormir. 😴💭",
    "Tu es la lumière qui éclaire mes jours les plus gris. ☀️",
    "Je veux être ton premier message du matin et ta dernière pensée du soir. 💌",
    "Avec toi, j'ai compris que le bonheur tient dans les petites choses. 🌸",
    "Tu es chez moi, peu importe où nous sommes. 🏡💗",
    "Mwen renmen w pi plis chak jou. ❤️ (Je t'aime un peu plus chaque jour.)",
    "Ou se solèy mwen, menm lè syèl la nwa. ☀️ (Tu es mon soleil, même quand le ciel est noir.)",
    "Kè m kontan chak fwa m panse a ou. 💖 (Mon cœur est heureux chaque fois que je pense à toi.)",
    "Ou fè lavi m pi bèl. 🌹 (Tu rends ma vie plus belle.)",
    "You are my favorite notification. 📱💕",
    "Every love story is beautiful, but ours is my favorite. 💞",
    "With you, home is not a place, it's a feeling. 🏡❤️",
    "I didn't choose you by chance, I chose you with all my heart. 💘"
]

const citations = [
    "« Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction. »",
    "« L'amour ne se compte pas en jours, mais en moments qui font battre le cœur. »",
    "« On n'aime pas quelqu'un pour sa perfection, mais pour la façon dont il rend nos imperfections plus légères. »",
    "« Le plus beau des voyages commence par un regard sincère. »",
    "« L'amour véritable, c'est quand deux cœurs se choisissent encore, même après les orages. »",
    "« Aimer, c'est donner sans compter et recevoir sans mesurer. »",
    "« Un cœur qui aime ne vieillit jamais. »",
    "« La tendresse est le langage que tous les cœurs comprennent. »",
    "« Il n'y a pas de distance pour deux cœurs qui pensent l'un à l'autre. »",
    "« Le vrai amour ne cherche pas à posséder : il cherche à faire grandir. »",
    "« Les plus belles histoires commencent souvent par un simple « salut ». »",
    "« Aimer, c'est trouver dans le bonheur de l'autre son propre bonheur. »",
    "« Ce n'est pas le temps passé ensemble qui compte, mais l'intensité avec laquelle on le vit. »",
    "« L'amour est la seule richesse qui grandit quand on la partage. »",
    "« Un regard, un sourire, et le monde entier change de couleur. »",
    "« Aimer, c'est choisir l'autre chaque jour, librement. »",
    "« Amour se pa sa w di, se sa w fè chak jou. » (L'amour, ce n'est pas ce qu'on dit, c'est ce qu'on fait chaque jour.)",
    "« Kè ki renmen pa janm fatige. » (Un cœur qui aime ne se fatigue jamais.)",
    "« Love grows where kindness and patience live. »",
    "« The best love feels like coming home. »"
]

const poemes = [
`🌹 *Pour toi* 🌹

Si les étoiles savaient parler,
Elles chanteraient ton nom la nuit.
Et si le vent savait aimer,
Il porterait mes mots jusqu'à ton lit.

Je n'ai ni palais ni couronne,
Mais j'ai un cœur qui te choisit.
Et chaque jour qui s'abandonne
Me rend plus tien, plus attendri.`,
`💖 *Ton sourire* 💖

Il suffit d'un sourire de toi
Pour que le jour devienne plus doux,
Pour que la peur s'efface soudain
Et que mon cœur retrouve son souffle.

Garde ce sourire, ma lumière,
Il est le plus beau des chemins
Qui mènent jusqu'à mon bonheur.`,
`🌙 *Bonne nuit, mon amour* 🌙

La lune veille sur nos rêves,
Les étoiles gardent nos secrets.
Dors, mon cœur, la nuit est brève,
Demain l'amour nous attend, discret.

Je te laisse mes pensées en cadeau,
Cachées au creux de ton oreiller.
Qu'elles te murmurent, tout bas, tout beau :
« Je suis là, à tes côtés. »`,
`🌸 *Ce que tu es pour moi* 🌸

Tu es le matin après la pluie,
Le parfum d'une fleur qui s'ouvre,
Le refrain que mon cœur poursuit,
Le port où mon âme se retrouve.

Je ne demande pas le monde entier,
Seulement ta main dans la mienne,
Et la promesse, doucement murmurée,
Que l'amour, ici, nous retienne.`,
`🔥 *Mon cœur t'appartient* 🔥

Je t'ai cherchée dans mille visages,
Dans mille rêves, dans mille nuits.
Et puis tu es venue, sans bagage,
Et tout est devenu infini.

Désormais mon cœur n'a qu'une adresse,
Un seul nom écrit dans ses murs :
Le tien, mon amour, ma tendresse,
Mon plus beau, mon plus sûr futur.`,
`💞 *Pwèm renmen (créole)* 💞

Mwen pa gen pawòl pou di ki jan mwen renmen w,
Men kè m konn chak batman ki rele non w.
Lè w souri, tout lavi m vin pi dous,
Ou se solèy ki limen chemen m.

Rete bò kote m, mwen pap janm kite w,
Paske ou se kè m, ou se tout sa m genyen.`
]

const pick = a => a[Math.floor(Math.random() * a.length)]

module.exports = {
    phrases, citations, poemes,
    phrase: () => pick(phrases),
    citation: () => pick(citations),
    poeme: () => pick(poemes),
    any() {
        const t = Math.random()
        return t < 0.45 ? pick(phrases) : t < 0.7 ? pick(citations) : pick(poemes)
    }
}
