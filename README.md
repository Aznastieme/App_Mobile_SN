Le but de ce projet est de créer un réseau social en utilisant une API Rest et un client web pour cette API. Une base de données sera docn necessaire.

L'application permettra de créer des utilisateurs, des événements, des commentaires et des notes.

La partie front-end repose principalement sur React-dom, Raact-Router, et Chakra-ui.

La partie back-end_, quand à elle, repose principalement sur Express, MySQL, Sequelize, JWT

L'application mobile, elle repose sur React Native et expo go

    -Pour installer l'application exportée sur votre Mobile, il faut un appareil sous Android, 
    télécharger le fichier APK sur ce lien : https://expo.dev/artifacts/eas/m3hcHweMuyzpMBWN9WErsR.apk
    -Lancer le fichier, et ignorez les messages de sécurité de google (l'application est sans danger)
    -Une fois installé, lancer l'application my-app, créez vous un compte, naviguez et essayez les fonctionnalités.


Pour utiliser l'application mobile en mode développement (si problèmes rencontrés avec l'application exportée), il faut : 

    -Installer nodeJs sur la machine
    -Expo-go sur votre mobile, ou télécharger Android Studio pour émuler un appareil
    -Dans le cas d'Android Studio, sélectionner "more actions", puis Virtual Device Manager, 
    Create Device, et en choisir un avec l'icone Play Store
    -Installer Git sur la machine si vous voulez cloner le projet GitHub, puis cloner le projet
    -Exécuter a l'aide d'un terminal, dans le dossier du projet, npm install
    -Lancer l'application a l'aide de npm start
    -Lorsque l'application est lancée, soit vous scannez le QR-Code avec votre téléphone dans l'appli expo-go, 
    soit vous démarrez votre émulateur Android Studio et appuyez sur a dans le terminal
    -L'application devrait se lancer dans expo-go, et vous pourrez naviguer dedans. En cas de blocage dans l'app, 
    et non accès a la page profile et retour d'erreur, appuyer sur le bouton "Se déconnecter" dans la page d'accueil, 
    et re-créer un compte, l'application ne vérifiant pas l'entrée du compte courant, si changement d'ID dans la base 
    elle bloquera.

Auteurs:

Léo-Paul Musardo

Maxime Guiliani

Mickaël Lascoutounas

Yacine Boukhari