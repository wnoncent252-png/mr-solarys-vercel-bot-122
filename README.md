# MR SOLARYS MD

Bot WhatsApp — Owner : **MR SOLARYS-Dev.cl** — Contact : +50940008268

## Variables d'environnement
`SESSION_ID`, `OWNER_NUMBER=50940008268`, `OWNER_NAME=MR SOLARYS-Dev.cl`, `BOT_NAME=MR SOLARYS MD`, `PREFIX=.`

## Déploiement
- **Koyeb** : New Service → GitHub (ou Docker) → Builder *Dockerfile* → type **Worker** (ou Web, port 8000) → ajoute les variables ci-dessus.
- **Katabump** : crée un serveur Node.js, upload le dossier `bot/` (ou clone ton repo), commande de démarrage `npm start`, ajoute `SESSION_ID` dans les variables.
- **Heroku** : `app.json` + `Procfile` inclus.
- **Render / Railway / VPS** : `Dockerfile` ou `render.yaml` inclus (`npm install && npm start`).
- **Termux / VPS** : `npm install && npm start`.

## Premier démarrage (jumelage)
Sans `SESSION_ID`, le bot demande un code de jumelage pour `PAIR_NUMBER` (50940008268) et l'affiche dans la console. Dans WhatsApp : Paramètres → Appareils connectés → Connecter un appareil → Connecter avec le numéro de téléphone.

## Nouveautés (v2)
- **.insulte / .insult** : vannes drôles en français (tag ou réponds à quelqu'un pour le viser).
- **.compliment** : compliment aléatoire (tag, réponse, ou la personne du chat privé).
- **.love** (tout le monde, sans API) : phrases d'amour, citations et poèmes en français, créole et anglais.
  - `.love` (au hasard), `.love phrase`, `.love citation`, `.love poeme`, `.love ai [sujet]` (généré par API, texte local en secours)
  - Réponds au message de quelqu'un ou tague-le pour lui dédier le message. Ajoute tes propres textes dans `lib/lovedata.js`.
- **.chatbot** (sans API) : répond automatiquement aux gens qui t'écrivent, que tu sois en ligne ou hors ligne (tant que le bot tourne).
  - Activé par défaut pour les messages privés. `.chatbot dm on/off`, `.chatbot group on/off`, `.chatbot chat on/off`, `.chatbot status`
  - Modifie les réponses dans `lib/chatbotlocal.js`. Si aucun mot-clé ne correspond, une API IA répond (secours local si elle échoue). Pour ta propre API : `AI_URL`, `AI_KEY`, `AI_MODEL` dans `.env`.
- **Animation vidéo** : `database/menu.mp4` (menu) et `database/anim.mp4` (chaque commande du propriétaire). `.anim all|menu|off`.
- **Antilink réparé** : détecte aussi `chat.whatsapp.com/...`, `wa.me/...`, `www....`, reconnaît les admins même avec les identifiants LID, et le kick fonctionne même si la suppression du message échoue. Le bot doit être admin du groupe.

## Multi-sessions (plusieurs numéros sur un seul bot)

Le bot ouvre une page web : chaque personne y saisit son numéro, reçoit un code de jumelage, le tape dans WhatsApp (Appareils connectés → Connecter avec un numéro) et son bot est actif. Le lien de la page est celui que ton hébergeur te donne pour le service.

- Sessions des autres : dossier `sessions/<numéro>` (restaurées automatiquement au redémarrage).
- Le bot principal reste celui de `SESSION_ID` / `session/`. Il est facultatif.
- Variables : `ACCESS_CODE` (code à donner aux gens, vide = ouvert à tous), `MAX_SESSIONS` (défaut 20), `SESSIONS_DIR`.
- Sécurité : sur les sessions des autres, chacun est propriétaire de SON bot seulement. Les commandes `.eval`, `.$`/`.shell`, `.getsession`, `.restart`, `.update`, `.addowner`/`.delowner`, `.setprefix` et `.mode` sont bloquées.
- Limite : les réglages enregistrés dans `database/` (chatbot, antilink, welcome…) et le préfixe sont partagés entre toutes les sessions.

### Northflank
1. Mets les fichiers du bot dans un dépôt GitHub (le `Dockerfile` est inclus).
2. Crée un service « Combined » depuis ce dépôt, build avec le Dockerfile.
3. Onglet **Networking** : ajoute le port `3000` en HTTP et rends-le public. Northflank affiche alors le lien du service : c'est la page à partager.
4. Onglet **Volumes** : ajoute un volume monté sur `/app/sessions`, sinon les sessions disparaissent à chaque redéploiement.
5. Variables d'environnement : `OWNER_NUMBER`, `ACCESS_CODE`, `GROQ_API_KEY`, et `SESSION_ID` si tu veux un bot principal.

### Katabump (ou autre panel Pterodactyl)
Envoie les fichiers, commande de démarrage `npm start`. Le bot lit `PORT` ou `SERVER_PORT`. La page web n'est accessible que si ton hébergeur expose ce port (adresse IP:port). Sinon, héberge sur Northflank pour avoir un lien.
