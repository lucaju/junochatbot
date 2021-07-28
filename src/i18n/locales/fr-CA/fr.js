export default {
  common: {
    all: 'tout', 
    by: 'de',
    cancel: 'annuler',
    close: 'fermer',
    choose: 'choisir',
    create: 'créer',
    delete: 'effacer',
    description: 'description',
    draft: 'brouillon',
    edit: 'éditer',
    email: 'email',
    english: 'anglais',
    fallback: 'fallback',
    french: 'français',
    group: 'groupe',
    interact: 'jouer',
    language: 'langue',
    name: 'nom',
    no: 'non',
    password: 'mot de passe',
    publish: 'publier',
    published: 'publié',
    required: 'obligatoire',
    save: 'enregistrer',
    search: 'recherche',
    starring: 'avec',
    submit: 'envoyer',
    status: 'statut',
    stories: 'récits',
    tag: 'tag',
    tags: 'mots clés',
    title: 'titre',
    typeHere: 'écrivez ici',
    update: 'mise à jour',
    user: 'utilisateur',
    users: 'Utilisateurs',
    videos: 'vidéos',
    welcome: 'bienvenue',
    yes: 'oui',
  },
  auth: {
    checkEmaiConfirmation: 'Vérifier votre courriel pour obtenir le lien de confirmation.',
    forgotMessage:
      'Indiquez votre courriel. Vous allez recevoir un message avec les instructions pour mettre à jour votre mot de passe.',
    forgotPassword: 'Mot de passe oublié',
    getNewPassowrd: 'Obenir nouveau mot de passe',
    mustBeValidEmail: 'Courriel invalide',
    mustSetPassowrd: 'Vous devez créer votre mot de passe pour commencer à utiliser Juno Chatbot.',
    passwordSet: 'Mot de passe créé.',
    passwordRequirement:
      'Le mot de passe doit avoir au moins {{nCharacters}} lettres et au moins {{nNumbers}} chiffres',
    setupPasswordFor: 'Créer un nouveau mot de passe',
    signin: 'Connexion',
  },
  confirmationDialog: {
    assetDeleteWarning: 'Cette action peut affecter les intents qui utilisent ce média.',
    cancelMessage: 'Les modifications non enregistrées seront perdues. Voulez-vous continuer ?',
    deleteMessage: 'Voulez-vous effacer ce {{object}}?',
  },
  errorMessages: {
    accontNotRecognized: 'Désolé, nous ne trouvons pas de compte avec ces identifiants.',
    notPossibleSetPassword: 'Désolé, impossible de créer le mot de passe. Essayez plus tard.',
    somethingWentWrong: 'Oups! Petit problème!',
    titleRequired: 'Titre obligatoire'
  },
  groups: {
    createGroup: 'Créer un groupe',
    groupCreated: 'Groupe créé',
    groupDeleted: 'Groupe effacé',
    groupUpdated: 'Groupe mis à jour',
    institution: 'institution',
    newGroup: 'Nouveau groupe',
    noGroupsYet: 'Pas encore de groupe',
    userGroups: "Groupe d'utilisateur",
  },
  home: {
    about: 'à propos',
    pedagogicalMaterial: 'matériel pédagogique',
    read: 'lire',
    researchActivities: 'activités de recherche',
    signin: 'se connecter',
    sponsors: 'soutien financier',
    stories: 'récit',
    subtitle:
      "Recherche-développement sur l'utilisation des agents conversationnels (chatbots) pour le récit audiovisuel",
    team: 'équipe',
    title: 'Chatbot et Récit',
    watch: 'regardez',
  },
  intents: {
    add: 'créer',
    addFollowUpIntent: 'créer follow-up Intent',
    addInputContext: 'créer Input Context',
    addOutputContext: 'créer Output Context',
    addParameter: 'créer Paramètre',
    addPhrase: 'créer Phrase',
    addText: 'créer texte',
    addVideo: 'créer vidéo',
    addVideoTag: 'créer video tag',
    createIntent: 'créer intent',
    editIntent: 'modifier intent',
    intentCreated: 'Intent créé',
    intentDeleted: 'Intent effacé',
    intentUpdated: 'Intent mis à jour',
    newIntent: 'Nouvel intent',
    noIntentsYet: "Pas d'Intent encore",
    parameters: 'Paramètre',
    trainingExplainer: "Phrases que l'utilisateur peut écrire pour déclencher cet intent",
	trainingFallbackExplainer: 'Examples négatifs : des phrases qui ne déclencheront aucun autre intent.',
  },
  navMenu: {
    conversationDesign: 'Design de conversation',
    entityLibrary: "Bibliothèque d'entités",
    general: 'Général',
    intentContexts: "Contextes d'intent",
    videoCollection: 'Bibliothèque vidéo',
  },
  noContent: {
    noMatch: 'Aucun résultat',
  },
  notFound: {
    message404:
      "Vous vous avancer sur des zones obscures, ou bien c'est une erreur. Retournez à <1>l'accueil.</1>",
    pageNotFound: 'Page non trouvée',
    title404: "404: La page que vous cherchez n'est pas ici",
  },
  profile: {
    avatarChanged: 'Avatar modifié',
    avatarRemoved: 'Avatar effacé',
    changeAvatar: "Changer d'avatar",
    changePassword: 'Changer le mot de passe',
    darkMode: 'Mode sombre',
    language: 'Langue',
    newPassword: 'Nouveau mot de passe',
    passwordChanged: 'Mot de passe modifié',
    signOut: 'Se déconnecter',
  },
  stories: {
    createStory: 'Créer un récit',
    myStory: 'mon récit',
    newStory: 'nouveau récit',
    noStoriesYet: 'pas de récit encore',
    storyCreated: 'récit créé',
  },
  storyGeneral: {
    addImage: 'ajouter image',
    author: 'auteur',
    avatar: 'avatar',
    characterBot: 'Bot',
    messageDelay: "délai d'écriture (milliseconde par caractère)",
    persona: 'persona',
    saveDraft: 'enregistrer brouillon',
    story: 'récit',
    storyUpdated: 'récit mis à jour',
    switchToDraft: 'changer à brouillon',
    synopsis: 'synopsis',
  },
  tags: {
    addTag: 'ajouter tag',
    newTag: 'Nouveau tag',
    noTagsYet: 'Pas de tags encore',
    tagCreated: 'Tag créé',
    tagDeleted: 'Tag effacé',
    tagUpdated: 'Tag mis à jour',
  },
  users: {
    addUser: 'créer utilisateur',
    email: 'email',
    firstName: 'Prénom',
    lasttName: 'Nom',
    role: 'rôle',
    userCreated: 'utilisateur créé',
    userDeleted: 'utilisateur effacé',
    userUpdated: 'utilisateur mis à jour',
    users: 'utilisateur',
  },
  videos: {
    addVideo: 'ajouter vidéo',
    channel: 'chaîne',
    noVideosYet: 'pas de vidéo',
    pasteVideo: "coller l'URL YouTube",
    source: 'source', //video source
    videoAdded: 'Video ajouté',
    videoDeleted: 'Video effacé',
    videoUpdated: 'Video mis à jour',
  },
};
