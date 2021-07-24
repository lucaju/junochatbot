export default {
  common: {
    all: 'all',
    cancel: 'cancel',
	close: 'close',
	choose: 'choose',
	delete: 'delete',
	description: 'description',
	draft: 'draft',
	edit: 'edit',
	email: 'email',
    english: 'english',
	fallback: 'fallback',
    french: 'french',
    group: 'group',
	launch: 'launch',
	name: 'name',
	no: 'no',
    password: 'password',
	publish: 'publish',
	published: 'published',
	required: 'required',
	save: 'save',
    search: 'search',
	starring: 'starring',
    submit: 'submit',
    status: 'status',
	stories: 'stories',
	tag: 'tag',
	tags: 'tags',
	title: 'title',
	typeHere: 'type here',
	update: 'update',
	user: 'user',
	users: 'users',
	videos: 'videos',
	welcome: 'wecome',
	yes: 'yes',
  },
  auth: {
	checkEmaiConfirmation: 'Check your email for the confirmation link.',
	forgotMessage: 'Please enter your email address. You will receive an email message with instructions on how to reset your password.',
	forgotPassword: 'Forgot Password',
	getNewPassowrd: 'Get New Password',
	mustBeValidEmail:'Must be a valid email',
	mustSetPassowrd: 'You must set up your password before starting with Juno Chatbot.',
	 
	passwordSet: 'Password set.',
	passwordRequirement: 'Password must have at least {{nCharacters}} characters and contain at least {{nNumbers}} numbers',
	setupPasswordFor: 'Set up new password for',
	signin: 'sign in',
  },
  confirmationDialog: {
	cancelMessage: 'Not saved changes will be lost. Are you sure you want to close this {{object}}',
	deleteMessage: 'Are you sure you want to delete this {{object}}?',
  },
  errorMessages: {
	accontNotRecognized: 'Sorry, we do not recognize this account.',
	notPossibleSetPassword: 'Sorry, it is not possible to set your password at this time.',
    somethingWentWrong: 'Something went wrong!',
  },
  groups: {
	createGroup: 'Crate group',
	groupCreated: 'Group Created',
	groupDeleted: 'Group Deleted',
	groupUpdated: 'Group Updated',
	institution: 'institution',
	newGroup: 'New group',
	noGroupsYet: 'No groups yet',
	userGroups: 'User Groups'
  },
  home: {
	about: 'about',
	pedagogicalMaterial: 'pedagogical material',
	read: 'read',
	researchActivities: 'research activities',
	signin: 'sign in',
	sponsors: 'sponsors',
	stories: 'stories',
	subtitle: 'Research-development on the use of chatbots for audiovisual storytelling',
	title: 'Chatbot & Storytelling',
	team: 'team',
	watch: 'watch',
	
  },
  intents: {
	add: 'add',
	addFollowUpIntent: 'Add Follow-up Intent',
    addInputContext: 'Add Input Context',
    addOutputContext: 'Add Output Context',
    addParameter: 'Add Parameter',
    addPhrase: 'Add Phrase',
    addText: 'text',
    addVideo: 'video',
    addVideoTag: 'video tag',
    createIntent: 'Create intent',
    editIntent: 'Edit intent',
    intentCreated: 'Intent Created',
    intentDeleted: 'Intent Deleted',
    intentUpdated: 'Intent Updated',
    newIntent: 'New intent',
    noIntentsYet: 'No Intents yet',
    parameters: 'Parameters',
	trainingExplainer: 'Phrases you can expect from user, that will trigger the intent',
	trainingFallbackExplainer: 'Fallback Intent training phrases are "negative" examples the agent will not match to any other intent.',
  },
  navMenu: {
	conversationDesign: 'Conversation Design',
	entityLibrary: 'Entity Library',
    general: 'General',
	intentContexts: 'Intent Contexts',
	launch: 'Launch',
    videoCollection: 'Video Collection',
  },
  noContent: {
	noMatch: 'No match found',
  },
  notFound: {
	message404: 'You either tried some shady route or you came here by mistake. Go back to the <1>main page.</1>',
	pageNotFound: 'Page Not Found',
	title404: '404: The page you are looking for is not here',
  },
  profile: {
	avatarChanged: 'Avatar changed',
	avatarRemoved: 'Avatar removed',
    changeAvatar: 'Change Avatar',
    changePassword: 'Change Password',
    darkMode: 'Dark Mode',
    language: 'Language',
	newPassword: 'New password',
	passwordChanged: 'Password changed',
    signOut: 'Sign Out',
  },
  stories: {
	createStory: 'Create Story',
	myStory: 'my story',
	noStoriesYet: 'No stories yet',
  },
  storyGeneral: {
	addImage: 'Add Image',
	author: 'author',
	avatar: 'avatar',
	characterBot: 'Character Bot',
	messageDelay: 'Message Delay (characters per millissecond)',
	persona: 'persona',
	saveDraft: 'Save draft',
	story: 'story',
	storyUpdated: 'Story Updated',
	switchToDraft: 'Switch to Draft',
	synopsis: 'synopsis',
  },
  tags: {
	addTag: 'Add Tag',
	newTag: 'New tag',
	noTagsYet: 'No tags yet',
	tagCreated: 'Tag Created',
	tagDeleted: 'Tag Deleted',
	tagUpdated: 'Tag Updated',
  },
  users: {
	addUser: 'Add User',
	email: 'email',
	firstName: 'First Name',
	lasttName: 'Last Name',
	role: 'role',
	userCreated: 'User Created',
	userDeleted: 'User Deleted',
	userUpdated: 'User Updated',
	users: 'users',
  },
  videos: {
	addVideo: 'Add Video',
	channel: 'channel',
	noVideosYet: 'No videos yet',
	pasteVideo: 'Paste YouTube Video URL. E.g.',
	source: 'source', //video source
	videoAdded: 'Video Added',
	videoDeleted: 'Video Deleted',
	videoUpdated: 'Video Updated',
  }
};
