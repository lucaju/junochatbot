
import { Intent } from '@src/types';

export const dataIntents: Intent[] = [
	{
		name: 'projects/dialogflow-project-1111/agent/intents/0611b808-fd14-4ff2-b10a-d8eb699b825d',
		displayName: 'Small_Talk_repetitions',
		priority: 500000,
		trainingPhrases: [
			{
				name: '0e19fdee-d061-4121-b0c6-19bcd2be320e',
				type: 'EXAMPLE',
				parts: [{ text: 'you are repeating yourself' }],
			},
			{
				name: '8523e1d9-e656-4652-bdd2-d5364eca3ce7',
				type: 'EXAMPLE',
				parts: [{ text: 'you said that already' }],
			},
			{
				name: 'd9fb5b7e-2872-42a8-91cf-237b70037f30',
				type: 'EXAMPLE',
				parts: [{ text: 'you already said that' }],
			},
		],
		messages: [
			{
				text: {
					text: [
						"I'm sorry, sometimes I like repetition and routine, too much randomness can be overwhelming, don't you think?",
					],
				},
			},
		],
	},
	{
		name: 'projects/dialogflow-project-1111/agent/intents/07bcde13-8e10-4b81-bb5e-dd9a63a3ab58',
		displayName: 'Get_opinion1',
		priority: 500000,
		inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion1'],
		trainingPhrases: [
			{
				name: 'd9c57278-0a96-431f-8dd8-7e67890e6e65',
				type: 'EXAMPLE',
				parts: [{ text: 'no', entityType: '@sys.any', alias: '1_opinion', userDefined: true }],
			},
			{
				name: '781951ae-4331-4b20-be07-01b7531e4ab4',
				type: 'EXAMPLE',
				parts: [{ text: 'yes', entityType: '@sys.any', alias: '1_opinion', userDefined: true }],
			},
			{
				name: '62ec650d-8634-4a60-ad72-deb1c1b2070f',
				type: 'EXAMPLE',
				parts: [{ text: "i don't think so", entityType: '@sys.any', alias: '1_opinion', userDefined: true }],
			},
			{
				name: '3c41e8b8-fec3-4553-a942-7419b10a46a6',
				type: 'EXAMPLE',
				parts: [{ text: "i don't know", entityType: '@sys.any', alias: '1_opinion', userDefined: true }],
			},
			{
				name: '078a3af8-8a3a-4f01-acb9-60f79b92a3a2',
				type: 'EXAMPLE',
				parts: [
					{ text: 'I believe ' },
					{ text: 'algorithms are not fair', entityType: '@sys.any', alias: '1_opinion', userDefined: true },
				],
			},
			{
				name: '7d6a299c-e8b0-4be5-8f56-e6e37d7a9454',
				type: 'EXAMPLE',
				parts: [
					{ text: 'I think ' },
					{ text: 'algorithms are not fair', entityType: '@sys.any', alias: '1_opinion', userDefined: true },
				],
				timesAddedCount: 1,
			},
		],
		outputContexts: [
			{
				name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Get_opinion1-followup',
				lifespanCount: 1,
			},
			{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/opinion1', lifespanCount: 100 },
		],
		parameters: [
			{
				name: 'faf1efee-1d6c-4412-8f5e-c799ad6072df',
				displayName: '1_opinion',
				value: '$1_opinion',
				entityTypeDisplayName: '@sys.any',
			},
		],
		messages: [
			{ text: { text: ['Well, I guess this is what we are trying to figure out in our story'] } },
			{
				text: {
					text: ['So, your first task is to understand what is a predictive algorithm and how it works, ok?'],
				},
			},
		],
		followupIntentInfo: [
			{
				followupIntentName:
					'projects/dialogflow-project-1111/agent/intents/6e7deb45-940d-475d-89d3-c10eba5022fe',
				parentFollowupIntentName:
					'projects/dialogflow-project-1111/agent/intents/07bcde13-8e10-4b81-bb5e-dd9a63a3ab58',
			},
			{
				followupIntentName:
					'projects/dialogflow-project-1111/agent/intents/85ce74b0-ed40-4d3e-8f40-b82273f9ca94',
				parentFollowupIntentName:
					'projects/dialogflow-project-1111/agent/intents/07bcde13-8e10-4b81-bb5e-dd9a63a3ab58',
			},
		],
	},
	{
		name: 'projects/dialogflow-project-1111/agent/intents/0994a1dd-7233-4c00-9036-92f01861aef5',
		displayName: 'Quote everyday life',
		priority: 500000,
		inputContextNames: [
			'projects/dialogflow-project-1111/agent/sessions/-/contexts/DefaultWelcomeIntent-yes-followup',
		],
		trainingPhrases: [
			{
				name: '4f465d80-be5f-4f7b-8f8a-83a1f883e934',
				type: 'EXAMPLE',
				parts: [ 
					{ text: 'The ' },
					{ text: 'probability', entityType: '@subject', alias: 'subject' },
					{ text: ' of raining.' },
				],
			},
			{ name: 'ef39636e-5ac0-4c40-8263-81bab016d2bd', type: 'EXAMPLE', parts: [{ text: 'I won the lottery' }] },
			{
				name: '63e2d189-b75f-48d1-976e-299ba3fbb7e9',
				type: 'EXAMPLE',
				parts: [
					{ text: 'A ' },
					{ text: 'chance encounter', entityType: '@everyday_life', alias: 'everyday_life' },
					{ text: ' happened to me when I found my job.' },
				],
			},
			{
				name: '63baea8d-ea0f-40ba-b786-064f3beb45e4',
				type: 'EXAMPLE',
				parts: [
					{ text: 'I met my husband by ' },
					{ text: 'chance', entityType: '@probability', alias: 'probability' },
				],
			},
		],
		action: 'DefaultWelcomeIntent.DefaultWelcomeIntent-yes.DefaultWelcomeIntent-yes-custom',
		parameters: [
			{
				name: 'c7432ec3-5a64-49c3-aeae-2516e4ffc620',
				displayName: 'probability',
				value: '$probability',
				entityTypeDisplayName: '@probability',
			},
			{
				name: 'deacb00e-1022-41a8-a880-454585df54e4',
				displayName: 'everyday_life',
				value: '$everyday_life',
				entityTypeDisplayName: '@everyday_life',
			},
			{
				name: 'd2fb0508-790d-4efd-b9d5-6050c7845c41',
				displayName: 'subject',
				value: '$subject',
				entityTypeDisplayName: '@subject',
				mandatory: true,
				prompts: ['What about sports? Do you see any randomness in it?'],
			},
		],
		messages: [
			{
				text: {
					text: [
						'I think you will like this video.',
						'You will probably like this video.',
						"Great! Let's talk about $subject",
					],
				},
			},
		],
		rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/60ed603f-a843-4ec4-94c5-7741f7002c74',
		parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/51b93605-8c0e-429d-9f48-db71acef3d98',
	},
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/0a89f76d-ac77-4d40-b075-4eb2a59852cf',
	// 	displayName: 'probability_1 - no',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/probability_1-followup'],
	// 	trainingPhrases: [
	// 		{ name: 'c619f007-c9e9-4fb2-8aba-31c8ecbd8400', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'c624ddd5-d2e1-4789-bf87-7deda8b1e748', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '80f04dfc-9d4c-4b7d-9e4d-3506cfe95516',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '0397cb17-1e3e-409e-a2ab-b6d679702823', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '688a6d54-73ef-43f8-8fd8-9a19aef32ee8', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '5d266fa8-4e6c-468c-bcd5-d3dcb6af66cc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '1c4fcf80-461b-4fb1-98f2-c39c01f5fec2', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: '19be704c-64b9-429b-aeda-b78cb7918572',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '8f0ac3bb-73b5-470d-8628-2564e35f253f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '08a62fd3-cf5c-4975-9794-cfa67ee1712a', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '2d56866c-e693-45d1-830c-800e47859ce6', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '87cdb227-7161-4b40-afaf-ba75bb1472cb', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: '73b3eb13-9e02-4803-b4cb-a2f8a4ded5ca', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: 'feadc3a0-77af-4c76-b73a-a523a11f254f', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: 'cd471b83-e1ec-4104-9b24-3f6c932b3145',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '5572c44b-77ad-4449-9eef-d1237c3ec101',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'afcd27ea-31d1-422a-9044-24378eaf58cb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '68a63979-c832-4044-87ca-d3d6b982ff9d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6f601571-4a75-4d7a-af48-402d404a5ddc', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: '3cab57f7-c43e-4e7f-8930-6acb88c2d3c7', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: 'fca87069-a20d-405c-8770-2432c02d7e39', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: 'c5d1226c-88b8-4f3e-8142-c5966037a56f', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: 'a55b6429-6300-4c20-b60e-9bd831f60979',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: '174711a2-7102-4d99-9340-15274dee608b', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: 'ed1e5acd-8abe-4853-88c0-e2389e5f1296', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '5dea6933-f9c5-4a7d-996e-6cce7fc3fa01', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '525a9475-fe5c-42c4-8155-cf5fc6ceb500', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: 'ab007c54-a615-49cd-9dfe-73a514238d79',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '0f59293f-ddee-49c9-8ae2-89d1f0f42175', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: '509c3108-d8de-4964-a546-75d8251a9552',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '39004914-1190-4ef6-99e6-5d5656ee5fbf',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'f7e2ca5f-720a-4efb-b435-bc3e30a78680', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: 'be6adda3-0b86-4df1-b3e4-e6077fd77d8d', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '7e10b6db-8934-4cd3-b860-5e3e1f96c05b', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '15ad2d6a-7ef9-411e-a631-fbb28ce31e41', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: '9de46262-a2fc-4587-8fbb-a5c37a62ea16', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '5179f920-325f-4ae5-9a27-9ddc7534fb0f', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: 'e2585acc-3615-4ca5-a833-67047d60c3d7',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'e2d650a6-1a31-4901-8877-1f36e40a528a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '47b34a83-1960-4728-8419-f2edefa3e827', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: 'dfb846df-71e8-41d9-a523-e0b8ff2f436e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'b55894d5-892c-4e5b-b16f-e84b66e5b258', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '3f82ef71-cf03-4436-bcae-1842164b321b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: '156339ef-1ca4-4159-873d-c8328ed0ef2f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'probability_1.probability_1-no',
	// 	messages: [{ text: {} }, { text: {} }, { text: {} }],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/6a19fef2-4c45-4cff-8424-3ad8d01c075b',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/6a19fef2-4c45-4cff-8424-3ad8d01c075b',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/0f8f6e7f-0883-4267-96ae-1eb5c38bf8b2',
	// 	displayName: 'Intro.feeling.bad - no',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Introfeelingbad-followup'],
	// 	trainingPhrases: [
	// 		{ name: '93df2adf-79b7-4266-ab96-8ca29243adc8', type: 'EXAMPLE', parts: [{ text: "no, it's fine" }] },
	// 		{ name: '444fa879-6626-4b6d-a3b2-fa25390ff05f', type: 'EXAMPLE', parts: [{ text: 'i can go on' }] },
	// 		{ name: 'f98cdf97-cbec-41b0-9476-ba9f74a4f97f', type: 'EXAMPLE', parts: [{ text: 'never mind' }] },
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'Introfeelingbad.Introfeelingbad-no',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/topic', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{ text: { text: ['I’m very excited to collaborate and share with you the research material'] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					'We can chat here, and I’ll show you some video clips on the left side of the screen, alright?',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/5d0e44d9-55e4-4611-919a-dc0b69ad2dca',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/5d0e44d9-55e4-4611-919a-dc0b69ad2dca',
	// },
	{
		name: 'projects/dialogflow-project-1111/agent/intents/1119fb31-b94c-4b09-bf51-618a1884002e',
		displayName: 'random.people.result - yes',
		priority: 500000,
		inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/randompeopleresult-followup'],
		trainingPhrases: [
			{
				name: 'f89d96b3-9aa2-4b52-b935-83f910bf7e31',
				type: 'EXAMPLE',
				parts: [{ text: "sure, let's watch it now" }],
			},
			{
				name: '60569ff1-7b34-4270-9a0f-071a91f01ba1',
				type: 'EXAMPLE',
				parts: [{ text: "i'd love to watch the video on the research" }],
			},
			{ name: '8d3e9f00-f2b9-4d93-a72e-85cb356b12e6', type: 'EXAMPLE', parts: [{ text: "let's see the video" }] },
			{
				name: '2ce9e657-1c81-47f4-b1aa-b71bbaca4125',
				type: 'EXAMPLE',
				parts: [{ text: "sure, let's check the video" }],
			},
			{ name: 'c940dd5c-ca5d-4b68-83b7-c9836e45252b', type: 'EXAMPLE', parts: [{ text: "let's see it" }] },
			{
				name: '68b6cd35-4229-4674-94d6-46615ebab6ba',
				type: 'EXAMPLE',
				parts: [{ text: 'sure' }],
				timesAddedCount: 2,
			},
			{
				name: '8a76441a-8cbd-4b99-8a1f-bb4c1f18dfdc',
				type: 'EXAMPLE',
				parts: [{ text: 'yes' }],
				timesAddedCount: 1,
			},
			{
				name: '0083ef88-2868-43a8-8944-3e098dd55c7a',
				type: 'EXAMPLE',
				parts: [{ text: 'okay I will' }],
				timesAddedCount: 2,
			},
			{ name: '7aac036a-55e5-468a-9f43-c8dbb456ff73', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
			{ name: '89d7ed15-c76c-4cae-af40-053b39489a45', type: 'EXAMPLE', parts: [{ text: "yes that's alright" }] },
			{ name: 'f4d597c8-d098-46da-89fe-1a12f425cd58', type: 'EXAMPLE', parts: [{ text: 'yes I do' }] },
			{
				name: '143c08ba-bb97-40cd-a4de-e7ba7615d210',
				type: 'EXAMPLE',
				parts: [{ text: 'exactly' }],
				timesAddedCount: 1,
			},
			{ name: '023894ec-fc8b-4ec1-b8c1-a8bcbb24fc5a', type: 'EXAMPLE', parts: [{ text: 'of course' }] },
			{ name: '9d56f0ca-f4e0-4ea7-9b93-ebebd16edd4c', type: 'EXAMPLE', parts: [{ text: "yep that's ok" }] },
			{
				name: 'd0a3f14b-a1e9-4641-a3e0-8fcb8dc32d85',
				type: 'EXAMPLE',
				parts: [{ text: 'okay' }],
				timesAddedCount: 1,
			},
			{
				name: 'd753b5af-34db-4428-bdba-406fe267000c',
				type: 'EXAMPLE',
				parts: [{ text: 'ok' }],
				timesAddedCount: 1,
			},
			{ name: 'fd691abb-5b22-4393-9b08-aa9d5bc4b4a6', type: 'EXAMPLE', parts: [{ text: 'for sure' }] },
			{ name: '92fc2708-2b6e-41a1-8553-d13ce4e93f34', type: 'EXAMPLE', parts: [{ text: 'sg' }] },
			{ name: 'f1e3a276-ea9e-4e31-85c2-df972bdb409d', type: 'EXAMPLE', parts: [{ text: "yes that't ok" }] },
			{
				name: '4d27c29e-8adf-4c0f-9512-6a68581c25f2',
				type: 'EXAMPLE',
				parts: [{ text: 'I agree' }],
				timesAddedCount: 2,
			},
			{ name: '3cc63bfe-e1b0-47a2-b09a-ad8c0a5e53ec', type: 'EXAMPLE', parts: [{ text: 'yes you can do it' }] },
			{
				name: 'e4d39a0a-b1fe-42dc-855f-e2ecf1c7a070',
				type: 'EXAMPLE',
				parts: [{ text: "I don't mind" }],
				timesAddedCount: 3,
			},
			{ name: 'b0126bf2-e04d-458f-bf16-d68600a247d8', type: 'EXAMPLE', parts: [{ text: 'that one works' }] },
			{ name: '556f1638-b813-4a6d-8a65-6c93ae0b0451', type: 'EXAMPLE', parts: [{ text: 'that works' }] },
			{ name: '42ce2151-bbe3-4263-9866-72712a4c25f4', type: 'EXAMPLE', parts: [{ text: 'sure why not' }] },
			{ name: '4743b629-c571-4645-bdc2-63269d1c0c66', type: 'EXAMPLE', parts: [{ text: 'perfect' }] },
			{
				name: '13381537-1e8f-46e1-ac78-6a6bc2fe7d37',
				type: 'EXAMPLE',
				parts: [{ text: "yep that's right" }],
				timesAddedCount: 1,
			},
			{ name: '6d341828-72cd-4f96-89eb-bc5cbcd255dd', type: 'EXAMPLE', parts: [{ text: 'I think so' }] },
			{
				name: '4320d555-a38f-492d-b1fc-6d16fdc54e79',
				type: 'EXAMPLE',
				parts: [{ text: 'yes I agree' }],
				timesAddedCount: 2,
			},
			{
				name: 'eba08d9b-f87d-4232-8874-be4da3029007',
				type: 'EXAMPLE',
				parts: [{ text: 'sounds correct' }],
				timesAddedCount: 1,
			},
			{ name: 'ee5b2ffc-9c14-4a20-9e00-31cb8635c52c', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
			{ name: 'e1f1d448-2705-47b8-92f5-4960656f346b', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
			{
				name: '50cf224f-9f07-4975-bf7b-441ab549ff6e',
				type: 'EXAMPLE',
				parts: [{ text: 'go ahead' }],
				timesAddedCount: 1,
			},
			{
				name: '1296a391-d3e6-49c8-9eaa-39943cf8544f',
				type: 'EXAMPLE',
				parts: [{ text: 'do it' }],
				timesAddedCount: 1,
			},
			{ name: '55cd75db-90a7-4daf-947b-ecd03090e8b9', type: 'EXAMPLE', parts: [{ text: "it's fine" }] },
			{ name: '1fe10ef0-0823-4efa-b4ef-730bc1f931b3', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
			{ name: '4a8d741c-808c-45f8-bf90-ab32b99e0060', type: 'EXAMPLE', parts: [{ text: 'yes please' }] },
			{ name: 'a05b793f-9a1d-460d-b1b6-c1a5b98d24d9', type: 'EXAMPLE', parts: [{ text: "it's okay" }] },
			{ name: '88a721b8-99ce-4a51-bf78-f106361f402a', type: 'EXAMPLE', parts: [{ text: 'alright why not' }] },
			{ name: 'df7428d3-7f27-40c7-b0d0-3456d0c8df91', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
			{ name: '8f9f71af-76ec-424f-b28a-ece5b6f1dc95', type: 'EXAMPLE', parts: [{ text: 'right' }] },
			{ name: '96b0889c-e64c-4ba3-83d3-495a0385917a', type: 'EXAMPLE', parts: [{ text: 'it looks perfect' }] },
			{ name: '5a7c1865-6c90-4c93-8ea5-b7cacad6dcef', type: 'EXAMPLE', parts: [{ text: 'yes I can' }] },
			{ name: 'ab7709c6-2eca-4ecf-812d-1e4527f1e709', type: 'EXAMPLE', parts: [{ text: 'yup' }] },
			{ name: '3312fe28-dfeb-4fa6-98f6-9569c6cb393f', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
			{
				name: 'e826ff4d-875d-4073-89c5-1dba1203e3ce',
				type: 'EXAMPLE',
				parts: [{ text: 'confirm' }],
				timesAddedCount: 1,
			},
			{
				name: '29adab5b-d5e3-450b-b385-1538d0ad21da',
				type: 'EXAMPLE',
				parts: [{ text: 'absolutely' }],
				timesAddedCount: 1,
			},
		],
		action: 'randompeopleresult.randompeopleresult-yes',
		outputContexts: [
			{
				name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/randompeopleresult-yes-followup',
				lifespanCount: 2,
			},
		],
		messages: [
			{ text: { text: ['Cool, let’s see it.', 'Nice'] } },
			{ payload: { type: 'video', source: [24] } },
			{ payload: { type: 'tag', source: [3] } },
			{ text: { text: ['What do you think of this research?'] } },
		],
		rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/bf5333fe-23e2-48e4-8122-64b1106013fa',
		parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/bf5333fe-23e2-48e4-8122-64b1106013fa',
		followupIntentInfo: [
			{
				followupIntentName:
					'projects/dialogflow-project-1111/agent/intents/7c04232c-e706-43da-abe9-a28d825999ec',
				parentFollowupIntentName:
					'projects/dialogflow-project-1111/agent/intents/1119fb31-b94c-4b09-bf51-618a1884002e',
			},
		],
	},
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/12297c18-4d4d-4b0e-8e48-18cfc95d3ebe',
	// 	displayName: 'Intro.feeling.bad - yes',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Introfeelingbad-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '8a76441a-8cbd-4b99-8a1f-bb4c1f18dfdc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '0083ef88-2868-43a8-8944-3e098dd55c7a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay I will' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '7aac036a-55e5-468a-9f43-c8dbb456ff73', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
	// 		{ name: '89d7ed15-c76c-4cae-af40-053b39489a45', type: 'EXAMPLE', parts: [{ text: "yes that's alright" }] },
	// 		{ name: 'f4d597c8-d098-46da-89fe-1a12f425cd58', type: 'EXAMPLE', parts: [{ text: 'yes I do' }] },
	// 		{
	// 			name: '143c08ba-bb97-40cd-a4de-e7ba7615d210',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'exactly' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '023894ec-fc8b-4ec1-b8c1-a8bcbb24fc5a', type: 'EXAMPLE', parts: [{ text: 'of course' }] },
	// 		{ name: '9d56f0ca-f4e0-4ea7-9b93-ebebd16edd4c', type: 'EXAMPLE', parts: [{ text: "yep that's ok" }] },
	// 		{
	// 			name: 'd0a3f14b-a1e9-4641-a3e0-8fcb8dc32d85',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'd753b5af-34db-4428-bdba-406fe267000c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'ok' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'fd691abb-5b22-4393-9b08-aa9d5bc4b4a6', type: 'EXAMPLE', parts: [{ text: 'for sure' }] },
	// 		{ name: '92fc2708-2b6e-41a1-8553-d13ce4e93f34', type: 'EXAMPLE', parts: [{ text: 'sg' }] },
	// 		{ name: 'f1e3a276-ea9e-4e31-85c2-df972bdb409d', type: 'EXAMPLE', parts: [{ text: "yes that't ok" }] },
	// 		{
	// 			name: '4d27c29e-8adf-4c0f-9512-6a68581c25f2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I agree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '3cc63bfe-e1b0-47a2-b09a-ad8c0a5e53ec', type: 'EXAMPLE', parts: [{ text: 'yes you can do it' }] },
	// 		{
	// 			name: 'e4d39a0a-b1fe-42dc-855f-e2ecf1c7a070',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't mind" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'b0126bf2-e04d-458f-bf16-d68600a247d8', type: 'EXAMPLE', parts: [{ text: 'that one works' }] },
	// 		{ name: '556f1638-b813-4a6d-8a65-6c93ae0b0451', type: 'EXAMPLE', parts: [{ text: 'that works' }] },
	// 		{ name: '42ce2151-bbe3-4263-9866-72712a4c25f4', type: 'EXAMPLE', parts: [{ text: 'sure why not' }] },
	// 		{ name: '4743b629-c571-4645-bdc2-63269d1c0c66', type: 'EXAMPLE', parts: [{ text: 'perfect' }] },
	// 		{
	// 			name: '13381537-1e8f-46e1-ac78-6a6bc2fe7d37',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yep that's right" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6d341828-72cd-4f96-89eb-bc5cbcd255dd', type: 'EXAMPLE', parts: [{ text: 'I think so' }] },
	// 		{
	// 			name: '4320d555-a38f-492d-b1fc-6d16fdc54e79',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes I agree' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '68b6cd35-4229-4674-94d6-46615ebab6ba',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: 'eba08d9b-f87d-4232-8874-be4da3029007',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sounds correct' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'ee5b2ffc-9c14-4a20-9e00-31cb8635c52c', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
	// 		{ name: 'e1f1d448-2705-47b8-92f5-4960656f346b', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
	// 		{
	// 			name: '50cf224f-9f07-4975-bf7b-441ab549ff6e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'go ahead' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '1296a391-d3e6-49c8-9eaa-39943cf8544f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'do it' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '55cd75db-90a7-4daf-947b-ecd03090e8b9', type: 'EXAMPLE', parts: [{ text: "it's fine" }] },
	// 		{ name: '1fe10ef0-0823-4efa-b4ef-730bc1f931b3', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: '4a8d741c-808c-45f8-bf90-ab32b99e0060', type: 'EXAMPLE', parts: [{ text: 'yes please' }] },
	// 		{ name: 'a05b793f-9a1d-460d-b1b6-c1a5b98d24d9', type: 'EXAMPLE', parts: [{ text: "it's okay" }] },
	// 		{ name: '88a721b8-99ce-4a51-bf78-f106361f402a', type: 'EXAMPLE', parts: [{ text: 'alright why not' }] },
	// 		{ name: 'df7428d3-7f27-40c7-b0d0-3456d0c8df91', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: '8f9f71af-76ec-424f-b28a-ece5b6f1dc95', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: '96b0889c-e64c-4ba3-83d3-495a0385917a', type: 'EXAMPLE', parts: [{ text: 'it looks perfect' }] },
	// 		{ name: '5a7c1865-6c90-4c93-8ea5-b7cacad6dcef', type: 'EXAMPLE', parts: [{ text: 'yes I can' }] },
	// 		{ name: 'ab7709c6-2eca-4ecf-812d-1e4527f1e709', type: 'EXAMPLE', parts: [{ text: 'yup' }] },
	// 		{ name: '3312fe28-dfeb-4fa6-98f6-9569c6cb393f', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: 'e826ff4d-875d-4073-89c5-1dba1203e3ce',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'confirm' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '29adab5b-d5e3-450b-b385-1538d0ad21da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'absolutely' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	action: 'Introfeelingbad.Introfeelingbad-yes',
	// 	messages: [{ text: { text: ["That's a good idea. I hope you get better! See you later."] } }],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/5d0e44d9-55e4-4611-919a-dc0b69ad2dca',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/5d0e44d9-55e4-4611-919a-dc0b69ad2dca',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/17d130c8-f76d-41c3-8387-cfbcdcf5038f',
	// 	displayName: 'Probability_Democracy_1',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: 'fe7828be-7293-4113-b6ca-4b32080ba5ae',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'probability', entityType: '@sports', alias: 'sports' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '4fb2c784-cd9a-4dbd-9e4f-2a7a7dedf632',
	// 			displayName: 'sports',
	// 			value: '$sports',
	// 			entityTypeDisplayName: '@sports',
	// 		},
	// 	],
	// 	messages: [
	// 		{ text: { text: ['Can you think of ways in which randomness and probability affect democracies?'] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					'Polls, census and more recently, predictive models used in artificial intelligence are all examples of impacts probability theory can have on democracy.',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'Chicago Police Department ran a pilot program of predictive policing. "The program included development of a Strategic Subjects List (SSL) of people estimated to be at highest risk of gun violence who were then referred to local police commanders for a preventive intervention."',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'The risks of reinforcing discrimination with predictive models, such as the Chicago Police algorithm, has been proved by different studies.',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'As Cathy O\'Neil has demonstrated: "If a poor student can’t get a loan because a lending model deems him too risky (by virtue of his zip code), he’s then cut off from the kind of education that could pull him out of poverty, and a vicious spiral ensues.',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'Models are propping up the lucky and punishing the downtrodden, creating a “toxic cocktail for democracy."',
	// 				],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/25d49e7e-e727-4e94-b7bb-46f174414e28',
	// 	displayName: 'get.opinion.predictive.police',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion-predictive-police'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'c9abc881-e768-499b-bac6-b4ae824dfec2',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: "it's really scary",
	// 					entityType: '@sys.any',
	// 					alias: 'opinion-pred-police',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: 'bc6b80e8-ea2d-46e4-9af3-1b1d48c5f945',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'scary', entityType: '@sys.any', alias: 'opinion-pred-police', userDefined: true }],
	// 		},
	// 		{
	// 			name: '039b3538-e3d2-405c-8743-db0ba3ecbfb0',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'i think ' },
	// 				{
	// 					text: "it's very dangerous",
	// 					entityType: '@sys.any',
	// 					alias: 'opinion-pred-police',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/random-people-question',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '4f0a553d-51a9-4c90-b53b-a33523bcc76f',
	// 			displayName: 'opinion-pred-police',
	// 			value: '$opinion-pred-police',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'But humans also have bias, maybe even if the algorithm is not perfect, it could still do better than a human,',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['what do you think?'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/261922c7-e251-418d-a278-85cc78d8e5fb',
	// 	displayName: 'random.people.result - no',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/randompeopleresult-followup'],
	// 	trainingPhrases: [
	// 		{ name: 'fb164a10-3c57-4792-960f-358b3fb8b6f0', type: 'EXAMPLE', parts: [{ text: 'follow up' }] },
	// 		{ name: '9c0d084d-dfd4-41a1-ac48-22f59b3c0762', type: 'EXAMPLE', parts: [{ text: 'go on' }] },
	// 		{ name: 'd69d5386-63f9-4295-8e6e-fcfee7e8631a', type: 'EXAMPLE', parts: [{ text: 'move on' }] },
	// 		{ name: '9ba3e972-03dc-4888-b03e-7536ab4e5a7a', type: 'EXAMPLE', parts: [{ text: "let's go on" }] },
	// 		{ name: 'd7f8b302-914a-4b89-b2e5-22d3a14e03e1', type: 'EXAMPLE', parts: [{ text: "let's move on" }] },
	// 		{ name: '47adcfb9-bbd3-4ab4-935c-500de86cb539', type: 'EXAMPLE', parts: [{ text: "no let's move on" }] },
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'randompeopleresult.randompeopleresult-no',
	// 	outputContexts: [{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/mit', lifespanCount: 1 }],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Alright. But it makes me wonder, what’s the point of using this tech if it is biased and does not even perform better than a random person on the web?',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/bf5333fe-23e2-48e4-8122-64b1106013fa',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/bf5333fe-23e2-48e4-8122-64b1106013fa',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/267790f3-6e07-40fd-9c5b-33faa8634989',
	// 	displayName: 'Minority.report - no',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Minorityreport-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'd1a20422-d5b6-4713-9739-9afc19ed3f91',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no is it the one with tom cruise?' }],
	// 		},
	// 		{ name: 'a9f1f819-dd65-49b1-ada9-35b9c719a62a', type: 'EXAMPLE', parts: [{ text: 'this is bad' }] },
	// 		{ name: '23f78697-2246-48da-8f98-97eba563a2cc', type: 'EXAMPLE', parts: [{ text: 'bad' }] },
	// 		{
	// 			name: 'f06ecf00-4075-468a-a9a1-029e98a8316e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what kind of movie is it?' }],
	// 		},
	// 		{ name: 'f2f61ab2-6c62-4c24-8d1c-cd42a3427ff5', type: 'EXAMPLE', parts: [{ text: 'this movie is old' }] },
	// 		{
	// 			name: '40076e94-aa6c-4e6b-831c-169502dd3200',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i'm too young for that" }],
	// 		},
	// 		{
	// 			name: '33fef6d7-08c8-48f6-a96f-ab5c638bb7da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no what movie is that' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '9087b131-793a-4c0e-8360-8b2d23d5af2e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'the movie with tom cruise?' }],
	// 		},
	// 		{ name: '934d87c0-239c-4f70-b257-323ccbf13f24', type: 'EXAMPLE', parts: [{ text: 'what movie is that?' }] },
	// 		{ name: 'c680fdf0-67f4-4e12-ab58-e1e003596d98', type: 'EXAMPLE', parts: [{ text: "don't know" }] },
	// 		{ name: 'ace92a4f-5009-46af-b9e0-d40dbb9bd1c9', type: 'EXAMPLE', parts: [{ text: "don't remember" }] },
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'Minorityreport.Minorityreport-no',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion2', lifespanCount: 1 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '6c7d0f98-6929-43cf-86be-ee675ab8aadb',
	// 			displayName: 'person',
	// 			value: '$person',
	// 			entityTypeDisplayName: '@sys.person',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: ['In the movie, the police were able to arrest criminals before they committed the crime'],
	// 			},
	// 		},
	// 		{ payload: { source: 'm1.mp4', type: 'video' } },
	// 		{ text: { text: ['Do you think that’s possible?'] } },
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/27a33ead-4ba9-4142-ab25-8e380d769bd0',
	// 	displayName: 'LASER.audit.no.mention',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/LASERaudit-followup'],
	// 	trainingPhrases: [
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'LASERaudit.LASERaudit-no',
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/move-on-police-bias',
	// 			lifespanCount: 1,
	// 		},
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach2-predpol', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{ text: { text: ['Alright, let’s research some more before making these choices.'] } },
	// 		{
	// 			text: {
	// 				text: ['Would you rather investigate the second approach (predicting crime areas) or we move on?'],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/3567a965-e40a-4940-8992-74e2c10f7f44',
	// 	displayName: 'Test3',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: '9e5adb68-ad8f-4ee5-a0d2-38388834f47f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what does an algoritm?' }],
	// 		},
	// 		{
	// 			name: '29bf2104-c8b9-47c5-a862-37603546c677',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'how do algorithms work?' }],
	// 		},
	// 		{
	// 			name: '334c824c-cdce-44b7-b613-93b2e7e76916',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'tell me what is a predictive algoritm' }],
	// 		},
	// 		{
	// 			name: 'aff8538e-8a06-4c0c-bbe7-9474b95d76af',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'how do you describe an algorithm?' }],
	// 		},
	// 		{ name: 'ccc50e99-5ecd-4551-b3c2-849f77520bc7', type: 'EXAMPLE', parts: [{ text: 'Define algorithm' }] },
	// 		{
	// 			name: 'ff960df2-49a7-42ef-a2f6-e06e95941734',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What is an algorithm?' }],
	// 		},
	// 		{
	// 			name: '59f1669b-9315-430d-8952-2d511eaef05c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What is the definition of predictive algorithms?' }],
	// 		},
	// 		{
	// 			name: '5a34d7a4-8e2b-45bc-a1da-e28586c0f1aa',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Define predictive algorithm' }],
	// 		},
	// 		{
	// 			name: 'fc1f2d41-e4fd-43a4-ad91-768b8bc640b0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'How do you describe a predictive algorithm?' }],
	// 		},
	// 		{
	// 			name: '46255356-ff43-4ea0-98f2-0b97e848907f',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'Can you define ' },
	// 				{ text: 'predictive', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'algorithms', entityType: '@sys.ignore' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 		{
	// 			name: 'b4cb0473-1aba-4700-b279-38216bedea15',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'What is a ' },
	// 				{ text: 'predictive', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'algorithm', entityType: '@sys.ignore' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/comment_video1', lifespanCount: 1 },
	// 	],
	// 	messages: [{ text: {} }, { text: {} }, { payload: { type: 'video', source: ['general def'] } }],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/39bffe16-d9ad-4f72-90e8-4580838e4360',
	// 	displayName: 'Definition.follow-up.no',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Definitionfollow-up-followup'],
	// 	trainingPhrases: [
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/understanding_the_problem',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	messages: [
	// 		{ text: { text: ['I see.  As you said before, you think "#has_definition.definition_1"'] } },
	// 		{ text: { text: ['Is that correct?'] } },
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b805e399-e699-4158-9233-82fe92c81110',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/c474a55e-cef7-4a2c-a52c-3ec485d8e2b4',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/3b6de9c4-e7a0-4d92-a067-65ae028d8e99',
	// 	displayName: 'probability_1 - yes - custom',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/probability_1-yes-followup'],
	// 	trainingPhrases: [
	// 		{ name: 'bf709c39-2bec-490f-84b2-80b9d794f7e8', type: 'EXAMPLE', parts: [{ text: 'one' }] },
	// 		{ name: '32a005b0-2442-4252-93bb-e623194359c9', type: 'EXAMPLE', parts: [{ text: 'bank teller' }] },
	// 		{
	// 			name: '923649d9-5d4e-4e3e-9e49-7dba98769b2a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: '1', entityType: '@sys.number', alias: 'number' }],
	// 		},
	// 	],
	// 	action: 'probability_1.probability_1-yes.probability_1-yes-custom',
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/probability_1-yes-custom-followup',
	// 			lifespanCount: 2,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '1f946e49-2c34-4957-8c27-bb0133e0a3b9',
	// 			displayName: 'number',
	// 			value: '$number',
	// 			entityTypeDisplayName: '@sys.number',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Exactly! Because the probability of two events happening is always smaller than the probability of either one occurring alone.',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'Congrats1 You belong to the 20% of people that get it right, "regardless of whether they are novice, intermediate or expert statisticians."',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/6a19fef2-4c45-4cff-8424-3ad8d01c075b',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b2f1022a-32fa-4f99-960a-72d601753248',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/3ca392cb-9f07-402a-9303-8659427ebe7e',
	// 	displayName: 'Default Welcome Intent - no - no',
	// 	priority: 500000,
	// 	inputContextNames: [
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/DefaultWelcomeIntent-no-followup',
	// 	],
	// 	trainingPhrases: [
	// 		{ name: '50110db9-3ac6-4ecd-ac09-8f52832455eb', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'cf313d10-b571-447d-9d74-6f7a89772439', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '35320759-bf6b-4878-9f5f-eea13ead8c02',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'baf8848c-ee35-428b-9c53-e4d804a151ea', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '65451182-f4d5-45ab-8f81-f02e3c6bbdab', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: 'e8900151-ad98-46f2-b9fd-b7e428812a71',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '5071fb97-ff3b-4d44-b30a-34a91b5a7174', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: '0acb7025-ab99-482a-8002-a870700ebb83',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'ed81c6ef-f13a-4848-9ce8-9aa208f1e9e7',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '3da3a860-0299-42da-a220-03cd925282f3', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: 'bad381f1-58dd-49b0-b3c3-d417011f7baa', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '2a4d1dea-3eb1-49e0-a042-ebd76be34468', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'e1c05f5c-f297-449f-96be-7ed1804973bc', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: 'a1229311-b51f-4967-8ff6-faa0c35ff16d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '75644e58-3426-4c5c-ba81-22abb59e5153',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '91c52405-f4dc-493e-9320-a4fa1e800537',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'c950cade-5004-473d-bba8-32735ea182a6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '8cb445f3-d792-4612-ad21-e04ad3e9314f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'cb8da681-3649-4986-90b9-9f36eec4f717', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: '9c5d1247-6fb3-489b-a7a9-2cc37fab37fd', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '8807afd4-11a7-42b5-bd3f-02b586b210f8', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '4ce5cc76-9d53-4904-9b26-4d2f372bd2d2', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: 'e2f1f644-d053-4cfa-bdc2-fe6a0456b2d8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: '43e2db72-b23a-4ddb-b918-02f3adee0aca', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '6988f2ed-4727-4733-9eac-b6fe10a7a54d', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '2d5a33d0-9299-4209-8b13-508241b0a962', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: 'e215e76c-28a9-4b5e-9ee2-03be5c5864a5', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: 'e685624b-78d5-4fc2-969c-0ad436040c0e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '77a83ca9-ccc1-4b5c-97d8-3b484cc98f23', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'de5bc255-a035-427c-bd23-435087bcb5eb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: 'b4787a85-e017-4607-8957-efbc07f7f25c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'ec975c59-9437-409a-8f64-bab75a9c5ffb', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: 'aeac6cd0-b7df-4431-87c8-aac266eae402', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '4deb31de-7da5-444e-aff4-141066c73762', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: 'b7bf5678-3712-4452-87f6-411285eb3fea', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'e478f310-c8f5-43f1-b5f2-dc8f72dee5d4', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '4fdb2bc2-5dab-4c57-8b6b-8748fef7f79a', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '179ae419-e1e3-4e90-b4d5-02efaff0fa73',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '2c9ecf29-ad40-4ecd-90af-c685d08237e0', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '03d62d56-ddc3-4202-9c7d-489049045cc8', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '18b351f1-0059-429b-b49b-d62665d88a60',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: '550c1aad-8ff8-4e02-97f0-45f6aad21239', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8cb0c6a2-4e43-4468-b590-19e87d4931c2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: '6ab1b496-2d29-480e-92de-449cc818e867',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'DefaultWelcomeIntent.DefaultWelcomeIntent-no.DefaultWelcomeIntent-no-no',
	// 	messages: [{ text: { text: ['I think you might like this video.'] } }],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/60ed603f-a843-4ec4-94c5-7741f7002c74',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/6f00b6f5-ac8a-4cb1-a8c2-781aa47705cf',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/3f34a6c1-ae4c-4b9c-a89e-2ec8f45ea48f',
	// 	displayName: 'Minority.report - yes',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Minorityreport-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '6600ab7d-2f6e-4e08-9c4d-bd14d556b08d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'the one with police and tom cruise' }],
	// 		},
	// 		{
	// 			name: '7a3800f6-d8f1-4366-a9b9-3002fc41cbc7',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "it's tom cruise's right" }],
	// 		},
	// 		{
	// 			name: '2b455d5e-35e9-4b3f-be5f-f906254fe555',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'is it by Steven Spielberg' }],
	// 		},
	// 		{
	// 			name: 'aa0646a7-a451-410a-96e0-af5b97b06c8d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'is it the one with tom cruise?' }],
	// 		},
	// 		{ name: '5eedd5a5-a95e-45b6-80c9-14b5e4b9cbed', type: 'EXAMPLE', parts: [{ text: 'i think so yeah' }] },
	// 		{
	// 			name: '0f7dd23a-9a84-4fed-acb1-b96b00c77c5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yes, i think i've seen it" }],
	// 		},
	// 		{
	// 			name: '4fbe8a76-8521-4b5f-8b0c-80d22395655b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'is it the one with tom cruise' }],
	// 		},
	// 		{
	// 			name: '9a647e40-4161-4a8e-93df-3e7c41b3ec97',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes the one with tom cruise?' }],
	// 		},
	// 		{
	// 			name: '8a76441a-8cbd-4b99-8a1f-bb4c1f18dfdc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '0083ef88-2868-43a8-8944-3e098dd55c7a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay I will' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '7aac036a-55e5-468a-9f43-c8dbb456ff73', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
	// 		{ name: '89d7ed15-c76c-4cae-af40-053b39489a45', type: 'EXAMPLE', parts: [{ text: "yes that's alright" }] },
	// 		{ name: 'f4d597c8-d098-46da-89fe-1a12f425cd58', type: 'EXAMPLE', parts: [{ text: 'yes I do' }] },
	// 		{
	// 			name: '143c08ba-bb97-40cd-a4de-e7ba7615d210',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'exactly' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '023894ec-fc8b-4ec1-b8c1-a8bcbb24fc5a', type: 'EXAMPLE', parts: [{ text: 'of course' }] },
	// 		{ name: '9d56f0ca-f4e0-4ea7-9b93-ebebd16edd4c', type: 'EXAMPLE', parts: [{ text: "yep that's ok" }] },
	// 		{
	// 			name: 'd0a3f14b-a1e9-4641-a3e0-8fcb8dc32d85',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'd753b5af-34db-4428-bdba-406fe267000c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'ok' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'fd691abb-5b22-4393-9b08-aa9d5bc4b4a6', type: 'EXAMPLE', parts: [{ text: 'for sure' }] },
	// 		{ name: '92fc2708-2b6e-41a1-8553-d13ce4e93f34', type: 'EXAMPLE', parts: [{ text: 'sg' }] },
	// 		{ name: 'f1e3a276-ea9e-4e31-85c2-df972bdb409d', type: 'EXAMPLE', parts: [{ text: "yes that't ok" }] },
	// 		{
	// 			name: '4d27c29e-8adf-4c0f-9512-6a68581c25f2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I agree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '3cc63bfe-e1b0-47a2-b09a-ad8c0a5e53ec', type: 'EXAMPLE', parts: [{ text: 'yes you can do it' }] },
	// 		{
	// 			name: 'e4d39a0a-b1fe-42dc-855f-e2ecf1c7a070',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't mind" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'b0126bf2-e04d-458f-bf16-d68600a247d8', type: 'EXAMPLE', parts: [{ text: 'that one works' }] },
	// 		{ name: '556f1638-b813-4a6d-8a65-6c93ae0b0451', type: 'EXAMPLE', parts: [{ text: 'that works' }] },
	// 		{ name: '42ce2151-bbe3-4263-9866-72712a4c25f4', type: 'EXAMPLE', parts: [{ text: 'sure why not' }] },
	// 		{ name: '4743b629-c571-4645-bdc2-63269d1c0c66', type: 'EXAMPLE', parts: [{ text: 'perfect' }] },
	// 		{
	// 			name: '13381537-1e8f-46e1-ac78-6a6bc2fe7d37',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yep that's right" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6d341828-72cd-4f96-89eb-bc5cbcd255dd', type: 'EXAMPLE', parts: [{ text: 'I think so' }] },
	// 		{
	// 			name: '4320d555-a38f-492d-b1fc-6d16fdc54e79',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes I agree' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '68b6cd35-4229-4674-94d6-46615ebab6ba',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: 'eba08d9b-f87d-4232-8874-be4da3029007',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sounds correct' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'ee5b2ffc-9c14-4a20-9e00-31cb8635c52c', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
	// 		{ name: 'e1f1d448-2705-47b8-92f5-4960656f346b', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
	// 		{
	// 			name: '50cf224f-9f07-4975-bf7b-441ab549ff6e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'go ahead' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '1296a391-d3e6-49c8-9eaa-39943cf8544f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'do it' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '55cd75db-90a7-4daf-947b-ecd03090e8b9', type: 'EXAMPLE', parts: [{ text: "it's fine" }] },
	// 		{ name: '1fe10ef0-0823-4efa-b4ef-730bc1f931b3', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: '4a8d741c-808c-45f8-bf90-ab32b99e0060', type: 'EXAMPLE', parts: [{ text: 'yes please' }] },
	// 		{ name: 'a05b793f-9a1d-460d-b1b6-c1a5b98d24d9', type: 'EXAMPLE', parts: [{ text: "it's okay" }] },
	// 		{ name: '88a721b8-99ce-4a51-bf78-f106361f402a', type: 'EXAMPLE', parts: [{ text: 'alright why not' }] },
	// 		{ name: 'df7428d3-7f27-40c7-b0d0-3456d0c8df91', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: '8f9f71af-76ec-424f-b28a-ece5b6f1dc95', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: '96b0889c-e64c-4ba3-83d3-495a0385917a', type: 'EXAMPLE', parts: [{ text: 'it looks perfect' }] },
	// 		{ name: '5a7c1865-6c90-4c93-8ea5-b7cacad6dcef', type: 'EXAMPLE', parts: [{ text: 'yes I can' }] },
	// 		{ name: 'ab7709c6-2eca-4ecf-812d-1e4527f1e709', type: 'EXAMPLE', parts: [{ text: 'yup' }] },
	// 		{ name: '3312fe28-dfeb-4fa6-98f6-9569c6cb393f', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: 'e826ff4d-875d-4073-89c5-1dba1203e3ce',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'confirm' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '29adab5b-d5e3-450b-b385-1538d0ad21da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'absolutely' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	action: 'Minorityreport.Minorityreport-yes',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion2', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Remember in the movie  how police were able to arrest criminals before they committed the crime?',
	// 				],
	// 			},
	// 		},
	// 		{ payload: { source: 'm1.mp4', type: 'video' } },
	// 		{ text: { text: ['Do you think that’s possible?'] } },
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/3f3724e8-98df-49c2-be1f-3f849213ce20',
	// 	displayName: 'Minority.report - no 66666',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Minorityreport-followup5555'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'd1a20422-d5b6-4713-9739-9afc19ed3f91',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no is it the one with tom cruise?' }],
	// 		},
	// 		{ name: 'a9f1f819-dd65-49b1-ada9-35b9c719a62a', type: 'EXAMPLE', parts: [{ text: 'this is bad' }] },
	// 		{ name: '23f78697-2246-48da-8f98-97eba563a2cc', type: 'EXAMPLE', parts: [{ text: 'bad' }] },
	// 		{
	// 			name: 'f06ecf00-4075-468a-a9a1-029e98a8316e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what kind of movie is it?' }],
	// 		},
	// 		{ name: 'f2f61ab2-6c62-4c24-8d1c-cd42a3427ff5', type: 'EXAMPLE', parts: [{ text: 'this movie is old' }] },
	// 		{
	// 			name: '40076e94-aa6c-4e6b-831c-169502dd3200',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i'm too young for that" }],
	// 		},
	// 		{
	// 			name: '33fef6d7-08c8-48f6-a96f-ab5c638bb7da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no what movie is that' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '9087b131-793a-4c0e-8360-8b2d23d5af2e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'the movie with tom cruise?' }],
	// 		},
	// 		{ name: '934d87c0-239c-4f70-b257-323ccbf13f24', type: 'EXAMPLE', parts: [{ text: 'what movie is that?' }] },
	// 		{ name: 'c680fdf0-67f4-4e12-ab58-e1e003596d98', type: 'EXAMPLE', parts: [{ text: "don't know" }] },
	// 		{ name: 'ace92a4f-5009-46af-b9e0-d40dbb9bd1c9', type: 'EXAMPLE', parts: [{ text: "don't remember" }] },
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'Minorityreport.Minorityreport-no',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion2', lifespanCount: 1 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '6c7d0f98-6929-43cf-86be-ee675ab8aadb',
	// 			displayName: 'person',
	// 			value: '$person',
	// 			entityTypeDisplayName: '@sys.person',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: ['In the movie, the police were able to arrest criminals before they committed the crime'],
	// 			},
	// 		},
	// 		{ payload: { source: ' m1.mp4', type: 'video' } },
	// 		{ text: { text: ['Do you think that’s possible?'] } },
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/407a45d1-2abd-4015-be17-0499cc631c3c',
	// 	displayName: 'Get name',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/getname'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'cdbfe40a-bd1f-415d-b673-7ba96fda3092',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'hi jana, ' },
	// 				{ text: 'bia', entityType: '@sys.person', alias: 'name', userDefined: true },
	// 				{ text: ' here' },
	// 			],
	// 		},
	// 		{
	// 			name: '81f11c74-8876-49db-83b5-bf86cf1bc014',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'hi jana ' },
	// 				{ text: 'mohamed', entityType: '@sys.person', alias: 'name' },
	// 				{ text: ' here' },
	// 			],
	// 		},
	// 		{
	// 			name: '6bdac974-6f29-4176-91ac-92167bffc421',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "so happy to join the team and meet you jana, i'm " },
	// 				{ text: 'karl', entityType: '@sys.person', alias: 'name' },
	// 			],
	// 		},
	// 		{
	// 			name: '40837cdc-6f87-442f-97d8-5f7d3d117467',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'iM ' }, { text: 'louise', entityType: '@sys.person', alias: 'name' }],
	// 		},
	// 		{
	// 			name: 'ce29fb7a-b75a-4645-985a-4675763162f0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i'm " }, { text: 'luna', entityType: '@sys.person', alias: 'name' }],
	// 		},
	// 		{
	// 			name: 'b182b2f6-b485-462f-8918-b602a00671d9',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'i' },
	// 				{ text: '1m', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'john', entityType: '@sys.person', alias: 'name' },
	// 				{ text: ' and i am very glad to join the team' },
	// 			],
	// 		},
	// 		{
	// 			name: '6e90b506-adc9-465b-a6e4-755e7a7a6d62',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'I' },
	// 				{ text: '1m', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'john', entityType: '@sys.person', alias: 'name' },
	// 				{ text: ', very nice to meet you' },
	// 			],
	// 		},
	// 		{
	// 			name: '29f0e95c-f886-4cdc-95a6-d210af19c925',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I am the one and only ' }, { text: 'john', entityType: '@sys.person', alias: 'name' }],
	// 		},
	// 		{
	// 			name: '27ee5a5d-7d54-4438-b712-d2b370aa89dc',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'hello ' },
	// 				{ text: 'jana', entityType: '@sys.ignore' },
	// 				{ text: ", pleasure to meet, i'm " },
	// 				{ text: 'john', entityType: '@sys.person', alias: 'name' },
	// 			],
	// 		},
	// 		{
	// 			name: '37e4804f-62d3-4390-a466-b7f1257716f3',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "hello, i'm " },
	// 				{ text: 'john', entityType: '@sys.person', alias: 'name' },
	// 				{ text: ', nice to meet you' },
	// 			],
	// 		},
	// 		{
	// 			name: 'aec1f8fd-4832-41c1-bdd7-d9e8afe74666',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'pleasure ' },
	// 				{ text: 'jana', entityType: '@sys.ignore' },
	// 				{ text: ', my name is ' },
	// 				{ text: 'john', entityType: '@sys.person', alias: 'name' },
	// 			],
	// 		},
	// 		{
	// 			name: 'db47d697-84d9-438e-a904-dafcabab68c6',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'hi ' },
	// 				{ text: 'jana', entityType: '@sys.ignore' },
	// 				{ text: ", I'm " },
	// 				{ text: 'John', entityType: '@sys.person', alias: 'name' },
	// 			],
	// 		},
	// 		{
	// 			name: '0ed7130d-9935-43fe-8728-ccb30554636c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'greetings, from ' }, { text: 'John', entityType: '@sys.person', alias: 'name' }],
	// 		},
	// 		{
	// 			name: '4df4b8b3-4617-4717-94db-cdc23da17f0b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'John', entityType: '@sys.person', alias: 'name' }, { text: ', pleasure to meet!' }],
	// 		},
	// 		{
	// 			name: '937a57be-f572-4518-8b82-3c04ee4e5a3a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'John', entityType: '@sys.person', alias: 'name', userDefined: true }],
	// 		},
	// 		{
	// 			name: '1ae88477-6bef-45ca-80ca-f2f083915aac',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I"m ' }, { text: 'John', entityType: '@sys.person', alias: 'name' }],
	// 		},
	// 		{
	// 			name: 'e22c20a7-09d0-46bf-9ef5-d0e69377565c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yours ' }, { text: 'John', entityType: '@sys.person', alias: 'name' }],
	// 		},
	// 		{
	// 			name: '013a8324-9ba2-48e3-970e-38c67962721a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'the one and only ' }, { text: 'John', entityType: '@sys.person', alias: 'name' }],
	// 		},
	// 		{
	// 			name: '71477dd5-ef88-4dc9-9a96-7fe0ff8f5d6f',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'my name is ' },
	// 				{ text: 'john', entityType: '@sys.person', alias: 'name' },
	// 				{ text: ' pleasure to meet' },
	// 			],
	// 		},
	// 		{
	// 			name: 'cb49be6a-10f4-4bf2-a85f-8af3d98c90ca',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'pleasure to meet, call me ' },
	// 				{ text: 'john', entityType: '@sys.person', alias: 'name' },
	// 			],
	// 		},
	// 		{
	// 			name: 'be42ef8f-7ef4-4094-8df0-2d7d32367d3f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'please call me ' }, { text: 'John', entityType: '@sys.person', alias: 'name' }],
	// 		},
	// 		{
	// 			name: 'a4c1b888-6994-4da6-b705-4be4b5234ab1',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'you can call me ' }, { text: 'John', entityType: '@sys.person', alias: 'name' }],
	// 		},
	// 		{
	// 			name: 'fa5228e7-c6ea-4b71-a665-caaa18c0f321',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'my name is ' },
	// 				{ text: 'John', entityType: '@sys.person', alias: 'name', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '5544d972-bf34-456a-845f-f6a6b93af765',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'hey I am ' },
	// 				{ text: 'John', entityType: '@sys.person', alias: 'name', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: 'f9fc7dc8-f51a-4d24-a3a0-fe76e47174ea',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'call me ' },
	// 				{ text: 'John', entityType: '@sys.person', alias: 'name', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '3f3c6284-aeb8-4850-a567-211601c603ed',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "I'm " },
	// 				{ text: 'John', entityType: '@sys.person', alias: 'name', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '4aa57aa5-6f4b-4701-80a6-747bdb50453d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'John', entityType: '@sys.person', alias: 'name' }, { text: ', nice to meet you' }],
	// 		},
	// 		{
	// 			name: '30f8ec17-d4e1-4a43-8494-422ab24580b0',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'Hi, my name is ' },
	// 				{ text: 'John', entityType: '@sys.person', alias: 'name', userDefined: true },
	// 			],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/name', lifespanCount: 100 },
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/intro', lifespanCount: 1 },
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/fallback-intro', lifespanCount: 1 },
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/video-not-working',
	// 			lifespanCount: 100,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '8a305d94-533b-4be3-88cb-a0ed5fae151f',
	// 			displayName: 'name',
	// 			value: '$name',
	// 			entityTypeDisplayName: '@sys.person',
	// 			mandatory: true,
	// 			prompts: ['How can I call you?'],
	// 		},
	// 	],
	// 	messages: [
	// 		{ text: { text: ['Welcome $Name! I’m very happy you joined our team!'] } },
	// 		{ text: { text: ['How are you ?'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/462f2e0e-1c4d-451d-9714-c5c6e6742bcf',
	// 	displayName: 'Bias.problem.police',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/police-bias-problem'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'ae7e4766-f898-47fb-a901-9d6d781f6ef0',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: "it's a big problem affecting a many people",
	// 					entityType: '@sys.any',
	// 					alias: 'opinion-problem-police',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: 'df06af0f-33ad-460f-8b70-dda7b8361030',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "that's a huge " }, { text: 'problem', entityType: '@sys.ignore' }],
	// 		},
	// 		{
	// 			name: 'db51cabe-b23a-4af5-815e-3eb174046eae',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'i do yes', entityType: '@sys.any', alias: 'opinion-problem-police', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '70330f52-3e23-4353-bdc3-7503a8c33750',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yeah', entityType: '@sys.any', alias: 'opinion-problem-police', userDefined: true }],
	// 		},
	// 		{ name: 'd2fefbfe-f3b9-45c9-9805-02a5e3e6f96a', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: '0c4e31cf-343b-4827-af18-98f64a55bc29',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'yep yeah', entityType: '@sys.any', alias: 'opinion-problem-police', userDefined: true },
	// 			],
	// 		},
	// 		{ name: '232cda03-ca0a-40d2-9649-a1ebbc4903ab', type: 'EXAMPLE', parts: [{ text: 'i sure do' }] },
	// 		{
	// 			name: 'c61e19c9-843f-468d-af1d-ac04e515954e',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'the way data is biased is a problematic',
	// 					entityType: '@sys.any',
	// 					alias: 'opinion-problem-police',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: '3f8053ea-d05f-4a25-8d36-5802df2444de',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i think it is problematic' }],
	// 		},
	// 		{
	// 			name: '241cbe37-189b-4a44-9c14-fbe53bef8655',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes i see a ' }, { text: 'problem', entityType: '@sys.ignore' }],
	// 		},
	// 		{
	// 			name: '91be4acc-a22d-4c03-80e7-7ea7b13ad857',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes', entityType: '@sys.ignore' }],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion-predictive-police',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: 'd9f46b2c-a324-4e39-82ac-12b69e904710',
	// 			displayName: 'opinion-problem-police',
	// 			value: '$opinion-problem-police',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'I begin to see where the problem is: the data being used by the algorithms to make predictions for the police is full of bias against some communities, so the algorithm is just making things worse.',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['There’s a great clip on that, please watch it and let me know what comes up.'] } },
	// 		{ payload: { type: 'tag', source: ['bias predictive police'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/4818c166-cbda-4d86-b240-733f14a659c5',
	// 	displayName: 'Approach.2-PredPol',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/approach2-predpol'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '79cdc30c-7f78-456c-9207-671145c45f8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'where' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'aee5d08d-5b33-4bc1-80d7-b8d880fbe132',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: '2', entityType: '@sys.number', alias: 'number' }],
	// 		},
	// 		{
	// 			name: 'f47e043a-09ce-40d4-95c6-0bd16d360eef',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "let's check " },
	// 				{ text: 'second', entityType: '@sys.cardinal', alias: 'cardinal' },
	// 				{ text: ' approach' },
	// 			],
	// 		},
	// 		{
	// 			name: '5f9e29ec-7fbf-469f-bce3-a6fdede3f836',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "let's check the approach for predicting where crime will happen" }],
	// 		},
	// 		{
	// 			name: 'fecd3c59-2380-4285-bb34-d58dd8b1f452',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "let's go for approach " }, { text: '2', entityType: '@sys.number', alias: 'number' }],
	// 		},
	// 		{
	// 			name: 'e8e3adc4-b54b-43df-8390-d21ceb35c451',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "i guess let's check " },
	// 				{ text: 'second', entityType: '@sys.cardinal', alias: 'cardinal' },
	// 				{ text: ' approach' },
	// 			],
	// 		},
	// 		{
	// 			name: '4cf9446d-7116-494e-8633-d4aaa2b103de',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "let's check approach number " },
	// 				{ text: '2', entityType: '@sys.number', alias: 'number', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '71c394f1-2717-4ae5-8d06-3dfc6642eee7',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'approach number ' }, { text: '2', entityType: '@sys.number', alias: 'number' }],
	// 		},
	// 		{
	// 			name: 'fd46100e-69c6-438c-938e-a9359583e8a3',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "let's try to understand where crime will happen" }],
	// 		},
	// 		{
	// 			name: 'ae7d1d85-2e9e-4490-97ec-6ee72ba60b93',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'second', entityType: '@sys.cardinal', alias: 'cardinal' }, { text: ' one' }],
	// 		},
	// 		{
	// 			name: '18204e68-846d-4781-a4d4-bc274e78bb97',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "let's go to the second approach" }],
	// 		},
	// 		{
	// 			name: '2f0d4d10-c91f-49ef-b38d-e27866f14db9',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'second', entityType: '@sys.cardinal', alias: 'cardinal', userDefined: true },
	// 				{ text: ' approach' },
	// 			],
	// 		},
	// 		{
	// 			name: 'a96f587d-a40a-4023-ad89-9e80dc173782',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'i think the ' },
	// 				{ text: 'second', entityType: '@sys.number', alias: 'number', userDefined: true },
	// 				{ text: ' one' },
	// 			],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '6475323c-a83b-4bf4-af98-65ff711f107f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'number ' }, { text: 'two', entityType: '@sys.number', alias: 'number' }],
	// 		},
	// 		{
	// 			name: 'b2c273fe-8934-43ba-bb3d-8eb3dfa255d0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'number ' }, { text: '2', entityType: '@sys.number', alias: 'number' }],
	// 		},
	// 		{
	// 			name: 'dc5c7b88-aee6-4954-b65c-165bf49e1fe8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'where crime will happen' }],
	// 		},
	// 		{
	// 			name: '576cf864-f19c-4746-8f9d-5d062f20c968',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: '2' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/predpol-bias', lifespanCount: 1 },
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach2', lifespanCount: 15 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '5651c8c9-d1ca-4096-9b3b-7aef325bdb33',
	// 			displayName: 'number',
	// 			value: '$number',
	// 			entityTypeDisplayName: '@sys.number',
	// 			isList: true,
	// 		},
	// 		{
	// 			name: '00684a0d-9a01-48da-9972-00d801acb645',
	// 			displayName: 'cardinal',
	// 			value: '$cardinal',
	// 			entityTypeDisplayName: '@sys.cardinal',
	// 		},
	// 	],
	// 	messages: [
	// 		{ text: { text: ['PredPol is one of the algorithms trying to predict crime areas.'] } },
	// 		{ text: { text: ['Let’s see how it works, there’s a video on it.'] } },
	// 		{ payload: { source: ['intro PredPol'], type: 'video' } },
	// 		{ text: { text: ['How would you describe PredPol?'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/49337a40-67cb-490c-a876-99a9094d38fe',
	// 	displayName: 'Getname.catchall.yes',
	// 	priority: 500000,
	// 	inputContextNames: [
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/name',
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/Getnamecatchall-followup',
	// 	],
	// 	trainingPhrases: [
	// 		{
	// 			name: '8a76441a-8cbd-4b99-8a1f-bb4c1f18dfdc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '0083ef88-2868-43a8-8944-3e098dd55c7a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay I will' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '7aac036a-55e5-468a-9f43-c8dbb456ff73', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
	// 		{ name: '89d7ed15-c76c-4cae-af40-053b39489a45', type: 'EXAMPLE', parts: [{ text: "yes that's alright" }] },
	// 		{ name: 'f4d597c8-d098-46da-89fe-1a12f425cd58', type: 'EXAMPLE', parts: [{ text: 'yes I do' }] },
	// 		{
	// 			name: '143c08ba-bb97-40cd-a4de-e7ba7615d210',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'exactly' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '023894ec-fc8b-4ec1-b8c1-a8bcbb24fc5a', type: 'EXAMPLE', parts: [{ text: 'of course' }] },
	// 		{ name: '9d56f0ca-f4e0-4ea7-9b93-ebebd16edd4c', type: 'EXAMPLE', parts: [{ text: "yep that's ok" }] },
	// 		{
	// 			name: 'd0a3f14b-a1e9-4641-a3e0-8fcb8dc32d85',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'd753b5af-34db-4428-bdba-406fe267000c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'ok' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'fd691abb-5b22-4393-9b08-aa9d5bc4b4a6', type: 'EXAMPLE', parts: [{ text: 'for sure' }] },
	// 		{ name: '92fc2708-2b6e-41a1-8553-d13ce4e93f34', type: 'EXAMPLE', parts: [{ text: 'sg' }] },
	// 		{ name: 'f1e3a276-ea9e-4e31-85c2-df972bdb409d', type: 'EXAMPLE', parts: [{ text: "yes that't ok" }] },
	// 		{
	// 			name: '4d27c29e-8adf-4c0f-9512-6a68581c25f2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I agree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '3cc63bfe-e1b0-47a2-b09a-ad8c0a5e53ec', type: 'EXAMPLE', parts: [{ text: 'yes you can do it' }] },
	// 		{
	// 			name: 'e4d39a0a-b1fe-42dc-855f-e2ecf1c7a070',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't mind" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'b0126bf2-e04d-458f-bf16-d68600a247d8', type: 'EXAMPLE', parts: [{ text: 'that one works' }] },
	// 		{ name: '556f1638-b813-4a6d-8a65-6c93ae0b0451', type: 'EXAMPLE', parts: [{ text: 'that works' }] },
	// 		{ name: '42ce2151-bbe3-4263-9866-72712a4c25f4', type: 'EXAMPLE', parts: [{ text: 'sure why not' }] },
	// 		{ name: '4743b629-c571-4645-bdc2-63269d1c0c66', type: 'EXAMPLE', parts: [{ text: 'perfect' }] },
	// 		{
	// 			name: '13381537-1e8f-46e1-ac78-6a6bc2fe7d37',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yep that's right" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6d341828-72cd-4f96-89eb-bc5cbcd255dd', type: 'EXAMPLE', parts: [{ text: 'I think so' }] },
	// 		{
	// 			name: '4320d555-a38f-492d-b1fc-6d16fdc54e79',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes I agree' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '68b6cd35-4229-4674-94d6-46615ebab6ba',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: 'eba08d9b-f87d-4232-8874-be4da3029007',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sounds correct' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'ee5b2ffc-9c14-4a20-9e00-31cb8635c52c', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
	// 		{ name: 'e1f1d448-2705-47b8-92f5-4960656f346b', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
	// 		{
	// 			name: '50cf224f-9f07-4975-bf7b-441ab549ff6e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'go ahead' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '1296a391-d3e6-49c8-9eaa-39943cf8544f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'do it' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '55cd75db-90a7-4daf-947b-ecd03090e8b9', type: 'EXAMPLE', parts: [{ text: "it's fine" }] },
	// 		{ name: '1fe10ef0-0823-4efa-b4ef-730bc1f931b3', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: '4a8d741c-808c-45f8-bf90-ab32b99e0060', type: 'EXAMPLE', parts: [{ text: 'yes please' }] },
	// 		{ name: 'a05b793f-9a1d-460d-b1b6-c1a5b98d24d9', type: 'EXAMPLE', parts: [{ text: "it's okay" }] },
	// 		{ name: '88a721b8-99ce-4a51-bf78-f106361f402a', type: 'EXAMPLE', parts: [{ text: 'alright why not' }] },
	// 		{ name: 'df7428d3-7f27-40c7-b0d0-3456d0c8df91', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: '8f9f71af-76ec-424f-b28a-ece5b6f1dc95', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: '96b0889c-e64c-4ba3-83d3-495a0385917a', type: 'EXAMPLE', parts: [{ text: 'it looks perfect' }] },
	// 		{ name: '5a7c1865-6c90-4c93-8ea5-b7cacad6dcef', type: 'EXAMPLE', parts: [{ text: 'yes I can' }] },
	// 		{ name: 'ab7709c6-2eca-4ecf-812d-1e4527f1e709', type: 'EXAMPLE', parts: [{ text: 'yup' }] },
	// 		{ name: '3312fe28-dfeb-4fa6-98f6-9569c6cb393f', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: 'e826ff4d-875d-4073-89c5-1dba1203e3ce',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'confirm' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '29adab5b-d5e3-450b-b385-1538d0ad21da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'absolutely' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	action: 'Getnamecatchall.Getnamecatchall-yes',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/intro', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{ text: { text: ["Welcome #Getnamecatchall-followup.name! I'me very happy you joined the team!"] } },
	// 		{ text: { text: ['How are you?'] } },
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b7d09cda-89e0-4bb2-a6dc-07a0a473fb80',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b7d09cda-89e0-4bb2-a6dc-07a0a473fb80',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/4a50bdf3-871d-465d-94da-6c3de3360e5b',
	// 	displayName: 'Dig.deeper.',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Commentvideo1-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '3fe8d80a-0817-4dda-b223-04eefa0d1fa2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "let's go" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '53c0a82b-be11-45f2-82f1-a95f2f8f78a8', type: 'EXAMPLE', parts: [{ text: 'i am super in it' }] },
	// 		{ name: '0111e217-052f-4428-b7fd-ee6fc01adb4c', type: 'EXAMPLE', parts: [{ text: 'im very interested' }] },
	// 		{ name: 'c0a91928-5e65-4cd8-a059-7497ddc00ed9', type: 'EXAMPLE', parts: [{ text: 'i d like to know' }] },
	// 		{
	// 			name: '204775dc-d0d8-4dc9-9736-d4759b72d751',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I can't wait to know" }],
	// 		},
	// 		{ name: 'fee63153-c576-4a84-b5c2-e6f0f93a02de', type: 'EXAMPLE', parts: [{ text: 'would love to' }] },
	// 		{ name: '9ca418ec-6c5b-4a50-bb00-1184f8f92060', type: 'EXAMPLE', parts: [{ text: 'cool' }] },
	// 		{
	// 			name: '68b6cd35-4229-4674-94d6-46615ebab6ba',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: '8a76441a-8cbd-4b99-8a1f-bb4c1f18dfdc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '0083ef88-2868-43a8-8944-3e098dd55c7a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay I will' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '7aac036a-55e5-468a-9f43-c8dbb456ff73', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
	// 		{ name: '89d7ed15-c76c-4cae-af40-053b39489a45', type: 'EXAMPLE', parts: [{ text: "yes that's alright" }] },
	// 		{ name: 'f4d597c8-d098-46da-89fe-1a12f425cd58', type: 'EXAMPLE', parts: [{ text: 'yes I do' }] },
	// 		{
	// 			name: '143c08ba-bb97-40cd-a4de-e7ba7615d210',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'exactly' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '023894ec-fc8b-4ec1-b8c1-a8bcbb24fc5a', type: 'EXAMPLE', parts: [{ text: 'of course' }] },
	// 		{ name: '9d56f0ca-f4e0-4ea7-9b93-ebebd16edd4c', type: 'EXAMPLE', parts: [{ text: "yep that's ok" }] },
	// 		{
	// 			name: 'd0a3f14b-a1e9-4641-a3e0-8fcb8dc32d85',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'd753b5af-34db-4428-bdba-406fe267000c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'ok' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'fd691abb-5b22-4393-9b08-aa9d5bc4b4a6', type: 'EXAMPLE', parts: [{ text: 'for sure' }] },
	// 		{ name: '92fc2708-2b6e-41a1-8553-d13ce4e93f34', type: 'EXAMPLE', parts: [{ text: 'sg' }] },
	// 		{ name: 'f1e3a276-ea9e-4e31-85c2-df972bdb409d', type: 'EXAMPLE', parts: [{ text: "yes that't ok" }] },
	// 		{
	// 			name: '4d27c29e-8adf-4c0f-9512-6a68581c25f2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I agree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '3cc63bfe-e1b0-47a2-b09a-ad8c0a5e53ec', type: 'EXAMPLE', parts: [{ text: 'yes you can do it' }] },
	// 		{
	// 			name: 'e4d39a0a-b1fe-42dc-855f-e2ecf1c7a070',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't mind" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'b0126bf2-e04d-458f-bf16-d68600a247d8', type: 'EXAMPLE', parts: [{ text: 'that one works' }] },
	// 		{ name: '556f1638-b813-4a6d-8a65-6c93ae0b0451', type: 'EXAMPLE', parts: [{ text: 'that works' }] },
	// 		{ name: '42ce2151-bbe3-4263-9866-72712a4c25f4', type: 'EXAMPLE', parts: [{ text: 'sure why not' }] },
	// 		{ name: '4743b629-c571-4645-bdc2-63269d1c0c66', type: 'EXAMPLE', parts: [{ text: 'perfect' }] },
	// 		{
	// 			name: '13381537-1e8f-46e1-ac78-6a6bc2fe7d37',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yep that's right" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6d341828-72cd-4f96-89eb-bc5cbcd255dd', type: 'EXAMPLE', parts: [{ text: 'I think so' }] },
	// 		{
	// 			name: '4320d555-a38f-492d-b1fc-6d16fdc54e79',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes I agree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: 'eba08d9b-f87d-4232-8874-be4da3029007',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sounds correct' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'ee5b2ffc-9c14-4a20-9e00-31cb8635c52c', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
	// 		{ name: 'e1f1d448-2705-47b8-92f5-4960656f346b', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
	// 		{
	// 			name: '50cf224f-9f07-4975-bf7b-441ab549ff6e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'go ahead' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '1296a391-d3e6-49c8-9eaa-39943cf8544f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'do it' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '55cd75db-90a7-4daf-947b-ecd03090e8b9', type: 'EXAMPLE', parts: [{ text: "it's fine" }] },
	// 		{ name: '1fe10ef0-0823-4efa-b4ef-730bc1f931b3', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: '4a8d741c-808c-45f8-bf90-ab32b99e0060', type: 'EXAMPLE', parts: [{ text: 'yes please' }] },
	// 		{ name: 'a05b793f-9a1d-460d-b1b6-c1a5b98d24d9', type: 'EXAMPLE', parts: [{ text: "it's okay" }] },
	// 		{ name: '88a721b8-99ce-4a51-bf78-f106361f402a', type: 'EXAMPLE', parts: [{ text: 'alright why not' }] },
	// 		{ name: 'df7428d3-7f27-40c7-b0d0-3456d0c8df91', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: '8f9f71af-76ec-424f-b28a-ece5b6f1dc95', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: '96b0889c-e64c-4ba3-83d3-495a0385917a', type: 'EXAMPLE', parts: [{ text: 'it looks perfect' }] },
	// 		{ name: '5a7c1865-6c90-4c93-8ea5-b7cacad6dcef', type: 'EXAMPLE', parts: [{ text: 'yes I can' }] },
	// 		{ name: 'ab7709c6-2eca-4ecf-812d-1e4527f1e709', type: 'EXAMPLE', parts: [{ text: 'yup' }] },
	// 		{ name: '3312fe28-dfeb-4fa6-98f6-9569c6cb393f', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: 'e826ff4d-875d-4073-89c5-1dba1203e3ce',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'confirm' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '29adab5b-d5e3-450b-b385-1538d0ad21da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'absolutely' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	action: 'Commentvideo1.Commentvideo1-yes',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/definition', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{ text: { text: ["Great! Let's watch another great clip that came up in the research"] } },
	// 		{ payload: { source: ['def 2'], type: 'video' } },
	// 		{ text: { text: ["Let me know what you think once you've watched it."] } },
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/62012d5c-00e7-4f33-9e9d-0938ffe413c3',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/62012d5c-00e7-4f33-9e9d-0938ffe413c3',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/4d8019ff-8c4b-4e03-8777-231650d263b0',
	// 	displayName: 'Welcome',
	// 	priority: 500000,
	// 	events: ['WELCOME'],
	// 	trainingPhrases: [
	// 		{ name: '0e114491-30b8-46f9-ad51-3602ef4234de', type: 'EXAMPLE', parts: [{ text: 'bonjour' }] },
	// 		{ name: '7f4993ea-c30a-4eb9-ada1-e23bdf1b108b', type: 'EXAMPLE', parts: [{ text: 'hi' }] },
	// 		{
	// 			name: '380fd9ab-af68-499e-9548-7c5f51c9598e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'hello', entityType: '@sys.ignore' }],
	// 		},
	// 	],
	// 	action: 'input.welcome',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/getname', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{ text: { text: ["Hi, you're the new writer, welcome!"] } },
	// 		{ text: { text: ["I'm Jana. What’s your name?"] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/5172ed20-62a6-4647-b3e9-7969fafd962d',
	// 	displayName: 'Predpol.cities',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/predpol-cities'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'e19d6dc5-58f1-40a7-9ad9-d47bea9fd778',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i have no clue', entityType: '@sys.any', alias: 'predpolcity', userDefined: true }],
	// 		},
	// 		{
	// 			name: '2f70763c-7403-437c-b46b-300fcbc4244d',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "maybe, i don't know", entityType: '@sys.any', alias: 'predpolcity', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '6e77b3ce-10d8-4d6c-bfe6-84a405cae3cd',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'No', entityType: '@sys.any', alias: 'predpolcity', userDefined: true }],
	// 		},
	// 		{
	// 			name: '68959b1e-68a8-43ae-b05e-381d1d5fb2dd',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: "I don't know if the police in my city is using PredPol",
	// 					entityType: '@sys.any',
	// 					alias: 'predpolcity',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/2approaches', lifespanCount: 1 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '6a8dbe26-788e-4391-bc73-9c8243688f19',
	// 			displayName: 'predpolcity',
	// 			value: '$predpolcity',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Info is not clear on which police are using predictive algorithms, but research shows that dozens of cities around the world are using them',
	// 				],
	// 			},
	// 		},
	// 		{ payload: { source: ['intro predictive police'], type: 'video' } },
	// 		{ text: { text: ['How do you feel about this?'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/55126b93-0dfa-42f7-b51c-2c8560df7bee',
	// 	displayName: 'Probability_Filter_Bubbles',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{ name: '83fc8e40-0623-4b23-a4d3-fc8a7d092373', type: 'EXAMPLE', parts: [{ text: 'probability' }] },
	// 	],
	// 	messages: [{ text: { text: ['Have you heard of "filter bubbles"?'] } }],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/5d0e44d9-55e4-4611-919a-dc0b69ad2dca',
	// 	displayName: 'Intro.feeling.badly',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/intro'],
	// 	trainingPhrases: [
	// 		{ name: '392cf53d-363e-4e59-842d-097973a1413e', type: 'EXAMPLE', parts: [{ text: 'frustrated' }] },
	// 		{
	// 			name: 'b8bf5838-164f-4252-8351-8ef75f3633a4',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm really frustaded " }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'c81a425a-3b95-4edd-9ff5-f9e047d2fb6f', type: 'EXAMPLE', parts: [{ text: "i'm doing like shit" }] },
	// 		{ name: '5e3ae1b6-be23-43bf-9347-d3a9370f7be6', type: 'EXAMPLE', parts: [{ text: 'everything sucks' }] },
	// 		{ name: '4f3da08b-3724-4a97-af4c-f6104bab2918', type: 'EXAMPLE', parts: [{ text: 'things are horrible' }] },
	// 		{
	// 			name: '9233971d-1518-4854-818f-8c5b80e3e8a4',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'actually not good at all' }],
	// 		},
	// 		{ name: '4750ecc4-7760-43b5-be76-76fb53fba659', type: 'EXAMPLE', parts: [{ text: 'terrible' }] },
	// 		{
	// 			name: 'f0e6a1dc-37f3-4403-beb9-1e492e2d8bd3',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "I'" },
	// 				{ text: 'm', entityType: '@sys.ignore' },
	// 				{ text: ' feeling ' },
	// 				{ text: 'bad', entityType: '@sys.ignore' },
	// 			],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Introfeelingbad-followup',
	// 			lifespanCount: 2,
	// 		},
	// 	],
	// 	messages: [{ text: {} }],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/0f8f6e7f-0883-4267-96ae-1eb5c38bf8b2',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/5d0e44d9-55e4-4611-919a-dc0b69ad2dca',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/12297c18-4d4d-4b0e-8e48-18cfc95d3ebe',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/5d0e44d9-55e4-4611-919a-dc0b69ad2dca',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/6093d52d-b2f6-4acb-945a-99c8fbe09fe9',
	// 	displayName: 'random.people.question',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/random-people-question'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '5b190634-1a93-473d-87a6-c9c995b7b81d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'oh yes', entityType: '@sys.any', alias: 'who-permor-better', userDefined: true }],
	// 		},
	// 		{
	// 			name: 'f882f6a0-9122-4b71-a990-95521f8f3449',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes', entityType: '@sys.any', alias: 'who-permor-better', userDefined: true }],
	// 		},
	// 		{
	// 			name: 'decbad74-f67f-4962-8467-f1134e628687',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i think so', entityType: '@sys.any', alias: 'who-permor-better', userDefined: true }],
	// 		},
	// 		{
	// 			name: '8f84b994-1291-4bd8-957d-ff0505d0d4af',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i ' }, { text: 'don', entityType: '@sys.ignore' }, { text: "'t know" }],
	// 		},
	// 		{ name: '993f5af1-1129-4b3b-aa51-7022dd6a564b', type: 'EXAMPLE', parts: [{ text: 'maybe' }] },
	// 		{
	// 			name: '299150a4-9607-4605-8df1-cee7bef4f88c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i guess so', entityType: '@sys.any', alias: 'who-permor-better', userDefined: true }],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/random-people-result',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: 'f96c91c6-52cd-4444-b1a5-01d0201e4384',
	// 			displayName: 'who-permor-better',
	// 			value: '$who-permor-better',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Wait, I found this research, they compared predictions made by algorithms used in courtrooms to random people on the internet getting one dollar to make a guess on people’s criminal behavior',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['guess who performed better, random people or the courtroom software?'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/62012d5c-00e7-4f33-9e9d-0938ffe413c3',
	// 	displayName: 'Comment.video.1',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/comment_video1'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '5b2c41cc-3008-44af-8648-81a4283055d2',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'it is a very interesting video',
	// 					entityType: '@sys.any',
	// 					alias: 'comment_video1',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: 'd935f5cb-4392-4dd6-87e4-b1857f345264',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'very good', entityType: '@sys.any', alias: 'comment_video1', userDefined: true }],
	// 		},
	// 		{
	// 			name: '32cd03a7-9daf-4ac6-9a0a-a41244fccb7d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'interesting', entityType: '@sys.any', alias: 'comment_video1', userDefined: true }],
	// 		},
	// 		{
	// 			name: 'ea05bfeb-e37b-4193-b14f-c2643582d045',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: "i think it's very good.",
	// 					entityType: '@sys.any',
	// 					alias: 'comment_video1',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Commentvideo1-followup',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: 'a1058eda-57b6-465d-9209-f187bdc6308a',
	// 			displayName: 'comment_video1',
	// 			value: '$comment_video1',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [{ text: { text: ['Alright. Should we dig more into defining what is a predictive algorithm?'] } }],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/4a50bdf3-871d-465d-94da-6c3de3360e5b',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/62012d5c-00e7-4f33-9e9d-0938ffe413c3',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/dcaf6230-f343-4856-a944-14a26769032d',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/62012d5c-00e7-4f33-9e9d-0938ffe413c3',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/6a19fef2-4c45-4cff-8424-3ad8d01c075b',
	// 	displayName: 'probability_1',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{ name: 'b0d481b4-b64e-484a-9342-c7141d2600f8', type: 'EXAMPLE', parts: [{ text: 'quiz' }] },
	// 		{ name: 'af90be6a-fb79-4205-a2e0-bbb68ebbf14c', type: 'EXAMPLE', parts: [{ text: 'statistics' }] },
	// 		{ name: '9db6ea04-c776-4da9-a210-01db50b99df1', type: 'EXAMPLE', parts: [{ text: 'probable' }] },
	// 		{ name: '546fa616-a2e4-4d0f-8930-c31804cf2773', type: 'EXAMPLE', parts: [{ text: 'probably' }] },
	// 		{ name: '3828e255-2ba0-410f-ba40-91c16df94069', type: 'EXAMPLE', parts: [{ text: 'probabilities' }] },
	// 		{
	// 			name: 'e238775e-77cc-4501-8685-cfc9a9eed770',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'probability', entityType: '@sports', alias: 'sports' }],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/probability_1-followup',
	// 			lifespanCount: 2,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '26157249-90f7-4e4f-8642-921cafd23792',
	// 			displayName: 'sports',
	// 			value: '$sports',
	// 			entityTypeDisplayName: '@sports',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'One way of understanding probability is "a number which gives a precise estimate of how certain we are about something.” (Everitt)',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'A famous research in the way we interpret probability, known as the Linda the Bank Teller case, has shown evidence of a very common cognitive bias we tend to repeat over and over (Tvarski, Kahneman).',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ["Would you like to take the Linda test? It's a a quick quiz."] } },
	// 	],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/0a89f76d-ac77-4d40-b075-4eb2a59852cf',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/6a19fef2-4c45-4cff-8424-3ad8d01c075b',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/3b6de9c4-e7a0-4d92-a067-65ae028d8e99',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b2f1022a-32fa-4f99-960a-72d601753248',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/8201a389-26d9-4c36-b0b6-d0b49b103582',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b2f1022a-32fa-4f99-960a-72d601753248',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b2f1022a-32fa-4f99-960a-72d601753248',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/6a19fef2-4c45-4cff-8424-3ad8d01c075b',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/6b06bec5-0736-41f6-aaf8-ebfb072925e2',
	// 	displayName: 'Fallback.definition.follow-up',
	// 	priority: 500000,
	// 	isFallback: true,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Definition-followup'],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/minority-report', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{ text: { text: ['I see.  As you said before, you think "#has_definition.definition_1"'] } },
	// 		{ text: { text: ["I guess everything will be clearer once we've seen some examples."] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/6b17e3ab-1246-4eaf-8d29-b9096ff9991a',
	// 	displayName: 'video.not.working - no',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/videonotworking-followup'],
	// 	trainingPhrases: [
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'videonotworking.videonotworking-no',
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/videonotworking-followup',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	messages: [
	// 		{ text: { text: ['sorry again! how about now?'] } },
	// 		{ payload: { type: 'tag', source: ['general def'] } },
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b25ffc3d-b1fd-4729-ba64-d0185f85b444',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b25ffc3d-b1fd-4729-ba64-d0185f85b444',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/6cffb3d6-d2bf-4805-b16f-bc20ac41c816',
	// 	displayName: 'Test1',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: '9e5adb68-ad8f-4ee5-a0d2-38388834f47f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what does an algoritm?' }],
	// 		},
	// 		{
	// 			name: '29bf2104-c8b9-47c5-a862-37603546c677',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'how do algorithms work?' }],
	// 		},
	// 		{
	// 			name: '334c824c-cdce-44b7-b613-93b2e7e76916',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'tell me what is a predictive algoritm' }],
	// 		},
	// 		{
	// 			name: 'aff8538e-8a06-4c0c-bbe7-9474b95d76af',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'how do you describe an algorithm?' }],
	// 		},
	// 		{ name: 'ccc50e99-5ecd-4551-b3c2-849f77520bc7', type: 'EXAMPLE', parts: [{ text: 'Define algorithm' }] },
	// 		{
	// 			name: 'ff960df2-49a7-42ef-a2f6-e06e95941734',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What is an algorithm?' }],
	// 		},
	// 		{
	// 			name: '59f1669b-9315-430d-8952-2d511eaef05c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What is the definition of predictive algorithms?' }],
	// 		},
	// 		{
	// 			name: '5a34d7a4-8e2b-45bc-a1da-e28586c0f1aa',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Define predictive algorithm' }],
	// 		},
	// 		{
	// 			name: 'fc1f2d41-e4fd-43a4-ad91-768b8bc640b0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'How do you describe a predictive algorithm?' }],
	// 		},
	// 		{
	// 			name: '46255356-ff43-4ea0-98f2-0b97e848907f',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'Can you define ' },
	// 				{ text: 'predictive', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'algorithms', entityType: '@sys.ignore' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 		{
	// 			name: 'b4cb0473-1aba-4700-b279-38216bedea15',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'What is a ' },
	// 				{ text: 'predictive', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'algorithm', entityType: '@sys.ignore' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/comment_video1', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'If I understood correctly, a predictive algorithm is a scoring system that uses past data to predict events.',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ["There's a great video about this. Let me know what you think."] } },
	// 		{ payload: { source: ['general def'], type: 'video' } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/6d80ecfb-8e8c-4d3a-8e80-29599fbdd57d',
	// 	displayName: 'Get.opinion2',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion2'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '59134c23-71ea-48d2-a82e-f0ea46a41920',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah', entityType: '@sys.any', alias: 'opinion2', userDefined: true }],
	// 		},
	// 		{
	// 			name: 'bb3006c7-e8a7-40aa-8330-3e585c92759e',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'what do you think IM not sure',
	// 					entityType: '@sys.any',
	// 					alias: 'opinion2',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: '5c09a602-1729-4bc1-a272-acac4c7829d2',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "i don't know, maybe yes", entityType: '@sys.any', alias: 'opinion2', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '98b2a8c5-149e-4dcc-928c-0744f3c004c9',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes', entityType: '@sys.any', alias: 'opinion2', userDefined: true }],
	// 		},
	// 		{
	// 			name: '374ea9ab-4cc5-44f1-b83b-0fafdb4bf26a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no', entityType: '@sys.any', alias: 'opinion2', userDefined: true }],
	// 		},
	// 		{
	// 			name: '69d04695-d0a2-4f65-9c34-e9eb63793549',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "i think it's impossible", entityType: '@sys.any', alias: 'opinion2', userDefined: true },
	// 			],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/opinion2', lifespanCount: 100 },
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/predpol-cities', lifespanCount: 1 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: 'b28a7a28-0825-44b6-a35e-682c4f45e158',
	// 			displayName: 'opinion2',
	// 			value: '$opinion2',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: ['Many police forces around the world are using predictive algorithms, such as PredPol.'],
	// 			},
	// 		},
	// 		{ text: { text: ['Do you know if police in our city are using predictive algorithms?'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/6e7deb45-940d-475d-89d3-c10eba5022fe',
	// 	displayName: 'Get_opinion1.yes',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Get_opinion1-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '5c64e663-af19-4f6a-8e91-02963dc935ac',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'would love to hear about it', entityType: '@sys.any', alias: 'video1', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: 'be319865-e4a4-41ff-987a-b2cbe87f730c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i'd like to hear it from you" }],
	// 		},
	// 		{
	// 			name: '42ce2151-bbe3-4263-9866-72712a4c25f4',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure why not', entityType: '@sys.any', alias: 'video1', userDefined: true }],
	// 		},
	// 		{
	// 			name: '34083880-515b-4ba9-a27b-1675771cdc40',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'why not?', entityType: '@sys.any', alias: 'video1', userDefined: true }],
	// 		},
	// 		{
	// 			name: '566af1b8-e64b-4e0d-b367-aafa961af45b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'seems ok', entityType: '@sys.any', alias: 'video1', userDefined: true }],
	// 		},
	// 		{ name: '5df82055-de99-471d-b5e2-375e597ec99b', type: 'EXAMPLE', parts: [{ text: 'seems good' }] },
	// 		{
	// 			name: '8a76441a-8cbd-4b99-8a1f-bb4c1f18dfdc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes', entityType: '@sys.any', alias: 'video1', userDefined: true }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '0083ef88-2868-43a8-8944-3e098dd55c7a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay I will' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '7aac036a-55e5-468a-9f43-c8dbb456ff73', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
	// 		{
	// 			name: '89d7ed15-c76c-4cae-af40-053b39489a45',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yes that's alright", entityType: '@sys.any', alias: 'video1', userDefined: true }],
	// 		},
	// 		{
	// 			name: 'f4d597c8-d098-46da-89fe-1a12f425cd58',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes I do', entityType: '@sys.any', alias: 'video1', userDefined: true }],
	// 		},
	// 		{
	// 			name: '143c08ba-bb97-40cd-a4de-e7ba7615d210',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'exactly' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '023894ec-fc8b-4ec1-b8c1-a8bcbb24fc5a', type: 'EXAMPLE', parts: [{ text: 'of course' }] },
	// 		{ name: '9d56f0ca-f4e0-4ea7-9b93-ebebd16edd4c', type: 'EXAMPLE', parts: [{ text: "yep that's ok" }] },
	// 		{
	// 			name: 'd0a3f14b-a1e9-4641-a3e0-8fcb8dc32d85',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'd753b5af-34db-4428-bdba-406fe267000c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'ok' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'fd691abb-5b22-4393-9b08-aa9d5bc4b4a6', type: 'EXAMPLE', parts: [{ text: 'for sure' }] },
	// 		{ name: '92fc2708-2b6e-41a1-8553-d13ce4e93f34', type: 'EXAMPLE', parts: [{ text: 'sg' }] },
	// 		{ name: 'f1e3a276-ea9e-4e31-85c2-df972bdb409d', type: 'EXAMPLE', parts: [{ text: "yes that't ok" }] },
	// 		{
	// 			name: '4d27c29e-8adf-4c0f-9512-6a68581c25f2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I agree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '3cc63bfe-e1b0-47a2-b09a-ad8c0a5e53ec', type: 'EXAMPLE', parts: [{ text: 'yes you can do it' }] },
	// 		{
	// 			name: 'e4d39a0a-b1fe-42dc-855f-e2ecf1c7a070',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't mind" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'b0126bf2-e04d-458f-bf16-d68600a247d8', type: 'EXAMPLE', parts: [{ text: 'that one works' }] },
	// 		{
	// 			name: '556f1638-b813-4a6d-8a65-6c93ae0b0451',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'that works' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '4743b629-c571-4645-bdc2-63269d1c0c66', type: 'EXAMPLE', parts: [{ text: 'perfect' }] },
	// 		{
	// 			name: '13381537-1e8f-46e1-ac78-6a6bc2fe7d37',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yep that's right" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6d341828-72cd-4f96-89eb-bc5cbcd255dd', type: 'EXAMPLE', parts: [{ text: 'I think so' }] },
	// 		{
	// 			name: '4320d555-a38f-492d-b1fc-6d16fdc54e79',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes I agree' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '68b6cd35-4229-4674-94d6-46615ebab6ba',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: 'eba08d9b-f87d-4232-8874-be4da3029007',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sounds correct' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'ee5b2ffc-9c14-4a20-9e00-31cb8635c52c', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
	// 		{ name: 'e1f1d448-2705-47b8-92f5-4960656f346b', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
	// 		{
	// 			name: '50cf224f-9f07-4975-bf7b-441ab549ff6e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'go ahead' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '1296a391-d3e6-49c8-9eaa-39943cf8544f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'do it' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '55cd75db-90a7-4daf-947b-ecd03090e8b9', type: 'EXAMPLE', parts: [{ text: "it's fine" }] },
	// 		{ name: '1fe10ef0-0823-4efa-b4ef-730bc1f931b3', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: '4a8d741c-808c-45f8-bf90-ab32b99e0060', type: 'EXAMPLE', parts: [{ text: 'yes please' }] },
	// 		{ name: 'a05b793f-9a1d-460d-b1b6-c1a5b98d24d9', type: 'EXAMPLE', parts: [{ text: "it's okay" }] },
	// 		{ name: '88a721b8-99ce-4a51-bf78-f106361f402a', type: 'EXAMPLE', parts: [{ text: 'alright why not' }] },
	// 		{ name: 'df7428d3-7f27-40c7-b0d0-3456d0c8df91', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: '8f9f71af-76ec-424f-b28a-ece5b6f1dc95', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: '96b0889c-e64c-4ba3-83d3-495a0385917a', type: 'EXAMPLE', parts: [{ text: 'it looks perfect' }] },
	// 		{ name: '5a7c1865-6c90-4c93-8ea5-b7cacad6dcef', type: 'EXAMPLE', parts: [{ text: 'yes I can' }] },
	// 		{ name: 'ab7709c6-2eca-4ecf-812d-1e4527f1e709', type: 'EXAMPLE', parts: [{ text: 'yup' }] },
	// 		{ name: '3312fe28-dfeb-4fa6-98f6-9569c6cb393f', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: 'e826ff4d-875d-4073-89c5-1dba1203e3ce',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'confirm' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '29adab5b-d5e3-450b-b385-1538d0ad21da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'absolutely' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	action: 'Get_opinion1.Get_opinion1-yes',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/comment_video1', lifespanCount: 1 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '91f21d3a-a481-4c01-8310-23493d999a26',
	// 			displayName: 'video1',
	// 			value: '$video1',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: ['Great! I found this great video. Please watch it and let me know what comes up in it.'],
	// 			},
	// 		},
	// 		{ payload: { type: 'tag', source: ['def 1'] } },
	// 		{ text: { text: ['So, what do you think?'] } },
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/07bcde13-8e10-4b81-bb5e-dd9a63a3ab58',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/07bcde13-8e10-4b81-bb5e-dd9a63a3ab58',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/6feae527-04dd-4c0b-be83-47784f043c5d',
	// 	displayName: 'Randomness quotes',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{ name: 'ae8b1091-007a-4977-9fda-40c1086e1785', type: 'EXAMPLE', parts: [{ text: 'indeterminacy' }] },
	// 		{
	// 			name: '084c40a5-abf7-4953-8f6f-a1f468c481a1',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what is the probability?' }],
	// 		},
	// 		{
	// 			name: '6b00362b-35c2-424b-99f5-a168d8689727',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'is there uncertainty?' }],
	// 		},
	// 		{ name: '1f3119d5-8ffd-406f-b694-c4a174ab33c2', type: 'EXAMPLE', parts: [{ text: 'is there chance?' }] },
	// 		{ name: '82cda189-10d1-4869-9b76-622252cad876', type: 'EXAMPLE', parts: [{ text: 'what is randomness?' }] },
	// 		{ name: '9a6a33cf-e788-4b24-85fe-188fbba73fc3', type: 'EXAMPLE', parts: [{ text: 'are you random?' }] },
	// 		{ name: '867346d0-79ed-4b7f-ba4c-911697a7b704', type: 'EXAMPLE', parts: [{ text: 'causal' }] },
	// 		{ name: '4e06edea-2804-417e-bf5b-e593e881abf2', type: 'EXAMPLE', parts: [{ text: 'potential' }] },
	// 		{ name: '15e660a1-0ee5-4513-8889-6d53480f58e8', type: 'EXAMPLE', parts: [{ text: 'possible' }] },
	// 		{ name: '45a825c4-121a-459e-9c74-c7832837aefc', type: 'EXAMPLE', parts: [{ text: 'determinism' }] },
	// 		{ name: 'd02c849f-f7fb-4f6b-a8b6-e8f6423e8203', type: 'EXAMPLE', parts: [{ text: 'uncertainty' }] },
	// 		{ name: 'd760276b-1896-4c9d-959b-31e4e5e0c997', type: 'EXAMPLE', parts: [{ text: 'unpredictable' }] },
	// 		{ name: '81c21ee6-df7c-42e0-9fa9-4233087f2578', type: 'EXAMPLE', parts: [{ text: 'predict' }] },
	// 		{ name: 'e21500d9-340c-4f1b-abfa-761e19192199', type: 'EXAMPLE', parts: [{ text: 'luck' }] },
	// 		{ name: '3ddcc731-7363-4a9c-b19f-c698fe7d3b1c', type: 'EXAMPLE', parts: [{ text: 'event' }] },
	// 		{ name: '46a09e87-256f-429e-b719-f9c489cc6e76', type: 'EXAMPLE', parts: [{ text: 'chance' }] },
	// 		{ name: 'ad992864-4655-482e-963c-97a3689e0903', type: 'EXAMPLE', parts: [{ text: 'probability' }] },
	// 		{ name: '2e881002-0c83-4b96-b5d8-be0e00e1dd9c', type: 'EXAMPLE', parts: [{ text: 'random' }] },
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'“We are far too willing to reject the belief that much of what we see in life is random.” Do you agree?',
	// 					'Many scientists say that random processes are part of nature and have a big presence in our daily lives, “yet most people do not understand them or think much about them.” Do you agree?',
	// 					'“The chances of each of us coming into existence are infinitesimally small, and even though we shall all die some day, we should count ourselves fantastically lucky to get our decades in the sun.” Do you agree?',
	// 					"“Trajectories aren't linear. Life's just a roller coaster. I guess I'm a believer in the randomness of life rather than it being a linear trajectory or an arc, a consistent smooth arc, towards anything.\" Do you agree?",
	// 					'Einstein famously said “God does not play dice.” Do you agree?',
	// 					'We tend to “see the world as more tidy, simple, predictable and coherent than it really is. The illusion that one has understood the past feeds the further illusion that one can predict and control the future. These illusions are comforting. They reduce the anxiety we would experience if we allowed ourselves to fully acknowledge the uncertainties of existence.” Do you agree?',
	// 					"“The world is so unpredictable. Things happen suddenly, unexpectedly. We want to feel we are in control of our own existence. In some ways we are, in some ways we're not. We are ruled by the forces of chance and coincidence.” Do you agree?",
	// 					'“A random event, by definition, does not lend itself to explanation, but collections of random events do behave in a highly regular fashion.” Do you agree?',
	// 					'“The basic interpretation of probability theory is thus as a mathematical science of randomness.” Do you agree?',
	// 					'“The most decisive conceptual event of the twentieth century physics has been the discovery that the world is not deterministic.” Do you agree?',
	// 				],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/7192162c-8f1c-4c33-9ef7-57a78f5a167c',
	// 	displayName: 'Minority.report - no_222',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Minorityreport-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'd1a20422-d5b6-4713-9739-9afc19ed3f91',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no is it the one with tom cruise?' }],
	// 		},
	// 		{ name: 'a9f1f819-dd65-49b1-ada9-35b9c719a62a', type: 'EXAMPLE', parts: [{ text: 'this is bad' }] },
	// 		{ name: '23f78697-2246-48da-8f98-97eba563a2cc', type: 'EXAMPLE', parts: [{ text: 'bad' }] },
	// 		{
	// 			name: 'f06ecf00-4075-468a-a9a1-029e98a8316e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what kind of movie is it?' }],
	// 		},
	// 		{ name: 'f2f61ab2-6c62-4c24-8d1c-cd42a3427ff5', type: 'EXAMPLE', parts: [{ text: 'this movie is old' }] },
	// 		{
	// 			name: '40076e94-aa6c-4e6b-831c-169502dd3200',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i'm too young for that" }],
	// 		},
	// 		{
	// 			name: '33fef6d7-08c8-48f6-a96f-ab5c638bb7da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no what movie is that' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '9087b131-793a-4c0e-8360-8b2d23d5af2e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'the movie with tom cruise?' }],
	// 		},
	// 		{ name: '934d87c0-239c-4f70-b257-323ccbf13f24', type: 'EXAMPLE', parts: [{ text: 'what movie is that?' }] },
	// 		{ name: 'c680fdf0-67f4-4e12-ab58-e1e003596d98', type: 'EXAMPLE', parts: [{ text: "don't know" }] },
	// 		{ name: 'ace92a4f-5009-46af-b9e0-d40dbb9bd1c9', type: 'EXAMPLE', parts: [{ text: "don't remember" }] },
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'Minorityreport.Minorityreport-no',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion2', lifespanCount: 1 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '6c7d0f98-6929-43cf-86be-ee675ab8aadb',
	// 			displayName: 'person',
	// 			value: '$person',
	// 			entityTypeDisplayName: '@sys.person',
	// 		},
	// 	],
	// 	messages: [{ text: {} }, { payload: { source: ' m1.mp4', type: 'video' } }, { text: {} }],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/72fc0181-dda9-4278-8609-ce3fefc6fad8',
	// 	displayName: 'Understanig.the.problem',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/understanding_the_problem'],
	// 	trainingPhrases: [
	// 		{ name: '144fa634-43d5-43d1-9737-48da7a7b25b4', type: 'EXAMPLE', parts: [{ text: "i guess that's it!" }] },
	// 		{
	// 			name: 'e7f90056-07a5-4e61-9b03-74ec4c016d1a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i guess you are right' }],
	// 		},
	// 		{ name: 'fb2d559f-32d2-4580-9f48-60c35881e448', type: 'EXAMPLE', parts: [{ text: 'yeah maybe' }] },
	// 		{ name: '7b910410-c9b2-4d11-aac3-be4bcfd634f3', type: 'EXAMPLE', parts: [{ text: 'you may be right' }] },
	// 		{ name: 'cd2a2c08-8280-4156-ad21-3b01621f0360', type: 'EXAMPLE', parts: [{ text: 'it may be that' }] },
	// 		{ name: '333a0a69-d3fb-457d-b2d5-c92d85e934c9', type: 'EXAMPLE', parts: [{ text: 'i suppose yes' }] },
	// 		{ name: '31185e0f-7a67-4959-aca7-edb003d851ce', type: 'EXAMPLE', parts: [{ text: 'i suppose so' }] },
	// 		{ name: 'ce6a1f54-dc41-47b4-b878-b3ec6e514eb0', type: 'EXAMPLE', parts: [{ text: 'i guess so' }] },
	// 		{ name: '7c9c50ef-08d0-40c2-97e3-b41f2c83d71a', type: 'EXAMPLE', parts: [{ text: 'exactly' }] },
	// 		{ name: 'afd48d78-e95f-4b23-90db-a761b28c8dc4', type: 'EXAMPLE', parts: [{ text: 'just about right' }] },
	// 		{ name: 'f58af0f3-1cb4-4972-83ee-b96c342dbed1', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
	// 		{ name: '3c50076e-fc04-4315-b36b-9417f737540e', type: 'EXAMPLE', parts: [{ text: 'yes that is correct' }] },
	// 		{ name: '623b53c2-b52a-4e91-96f0-36fa0af911c6', type: 'EXAMPLE', parts: [{ text: 'gotcha' }] },
	// 		{ name: 'bdaee63d-9bef-4f99-aea9-a7ccaaba9ed4', type: 'EXAMPLE', parts: [{ text: 'totally got it' }] },
	// 		{ name: '925dd7e8-4971-4bf9-b433-9739468b7eb6', type: 'EXAMPLE', parts: [{ text: "that's it" }] },
	// 		{ name: '2c755df3-b954-49d1-996f-4737d1d7e8da', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: '859eba70-2d88-431a-8ed3-aaa3049581f6', type: 'EXAMPLE', parts: [{ text: "that's right" }] },
	// 		{ name: '2f28d447-7f42-4d77-93ec-d18d41be787f', type: 'EXAMPLE', parts: [{ text: 'you got it' }] },
	// 		{ name: '8d33b2f0-0996-409a-843c-87f1c271762f', type: 'EXAMPLE', parts: [{ text: 'correct' }] },
	// 		{ name: '8b9bc351-8538-4666-b482-08b955b16d49', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: '6ca2e96a-02a9-4f01-a9d8-3287b18ac4a9',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i think that's right" }],
	// 		},
	// 		{
	// 			name: '60a91665-c008-449a-ab63-8cb7ad4be57b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i think that's a good definition" }],
	// 		},
	// 		{ name: '8a594816-6c16-4935-87b3-058c50c048ea', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: 'cdb17f99-c0f1-43b7-b364-168bf7d733af', type: 'EXAMPLE', parts: [{ text: 'I agree' }] },
	// 		{
	// 			name: 'ca2f5d7e-f85a-4971-be9b-9148dff47c6e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I think so' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'ee83c745-e824-421f-b40a-333dd178d657', type: 'EXAMPLE', parts: [{ text: 'agree' }] },
	// 		{
	// 			name: 'e57cd8dc-c95d-4977-a7b1-fee803387d06',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'e62dc444-7b6b-40d5-a30f-67d646b69c9e', type: 'EXAMPLE', parts: [{ text: 'cool' }] },
	// 		{
	// 			name: 'e4dabdc1-d140-4f0e-aaed-161e855ccb89',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes', entityType: '@sys.ignore' }],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/minority-report', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Now I see why it’s so important who gets to decide about the data and how the score is measured',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['Should we move on to some examples of predictive algorithms?'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/7c04232c-e706-43da-abe9-a28d825999ec',
	// 	displayName: 'random.people.result - yes - custom',
	// 	priority: 500000,
	// 	inputContextNames: [
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/randompeopleresult-yes-followup',
	// 	],
	// 	trainingPhrases: [
	// 		{
	// 			name: '08c6b56a-b199-4f44-a957-e77163af4963',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i believe', entityType: '@sys.any', alias: 'any', userDefined: true }],
	// 		},
	// 		{
	// 			name: 'b74a0fdd-dd63-42d8-a838-f005c6286fe5',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'worrisome', entityType: '@sys.any', alias: 'any', userDefined: true }],
	// 		},
	// 		{ name: '1359f246-9beb-421a-92f2-0079e8218ee4', type: 'EXAMPLE', parts: [{ text: 'wow' }] },
	// 		{
	// 			name: 'bddbd894-4622-4735-95fe-6114c6b0f4cc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i find it very scary', entityType: '@sys.any', alias: 'any', userDefined: true }],
	// 		},
	// 	],
	// 	action: 'randompeopleresult.randompeopleresult-yes.randompeopleresult-yes-custom',
	// 	outputContexts: [{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/mit', lifespanCount: 1 }],
	// 	parameters: [
	// 		{
	// 			name: 'dbe69c96-f791-4c5a-be9d-329a4e890b46',
	// 			displayName: 'any',
	// 			value: '$any',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'It makes me wonder, what’s the point of using this technology if it is biased and does not even perform better than a random person on the web?',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/bf5333fe-23e2-48e4-8122-64b1106013fa',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/1119fb31-b94c-4b09-bf51-618a1884002e',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/7e1aa384-601b-46ea-8184-405b5da17a6a',
	// 	displayName: 'Fallback.2.approaches',
	// 	priority: 500000,
	// 	isFallback: true,
	// 	inputContextNames: [
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach2-predpol',
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach1-laser',
	// 	],
	// 	trainingPhrases: [
	// 		{ name: '4a20556b-9728-40f9-8934-1cb02b9d7332', type: 'EXAMPLE', parts: [{ text: "i don't know" }] },
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach2-predpol', lifespanCount: 1 },
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach1-laser', lifespanCount: 1 },
	// 	],
	// 	messages: [{ text: { text: ['Sorry, which approach did you mean? 1 or 2?'] } }],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/8150a82a-97e9-4e77-89c4-d842e8c2b54e',
	// 	displayName: 'predictive.police.catch.all',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: '0bd5191c-40d0-424c-a6c9-7e77ac370528',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'can we check ' },
	// 				{ text: 'predictive police', entityType: '@Examples', alias: 'examples' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 		{
	// 			name: 'aa7a2401-657d-4a9d-b972-913845311429',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "let's investigate " },
	// 				{ text: 'predictive police', entityType: '@Examples', alias: 'examples' },
	// 				{ text: ', alright?' },
	// 			],
	// 		},
	// 		{
	// 			name: '78fb3397-3f20-484e-9299-adf0195a0951',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'would you like to discuss ' },
	// 				{ text: 'predictive police', entityType: '@Examples', alias: 'examples' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 		{
	// 			name: '93eb72cf-1cd7-47f7-b400-2c5b21a188b7',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "let's talk about " },
	// 				{ text: 'predictive police', entityType: '@Examples', alias: 'examples' },
	// 			],
	// 		},
	// 		{
	// 			name: '14ab0879-a12e-4509-9bfa-57908ae45ca4',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'how ' },
	// 				{ text: 'predictive police', entityType: '@Examples', alias: 'examples' },
	// 				{ text: ' work?' },
	// 			],
	// 		},
	// 		{
	// 			name: '9894c967-c67a-40a2-b319-df78047be176',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'can you define ' },
	// 				{ text: 'predictive police', entityType: '@Examples', alias: 'examples' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 		{
	// 			name: '7d6cbe03-3d92-47f1-a840-83f917e8d236',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'what is ' },
	// 				{ text: 'predictive poice', entityType: '@Examples', alias: 'examples' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 		{
	// 			name: '7789a59c-451d-4ae4-b918-c277224ba600',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'predictive police', entityType: '@Examples', alias: 'examples' }],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/2approaches', lifespanCount: 1 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: 'd2a02dae-af6a-405a-8707-bd8a44a54200',
	// 			displayName: 'examples',
	// 			value: '$examples',
	// 			entityTypeDisplayName: '@Examples',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Dozens of cities around the world are using algorithms to predict crimes. How do you feel about this?',
	// 				],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/8201a389-26d9-4c36-b0b6-d0b49b103582',
	// 	displayName: 'probability_1 - yes - custom-2',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/probability_1-yes-followup'],
	// 	trainingPhrases: [
	// 		{ name: 'a0076c55-7969-4d4f-a26e-adca75cec4da', type: 'EXAMPLE', parts: [{ text: 'two' }] },
	// 		{ name: '119bdeec-19f0-4fe9-b829-b8ca92f00a96', type: 'EXAMPLE', parts: [{ text: 'activist' }] },
	// 		{
	// 			name: '01f0b58d-6243-4e24-a8db-a2d82f03afa6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: '2', entityType: '@sys.number', alias: 'number' }],
	// 		},
	// 	],
	// 	action: 'probability_1.probability_1-yes.probability_1-yes-custom-2',
	// 	parameters: [
	// 		{
	// 			name: '885dcffd-e28f-41cb-b3c9-c01f9c2f6b12',
	// 			displayName: 'number',
	// 			value: '$number',
	// 			entityTypeDisplayName: '@sys.number',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Not really. This is a very good example of how we prioritize meaning, stories and causal explanations over statistical thinking.',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'If you think in terms of probability, the second alternative is necessarily less likely to occur, since two things have to happen (bank teller AND activist), and in the first alternative, only one thing has to happen (bank teller).',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['But in terms of narrative coherence, the second one is seems more likely.'] } },
	// 		{ text: {} },
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/6a19fef2-4c45-4cff-8424-3ad8d01c075b',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b2f1022a-32fa-4f99-960a-72d601753248',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/85ce74b0-ed40-4d3e-8f40-b82273f9ca94',
	// 	displayName: 'Get_opinion1no',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Get_opinion1-followup'],
	// 	trainingPhrases: [
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'Get_opinion1.Get_opinion1-no',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/comment_video1', lifespanCount: 5 },
	// 	],
	// 	messages: [
	// 		{ text: { text: ["Don't worry, things will get clearer as we progress in the research"] } },
	// 		{ payload: { type: 'video', source: ['def 1'] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					"Let’s look at this clip to get started. Let me know what you think after you've watched it.",
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/07bcde13-8e10-4b81-bb5e-dd9a63a3ab58',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/07bcde13-8e10-4b81-bb5e-dd9a63a3ab58',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/87fb743b-c15b-49d0-9984-476df73439c7',
	// 	displayName: 'Topic',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/topic'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '1d60608d-df7e-4ba5-bf96-528e9f16bdd5',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'great, so what are we up to?', entityType: '@sys.any', alias: 'topic', userDefined: true },
	// 			],
	// 		},
	// 		{ name: '8174c6ce-f69b-4daf-945c-df97d390dae2', type: 'EXAMPLE', parts: [{ text: 'yes thats great' }] },
	// 		{
	// 			name: 'b0d9238f-ed70-4a42-99a6-bcc8bed72091',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'perfect', entityType: '@sys.any', alias: 'topic', userDefined: true }],
	// 		},
	// 		{
	// 			name: 'c5432b0f-8fad-4f42-917e-80be51003122',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yes, that's perfect", entityType: '@sys.any', alias: 'topic', userDefined: true }],
	// 		},
	// 		{ name: '564527c4-eb08-41d2-ba16-e1ede17df323', type: 'EXAMPLE', parts: [{ text: 'go for it' }] },
	// 		{ name: 'd7409c3f-fe41-42e7-b164-276a6f63e1c4', type: 'EXAMPLE', parts: [{ text: 'lets do this' }] },
	// 		{
	// 			name: '962890e3-8b28-4785-883f-9467f9334bd8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'lets do it', entityType: '@sys.any', alias: 'topic', userDefined: true }],
	// 		},
	// 		{ name: '21e1750c-3b6f-40ae-9a22-738ccf2c1aef', type: 'EXAMPLE', parts: [{ text: 'I love it' }] },
	// 		{ name: '25bfef64-21fa-4ffb-9f27-5dc4266925eb', type: 'EXAMPLE', parts: [{ text: 'awesome' }] },
	// 		{
	// 			name: '5bde157f-d82d-42d7-ae72-a2c7f2a02dac',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'oh! fun', entityType: '@sys.any', alias: 'topic', userDefined: true }],
	// 		},
	// 		{
	// 			name: '52d81f6a-ede5-4efb-9a41-e00090afaaa3',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'cool', entityType: '@sys.any', alias: 'topic', userDefined: true }],
	// 		},
	// 		{ name: 'eca1e3a1-a5ea-49cd-893f-21aac8133309', type: 'EXAMPLE', parts: [{ text: 'sounds ok' }] },
	// 		{ name: '088623d5-eba7-4f21-8c6b-dd3f8c8246c2', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
	// 		{ name: 'c798f6fa-b332-4908-8bb3-8723c79f806b', type: 'EXAMPLE', parts: [{ text: 'that sounds good' }] },
	// 		{
	// 			name: '4f83f5ab-33ed-4363-a759-80bf284e1eeb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes', entityType: '@sys.ignore' }],
	// 		},
	// 		{
	// 			name: '05d994ea-1164-410e-92e1-ce65642ceb64',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yep' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '56d7b6dd-b0ca-4486-82e3-d5fc2528adc0', type: 'EXAMPLE', parts: [{ text: 'sure' }] },
	// 		{ name: '175d7d3f-cc61-4937-b7ee-849f6e132da9', type: 'EXAMPLE', parts: [{ text: 'ok' }] },
	// 		{ name: 'ef69c03c-ba1f-46df-981d-ba45f8de15c1', type: 'EXAMPLE', parts: [{ text: 'seems ok' }] },
	// 		{ name: '7d809188-ba31-4934-b94f-fb699a32359f', type: 'EXAMPLE', parts: [{ text: 'good' }] },
	// 		{ name: 'bd0c330f-4e5b-4fdf-81a6-0bc16854ba09', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Topic-followup', lifespanCount: 1 },
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/fallback-topic', lifespanCount: 1 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '9a61e080-65a4-4540-846d-06e11422bacf',
	// 			displayName: 'topic',
	// 			value: '$topic',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'I’ve been covering technology for about 20 years, this topic is one of the most important I’ve written about',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'it affects how we build political views, how long people stay in prison, if people will get loans, and so many important things in our lives',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['The story is about predictive algorithms, have you ever heard about it?'] } },
	// 	],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/eddeaf62-10cd-476c-9ec1-855658b591c2',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/87fb743b-c15b-49d0-9984-476df73439c7',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/fd3c78e5-017c-4399-a739-953d269a7239',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/87fb743b-c15b-49d0-9984-476df73439c7',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/8baec803-e956-4b56-88f5-e432d31d60f6',
	// 	displayName: '_welcome - yes - fallback - custom',
	// 	priority: 500000,
	// 	inputContextNames: [
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/_welcome-yes-fallback-followup',
	// 	],
	// 	trainingPhrases: [
	// 		{
	// 			name: '5f1af6b4-e178-4e8b-b2af-204b2dd9ace0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'science', entityType: '@subject', alias: 'subject' }],
	// 		},
	// 		{
	// 			name: 'd18faced-c8c7-4c0d-aa4f-ccd58be92e02',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'chaos', entityType: '@subject', alias: 'subject' }],
	// 		},
	// 		{
	// 			name: 'ea89e81c-bc2f-4816-853a-72fb73f64173',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sports', entityType: '@subject', alias: 'subject' }],
	// 		},
	// 		{
	// 			name: 'd5669cea-77b8-472d-a013-36cfbdf5343e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'lottery', entityType: '@subject', alias: 'subject' }],
	// 		},
	// 		{
	// 			name: 'dd62c08c-dcca-4dcf-add6-f524eca73d76',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'probability', entityType: '@subject', alias: 'subject' }],
	// 		},
	// 	],
	// 	action: '_welcome._welcome-yes._welcome-yes-fallback._welcome-yes-fallback-custom',
	// 	parameters: [
	// 		{
	// 			name: '5adb6a7f-2c35-4ba7-929d-df3faac83c93',
	// 			displayName: 'subject',
	// 			value: '$subject',
	// 			entityTypeDisplayName: '@subject',
	// 			mandatory: true,
	// 			prompts: [
	// 				'Try one of the following topics : probability, coin toss, everyday life or chaos.',
	// 				'Try one of the following subjects : sports, the lottery, science or art.',
	// 				'Why don’t you pick one of the following topics : computation, the uncertainty principle, probability or sports.',
	// 			],
	// 		},
	// 	],
	// 	messages: [{ text: { text: ["Excellent! Let's talk about $subject.original."] } }],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/60ed603f-a843-4ec4-94c5-7741f7002c74',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/0c00dd40-4df0-4bd3-b08b-778467d277d8',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/8e0437d8-9bc7-46a6-a875-999a71bbe81f',
	// 	displayName: 'Small_Talk_repetitions_3333',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: '0e19fdee-d061-4121-b0c6-19bcd2be320e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'you are repeating yourself' }],
	// 		},
	// 		{
	// 			name: '8523e1d9-e656-4652-bdd2-d5364eca3ce7',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'you said that already' }],
	// 		},
	// 		{
	// 			name: 'd9fb5b7e-2872-42a8-91cf-237b70037f30',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'you already said that' }],
	// 		},
	// 	],
	// 	messages: [{ text: {} }],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/926bfae3-d0ee-4d06-9d78-c61974fdca4e',
	// 	displayName: 'MIT',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/mit'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'd8c5eb55-8626-4d96-8ce2-e74e052bb091',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'why?', entityType: '@sys.any', alias: 'any', userDefined: true }],
	// 		},
	// 		{ name: '7b0b3fd4-a480-4405-b984-67c4c6718f6f', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: 'a9eb0a36-f777-41a8-9ad7-310bbe891e7a', type: 'EXAMPLE', parts: [{ text: 'no idea' }] },
	// 		{ name: '7f4341b8-f048-4419-85c9-71af11cf0cd2', type: 'EXAMPLE', parts: [{ text: 'good question' }] },
	// 		{
	// 			name: 'b9f3f6e0-1097-479f-b762-7c74ee94e194',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'great question', entityType: '@sys.any', alias: 'any', userDefined: true }],
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '07255462-7793-4a06-90d1-566f423cf565',
	// 			displayName: 'any',
	// 			value: '$any',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'MIT Tech Review is clear: “Predictive policing algorithms are racist. They need to be dismantled.',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'Lack of transparency and biased training data mean these tools are not fit for purpose. If we can’t fix them, we should ditch them.”',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['Maybe we should quote this, what do you think?'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/94f3b9d0-304d-4c8e-9773-62fa6bc2d953',
	// 	displayName: 'Emojis',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{ name: 'fbd28cc2-94c3-4f8e-bd24-e8c5fc3bf483', type: 'EXAMPLE', parts: [{ text: 'thumbs up' }] },
	// 		{ name: '8994859a-5e92-4398-9e3d-0940bcf36465', type: 'EXAMPLE', parts: [{ text: '😉' }] },
	// 		{ name: 'd032ed7e-a6f6-4a64-bf99-ca9563aa1c5e', type: 'EXAMPLE', parts: [{ text: '☹' }] },
	// 		{ name: '07a5c74c-e373-45aa-aa73-357170094521', type: 'EXAMPLE', parts: [{ text: '☺)' }] },
	// 		{ name: '5e110f5b-e21f-4dee-bdb7-2759ae817337', type: 'EXAMPLE', parts: [{ text: '☺' }] },
	// 	],
	// 	messages: [{ text: { text: [':)'] } }],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/95948d25-f9a9-452b-a3c9-87e374147705',
	// 	displayName: 'Fallback.topic.followup',
	// 	priority: 500000,
	// 	isFallback: true,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Topic-followup'],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion1', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{ text: { text: ['I was very impressed when I realized that predictive algorithms are all over,'] } },
	// 		{ text: { text: ['from recommendations on Youtube and Netflix to the police and the criminal justice,'] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					'But can we really trust an algorithm to make predictions for the police? Are those algorithms fair?',
	// 				],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/9bdcc47d-7c37-4eac-86fe-e6ba12f8d7d5',
	// 	displayName: 'Move.on.bias.police',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/move-on-police-bias'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'c3dc0a5d-40ca-40f8-8e56-e622313fb0f6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "please, let's move one" }],
	// 		},
	// 		{
	// 			name: '395b0738-38fa-4b60-ba95-e78fc5e4eb33',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yes, i'd love to move on" }],
	// 		},
	// 		{
	// 			name: '08c4e541-8057-426b-9269-516ed094d568',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "great idea, let's move on to something else" }],
	// 		},
	// 		{ name: '68d85432-34b0-4695-ac7d-6eeaef9da90a', type: 'EXAMPLE', parts: [{ text: "let's do it" }] },
	// 		{ name: '2f3f17ea-df3f-4a67-a231-c26d0ba9362e', type: 'EXAMPLE', parts: [{ text: 'hell yeah' }] },
	// 		{ name: 'd3ef57f2-800a-40bb-a12a-419602ae77a0', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: 'dc63d69f-bef8-4a9a-b61f-3febc5db6f2e', type: 'EXAMPLE', parts: [{ text: 'yes' }] },
	// 		{
	// 			name: '1ff9f90e-1634-4100-b686-e1da340c4998',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '994381d4-c1b2-44ff-ae87-52638dec21bd',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "let's move to the next step" }],
	// 		},
	// 		{ name: 'b250248f-2949-4eb8-8172-1deb59acdc82', type: 'EXAMPLE', parts: [{ text: "let's go" }] },
	// 		{
	// 			name: '46d76bec-e65b-413a-9a2e-a6cbbe7a24ad',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "let's just move on to the next step" }],
	// 		},
	// 		{
	// 			name: '4648421e-4997-427b-bd4d-a28634b27d01',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'i ' },
	// 				{ text: 'believe', entityType: '@sys.ignore' },
	// 				{ text: " it's better if we move on" },
	// 			],
	// 		},
	// 		{
	// 			name: '647769d7-2129-4181-a807-65117700ab27',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i think we should move on with our research' }],
	// 		},
	// 		{ name: 'e5d18be6-6b6c-4c48-9646-9eba572d9763', type: 'EXAMPLE', parts: [{ text: "let's advance" }] },
	// 		{ name: '69b87adf-012b-4a9b-9320-7c442eff3aa2', type: 'EXAMPLE', parts: [{ text: 'move on' }] },
	// 		{ name: 'd030140c-181b-45d8-b6e4-cdb52c381397', type: 'EXAMPLE', parts: [{ text: "let's move on" }] },
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/police-bias-problem',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Many studies are finding that predictive police algorithms target already over-policed communities,',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['How should we address this issue ?'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/9ce904f9-b4ac-4e3c-818e-c5aa404c8f98',
	// 	displayName: 'Default Welcome Intent',
	// 	priority: 500000,
	// 	events: ['WELCOME'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '86ca4d59-299f-45c8-b535-6a0a7d5b015d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'just going to say hi' }],
	// 		},
	// 		{ name: '3d5a98b1-faff-4bc3-831a-ea483a27e97b', type: 'EXAMPLE', parts: [{ text: 'heya' }] },
	// 		{ name: '9e2c11a5-c737-4ed1-865e-d83d12c5db42', type: 'EXAMPLE', parts: [{ text: 'hello hi' }] },
	// 		{ name: '9a6b0676-8a3c-41ca-bb40-9921f47d3c29', type: 'EXAMPLE', parts: [{ text: 'howdy' }] },
	// 		{ name: '1277b465-d8a6-417f-8676-d8d64985f484', type: 'EXAMPLE', parts: [{ text: 'hey there' }] },
	// 		{
	// 			name: '41383552-fa91-4c43-b3aa-8a0ac32511c0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'hi there' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'b812787e-b946-443a-99b7-863bc0261fd2', type: 'EXAMPLE', parts: [{ text: 'greetings' }] },
	// 		{ name: '15ed79c3-5861-4c7a-8eeb-4d92e7a3d0ea', type: 'EXAMPLE', parts: [{ text: 'hey' }] },
	// 		{ name: 'e0a5208b-10f6-41dd-838c-8835959c5ba8', type: 'EXAMPLE', parts: [{ text: 'long time no see' }] },
	// 		{ name: 'a92a4210-70f0-4e0c-a426-9df7b451090e', type: 'EXAMPLE', parts: [{ text: 'hello' }] },
	// 		{ name: '8af4cad5-6324-449e-bce6-6606aa8f6b63', type: 'EXAMPLE', parts: [{ text: "lovely day isn't it" }] },
	// 		{ name: '2bf70a39-3043-4345-ac98-95fa755aade6', type: 'EXAMPLE', parts: [{ text: 'I greet you' }] },
	// 		{ name: '66b2a32b-c6f6-4982-a870-1f160bd5d15b', type: 'EXAMPLE', parts: [{ text: 'hello again' }] },
	// 		{ name: '6a8fc0f7-03f0-4c3e-bd37-55ef391a027e', type: 'EXAMPLE', parts: [{ text: 'hi' }] },
	// 		{ name: 'c1ac5c83-8140-4840-8ac2-4f257a66a90d', type: 'EXAMPLE', parts: [{ text: 'hello there' }] },
	// 		{ name: '09d5a8c4-adfb-40d8-8a58-6c3ea64c0da9', type: 'EXAMPLE', parts: [{ text: 'a good day' }] },
	// 	],
	// 	action: 'input.welcome',
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Hi! How are you doing?',
	// 					'Hello! How can I help you?',
	// 					'Good day! What can I do for you today?',
	// 					'Greetings! How can I assist?',
	// 				],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/9e1885c9-f1f4-4827-aa50-994a2b48c325',
	// 	displayName: 'fallback.understanding.the.problem',
	// 	priority: 500000,
	// 	isFallback: true,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/understanding_the_problem'],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/minority-report', lifespanCount: 1 },
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Definitionfollow-up-followup',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					"I'm not sure I got that, do you agree that a predictive algorithm is a scoring system that uses past data to predict events?",
	// 				],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/a2b70e1b-56ae-406d-b3c8-17a17cd8e765',
	// 	displayName: 'Intro.feeling.badly_2',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/intro'],
	// 	trainingPhrases: [
	// 		{ name: '392cf53d-363e-4e59-842d-097973a1413e', type: 'EXAMPLE', parts: [{ text: 'frustrated' }] },
	// 		{
	// 			name: 'b8bf5838-164f-4252-8351-8ef75f3633a4',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm really frustaded " }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'c81a425a-3b95-4edd-9ff5-f9e047d2fb6f', type: 'EXAMPLE', parts: [{ text: "i'm doing like shit" }] },
	// 		{ name: '5e3ae1b6-be23-43bf-9347-d3a9370f7be6', type: 'EXAMPLE', parts: [{ text: 'everything sucks' }] },
	// 		{ name: '4f3da08b-3724-4a97-af4c-f6104bab2918', type: 'EXAMPLE', parts: [{ text: 'things are horrible' }] },
	// 		{
	// 			name: '9233971d-1518-4854-818f-8c5b80e3e8a4',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'actually not good at all' }],
	// 		},
	// 		{ name: '4750ecc4-7760-43b5-be76-76fb53fba659', type: 'EXAMPLE', parts: [{ text: 'terrible' }] },
	// 		{
	// 			name: 'f0e6a1dc-37f3-4403-beb9-1e492e2d8bd3',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "I'" },
	// 				{ text: 'm', entityType: '@sys.ignore' },
	// 				{ text: ' feeling ' },
	// 				{ text: 'bad', entityType: '@sys.ignore' },
	// 			],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Introfeelingbad-followup',
	// 			lifespanCount: 2,
	// 		},
	// 	],
	// 	messages: [{ text: {} }],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/a8f62f58-24e9-47b8-b137-959495fd4250',
	// 	displayName: 'Fallback.intro',
	// 	priority: 500000,
	// 	isFallback: true,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/fallback-intro'],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/topic', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{ text: { text: ['I’m very excited to collaborate and share with you the research material'] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					'We can chat here, and I’ll show you some video clips on the left side of the screen, alright?',
	// 				],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/a9b81406-0290-49c9-9eb1-9908f6be8c7c',
	// 	displayName: 'Getname.catchall. - no',
	// 	priority: 500000,
	// 	inputContextNames: [
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/name',
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/Getnamecatchall-followup',
	// 	],
	// 	trainingPhrases: [
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'Getnamecatchall.Getnamecatchall-no',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/getname', lifespanCount: 1 },
	// 	],
	// 	messages: [{ text: { text: ['No problem, can you repeat your name?'] } }],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b7d09cda-89e0-4bb2-a6dc-07a0a473fb80',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b7d09cda-89e0-4bb2-a6dc-07a0a473fb80',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/acfd32a7-f87e-495b-acbb-f7e86905501b',
	// 	displayName: 'Default Fallback Intent',
	// 	priority: 500000,
	// 	isFallback: true,
	// 	action: 'input.unknown',
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Would you like to choose a subject, like probability, sport, artificial intelligence or physics?',
	// 					'I missed what you said. What was that?',
	// 					'Sorry, could you say that again?',
	// 					'Sorry, can you say that again?',
	// 					'Can you say that again?',
	// 					"Sorry, I didn't get that. Can you rephrase?",
	// 					'Sorry, what was that?',
	// 					'One more time?',
	// 					'What was that?',
	// 					'Say that one more time?',
	// 					"I didn't get that. Can you repeat?",
	// 					'I missed that, say that again?',
	// 				],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/ad3f4817-5dba-42ad-8da7-6699a984e0ad',
	// 	displayName: 'Intro',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/intro'],
	// 	trainingPhrases: [
	// 		{ name: '0cdeb220-2571-4cc0-859d-bf525f04ecc4', type: 'EXAMPLE', parts: [{ text: 'excellent' }] },
	// 		{ name: 'b66d6dff-15a4-4a87-bded-baa881e65473', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{ name: '437d64f8-e75a-41b6-865f-3c55466225e7', type: 'EXAMPLE', parts: [{ text: 'yes' }] },
	// 		{ name: '51d09062-bdce-496e-a357-e88747f5acc3', type: 'EXAMPLE', parts: [{ text: 'sure' }] },
	// 		{ name: 'd561c210-d045-4d56-b407-5077e534828e', type: 'EXAMPLE', parts: [{ text: 'great and you?' }] },
	// 		{ name: 'b2c6265f-c3ce-4328-999d-c32a7b18c293', type: 'EXAMPLE', parts: [{ text: 'great' }] },
	// 		{ name: 'c0ba4d6b-85ba-4b40-b004-ad95544eb067', type: 'EXAMPLE', parts: [{ text: 'cool' }] },
	// 		{ name: 'eaf3c105-cb93-4fb3-ad3d-fd0831470700', type: 'EXAMPLE', parts: [{ text: 'hanging in there' }] },
	// 		{
	// 			name: 'ece1d796-52ac-47b1-8ad6-6824bf8a65fc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm well, thank you. And you?" }],
	// 		},
	// 		{ name: 'e55b6659-ba8b-417f-a3e2-7d5eba9cab55', type: 'EXAMPLE', parts: [{ text: 'doing great' }] },
	// 		{ name: 'baaf208a-ad49-41b3-91f6-92ed9cefc519', type: 'EXAMPLE', parts: [{ text: 'going great' }] },
	// 		{ name: '8e07dc1a-55b1-45c2-9dfa-1223ead26edc', type: 'EXAMPLE', parts: [{ text: 'So far, so good!' }] },
	// 		{ name: '5d4ac778-4864-4925-817e-83f55be5edfa', type: 'EXAMPLE', parts: [{ text: 'Nothing much' }] },
	// 		{
	// 			name: '6c2e280f-0c88-484c-b74e-edb4f4fd041d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Just the same old same old' }],
	// 		},
	// 		{ name: '5099562f-58d8-4a92-9229-69675535313e', type: 'EXAMPLE', parts: [{ text: 'Very well, thanks' }] },
	// 		{
	// 			name: 'b2275534-bd0e-4141-a146-f87a1f8e3374',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'pretty good, and you?' }],
	// 		},
	// 		{
	// 			name: '30e2e0ee-981b-4b04-81c8-18ada395b206',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'hanging on, how about you?' }],
	// 		},
	// 		{
	// 			name: '9bdbaa38-96c5-4f6c-97e1-395d7b4cf589',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i'm all right and you?" }],
	// 		},
	// 		{
	// 			name: '918b843f-7cd1-4385-a871-bfcf58f8b476',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'alright considering current conditions' }],
	// 		},
	// 		{
	// 			name: '88c3b792-50af-4d39-8807-90ade72dfd00',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not bad in this context' }],
	// 		},
	// 		{
	// 			name: 'ac3fdcda-ecd8-4726-8d93-9cd79168d35b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'ok considering everything' }],
	// 		},
	// 		{
	// 			name: 'c3d2d195-f4b1-4421-9315-1749ff75d2eb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "can't wait to work with you jana" }],
	// 		},
	// 		{
	// 			name: 'e4bfe07f-b2ba-4966-a31a-912bc3966f64',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "can't wait to start collaborating" }],
	// 		},
	// 		{
	// 			name: '52786c6d-17e8-4a49-99a8-2ba1d5a1cdba',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'super excited with the new job' }],
	// 		},
	// 		{
	// 			name: '24b052e3-dc3d-4d76-b94d-e5af693c9627',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'very excited to be here' }],
	// 		},
	// 		{ name: '272b48a3-86e7-4723-9754-afd5eee186e3', type: 'EXAMPLE', parts: [{ text: 'could be worse' }] },
	// 		{
	// 			name: 'a951a2aa-3efb-48e2-91b2-8ef21c11a089',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'So much better now that you are with me' }],
	// 		},
	// 		{
	// 			name: '609e8f03-d3a0-4048-8c32-83a2a5631edf',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'If I had a tail, I would wag it! (Wriggle your hips)' }],
	// 		},
	// 		{
	// 			name: '0fba58e3-873f-4c6b-9354-af9ca85e5297',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "Can't complain…I have tried, but no one listens." }],
	// 		},
	// 		{
	// 			name: '621f330d-7007-4bc6-b026-543420bdc357',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Somewhere between better and best.' }],
	// 		},
	// 		{ name: 'ca299fc5-03fd-49f1-9c59-396fe166b9f9', type: 'EXAMPLE', parts: [{ text: 'all right' }] },
	// 		{ name: '2ad0e318-a577-4d69-a61e-dbd48adcecbc', type: 'EXAMPLE', parts: [{ text: 'not bat, and you' }] },
	// 		{
	// 			name: '4ac37459-b084-42c8-a593-a4596c993bea',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not bad. how about you?' }],
	// 		},
	// 		{ name: 'b18bc837-e79f-4a5c-b349-9d0db549f853', type: 'EXAMPLE', parts: [{ text: 'terrific' }] },
	// 		{
	// 			name: 'ff3d4f8e-c741-4395-b8bf-cdd23161465f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'im doing amazing, what about you?' }],
	// 		},
	// 		{ name: '91cc3012-84fb-4af5-8683-7c1c7c8cd133', type: 'EXAMPLE', parts: [{ text: 'fantastic and you' }] },
	// 		{ name: 'e74e792f-0a82-4e18-946a-245943533966', type: 'EXAMPLE', parts: [{ text: 'glad to meet' }] },
	// 		{
	// 			name: '47409af1-439a-4ac8-989a-c2ecfeca9cac',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i'm very happy to join the team" }],
	// 		},
	// 		{
	// 			name: '862d5e6a-c05c-4d1d-85dc-407762ab9fe6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'im super excited to begin this new job' }],
	// 		},
	// 		{ name: 'cc254dd7-e6ce-4277-a350-bf07b1523ce5', type: 'EXAMPLE', parts: [{ text: 'ok great to see you' }] },
	// 		{
	// 			name: '8580dfce-6379-4897-b001-08d987093928',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'likewise, great to meet' }],
	// 		},
	// 		{
	// 			name: '4fb24282-e899-467e-9f6a-a4dabe99174a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'pleasure to meet, jana iM ok' }],
	// 		},
	// 		{ name: '47dc2a2a-bcf4-4dc7-9d0e-3aba00136f19', type: 'EXAMPLE', parts: [{ text: 'nice to meet you' }] },
	// 		{ name: '5e5a7aa8-f0de-4c98-b669-2528878b6de3', type: 'EXAMPLE', parts: [{ text: 'glad to meet you' }] },
	// 		{
	// 			name: 'a6f86009-3faf-4716-8fe5-c53e063df55d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I' }, { text: '1m', entityType: '@sys.ignore' }, { text: ' fine, thanks, and you^' }],
	// 		},
	// 		{ name: 'd7b3b1f8-49c1-423d-a66e-63340c751ba7', type: 'EXAMPLE', parts: [{ text: 'likewise :)' }] },
	// 		{
	// 			name: '80b02f27-263b-4b29-a109-9282df2caccf',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'great, so what are we up to?' }],
	// 		},
	// 		{ name: '81fc8489-da25-4610-b855-fb15e79b5251', type: 'EXAMPLE', parts: [{ text: 'im good, and you?' }] },
	// 		{
	// 			name: '503338db-fb35-4de0-8390-976984dc8166',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm good. how ae you?" }],
	// 		},
	// 		{ name: '919b5887-429e-4631-a5d1-2c2e49ee474a', type: 'EXAMPLE', parts: [{ text: 'life is good' }] },
	// 		{ name: '92134a22-8211-4e31-8dc9-6be3b44a1139', type: 'EXAMPLE', parts: [{ text: 'doing well' }] },
	// 		{ name: 'eeb0406a-bd62-4f6c-9cb6-3b0cfd7478a3', type: 'EXAMPLE', parts: [{ text: 'doing ok' }] },
	// 		{
	// 			name: '1c086bbe-c1d2-45df-9028-4a74c1860fbf',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Doing fine, and you?' }],
	// 		},
	// 		{
	// 			name: '3d2d3228-a681-4eb7-b147-ce05bf6f56c5',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm fine, maybe a little tired. I need some more coffee." }],
	// 		},
	// 		{
	// 			name: '35a5dc5a-03e7-4db5-aa81-e0a71608f653',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'good under the circumstances' }],
	// 		},
	// 		{
	// 			name: '41a2cc36-ff91-4f31-9e61-ba899f189e90',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "Fine, thanks. It's a beautiful day" }],
	// 		},
	// 		{
	// 			name: '43d3d84e-14da-4828-a242-f6392d2d076f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm good, thanks. And you?" }],
	// 		},
	// 		{
	// 			name: '7ebfe975-825a-42e1-90c9-00da0098d60d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Fine, thanks. How are you?' }],
	// 		},
	// 		{
	// 			name: 'bbb8c34a-796c-4079-87d9-869853e47b2e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Good, thanks, and you?' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '42f2a6e2-4c37-4a8a-bc51-f65c1ba7d058',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Great, thank you. How are you?' }],
	// 		},
	// 		{ name: '1cd8c3b9-ae10-42b8-b26b-b17a2a4b2a57', type: 'EXAMPLE', parts: [{ text: 'ok' }] },
	// 		{ name: 'a65731b6-1200-428e-8f83-e1c08576e9cc', type: 'EXAMPLE', parts: [{ text: 'thanks for asking' }] },
	// 		{
	// 			name: 'e062b872-8d82-4baa-a7bc-30bc4ec54ebf',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thank you for asking' }],
	// 		},
	// 		{ name: '8e8b9710-3341-475f-8e16-3949a350544a', type: 'EXAMPLE', parts: [{ text: 'a little nervous' }] },
	// 		{
	// 			name: 'b9bfc4c9-18b9-429a-bb8f-bbfc1a7be24f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i am feeling ok but a little nervous' }],
	// 		},
	// 		{ name: '3c189870-0709-4132-80d7-e0e70eb90024', type: 'EXAMPLE', parts: [{ text: "what's up?" }] },
	// 		{ name: 'b8c4e1c6-3238-4d4d-92a2-4883bc8be282', type: 'EXAMPLE', parts: [{ text: 'what about you?' }] },
	// 		{ name: '5fde0c65-dae0-480d-adc2-e1559df027b3', type: 'EXAMPLE', parts: [{ text: 'feeling ok' }] },
	// 		{ name: '6d8c6111-b7a3-4390-8d49-d08b0438d86a', type: 'EXAMPLE', parts: [{ text: 'fine' }] },
	// 		{ name: '89bf1977-f8b2-4ee1-9e87-bebe6f5eb1b8', type: 'EXAMPLE', parts: [{ text: "I'm doing well" }] },
	// 		{ name: '86d86335-f0cd-4cf8-bd94-49c6f92cec34', type: 'EXAMPLE', parts: [{ text: 'good' }] },
	// 		{ name: 'c57f8bf8-3941-4ebf-8cf0-df49284c68c7', type: 'EXAMPLE', parts: [{ text: 'happy, and you?' }] },
	// 		{ name: '93e24625-d199-4f93-8f17-f8159d024d6f', type: 'EXAMPLE', parts: [{ text: 'just happy, you?' }] },
	// 		{ name: '695d15e7-d1f1-49c5-969b-9e818525a36e', type: 'EXAMPLE', parts: [{ text: 'how are you?' }] },
	// 		{
	// 			name: 'e8d27d9d-8178-4952-8d5b-6ee1466f9eda',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm " }, { text: 'ok', entityType: '@sys.ignore', userDefined: true }],
	// 		},
	// 		{
	// 			name: '120a24b7-5cfa-42d8-88a3-856ff61ceea5',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not sure', entityType: '@sys.ignore', userDefined: true }],
	// 		},
	// 		{
	// 			name: '949cdafd-513a-4116-91a8-f632e074dcf1',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I ' }, { text: 'don', entityType: '@sys.ignore' }, { text: "'t know" }],
	// 		},
	// 		{
	// 			name: '31396095-e536-4089-a2bf-ebbce92b0d79',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'" }, { text: 'm', entityType: '@sys.ignore' }, { text: ' very well' }],
	// 		},
	// 		{
	// 			name: 'c1732e29-c45e-4629-90b6-ca525d8c0677',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'" }, { text: 'm', entityType: '@sys.ignore' }, { text: ' feeling great!' }],
	// 		},
	// 		{
	// 			name: 'bb302c28-a1ce-4bfd-8617-f3d069d5bf8c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'curious', entityType: '@sys.ignore', userDefined: true }],
	// 		},
	// 		{ name: '96f87692-5288-4b98-83aa-dbad2cf3e76d', type: 'EXAMPLE', parts: [{ text: 'anxious' }] },
	// 		{ name: 'e4a70643-7455-4789-911e-72f618e92124', type: 'EXAMPLE', parts: [{ text: 'nervous' }] },
	// 		{ name: '5dd58c53-8338-433b-8126-cccf8dab135a', type: 'EXAMPLE', parts: [{ text: 'enthusiatic' }] },
	// 		{ name: '63440bcc-8737-47bb-b882-d15537fb3f36', type: 'EXAMPLE', parts: [{ text: 'excited' }] },
	// 		{
	// 			name: '352059fa-811f-439a-850a-c8987f82ae90',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not bad', entityType: '@sys.ignore' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/topic', lifespanCount: 1 },
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/fallback-intro', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{ text: { text: ['I’m very excited to collaborate and share with you the research material'] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					'We can chat here, and I’ll show you some video clips on the left side of the screen, alright?',
	// 				],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/adb1cc35-83da-477d-8c82-1184ceceba8a',
	// 	displayName: 'Favorite.color',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: '5b4dda02-2212-4ee2-b7fc-b0a9b1798b05',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what color do you like the most?' }],
	// 		},
	// 		{ name: '906e6418-2af5-4e8f-af53-e00a4e2f8119', type: 'EXAMPLE', parts: [{ text: "what's your color?" }] },
	// 		{
	// 			name: '31e72b1b-15f5-4778-9092-bf5c1f9b1633',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what color is your fave?' }],
	// 		},
	// 		{
	// 			name: '2378c57c-12a8-49b8-85e1-f4f03e754b9d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what is your favorite color?' }],
	// 		},
	// 	],
	// 	messages: [{ text: { text: ['my favorite color is red! ;)'] } }],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/b25ffc3d-b1fd-4729-ba64-d0185f85b444',
	// 	displayName: 'video.not.working',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/video-not-working'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'b12b9cca-6a7b-4941-b586-a9660712c40c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'problem playing the video' }],
	// 		},
	// 		{
	// 			name: '13a7a807-0610-4063-b5b2-3b152f7c8ecf',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "there's a problem with the video" }],
	// 		},
	// 		{
	// 			name: '3c2a8e7b-743f-4ddd-b4a5-24fa93fd16cc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'image is not showing' }],
	// 		},
	// 		{ name: 'ca6567f2-0ed3-451a-9e69-db7385364ca9', type: 'EXAMPLE', parts: [{ text: 'broken video' }] },
	// 		{ name: 'ad2609f0-9bf0-4a6d-b7f5-94ad5dfe5c70', type: 'EXAMPLE', parts: [{ text: 'video is broken' }] },
	// 		{ name: '698bff81-a6b2-47da-9ca8-d4b4db3ecf5f', type: 'EXAMPLE', parts: [{ text: "where's the video?" }] },
	// 		{ name: '01edc7f7-91fa-40ac-a242-b0e2f662df9b', type: 'EXAMPLE', parts: [{ text: 'video does not work' }] },
	// 		{ name: 'c01f75ca-c3e3-4505-a2b6-d6b305646cc0', type: 'EXAMPLE', parts: [{ text: "can't see the video" }] },
	// 		{
	// 			name: 'ccb2adbc-29fe-4a76-a6d8-aa9aa186bae8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i can't see the video" }],
	// 		},
	// 		{
	// 			name: 'c1c73c9f-c880-4969-85ef-b4a4467e51ea',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'video is not playing' }],
	// 		},
	// 		{
	// 			name: 'cef289d7-5845-4904-b526-8bc26b74459e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'the video is not working' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/videonotworking-followup',
	// 			lifespanCount: 2,
	// 		},
	// 	],
	// 	messages: [
	// 		{ text: { text: ['oh, sorry! how about this video, is it working?'] } },
	// 		{ payload: { type: 'tag', source: ['predictive police'] } },
	// 	],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/6b17e3ab-1246-4eaf-8d29-b9096ff9991a',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b25ffc3d-b1fd-4729-ba64-d0185f85b444',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/dc13a7b3-e8f0-49a0-95a1-fcc8ec5a8ef6',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b25ffc3d-b1fd-4729-ba64-d0185f85b444',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/b2a02a20-cf43-404f-a272-b4da632b3de0',
	// 	displayName: 'Test2',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: '9e5adb68-ad8f-4ee5-a0d2-38388834f47f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what does an algoritm?' }],
	// 		},
	// 		{
	// 			name: '29bf2104-c8b9-47c5-a862-37603546c677',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'how do algorithms work?' }],
	// 		},
	// 		{
	// 			name: '334c824c-cdce-44b7-b613-93b2e7e76916',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'tell me what is a predictive algoritm' }],
	// 		},
	// 		{
	// 			name: 'aff8538e-8a06-4c0c-bbe7-9474b95d76af',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'how do you describe an algorithm?' }],
	// 		},
	// 		{ name: 'ccc50e99-5ecd-4551-b3c2-849f77520bc7', type: 'EXAMPLE', parts: [{ text: 'Define algorithm' }] },
	// 		{
	// 			name: 'ff960df2-49a7-42ef-a2f6-e06e95941734',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What is an algorithm?' }],
	// 		},
	// 		{
	// 			name: '59f1669b-9315-430d-8952-2d511eaef05c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What is the definition of predictive algorithms?' }],
	// 		},
	// 		{
	// 			name: '5a34d7a4-8e2b-45bc-a1da-e28586c0f1aa',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Define predictive algorithm' }],
	// 		},
	// 		{
	// 			name: 'fc1f2d41-e4fd-43a4-ad91-768b8bc640b0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'How do you describe a predictive algorithm?' }],
	// 		},
	// 		{
	// 			name: '46255356-ff43-4ea0-98f2-0b97e848907f',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'Can you define ' },
	// 				{ text: 'predictive', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'algorithms', entityType: '@sys.ignore' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 		{
	// 			name: 'b4cb0473-1aba-4700-b279-38216bedea15',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'What is a ' },
	// 				{ text: 'predictive', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'algorithm', entityType: '@sys.ignore' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/comment_video1', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'If I understood correctly, a predictive algorithm is a scoring system that uses past data to predict events.',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ["There's a great video about this. Let me know what you think."] } },
	// 		{ payload: { type: 'tag', source: ['general def'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/b2c8e53f-1152-45c2-8d16-ca08bfe416be',
	// 	displayName: 'Intro.feeling.badly_3',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/intro'],
	// 	trainingPhrases: [
	// 		{ name: '392cf53d-363e-4e59-842d-097973a1413e', type: 'EXAMPLE', parts: [{ text: 'frustrated' }] },
	// 		{
	// 			name: 'b8bf5838-164f-4252-8351-8ef75f3633a4',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm really frustaded " }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'c81a425a-3b95-4edd-9ff5-f9e047d2fb6f', type: 'EXAMPLE', parts: [{ text: "i'm doing like shit" }] },
	// 		{ name: '5e3ae1b6-be23-43bf-9347-d3a9370f7be6', type: 'EXAMPLE', parts: [{ text: 'everything sucks' }] },
	// 		{ name: '4f3da08b-3724-4a97-af4c-f6104bab2918', type: 'EXAMPLE', parts: [{ text: 'things are horrible' }] },
	// 		{
	// 			name: '9233971d-1518-4854-818f-8c5b80e3e8a4',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'actually not good at all' }],
	// 		},
	// 		{ name: '4750ecc4-7760-43b5-be76-76fb53fba659', type: 'EXAMPLE', parts: [{ text: 'terrible' }] },
	// 		{
	// 			name: 'f0e6a1dc-37f3-4403-beb9-1e492e2d8bd3',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "I'" },
	// 				{ text: 'm', entityType: '@sys.ignore' },
	// 				{ text: ' feeling ' },
	// 				{ text: 'bad', entityType: '@sys.ignore' },
	// 			],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Introfeelingbad-followup',
	// 			lifespanCount: 2,
	// 		},
	// 	],
	// 	messages: [{ text: {} }],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/b2f1022a-32fa-4f99-960a-72d601753248',
	// 	displayName: 'probability_1 - yes',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/probability_1-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '97d663ea-e778-4103-85ba-b72eb384235c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '3d969b46-5af0-4460-86aa-1493742a671d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay I will' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'dc50f584-48a2-4a9e-b466-c36fd82be0d5', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
	// 		{ name: 'e2569827-02c3-4f5b-a18b-7f06b31c257b', type: 'EXAMPLE', parts: [{ text: "yes that's alright" }] },
	// 		{ name: 'a79976af-fda6-4b49-93fa-0ecc2943e8aa', type: 'EXAMPLE', parts: [{ text: 'yes I do' }] },
	// 		{
	// 			name: '249f34d6-f125-43a0-93a7-58527ef3f5b0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'exactly' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'b6439360-7fb2-4cb1-9985-c8bfcde60907', type: 'EXAMPLE', parts: [{ text: 'of course' }] },
	// 		{ name: 'b8b31cbd-4692-48e0-b374-d4f5192c2a81', type: 'EXAMPLE', parts: [{ text: "yep that's ok" }] },
	// 		{
	// 			name: '3628957b-dd16-486c-a3ef-80a3f72740bb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'a5e473f6-565b-4789-8c6a-29f0b0c9f3cc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'ok' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '171b1132-b57b-46c7-aa67-aae6128efd27', type: 'EXAMPLE', parts: [{ text: 'for sure' }] },
	// 		{ name: '816aa447-b2d1-4af4-972b-e8e00f1fd922', type: 'EXAMPLE', parts: [{ text: 'sg' }] },
	// 		{ name: 'b038688b-9a56-447d-b10c-e6fb1cdb94df', type: 'EXAMPLE', parts: [{ text: "yes that't ok" }] },
	// 		{
	// 			name: '6589c00b-0823-4efb-9a6f-2dbd66750f9e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I agree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '4d4d7733-2def-42f8-bbbe-4752f644ee71', type: 'EXAMPLE', parts: [{ text: 'yes you can do it' }] },
	// 		{
	// 			name: '1939c0ee-31fb-4276-8ca4-3af2380b8129',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't mind" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'fbee78b3-5bd1-4130-afaa-d612dca19612', type: 'EXAMPLE', parts: [{ text: 'that one works' }] },
	// 		{ name: '05ecdd97-d862-4b66-9e8c-b8510293acb8', type: 'EXAMPLE', parts: [{ text: 'that works' }] },
	// 		{ name: 'dae30ec0-d014-402e-beee-efc2a4e696ae', type: 'EXAMPLE', parts: [{ text: 'sure why not' }] },
	// 		{ name: 'c049396c-cf7a-44b8-a9ac-a6e24e7b1489', type: 'EXAMPLE', parts: [{ text: 'perfect' }] },
	// 		{
	// 			name: '388d57ce-abff-41d5-9d76-445b600042b0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yep that's right" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'af9bb8a3-8c8b-4e5b-8436-984aab910f3b', type: 'EXAMPLE', parts: [{ text: 'I think so' }] },
	// 		{
	// 			name: 'ef6b28d1-f5b4-4445-a5e3-cbe5eece6866',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes I agree' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'dd78fad7-7876-4290-a65c-4f7397c4a07f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: '3601d522-9526-4877-a171-995e2e96cc7a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sounds correct' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'e63d568f-8543-4b82-81bc-3fd95706b5a4', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
	// 		{ name: '6f76ba21-c89f-4ac3-b7f2-bb6cb961159d', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
	// 		{
	// 			name: '5757159e-67af-4bbb-8ea4-77ecfec93f9a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'go ahead' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'f698435b-8445-4cd1-b814-f83559b7f79a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'do it' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'be8c5720-b711-44c9-9403-a43de8ad6dd9', type: 'EXAMPLE', parts: [{ text: "it's fine" }] },
	// 		{ name: '9aec598b-e57d-4311-9371-3de3fc9d2e4b', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: '0f4260d2-0813-4017-859c-3b0f13f5b87c', type: 'EXAMPLE', parts: [{ text: 'yes please' }] },
	// 		{ name: 'a8ca9188-0650-4155-bf13-c537d61a849e', type: 'EXAMPLE', parts: [{ text: "it's okay" }] },
	// 		{ name: '05bdcacf-a044-452b-b93e-d23e026be6a4', type: 'EXAMPLE', parts: [{ text: 'alright why not' }] },
	// 		{ name: '343d4b30-ba07-46f1-8abe-d5a0dea0abd9', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: '4366721b-6417-4d28-8144-47b04be21040', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: 'f2bf2168-ab3d-40ee-ac15-e3dbfec0a7c6', type: 'EXAMPLE', parts: [{ text: 'it looks perfect' }] },
	// 		{ name: '8d963613-f1ac-4653-8b66-76624f1b3c3d', type: 'EXAMPLE', parts: [{ text: 'yes I can' }] },
	// 		{ name: 'f63d5848-7661-41a5-bc21-b775e9765a37', type: 'EXAMPLE', parts: [{ text: 'yup' }] },
	// 		{ name: '52f897f0-d8d8-4239-893f-d611accff372', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: 'a2f3eb2f-6d7d-43a8-b5c4-477bc77c5b0c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'confirm' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'eb7baba9-522a-4414-ad12-d4e079738f38',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'absolutely' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	action: 'probability_1.probability_1-yes',
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/probability_1-yes-followup',
	// 			lifespanCount: 2,
	// 		},
	// 	],
	// 	messages: [
	// 		{ text: { text: ["Great! So, here's one question for you:"] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					'Linda is 31 years old, single, outspoken, and very bright. She majored in philosophy. As a student, she was deeply concerned with issues of discrimination and social justice, and also participated in anti-nuclear demonstrations.',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'Which is more probable?\n       1. Linda is a bank teller.\n        2. Linda is a bank teller and is active in the feminist movement.',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/6a19fef2-4c45-4cff-8424-3ad8d01c075b',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/6a19fef2-4c45-4cff-8424-3ad8d01c075b',
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/3b6de9c4-e7a0-4d92-a067-65ae028d8e99',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b2f1022a-32fa-4f99-960a-72d601753248',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/8201a389-26d9-4c36-b0b6-d0b49b103582',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b2f1022a-32fa-4f99-960a-72d601753248',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/b3f6288f-5435-40f7-9fe0-7491b1a2ef55',
	// 	displayName: 'PredPol.bias',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/predpol-bias'],
	// 	trainingPhrases: [
	// 		{ name: '96974eb7-41af-40b0-beba-8f170b85eb50', type: 'EXAMPLE', parts: [{ text: 'very cool' }] },
	// 		{ name: 'bcd2bc10-5a14-4039-b414-17deb771879f', type: 'EXAMPLE', parts: [{ text: "that's it" }] },
	// 		{
	// 			name: '30cbda56-eb8e-470d-a665-986d97a3566d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "that's how you defined it", entityType: '@sys.any', alias: 'any', userDefined: true }],
	// 		},
	// 		{
	// 			name: 'd8ca848c-0274-4f61-9f7d-bc00676bf497',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "that's what we learnt" }],
	// 		},
	// 		{ name: '31bacd9a-23b2-4fb5-9088-159705a3789b', type: 'EXAMPLE', parts: [{ text: 'very well said' }] },
	// 		{
	// 			name: 'fd57c80d-c4de-42ad-9680-4ed6c28b7026',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'it is a scoring system that predicts',
	// 					entityType: '@sys.any',
	// 					alias: 'any',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: 'b6554f73-0e9e-4002-9e03-0117b4837914',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'very good definition' }],
	// 		},
	// 		{ name: 'd7cfdfff-f277-40db-b6db-e10f38e80a2b', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: 'a7b8e45d-1f2f-4472-8899-5524381fb19c', type: 'EXAMPLE', parts: [{ text: 'yah' }] },
	// 		{
	// 			name: 'f1692b17-ce18-42fc-9a97-a762d0eb1a94',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yep', entityType: '@sys.any', alias: 'any', userDefined: true }],
	// 		},
	// 		{
	// 			name: '1df21575-ccb6-4dc4-a03e-f3be932a49a2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'all right', entityType: '@sys.any', alias: 'any', userDefined: true }],
	// 		},
	// 		{
	// 			name: '47b23593-fe8f-42b9-a18a-8c1a9459001f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i think you are right' }],
	// 		},
	// 		{ name: 'c02ea1f6-f539-4387-8a8e-e47419b66ab0', type: 'EXAMPLE', parts: [{ text: 'exactly' }] },
	// 		{
	// 			name: '41046dc8-5c9c-4682-9947-cbe50b7574ff',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'ef58150b-9e21-4fb4-9c30-4e990065abde', type: 'EXAMPLE', parts: [{ text: 'sure' }] },
	// 		{ name: '5107c20b-0bc1-4147-bbb7-7a59196bd590', type: 'EXAMPLE', parts: [{ text: 'agree' }] },
	// 		{ name: '97b46277-887d-42f1-9552-a3841696aee3', type: 'EXAMPLE', parts: [{ text: 'i agrre' }] },
	// 		{ name: '4b787838-5a5d-4e7e-bffa-6df1eb42c1cd', type: 'EXAMPLE', parts: [{ text: 'correct' }] },
	// 		{ name: '712b86c8-7e5e-430d-9d1a-774988c2543c', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/PredPolbias-followup',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: 'a04f3fcc-5f4e-4b34-bbbe-349db68cb5e7',
	// 			displayName: 'any',
	// 			value: '$any',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: ['I guess PredPol fits well the descriptions of predictive algorithms that came up so far:'],
	// 			},
	// 		},
	// 		{ text: { text: ['it’s basically past data + a scoring system, right?'] } },
	// 	],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/e14fdbc6-c795-4eee-9728-737381d7584f',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b3f6288f-5435-40f7-9fe0-7491b1a2ef55',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/f22ff2d4-7e3f-4f12-9fe1-70ead3a81b62',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b3f6288f-5435-40f7-9fe0-7491b1a2ef55',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/b7657493-1db3-4786-8b3c-e02d68551bb8',
	// 	displayName: 'NewIntentName',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: '9e5adb68-ad8f-4ee5-a0d2-38388834f47f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what does an algoritm?' }],
	// 		},
	// 		{
	// 			name: '29bf2104-c8b9-47c5-a862-37603546c677',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'how do algorithms work?' }],
	// 		},
	// 		{
	// 			name: '334c824c-cdce-44b7-b613-93b2e7e76916',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'tell me what is a predictive algoritm' }],
	// 		},
	// 		{
	// 			name: 'aff8538e-8a06-4c0c-bbe7-9474b95d76af',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'how do you describe an algorithm?' }],
	// 		},
	// 		{ name: 'ccc50e99-5ecd-4551-b3c2-849f77520bc7', type: 'EXAMPLE', parts: [{ text: 'Define algorithm' }] },
	// 		{
	// 			name: 'ff960df2-49a7-42ef-a2f6-e06e95941734',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What is an algorithm?' }],
	// 		},
	// 		{
	// 			name: '59f1669b-9315-430d-8952-2d511eaef05c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What is the definition of predictive algorithms?' }],
	// 		},
	// 		{
	// 			name: '5a34d7a4-8e2b-45bc-a1da-e28586c0f1aa',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Define predictive algorithm' }],
	// 		},
	// 		{
	// 			name: 'fc1f2d41-e4fd-43a4-ad91-768b8bc640b0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'How do you describe a predictive algorithm?' }],
	// 		},
	// 		{
	// 			name: '46255356-ff43-4ea0-98f2-0b97e848907f',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'Can you define ' },
	// 				{ text: 'predictive', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'algorithms', entityType: '@sys.ignore' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 		{
	// 			name: 'b4cb0473-1aba-4700-b279-38216bedea15',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'What is a ' },
	// 				{ text: 'predictive', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'algorithm', entityType: '@sys.ignore' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/comment_video1', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'If I understood correctly, a predictive algorithm is a scoring system that uses past data to predict events.',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ["There's a great video about this. Let me know what you think."] } },
	// 		{ payload: { source: ['general def'], type: 'video' } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/b7d09cda-89e0-4bb2-a6dc-07a0a473fb80',
	// 	displayName: 'Getname.catchall.',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/getname'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '08251161-1cf1-4356-9b16-d737eda408fd',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "great! I'm " },
	// 				{ text: 'tomaz', entityType: '@sys.any', alias: 'name', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: 'cc229dd3-c7db-46ec-82bf-8f9b01b27c2a',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "thanks! i'm " },
	// 				{ text: 'tomaz', entityType: '@sys.any', alias: 'name', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '98be4a81-050c-480e-bf1f-9b68d446cf0b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'hi please call me ' }, { text: 'julia', entityType: '@sys.any', alias: 'name' }],
	// 		},
	// 		{
	// 			name: '735755f3-d23c-4fc6-8bc3-8907ee1b3184',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'hello my name is ' }, { text: 'julia', entityType: '@sys.any', alias: 'name' }],
	// 		},
	// 		{
	// 			name: '3c9221a1-8c83-4ec9-a3bc-ef226fd77d72',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "hey i'm " }, { text: 'julia', entityType: '@sys.any', alias: 'name' }],
	// 		},
	// 		{
	// 			name: '91ca58f1-05ae-4461-9005-cbaae4c90b67',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "nice to meet, i'm " },
	// 				{ text: 'tomaz', entityType: '@sys.any', alias: 'name', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '72b98cf4-1138-445b-aefd-cbe1bdca2871',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "enchanted! i'm " },
	// 				{ text: 'tomaz', entityType: '@sys.any', alias: 'name', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '25b11ceb-9e73-4149-884a-1500050b9a89',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'plasure to meet, call me ' },
	// 				{ text: 'tomaz', entityType: '@sys.any', alias: 'name' },
	// 			],
	// 		},
	// 		{
	// 			name: 'ef42f8cf-e605-48b1-979c-9028a84ffe00',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'im ' }, { text: 'tomaz', entityType: '@sys.any', alias: 'name', userDefined: true }],
	// 		},
	// 		{
	// 			name: '58c35073-2f4a-42a1-8e72-9c2580935d99',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'nice to meet you im ' },
	// 				{ text: 'tomaz', entityType: '@sys.any', alias: 'name', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '00c0a739-7609-4735-a865-d6bc79c952f8',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'nice to meet you. my name is ' },
	// 				{ text: 'tomaz', entityType: '@sys.any', alias: 'name' },
	// 			],
	// 		},
	// 		{
	// 			name: '639d6094-1dca-40e5-9a74-4c3f3c5f0b07',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'hello you can call me ' }, { text: 'tomaz', entityType: '@sys.any', alias: 'name' }],
	// 		},
	// 		{
	// 			name: '09e22f23-a3eb-46d0-8637-83f5b421524b',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "pleasure, i'm " },
	// 				{ text: 'tomaz', entityType: '@sys.any', alias: 'name', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '60d3d3c0-e33b-4301-8aac-c59ee283122a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'call me ' }, { text: 'tomasz', entityType: '@sys.any', alias: 'name' }],
	// 		},
	// 		{
	// 			name: 'dd8b8ed7-1bbd-4a16-9c7a-72f11371fe8f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'my name is ' }, { text: 'tomasz', entityType: '@sys.any', alias: 'name' }],
	// 		},
	// 		{
	// 			name: '8b61a071-2b58-4058-bad6-8bde88b17da3',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Tomasz', entityType: '@sys.any', alias: 'name', userDefined: true }],
	// 		},
	// 		{
	// 			name: '7659abb5-48c7-4301-908e-ba17981c3e64',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Pryia', entityType: '@sys.any', alias: 'name', userDefined: true }],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/name', lifespanCount: 100 },
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Getnamecatchall-followup',
	// 			lifespanCount: 1,
	// 		},
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/fallback-intro', lifespanCount: 5 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '4116692f-b4db-4ba7-8732-b4cf1b66ef88',
	// 			displayName: 'name',
	// 			value: '$name',
	// 			entityTypeDisplayName: '@sys.any',
	// 			mandatory: true,
	// 			prompts: ['How can I call you?'],
	// 		},
	// 	],
	// 	messages: [{ text: { text: ['I should call you $name, is that correct?'] } }],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/49337a40-67cb-490c-a876-99a9094d38fe',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b7d09cda-89e0-4bb2-a6dc-07a0a473fb80',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/a9b81406-0290-49c9-9eb1-9908f6be8c7c',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b7d09cda-89e0-4bb2-a6dc-07a0a473fb80',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/b805e399-e699-4158-9233-82fe92c81110',
	// 	displayName: 'Definition',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/definition'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '48b37188-d606-4998-8a0d-35171cb77561',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'maybe', entityType: '@sys.any', alias: 'comment_video_2', userDefined: true }],
	// 		},
	// 		{ name: 'f8cc3d8b-9b36-48ad-83fd-011bc2a6f356', type: 'EXAMPLE', parts: [{ text: 'nope' }] },
	// 		{ name: '3e27063c-7f79-4ef7-bae0-f4a2e66c6c04', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: 'f9d1a92b-ba0b-4d64-9d5d-ea4b42723179',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'artificial intelligence is better than humans',
	// 					entityType: '@sys.any',
	// 					alias: 'comment_video_2',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: 'e38c59d3-83af-4820-99d3-d765b895f081',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'algorithms ' },
	// 				{
	// 					text: 'work better than humans',
	// 					entityType: '@sys.any',
	// 					alias: 'comment_video_2',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: 'f9dcbfa1-3279-4bd0-8e51-fc1f6758fc6b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'algorithms are more objective' }],
	// 		},
	// 		{
	// 			name: '996e0749-77a2-4f9f-881d-1834f478ced5',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'i ' },
	// 				{ text: 'trust them', entityType: '@sys.any', alias: 'comment_video_2', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '21f7e4c2-9908-48e5-adb0-222c647d0927',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'they are fair', entityType: '@sys.any', alias: 'comment_video_2', userDefined: true }],
	// 		},
	// 		{ name: 'ba7e0dbd-3576-4e30-8521-bdabbc9dae40', type: 'EXAMPLE', parts: [{ text: 'they are not fair' }] },
	// 		{ name: 'deeb0fea-576f-43cb-8205-7ca54209e804', type: 'EXAMPLE', parts: [{ text: "i don't trust them" }] },
	// 		{ name: '95667a1f-2472-4524-a272-73d5d7654d2b', type: 'EXAMPLE', parts: [{ text: 'they are racist' }] },
	// 		{ name: 'd04d1ed0-e836-47fd-8546-30774fd598d2', type: 'EXAMPLE', parts: [{ text: 'there are problems' }] },
	// 		{ name: '357b8130-7e4e-4635-b980-f62a1945a3ee', type: 'EXAMPLE', parts: [{ text: 'bias' }] },
	// 		{
	// 			name: '0623b56c-139a-4cdc-b509-01e0f7d13e92',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: '40110741-0e36-40cd-a72e-d5c0dd46f2eb', type: 'EXAMPLE', parts: [{ text: 'no' }] },
	// 		{ name: '0947a820-3c05-4af8-8320-6d898d753061', type: 'EXAMPLE', parts: [{ text: 'they can be biased' }] },
	// 		{ name: '5718a0d4-7cdf-4d10-8a3a-1144ebbc3c93', type: 'EXAMPLE', parts: [{ text: "I don't know" }] },
	// 		{ name: 'e1b6a2f1-cf82-4d9d-bbfd-9f6516a642e5', type: 'EXAMPLE', parts: [{ text: "don't know" }] },
	// 		{
	// 			name: '8a89bcba-9407-4681-a82f-1e14d029c809',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "that's what we have to find out" }],
	// 		},
	// 		{
	// 			name: '80b4e3c0-8f7a-4463-920a-38f1ef8a02c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i ' }, { text: 'believe', entityType: '@sys.ignore' }, { text: ' yes' }],
	// 		},
	// 		{ name: '43eef039-6d15-441f-9561-738dbd599b1d', type: 'EXAMPLE', parts: [{ text: 'not sure' }] },
	// 		{ name: '535eaf67-eb6f-4b6a-b0f8-3f987abd4bb4', type: 'EXAMPLE', parts: [{ text: 'maybe not' }] },
	// 		{
	// 			name: '52fb11fa-1e5d-4184-bb95-10e2bac513a0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i ' }, { text: 'don', entityType: '@sys.ignore' }, { text: "'t think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Definition-followup',
	// 			lifespanCount: 1,
	// 		},
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/has_definition', lifespanCount: 100 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '438e5607-a3c1-44f6-b0f4-979651d697b9',
	// 			displayName: 'comment_video_2',
	// 			value: '$comment_video_2',
	// 			entityTypeDisplayName: '@sys.any',
	// 			mandatory: true,
	// 			prompts: ['What did you think of the video?'],
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: ["Alright #name.name! Before moving on to some examples, let's check if we got this right"],
	// 			},
	// 		},
	// 		{ text: { text: ['How would you describe predictive algorithms?'] } },
	// 	],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/39bffe16-d9ad-4f72-90e8-4580838e4360',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/c474a55e-cef7-4a2c-a52c-3ec485d8e2b4',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/c474a55e-cef7-4a2c-a52c-3ec485d8e2b4',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/b805e399-e699-4158-9233-82fe92c81110',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/bc6a4046-01ac-4a17-9ad5-571544026cec',
	// 	displayName: 'probability_2 - custom',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/probability_2-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '04890939-7442-47f7-bb4c-aee463d5f6f0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'one', entityType: '@sys.number', alias: 'number' }],
	// 		},
	// 		{
	// 			name: '94767374-4999-4b6e-8cd6-685a84fac90c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: '1', entityType: '@sys.number', alias: 'number' }],
	// 		},
	// 	],
	// 	action: 'probability_2.probability_2-custom',
	// 	parameters: [
	// 		{
	// 			name: '32e29290-aa1b-4348-a5ed-13b9c0b666a8',
	// 			displayName: 'number',
	// 			value: '$number',
	// 			entityTypeDisplayName: '@sys.number',
	// 		},
	// 	],
	// 	messages: [{ text: { text: ['Not really. There are 97% chances of'] } }],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/edf8309e-1f72-423d-931a-337757e2f8a0',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/edf8309e-1f72-423d-931a-337757e2f8a0',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/bf5333fe-23e2-48e4-8122-64b1106013fa',
	// 	displayName: 'random.people.result',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/random-people-result'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'e1c646bf-3138-4bc8-85f3-3dc17828179f',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'the algorithm', entityType: '@sys.any', alias: 'random-people-result', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '536527c7-32df-4e68-a848-73f0490661a1',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'random', entityType: '@sys.ignore' }, { text: ' people' }],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/randompeopleresult-followup',
	// 			lifespanCount: 2,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '312e0882-ce18-4e6a-9701-939cd2c88da7',
	// 			displayName: 'random-people-result',
	// 			value: '$random-people-result',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{ text: { text: ['Random people are just a bit better than the commercial algorithm,'] } },
	// 		{ text: { text: ["there's a video about this research, would you like to see it?"] } },
	// 	],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/1119fb31-b94c-4b09-bf51-618a1884002e',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/bf5333fe-23e2-48e4-8122-64b1106013fa',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/261922c7-e251-418d-a278-85cc78d8e5fb',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/bf5333fe-23e2-48e4-8122-64b1106013fa',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/7c04232c-e706-43da-abe9-a28d825999ec',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/1119fb31-b94c-4b09-bf51-618a1884002e',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/c46ef992-78bf-4fa1-9063-41e8ada638e6',
	// 	displayName: 'Welcome.has.name',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/name'],
	// 	trainingPhrases: [
	// 		{ name: '700d5c5c-8c6f-42d7-a6f2-600b007f4c01', type: 'EXAMPLE', parts: [{ text: 'hi there' }] },
	// 		{ name: '67a0dff4-2b13-4b57-a5c6-ac50d6ad9bc2', type: 'EXAMPLE', parts: [{ text: 'bonjour' }] },
	// 		{ name: '1f25aa89-aeae-4d67-82d6-f7961f36a80e', type: 'EXAMPLE', parts: [{ text: 'hey' }] },
	// 		{ name: 'b67473ad-a77a-4c78-ad48-a65fad760a9a', type: 'EXAMPLE', parts: [{ text: 'hi' }] },
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/intro', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{ text: { text: ["We've met before, #name.name! Would you like to discuss predictive algorithms ?"] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/c474a55e-cef7-4a2c-a52c-3ec485d8e2b4',
	// 	displayName: 'Definition.follow-up',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Definition-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'c6f650c5-7d65-482d-a68f-7ae42671de7f',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'I think ' },
	// 				{
	// 					text: 'predictive algorithms are a computer big data',
	// 					entityType: '@sys.any',
	// 					alias: 'definition_1',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: 'df9c96ec-d4ad-44f8-b28a-3b00072f1079',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'predictive algorithms are a system that predicts behavior based on data.',
	// 					entityType: '@sys.any',
	// 					alias: 'definition_1',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: '807e1ea4-2039-4b94-a8ca-1639865e51da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'great video', entityType: '@sys.any', alias: 'definition_1', userDefined: true }],
	// 		},
	// 		{
	// 			name: '8835c334-ae61-4caf-9c68-d458e98cd726',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "it's very " },
	// 				{ text: 'interesting', entityType: '@sys.any', alias: 'definition_1', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: 'f58e5305-ee4c-40c3-9ef6-a3057652a0ee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'interesting', entityType: '@sys.any', alias: 'definition_1', userDefined: true }],
	// 		},
	// 	],
	// 	action: 'Definition.Definition-custom',
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Definitionfollow-up-followup',
	// 			lifespanCount: 1,
	// 		},
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/has_definition', lifespanCount: 100 },
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/understanding_the_problem',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '88900bcc-29dc-442a-9d5e-ef340d284c95',
	// 			displayName: 'definition_1',
	// 			value: '$definition_1',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'So, if I understood correctly, a predictive algorithm is a scoring system that uses past data to predict events, right?',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b805e399-e699-4158-9233-82fe92c81110',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b805e399-e699-4158-9233-82fe92c81110',
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/39bffe16-d9ad-4f72-90e8-4580838e4360',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/c474a55e-cef7-4a2c-a52c-3ec485d8e2b4',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/c6bc2743-74d9-497c-afc4-05d36d0d856a',
	// 	displayName: '2.approaches',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/2approaches'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '5ec69cb9-d675-40f0-8fa1-d43da51aca6f',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'i agree with the review',
	// 					entityType: '@sys.any',
	// 					alias: 'comment_video_predpol',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{ name: 'fa7e3856-79fd-4225-913e-055da3a30b80', type: 'EXAMPLE', parts: [{ text: 'it is right' }] },
	// 		{
	// 			name: '4ad41b4e-ebaf-46a7-a8b3-cfe29e4e42ff',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i think it is correct' }],
	// 		},
	// 		{
	// 			name: 'd00a071d-87f1-4e65-8863-9cd1ce0a089d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yeah', entityType: '@sys.any', alias: 'comment_video_predpol', userDefined: true }],
	// 		},
	// 		{ name: 'd1912bb0-3319-4b5c-97f8-dffa0c034e10', type: 'EXAMPLE', parts: [{ text: 'oh yeah' }] },
	// 		{ name: '605da258-7bb6-4a2b-ba68-6332bc0af22b', type: 'EXAMPLE', parts: [{ text: 'agree' }] },
	// 		{
	// 			name: '78d012f4-f186-444b-9b8d-75ae95633963',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'maybe', entityType: '@sys.any', alias: 'comment_video_predpol', userDefined: true }],
	// 		},
	// 		{
	// 			name: '58c89926-dc5d-46c9-a1f9-a1a2d2c9ab78',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'maybe yes', entityType: '@sys.any', alias: 'comment_video_predpol', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '3460a63c-e227-48ef-83ae-e1f0833d1f5a',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'totally agree',
	// 					entityType: '@sys.any',
	// 					alias: 'comment_video_predpol',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: '4f9db7e7-c088-4365-af48-8162ae888232',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: "i'm looking forward",
	// 					entityType: '@sys.any',
	// 					alias: 'comment_video_predpol',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{ name: 'ee45f79b-dd4c-4afc-8720-784f53442ac6', type: 'EXAMPLE', parts: [{ text: 'agreed' }] },
	// 		{ name: '8daecd16-d7e2-4e71-a34a-a8ad69ec7a26', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: '0f15e889-e469-4d4d-bbc3-1d5bf0babd06', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: '1d0cd1d7-2886-4ef8-8302-be0d32c60318', type: 'EXAMPLE', parts: [{ text: 'super' }] },
	// 		{ name: '68245dad-8380-47f9-bc1e-8e9dc8797cf7', type: 'EXAMPLE', parts: [{ text: 'cool' }] },
	// 		{ name: 'eb0b0d9f-c233-4294-90c0-24714e5c7fc3', type: 'EXAMPLE', parts: [{ text: 'great idea' }] },
	// 		{ name: 'a9dfeae0-d780-4e1d-ab35-3f8c8ece71c3', type: 'EXAMPLE', parts: [{ text: 'i say yes' }] },
	// 		{ name: '0d066110-d2a7-4de6-a6ca-ae074840a161', type: 'EXAMPLE', parts: [{ text: "let's do it" }] },
	// 		{ name: '066ee24b-cc54-4f3c-bfbd-58b4cd15c736', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{ name: '2408db6c-eb30-40b3-b5dc-bf8a6f431adc', type: 'EXAMPLE', parts: [{ text: 'I agree' }] },
	// 		{
	// 			name: '8314c801-7927-4cd3-aaf8-c8183a7f1b92',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'why not?' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'b34ce572-9b4e-4c57-823b-90343f2e5b68', type: 'EXAMPLE', parts: [{ text: 'sure' }] },
	// 		{
	// 			name: '3c0f8d1d-7e62-48f5-a78c-73f29d6fd596',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes', entityType: '@sys.ignore' }],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach1-laser', lifespanCount: 1 },
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach2-predpol', lifespanCount: 1 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: 'dadc49a2-ea30-468b-9c30-56b625be7a33',
	// 			displayName: 'comment_video_predpol',
	// 			value: '$comment_video_predpol',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'So, I figured out there are 2 main approaches to predictive policing: predicting (1) WHO will commit a crime or  (2) WHERE crime will happen.',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['Which one should we investigate first?'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/d78021cc-26a8-4430-8ff1-e7006df0e25b',
	// 	displayName: 'Professional.questions',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: '8d03f6f8-71e0-4f9e-ac65-7cb9ad9ded23',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what is the story about?' }],
	// 		},
	// 		{
	// 			name: '727bf924-c2aa-4dab-b4da-141ab6bb863b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what is the project?' }],
	// 		},
	// 		{
	// 			name: '6da04cd4-a99a-4bfd-8751-3bac00ef22ee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "what's your occupation?" }],
	// 		},
	// 		{ name: 'ce8a4bdd-9b43-44ea-bf1a-69b2163ef204', type: 'EXAMPLE', parts: [{ text: 'what are you doing?' }] },
	// 		{ name: '8f5d3c6d-7049-4ddc-b04b-8345fc4df189', type: 'EXAMPLE', parts: [{ text: 'what are you up to?' }] },
	// 		{
	// 			name: '46dd83e7-c850-4b35-a964-004ba6980d04',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Are you investigating artificial intelligence?' }],
	// 		},
	// 		{
	// 			name: '3b33870d-634f-4609-ad12-ac3734faffa5',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What are you researching?' }],
	// 		},
	// 		{
	// 			name: 'b84e734d-361d-4aa4-b87d-b24a79124f11',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What are you studying?' }],
	// 		},
	// 		{ name: '0f8cd267-0ff8-4133-b706-6da012b65f78', type: 'EXAMPLE', parts: [{ text: 'What do you do?' }] },
	// 		{ name: '1a7f2156-d8db-4233-87f8-5e703f8167a1', type: 'EXAMPLE', parts: [{ text: 'What is your work?' }] },
	// 		{
	// 			name: '6a54e9ad-dd22-43b6-aa33-5816d3755a3a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What are you working on?' }],
	// 		},
	// 		{
	// 			name: 'f1e391b0-2281-444c-a533-5cd8c8b00ba0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What is your research field?' }],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/topic', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: ["We're working on a story about predictive algorithms, let's check some research material"],
	// 			},
	// 		},
	// 		{ text: { text: ['any thoughts?'] } },
	// 		{
	// 			payload: {
	// 				type: 'video',
	// 				source: ['general def'],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/da9de091-b091-47ef-98d0-2a8bdfd7d8fa',
	// 	displayName: 'LASER.audit.yes.mention',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/LASERaudit-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'a0e98265-720f-454e-90da-fb5fe7237428',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "let's add it to the article" }],
	// 		},
	// 		{
	// 			name: '35c7dfcb-bcdb-43b5-bc1e-4ebf7224971a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "excellent, let's put it in the article" }],
	// 		},
	// 		{ name: '0f4233ec-9559-49fe-be06-0c887047d3bd', type: 'EXAMPLE', parts: [{ text: 'yes, metion' }] },
	// 		{ name: '9de6ae89-a70e-4fb4-b828-ce8414ed24da', type: 'EXAMPLE', parts: [{ text: "i'll write about it" }] },
	// 		{
	// 			name: '2cc52bec-378f-464e-92cb-6dd26d5d0ab6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'of course, it should go in our story' }],
	// 		},
	// 		{
	// 			name: 'bd91890e-94c4-4710-a5b6-be1028558675',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'huge issue, should be mentioned' }],
	// 		},
	// 		{
	// 			name: '7fd760d3-d2a6-4939-9437-7107a32453ab',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "let's mention it in the story" }],
	// 		},
	// 		{
	// 			name: '9c006626-23a8-4e23-8da5-4f975b34f7cd',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'we should add it to our story' }],
	// 		},
	// 		{
	// 			name: '76e92eda-3cba-4cb5-b432-c089cdcf25c2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "sure, let's mention it" }],
	// 		},
	// 		{
	// 			name: 'da390e4c-34ae-4d48-8d2d-06f5ea6967fc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "it's important to mention it" }],
	// 		},
	// 		{
	// 			name: '8a76441a-8cbd-4b99-8a1f-bb4c1f18dfdc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '0083ef88-2868-43a8-8944-3e098dd55c7a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay I will' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '7aac036a-55e5-468a-9f43-c8dbb456ff73', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
	// 		{ name: '89d7ed15-c76c-4cae-af40-053b39489a45', type: 'EXAMPLE', parts: [{ text: "yes that's alright" }] },
	// 		{ name: 'f4d597c8-d098-46da-89fe-1a12f425cd58', type: 'EXAMPLE', parts: [{ text: 'yes I do' }] },
	// 		{
	// 			name: '143c08ba-bb97-40cd-a4de-e7ba7615d210',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'exactly' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '023894ec-fc8b-4ec1-b8c1-a8bcbb24fc5a', type: 'EXAMPLE', parts: [{ text: 'of course' }] },
	// 		{ name: '9d56f0ca-f4e0-4ea7-9b93-ebebd16edd4c', type: 'EXAMPLE', parts: [{ text: "yep that's ok" }] },
	// 		{
	// 			name: 'd0a3f14b-a1e9-4641-a3e0-8fcb8dc32d85',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'd753b5af-34db-4428-bdba-406fe267000c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'ok' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'fd691abb-5b22-4393-9b08-aa9d5bc4b4a6', type: 'EXAMPLE', parts: [{ text: 'for sure' }] },
	// 		{ name: '92fc2708-2b6e-41a1-8553-d13ce4e93f34', type: 'EXAMPLE', parts: [{ text: 'sg' }] },
	// 		{ name: 'f1e3a276-ea9e-4e31-85c2-df972bdb409d', type: 'EXAMPLE', parts: [{ text: "yes that't ok" }] },
	// 		{
	// 			name: '4d27c29e-8adf-4c0f-9512-6a68581c25f2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I agree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '3cc63bfe-e1b0-47a2-b09a-ad8c0a5e53ec', type: 'EXAMPLE', parts: [{ text: 'yes you can do it' }] },
	// 		{
	// 			name: 'e4d39a0a-b1fe-42dc-855f-e2ecf1c7a070',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't mind" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'b0126bf2-e04d-458f-bf16-d68600a247d8', type: 'EXAMPLE', parts: [{ text: 'that one works' }] },
	// 		{ name: '556f1638-b813-4a6d-8a65-6c93ae0b0451', type: 'EXAMPLE', parts: [{ text: 'that works' }] },
	// 		{ name: '42ce2151-bbe3-4263-9866-72712a4c25f4', type: 'EXAMPLE', parts: [{ text: 'sure why not' }] },
	// 		{ name: '4743b629-c571-4645-bdc2-63269d1c0c66', type: 'EXAMPLE', parts: [{ text: 'perfect' }] },
	// 		{
	// 			name: '13381537-1e8f-46e1-ac78-6a6bc2fe7d37',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yep that's right" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6d341828-72cd-4f96-89eb-bc5cbcd255dd', type: 'EXAMPLE', parts: [{ text: 'I think so' }] },
	// 		{
	// 			name: '4320d555-a38f-492d-b1fc-6d16fdc54e79',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes I agree' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '68b6cd35-4229-4674-94d6-46615ebab6ba',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: 'eba08d9b-f87d-4232-8874-be4da3029007',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sounds correct' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'ee5b2ffc-9c14-4a20-9e00-31cb8635c52c', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
	// 		{ name: 'e1f1d448-2705-47b8-92f5-4960656f346b', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
	// 		{
	// 			name: '50cf224f-9f07-4975-bf7b-441ab549ff6e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'go ahead' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '1296a391-d3e6-49c8-9eaa-39943cf8544f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'do it' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '55cd75db-90a7-4daf-947b-ecd03090e8b9', type: 'EXAMPLE', parts: [{ text: "it's fine" }] },
	// 		{ name: '1fe10ef0-0823-4efa-b4ef-730bc1f931b3', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: '4a8d741c-808c-45f8-bf90-ab32b99e0060', type: 'EXAMPLE', parts: [{ text: 'yes please' }] },
	// 		{ name: 'a05b793f-9a1d-460d-b1b6-c1a5b98d24d9', type: 'EXAMPLE', parts: [{ text: "it's okay" }] },
	// 		{ name: '88a721b8-99ce-4a51-bf78-f106361f402a', type: 'EXAMPLE', parts: [{ text: 'alright why not' }] },
	// 		{ name: 'df7428d3-7f27-40c7-b0d0-3456d0c8df91', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: '8f9f71af-76ec-424f-b28a-ece5b6f1dc95', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: '96b0889c-e64c-4ba3-83d3-495a0385917a', type: 'EXAMPLE', parts: [{ text: 'it looks perfect' }] },
	// 		{ name: '5a7c1865-6c90-4c93-8ea5-b7cacad6dcef', type: 'EXAMPLE', parts: [{ text: 'yes I can' }] },
	// 		{ name: 'ab7709c6-2eca-4ecf-812d-1e4527f1e709', type: 'EXAMPLE', parts: [{ text: 'yup' }] },
	// 		{ name: '3312fe28-dfeb-4fa6-98f6-9569c6cb393f', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: 'e826ff4d-875d-4073-89c5-1dba1203e3ce',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'confirm' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '29adab5b-d5e3-450b-b385-1538d0ad21da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'absolutely' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	action: 'LASERaudit.LASERaudit-yes',
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/move-on-police-bias',
	// 			lifespanCount: 1,
	// 		},
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach2-predpol', lifespanCount: 1 },
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/laser-audit', lifespanCount: 100 },
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Great! Would you rather now investigate the second approach (predicting crime areas) or we move on?',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/dc13a7b3-e8f0-49a0-95a1-fcc8ec5a8ef6',
	// 	displayName: 'video.not.working - yes',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/videonotworking-followup'],
	// 	trainingPhrases: [
	// 		{ name: '44d02724-dea1-4bdc-a0ee-e887d4f35411', type: 'EXAMPLE', parts: [{ text: 'problem solved' }] },
	// 		{ name: 'bf439467-3474-48ad-bd89-ffc75104175e', type: 'EXAMPLE', parts: [{ text: 'now i can see it' }] },
	// 		{ name: '61ac854e-90e3-48be-ae92-88153b9faf84', type: 'EXAMPLE', parts: [{ text: 'now it works' }] },
	// 		{ name: '7e1887ae-f86f-41dc-b1e5-edd98589fa5d', type: 'EXAMPLE', parts: [{ text: 'it works' }] },
	// 		{ name: '8c3e798f-137d-43d4-832b-277e32b2f932', type: 'EXAMPLE', parts: [{ text: "it's working now!" }] },
	// 		{
	// 			name: '8a76441a-8cbd-4b99-8a1f-bb4c1f18dfdc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '0083ef88-2868-43a8-8944-3e098dd55c7a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay I will' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '7aac036a-55e5-468a-9f43-c8dbb456ff73', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
	// 		{ name: '89d7ed15-c76c-4cae-af40-053b39489a45', type: 'EXAMPLE', parts: [{ text: "yes that's alright" }] },
	// 		{ name: 'f4d597c8-d098-46da-89fe-1a12f425cd58', type: 'EXAMPLE', parts: [{ text: 'yes I do' }] },
	// 		{
	// 			name: '143c08ba-bb97-40cd-a4de-e7ba7615d210',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'exactly' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '023894ec-fc8b-4ec1-b8c1-a8bcbb24fc5a', type: 'EXAMPLE', parts: [{ text: 'of course' }] },
	// 		{ name: '9d56f0ca-f4e0-4ea7-9b93-ebebd16edd4c', type: 'EXAMPLE', parts: [{ text: "yep that's ok" }] },
	// 		{
	// 			name: 'd0a3f14b-a1e9-4641-a3e0-8fcb8dc32d85',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'd753b5af-34db-4428-bdba-406fe267000c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'ok' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'fd691abb-5b22-4393-9b08-aa9d5bc4b4a6', type: 'EXAMPLE', parts: [{ text: 'for sure' }] },
	// 		{ name: '92fc2708-2b6e-41a1-8553-d13ce4e93f34', type: 'EXAMPLE', parts: [{ text: 'sg' }] },
	// 		{ name: 'f1e3a276-ea9e-4e31-85c2-df972bdb409d', type: 'EXAMPLE', parts: [{ text: "yes that't ok" }] },
	// 		{
	// 			name: '4d27c29e-8adf-4c0f-9512-6a68581c25f2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I agree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '3cc63bfe-e1b0-47a2-b09a-ad8c0a5e53ec', type: 'EXAMPLE', parts: [{ text: 'yes you can do it' }] },
	// 		{
	// 			name: 'e4d39a0a-b1fe-42dc-855f-e2ecf1c7a070',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't mind" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'b0126bf2-e04d-458f-bf16-d68600a247d8', type: 'EXAMPLE', parts: [{ text: 'that one works' }] },
	// 		{ name: '556f1638-b813-4a6d-8a65-6c93ae0b0451', type: 'EXAMPLE', parts: [{ text: 'that works' }] },
	// 		{ name: '42ce2151-bbe3-4263-9866-72712a4c25f4', type: 'EXAMPLE', parts: [{ text: 'sure why not' }] },
	// 		{ name: '4743b629-c571-4645-bdc2-63269d1c0c66', type: 'EXAMPLE', parts: [{ text: 'perfect' }] },
	// 		{
	// 			name: '13381537-1e8f-46e1-ac78-6a6bc2fe7d37',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yep that's right" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6d341828-72cd-4f96-89eb-bc5cbcd255dd', type: 'EXAMPLE', parts: [{ text: 'I think so' }] },
	// 		{
	// 			name: '4320d555-a38f-492d-b1fc-6d16fdc54e79',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes I agree' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '68b6cd35-4229-4674-94d6-46615ebab6ba',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: 'eba08d9b-f87d-4232-8874-be4da3029007',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sounds correct' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'ee5b2ffc-9c14-4a20-9e00-31cb8635c52c', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
	// 		{ name: 'e1f1d448-2705-47b8-92f5-4960656f346b', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
	// 		{
	// 			name: '50cf224f-9f07-4975-bf7b-441ab549ff6e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'go ahead' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '1296a391-d3e6-49c8-9eaa-39943cf8544f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'do it' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '55cd75db-90a7-4daf-947b-ecd03090e8b9', type: 'EXAMPLE', parts: [{ text: "it's fine" }] },
	// 		{ name: '1fe10ef0-0823-4efa-b4ef-730bc1f931b3', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: '4a8d741c-808c-45f8-bf90-ab32b99e0060', type: 'EXAMPLE', parts: [{ text: 'yes please' }] },
	// 		{ name: 'a05b793f-9a1d-460d-b1b6-c1a5b98d24d9', type: 'EXAMPLE', parts: [{ text: "it's okay" }] },
	// 		{ name: '88a721b8-99ce-4a51-bf78-f106361f402a', type: 'EXAMPLE', parts: [{ text: 'alright why not' }] },
	// 		{ name: 'df7428d3-7f27-40c7-b0d0-3456d0c8df91', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: '8f9f71af-76ec-424f-b28a-ece5b6f1dc95', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: '96b0889c-e64c-4ba3-83d3-495a0385917a', type: 'EXAMPLE', parts: [{ text: 'it looks perfect' }] },
	// 		{ name: '5a7c1865-6c90-4c93-8ea5-b7cacad6dcef', type: 'EXAMPLE', parts: [{ text: 'yes I can' }] },
	// 		{ name: 'ab7709c6-2eca-4ecf-812d-1e4527f1e709', type: 'EXAMPLE', parts: [{ text: 'yup' }] },
	// 		{ name: '3312fe28-dfeb-4fa6-98f6-9569c6cb393f', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: 'e826ff4d-875d-4073-89c5-1dba1203e3ce',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'confirm' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '29adab5b-d5e3-450b-b385-1538d0ad21da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'absolutely' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	action: 'videonotworking.videonotworking-yes',
	// 	messages: [{ text: { text: ['Great! what were we talking about ?'] } }],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b25ffc3d-b1fd-4729-ba64-d0185f85b444',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b25ffc3d-b1fd-4729-ba64-d0185f85b444',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/dcaf6230-f343-4856-a944-14a26769032d',
	// 	displayName: 'Move.on.',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Commentvideo1-followup'],
	// 	trainingPhrases: [
	// 		{ name: '5a6c8500-6206-46cf-b08f-b78ea74eb066', type: 'EXAMPLE', parts: [{ text: "let's move on" }] },
	// 		{ name: 'eb345d57-5dbf-4fc8-b2a6-10c59b467712', type: 'EXAMPLE', parts: [{ text: 'not now' }] },
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'Commentvideo1.Commentvideo1-no',
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Definition-followup',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					"Sure, but before moving on to some examples of predictive algorithms, let's see if we got it right.",
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['How would you describe a predictive algorithm?'] } },
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/62012d5c-00e7-4f33-9e9d-0938ffe413c3',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/62012d5c-00e7-4f33-9e9d-0938ffe413c3',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/de8a5f6f-00f9-48be-9f07-d4e63b9976e1',
	// 	displayName: 'LASER.audit.no.mention.ap.2.first',
	// 	priority: 500000,
	// 	inputContextNames: [
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/LASERaudit-followup',
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach2',
	// 	],
	// 	trainingPhrases: [
	// 		{
	// 			name: '13b3f8b0-cc7c-4881-9211-6dca4a4163aa',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not a good idea to bring up this' }],
	// 		},
	// 		{
	// 			name: 'd2aaa488-a9ac-4b08-9c33-02d116aeaf77',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i don't think we should mention it" }],
	// 		},
	// 		{
	// 			name: '271f2239-72be-4330-bb73-74c691e2338c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "let's not mention it" }],
	// 		},
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'LASERaudit.LASERaudit-no-2',
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/police-bias-problem',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	messages: [
	// 		{ text: { text: ['Alright, let’s research some more before making these choices.'] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					'Many studies are finding that predictive police algorithms target already over-policed communities, do you see a problem?',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/e14fdbc6-c795-4eee-9728-737381d7584f',
	// 	displayName: 'PredPol.bias.app.1.first',
	// 	priority: 500000,
	// 	inputContextNames: [
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/PredPolbias-followup',
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach1',
	// 	],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'cc8816a7-2fbf-4290-97b5-c344f5f7b162',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'yes i think', entityType: '@sys.any', alias: 'PredPol-bias-comment', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '4432dbe9-31d0-432b-9191-3595211b50f6',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: "that's a big problem",
	// 					entityType: '@sys.any',
	// 					alias: 'PredPol-bias-comment',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: '05a4b040-34cc-433c-b949-a27012c1b12d',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'i think this is very problematic',
	// 					entityType: '@sys.any',
	// 					alias: 'PredPol-bias-comment',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: '990f348e-af18-4879-a260-901e931ae2cf',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'any', entityType: '@sys.any', alias: 'PredPol-bias-comment', userDefined: true }],
	// 		},
	// 	],
	// 	action: 'PredPolbias.PredPolbias-custom',
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/police-bias-problem',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: 'e935dfa7-60d5-4d67-99e7-541667242c1b',
	// 			displayName: 'PredPol-bias-comment',
	// 			value: '$PredPol-bias-comment',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Alright. Many studies are finding that predictive police algorithms target already over-policed communities,',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['How should we address this issue ?'] } },
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b3f6288f-5435-40f7-9fe0-7491b1a2ef55',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b3f6288f-5435-40f7-9fe0-7491b1a2ef55',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/e1b65738-ea42-4102-855f-54b2433ee967',
	// 	displayName: 'Small_Talk_repetitions_4444',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: '0e19fdee-d061-4121-b0c6-19bcd2be320e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'you are repeating yourself' }],
	// 		},
	// 		{
	// 			name: '8523e1d9-e656-4652-bdd2-d5364eca3ce7',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'you said that already' }],
	// 		},
	// 		{
	// 			name: 'd9fb5b7e-2872-42a8-91cf-237b70037f30',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'you already said that' }],
	// 		},
	// 	],
	// 	messages: [{ text: {} }],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/e2c18c7c-3176-46ff-a4d1-389474db51d9',
	// 	displayName: 'Small_Talk_repetitions_2222',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: '0e19fdee-d061-4121-b0c6-19bcd2be320e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'you are repeating yourself' }],
	// 		},
	// 		{
	// 			name: '8523e1d9-e656-4652-bdd2-d5364eca3ce7',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'you said that already' }],
	// 		},
	// 		{
	// 			name: 'd9fb5b7e-2872-42a8-91cf-237b70037f30',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'you already said that' }],
	// 		},
	// 	],
	// 	messages: [{ text: {} }],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/e6c2e988-f6fb-46ce-9caf-7056c857bc1c',
	// 	displayName: 'Get.name.no.context',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: 'fbbdefbb-4c4e-48b5-a938-7b514e532faa',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'hi please call me ' },
	// 				{ text: 'john', entityType: '@person', alias: 'person', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '486cfb7b-34ce-4543-b54b-f915e5befb22',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'you can call me ' },
	// 				{ text: 'John', entityType: '@person', alias: 'person', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '6b936a6e-726f-44bc-a066-d46ff9fe08b8',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'call me ' },
	// 				{ text: 'john', entityType: '@person', alias: 'person', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: 'd704277a-e277-40e5-9571-71d04afedcd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i am ' }, { text: 'john', entityType: '@person', alias: 'person' }],
	// 		},
	// 		{
	// 			name: '3e75f1b2-2572-45c4-93c3-3cca7af83da4',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'my name is ' },
	// 				{ text: 'john', entityType: '@person', alias: 'person', userDefined: true },
	// 			],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/topic', lifespanCount: 1 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '3bb85806-bf1d-4b38-b666-1b6938069645',
	// 			displayName: 'person',
	// 			value: '$person',
	// 			entityTypeDisplayName: '@person',
	// 		},
	// 	],
	// 	messages: [
	// 		{ text: { text: ['Glad to see you, $person!'] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					'We can chat here, and I’ll show you some video clips on the left side of the screen, alright?',
	// 				],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// 	displayName: 'Minority.report',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/minority-report'],
	// 	trainingPhrases: [
	// 		{ name: '024787fd-b90c-4e9b-a720-cac0d88759b8', type: 'EXAMPLE', parts: [{ text: 'it could be that' }] },
	// 		{ name: '3bd16869-7da5-4eb7-a070-bb9a515cf7ad', type: 'EXAMPLE', parts: [{ text: 'it may be so' }] },
	// 		{ name: '9e7e9aeb-fd77-42c3-9795-5c9c4afdd975', type: 'EXAMPLE', parts: [{ text: 'i suppose yes' }] },
	// 		{ name: '1d542eb1-3d0f-4d4a-a55a-ce0d06b07666', type: 'EXAMPLE', parts: [{ text: 'i guess so' }] },
	// 		{ name: 'a5694971-49f9-4acd-882e-be4f581e3ce7', type: 'EXAMPLE', parts: [{ text: 'sure, let,s do that' }] },
	// 		{ name: 'd59d9ecc-5e28-4a3e-bf97-d36c1188d53e', type: 'EXAMPLE', parts: [{ text: "let's do it" }] },
	// 		{
	// 			name: '1585cbe4-0780-42be-a879-8e693a443ee4',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "oh yes let's do that" }],
	// 		},
	// 		{ name: 'e85c4995-b424-4e97-970c-9f626d2b4a6c', type: 'EXAMPLE', parts: [{ text: 'yes i see it now' }] },
	// 		{ name: 'd6082603-f4b5-48d9-a22b-868cc8773fac', type: 'EXAMPLE', parts: [{ text: 'me too' }] },
	// 		{ name: 'ef655fb8-7e62-4c50-a9c9-80929aab3f5a', type: 'EXAMPLE', parts: [{ text: 'brilliant' }] },
	// 		{ name: '6e95e499-66c9-4d9a-a86b-308713f62c67', type: 'EXAMPLE', parts: [{ text: 'fantastic idea' }] },
	// 		{ name: '8817817d-c476-463b-891f-0f84cbc2ca97', type: 'EXAMPLE', parts: [{ text: 'absolutely' }] },
	// 		{ name: 'b5f34374-dccb-4621-9375-e403c082bde4', type: 'EXAMPLE', parts: [{ text: 'you are right' }] },
	// 		{ name: '6b93f8a1-f4ab-4ca8-bd4e-457b4c177cda', type: 'EXAMPLE', parts: [{ text: 'agree totally' }] },
	// 		{ name: 'acaa49ff-bf9f-47e5-92ba-8f000a294e4f', type: 'EXAMPLE', parts: [{ text: 'i agree' }] },
	// 		{ name: '7cfa18d6-ffc1-4fb8-9daf-37ac1de15bb9', type: 'EXAMPLE', parts: [{ text: 'which example?' }] },
	// 		{
	// 			name: 'c372f4d8-8534-49b6-abf0-f3ac615a0aa1',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what is the example you have in mind?' }],
	// 		},
	// 		{ name: '402aef98-a798-405e-b0b8-f86adca4ebee', type: 'EXAMPLE', parts: [{ text: 'good idea' }] },
	// 		{ name: '317f6b1b-de5b-4138-a623-e67508608d99', type: 'EXAMPLE', parts: [{ text: "let's move on" }] },
	// 		{
	// 			name: 'd7e75e50-38b1-44ea-a660-086e3d9e80f1',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "i'd " },
	// 				{ text: 'love', entityType: '@sys.ignore' },
	// 				{ text: ' to hear about some exemples' },
	// 			],
	// 		},
	// 		{
	// 			name: '25690482-9774-4645-a9e0-3ddc39ef446a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i want to know about the examples' }],
	// 		},
	// 		{
	// 			name: '2068ed41-5b30-402d-b3eb-a6ff504281b7',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'move on' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'e00f9171-3c5a-4298-be23-75552e96c594', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{
	// 			name: 'e5b670c4-b3e5-4ffe-9533-8515e31bc33e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i would ' }, { text: 'love', entityType: '@sys.ignore' }, { text: ' to' }],
	// 		},
	// 		{ name: 'f604c313-701c-4ade-97c7-ebb3ca595ed1', type: 'EXAMPLE', parts: [{ text: 'great' }] },
	// 		{ name: 'e6950d59-7a0d-4f69-a57b-ced3f93e8511', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{ name: '2e9657b9-333d-4745-bb89-15d65c5dd387', type: 'EXAMPLE', parts: [{ text: 'cool' }] },
	// 		{
	// 			name: '99ad4a88-9999-43c8-83eb-7a02ce4e614d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i'd " }, { text: 'love', entityType: '@sys.ignore' }, { text: ' to hear about it' }],
	// 		},
	// 		{ name: 'eb9f5b3c-ff72-4281-bf9d-b04c0e7c46d5', type: 'EXAMPLE', parts: [{ text: 'why not?' }] },
	// 		{ name: 'd4ff5494-12f1-473f-af17-2870c603f694', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
	// 		{ name: 'b126734a-8715-420d-bcca-7013b732cb9f', type: 'EXAMPLE', parts: [{ text: 'sure' }] },
	// 		{
	// 			name: '7f028dd8-671c-4029-9f93-0279cff45749',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: '30331081-537c-4d28-8b31-c0d75ef7ca96', type: 'EXAMPLE', parts: [{ text: 'ok' }] },
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/Minorityreport-followup',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	messages: [
	// 		{ text: { text: ['I think predictive police should be our first example.'] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					'I always think about the movie Minority Report when I hear about predict police. Have you seen it?',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/267790f3-6e07-40fd-9c5b-33faa8634989',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/3f34a6c1-ae4c-4b9c-a89e-2ec8f45ea48f',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/3f3724e8-98df-49c2-be1f-3f849213ce20',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/7192162c-8f1c-4c33-9ef7-57a78f5a167c',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/ea4b16ee-53ca-471f-9123-5e0a09510a22',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/eb31b0f2-4aa9-40df-acdc-412315614c3f',
	// 	displayName: 'LASER.audit.yes.mention.ap.2.first',
	// 	priority: 500000,
	// 	inputContextNames: [
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/LASERaudit-followup',
	// 		'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach2',
	// 	],
	// 	trainingPhrases: [
	// 		{
	// 			name: '8a76441a-8cbd-4b99-8a1f-bb4c1f18dfdc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '0083ef88-2868-43a8-8944-3e098dd55c7a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay I will' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '7aac036a-55e5-468a-9f43-c8dbb456ff73', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
	// 		{ name: '89d7ed15-c76c-4cae-af40-053b39489a45', type: 'EXAMPLE', parts: [{ text: "yes that's alright" }] },
	// 		{ name: 'f4d597c8-d098-46da-89fe-1a12f425cd58', type: 'EXAMPLE', parts: [{ text: 'yes I do' }] },
	// 		{
	// 			name: '143c08ba-bb97-40cd-a4de-e7ba7615d210',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'exactly' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '023894ec-fc8b-4ec1-b8c1-a8bcbb24fc5a', type: 'EXAMPLE', parts: [{ text: 'of course' }] },
	// 		{ name: '9d56f0ca-f4e0-4ea7-9b93-ebebd16edd4c', type: 'EXAMPLE', parts: [{ text: "yep that's ok" }] },
	// 		{
	// 			name: 'd0a3f14b-a1e9-4641-a3e0-8fcb8dc32d85',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'd753b5af-34db-4428-bdba-406fe267000c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'ok' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'fd691abb-5b22-4393-9b08-aa9d5bc4b4a6', type: 'EXAMPLE', parts: [{ text: 'for sure' }] },
	// 		{ name: '92fc2708-2b6e-41a1-8553-d13ce4e93f34', type: 'EXAMPLE', parts: [{ text: 'sg' }] },
	// 		{ name: 'f1e3a276-ea9e-4e31-85c2-df972bdb409d', type: 'EXAMPLE', parts: [{ text: "yes that't ok" }] },
	// 		{
	// 			name: '4d27c29e-8adf-4c0f-9512-6a68581c25f2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I agree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '3cc63bfe-e1b0-47a2-b09a-ad8c0a5e53ec', type: 'EXAMPLE', parts: [{ text: 'yes you can do it' }] },
	// 		{
	// 			name: 'e4d39a0a-b1fe-42dc-855f-e2ecf1c7a070',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't mind" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'b0126bf2-e04d-458f-bf16-d68600a247d8', type: 'EXAMPLE', parts: [{ text: 'that one works' }] },
	// 		{ name: '556f1638-b813-4a6d-8a65-6c93ae0b0451', type: 'EXAMPLE', parts: [{ text: 'that works' }] },
	// 		{ name: '42ce2151-bbe3-4263-9866-72712a4c25f4', type: 'EXAMPLE', parts: [{ text: 'sure why not' }] },
	// 		{ name: '4743b629-c571-4645-bdc2-63269d1c0c66', type: 'EXAMPLE', parts: [{ text: 'perfect' }] },
	// 		{
	// 			name: '13381537-1e8f-46e1-ac78-6a6bc2fe7d37',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yep that's right" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6d341828-72cd-4f96-89eb-bc5cbcd255dd', type: 'EXAMPLE', parts: [{ text: 'I think so' }] },
	// 		{
	// 			name: '4320d555-a38f-492d-b1fc-6d16fdc54e79',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes I agree' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '68b6cd35-4229-4674-94d6-46615ebab6ba',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: 'eba08d9b-f87d-4232-8874-be4da3029007',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sounds correct' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'ee5b2ffc-9c14-4a20-9e00-31cb8635c52c', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
	// 		{ name: 'e1f1d448-2705-47b8-92f5-4960656f346b', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
	// 		{
	// 			name: '50cf224f-9f07-4975-bf7b-441ab549ff6e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'go ahead' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '1296a391-d3e6-49c8-9eaa-39943cf8544f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'do it' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '55cd75db-90a7-4daf-947b-ecd03090e8b9', type: 'EXAMPLE', parts: [{ text: "it's fine" }] },
	// 		{ name: '1fe10ef0-0823-4efa-b4ef-730bc1f931b3', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: '4a8d741c-808c-45f8-bf90-ab32b99e0060', type: 'EXAMPLE', parts: [{ text: 'yes please' }] },
	// 		{ name: 'a05b793f-9a1d-460d-b1b6-c1a5b98d24d9', type: 'EXAMPLE', parts: [{ text: "it's okay" }] },
	// 		{ name: '88a721b8-99ce-4a51-bf78-f106361f402a', type: 'EXAMPLE', parts: [{ text: 'alright why not' }] },
	// 		{ name: 'df7428d3-7f27-40c7-b0d0-3456d0c8df91', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: '8f9f71af-76ec-424f-b28a-ece5b6f1dc95', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: '96b0889c-e64c-4ba3-83d3-495a0385917a', type: 'EXAMPLE', parts: [{ text: 'it looks perfect' }] },
	// 		{ name: '5a7c1865-6c90-4c93-8ea5-b7cacad6dcef', type: 'EXAMPLE', parts: [{ text: 'yes I can' }] },
	// 		{ name: 'ab7709c6-2eca-4ecf-812d-1e4527f1e709', type: 'EXAMPLE', parts: [{ text: 'yup' }] },
	// 		{ name: '3312fe28-dfeb-4fa6-98f6-9569c6cb393f', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: 'e826ff4d-875d-4073-89c5-1dba1203e3ce',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'confirm' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '29adab5b-d5e3-450b-b385-1538d0ad21da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'absolutely' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	action: 'LASERaudit.LASERaudit-yes',
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/police-bias-problem',
	// 			lifespanCount: 1,
	// 		},
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/laser-audit', lifespanCount: 100 },
	// 	],
	// 	messages: [{ text: { text: ['Great! Do you see any potential problem in the LASER program?'] } }, { text: {} }],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/ed70e7f8-5408-4a61-bb21-309237f28bc1',
	// 	displayName: 'Can you define predictive algorithms?',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{
	// 			name: '9e5adb68-ad8f-4ee5-a0d2-38388834f47f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'what does an algoritm?' }],
	// 		},
	// 		{
	// 			name: '29bf2104-c8b9-47c5-a862-37603546c677',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'how do algorithms work?' }],
	// 		},
	// 		{
	// 			name: '334c824c-cdce-44b7-b613-93b2e7e76916',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'tell me what is a predictive algoritm' }],
	// 		},
	// 		{
	// 			name: 'aff8538e-8a06-4c0c-bbe7-9474b95d76af',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'how do you describe an algorithm?' }],
	// 		},
	// 		{ name: 'ccc50e99-5ecd-4551-b3c2-849f77520bc7', type: 'EXAMPLE', parts: [{ text: 'Define algorithm' }] },
	// 		{
	// 			name: 'ff960df2-49a7-42ef-a2f6-e06e95941734',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What is an algorithm?' }],
	// 		},
	// 		{
	// 			name: '59f1669b-9315-430d-8952-2d511eaef05c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'What is the definition of predictive algorithms?' }],
	// 		},
	// 		{
	// 			name: '5a34d7a4-8e2b-45bc-a1da-e28586c0f1aa',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'Define predictive algorithm' }],
	// 		},
	// 		{
	// 			name: 'fc1f2d41-e4fd-43a4-ad91-768b8bc640b0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'How do you describe a predictive algorithm?' }],
	// 		},
	// 		{
	// 			name: '46255356-ff43-4ea0-98f2-0b97e848907f',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'Can you define ' },
	// 				{ text: 'predictive', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'algorithms', entityType: '@sys.ignore' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 		{
	// 			name: 'b4cb0473-1aba-4700-b279-38216bedea15',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'What is a ' },
	// 				{ text: 'predictive', entityType: '@sys.ignore' },
	// 				{ text: ' ' },
	// 				{ text: 'algorithm', entityType: '@sys.ignore' },
	// 				{ text: '?' },
	// 			],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/comment_video1', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'If I understood correctly, a predictive algorithm is a scoring system that uses past data to predict events.',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ["There's a great video about this. Let me know what you think."] } },
	// 		{ payload: { type: 'video', source: ['general def'] } },
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/eddeaf62-10cd-476c-9ec1-855658b591c2',
	// 	displayName: 'Topic.yes',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Topic-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '9484fa62-be98-4758-991f-90cb3d409c39',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "great story, sure, let's do it" }],
	// 		},
	// 		{ name: '0bc38c53-17b2-402b-83be-767097375ee3', type: 'EXAMPLE', parts: [{ text: 'great topic' }] },
	// 		{ name: '4743b629-c571-4645-bdc2-63269d1c0c66', type: 'EXAMPLE', parts: [{ text: 'perfect' }] },
	// 		{ name: 'b26ae9da-f199-461c-a906-29800f144d74', type: 'EXAMPLE', parts: [{ text: 'parfait' }] },
	// 		{ name: 'd0baaacd-5693-496c-a93b-4410b487ce7b', type: 'EXAMPLE', parts: [{ text: 'excellent' }] },
	// 		{ name: '462a62ac-ccd3-4f38-996b-5a9ed2b03145', type: 'EXAMPLE', parts: [{ text: 'awesome' }] },
	// 		{ name: 'b80f75b3-bcf4-4ecb-85f9-fbf6bdbfb4c5', type: 'EXAMPLE', parts: [{ text: 'yes indeed' }] },
	// 		{
	// 			name: 'ab330700-27bb-412d-a7da-8b1247a54893',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i did hear a little about it' }],
	// 		},
	// 		{
	// 			name: '064202a6-c14a-460a-9711-0da6791492c3',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i heard about it in the radio' }],
	// 		},
	// 		{ name: '3f767d26-63db-4d93-a32b-e7d301d63a17', type: 'EXAMPLE', parts: [{ text: 'in the news' }] },
	// 		{ name: '4291d352-e3d7-4fb7-b5e9-a6ce5166c4fa', type: 'EXAMPLE', parts: [{ text: 'kind of' }] },
	// 		{ name: '3b0084fc-9a15-415d-81fa-49eee10661ca', type: 'EXAMPLE', parts: [{ text: 'some how' }] },
	// 		{ name: 'e960ac08-f4df-45da-8461-cdefa7778699', type: 'EXAMPLE', parts: [{ text: 'yes somehow' }] },
	// 		{ name: 'bdef20a3-9339-4148-a6f1-349e3f5352cf', type: 'EXAMPLE', parts: [{ text: 'just a little' }] },
	// 		{ name: 'f705ac13-1e31-441a-b5a6-f8d4d0c45265', type: 'EXAMPLE', parts: [{ text: 'just a bit' }] },
	// 		{ name: '57715062-f2b1-41f6-b3e0-d70798bd9a9b', type: 'EXAMPLE', parts: [{ text: 'yes, a bit' }] },
	// 		{ name: 'faa52311-1d46-4a19-b639-58c9e4de5de2', type: 'EXAMPLE', parts: [{ text: 'a little bit' }] },
	// 		{ name: '01e3d0e8-da3e-4799-9654-07c65a2995ae', type: 'EXAMPLE', parts: [{ text: 'yes a little' }] },
	// 		{
	// 			name: '38b10233-f3f8-428a-a32e-9105baa4f053',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'please tell me all about it' }],
	// 		},
	// 		{
	// 			name: 'd2b87af3-4bc2-4f29-9f28-ca8af344f20e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'would you like to tell me?' }],
	// 		},
	// 		{ name: '72d41cfa-b89e-4d3a-89d4-2bc791974a5d', type: 'EXAMPLE', parts: [{ text: 'can i hear more?' }] },
	// 		{ name: '6d341828-72cd-4f96-89eb-bc5cbcd255dd', type: 'EXAMPLE', parts: [{ text: 'I think so' }] },
	// 		{ name: '304ab1ec-343d-4504-92f2-9463a63390f2', type: 'EXAMPLE', parts: [{ text: 'yes in the papers' }] },
	// 		{ name: '756be5d8-850a-44db-8fd3-44a2656adbbc', type: 'EXAMPLE', parts: [{ text: 'yes in the news' }] },
	// 		{
	// 			name: 'f07c80f8-10ef-4e5e-93b8-2a5069732de8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes, i did hear about it' }],
	// 		},
	// 		{ name: '1472f636-a1b9-4aeb-bf7b-d2ed00b79a09', type: 'EXAMPLE', parts: [{ text: 'yes i did' }] },
	// 		{ name: '960392b7-554c-4a2f-bdff-c49e64167957', type: 'EXAMPLE', parts: [{ text: 'i believe i did' }] },
	// 		{
	// 			name: 'c68f292a-4ead-4b59-aee5-eeea2ddd54ef',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'i think yes' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'b74b3a44-c7f7-4525-a25e-4e0697d7d5c9', type: 'EXAMPLE', parts: [{ text: 'vaguely' }] },
	// 		{ name: 'b4e1cde8-a7ef-4e4e-8afb-2cf6db571cbf', type: 'EXAMPLE', parts: [{ text: "i've heard a bit" }] },
	// 		{
	// 			name: '2d0332c4-4da9-4a4b-8b2f-5210d1c07e83',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes, and would love to hear more about it' }],
	// 		},
	// 		{
	// 			name: '5c8c9ccf-351e-49a0-8020-6b31ae6a8ab1',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yes, but i'd like to hear from you" }],
	// 		},
	// 		{
	// 			name: '8a76441a-8cbd-4b99-8a1f-bb4c1f18dfdc',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '0083ef88-2868-43a8-8944-3e098dd55c7a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay I will' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '7aac036a-55e5-468a-9f43-c8dbb456ff73', type: 'EXAMPLE', parts: [{ text: 'why not' }] },
	// 		{ name: '89d7ed15-c76c-4cae-af40-053b39489a45', type: 'EXAMPLE', parts: [{ text: "yes that's alright" }] },
	// 		{ name: 'f4d597c8-d098-46da-89fe-1a12f425cd58', type: 'EXAMPLE', parts: [{ text: 'yes I do' }] },
	// 		{
	// 			name: '143c08ba-bb97-40cd-a4de-e7ba7615d210',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'exactly' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '023894ec-fc8b-4ec1-b8c1-a8bcbb24fc5a', type: 'EXAMPLE', parts: [{ text: 'of course' }] },
	// 		{ name: '9d56f0ca-f4e0-4ea7-9b93-ebebd16edd4c', type: 'EXAMPLE', parts: [{ text: "yep that's ok" }] },
	// 		{
	// 			name: 'd0a3f14b-a1e9-4641-a3e0-8fcb8dc32d85',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'okay' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'd753b5af-34db-4428-bdba-406fe267000c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'ok' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'fd691abb-5b22-4393-9b08-aa9d5bc4b4a6', type: 'EXAMPLE', parts: [{ text: 'for sure' }] },
	// 		{ name: '92fc2708-2b6e-41a1-8553-d13ce4e93f34', type: 'EXAMPLE', parts: [{ text: 'sg' }] },
	// 		{ name: 'f1e3a276-ea9e-4e31-85c2-df972bdb409d', type: 'EXAMPLE', parts: [{ text: "yes that't ok" }] },
	// 		{
	// 			name: '4d27c29e-8adf-4c0f-9512-6a68581c25f2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I agree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '3cc63bfe-e1b0-47a2-b09a-ad8c0a5e53ec', type: 'EXAMPLE', parts: [{ text: 'yes you can do it' }] },
	// 		{
	// 			name: 'e4d39a0a-b1fe-42dc-855f-e2ecf1c7a070',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't mind" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'b0126bf2-e04d-458f-bf16-d68600a247d8', type: 'EXAMPLE', parts: [{ text: 'that one works' }] },
	// 		{ name: '556f1638-b813-4a6d-8a65-6c93ae0b0451', type: 'EXAMPLE', parts: [{ text: 'that works' }] },
	// 		{
	// 			name: '42ce2151-bbe3-4263-9866-72712a4c25f4',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure why not' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '13381537-1e8f-46e1-ac78-6a6bc2fe7d37',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "yep that's right" }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: '4320d555-a38f-492d-b1fc-6d16fdc54e79',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'yes I agree' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '68b6cd35-4229-4674-94d6-46615ebab6ba',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sure' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{
	// 			name: 'eba08d9b-f87d-4232-8874-be4da3029007',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'sounds correct' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'ee5b2ffc-9c14-4a20-9e00-31cb8635c52c', type: 'EXAMPLE', parts: [{ text: 'sounds good' }] },
	// 		{ name: 'e1f1d448-2705-47b8-92f5-4960656f346b', type: 'EXAMPLE', parts: [{ text: "that's correct" }] },
	// 		{
	// 			name: '50cf224f-9f07-4975-bf7b-441ab549ff6e',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'go ahead' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '1296a391-d3e6-49c8-9eaa-39943cf8544f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'do it' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '55cd75db-90a7-4daf-947b-ecd03090e8b9', type: 'EXAMPLE', parts: [{ text: "it's fine" }] },
	// 		{ name: '1fe10ef0-0823-4efa-b4ef-730bc1f931b3', type: 'EXAMPLE', parts: [{ text: 'yeah' }] },
	// 		{ name: '4a8d741c-808c-45f8-bf90-ab32b99e0060', type: 'EXAMPLE', parts: [{ text: 'yes please' }] },
	// 		{ name: 'a05b793f-9a1d-460d-b1b6-c1a5b98d24d9', type: 'EXAMPLE', parts: [{ text: "it's okay" }] },
	// 		{ name: '88a721b8-99ce-4a51-bf78-f106361f402a', type: 'EXAMPLE', parts: [{ text: 'alright why not' }] },
	// 		{ name: 'df7428d3-7f27-40c7-b0d0-3456d0c8df91', type: 'EXAMPLE', parts: [{ text: 'alright' }] },
	// 		{ name: '8f9f71af-76ec-424f-b28a-ece5b6f1dc95', type: 'EXAMPLE', parts: [{ text: 'right' }] },
	// 		{ name: '96b0889c-e64c-4ba3-83d3-495a0385917a', type: 'EXAMPLE', parts: [{ text: 'it looks perfect' }] },
	// 		{ name: '5a7c1865-6c90-4c93-8ea5-b7cacad6dcef', type: 'EXAMPLE', parts: [{ text: 'yes I can' }] },
	// 		{ name: 'ab7709c6-2eca-4ecf-812d-1e4527f1e709', type: 'EXAMPLE', parts: [{ text: 'yup' }] },
	// 		{ name: '3312fe28-dfeb-4fa6-98f6-9569c6cb393f', type: 'EXAMPLE', parts: [{ text: 'yep' }] },
	// 		{
	// 			name: 'e826ff4d-875d-4073-89c5-1dba1203e3ce',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'confirm' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '29adab5b-d5e3-450b-b385-1538d0ad21da',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'absolutely' }],
	// 			timesAddedCount: 1,
	// 		},
	// 	],
	// 	action: 'Topic.Topic-yes',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion1', lifespanCount: 1 },
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/fallback-topic', lifespanCount: 1 },
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: ['Great! I was very impressed when I realized that predictive algorithms are all over,'],
	// 			},
	// 		},
	// 		{ text: { text: ['from recommendations on Youtube and Netflix to the police and the criminal justice,'] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					'But can we really trust an algorithm to make predictions for the police? Are those algorithms fair?',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/87fb743b-c15b-49d0-9984-476df73439c7',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/87fb743b-c15b-49d0-9984-476df73439c7',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/edf8309e-1f72-423d-931a-337757e2f8a0',
	// 	displayName: 'probability_2',
	// 	priority: 500000,
	// 	trainingPhrases: [
	// 		{ name: '71e19ef6-743d-4eea-8358-5e3e9d22128b', type: 'EXAMPLE', parts: [{ text: 'probability' }] },
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/probability_2-followup',
	// 			lifespanCount: 2,
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'There are 50 people in a room. What’s the probability that 2 people in the room have birthdays on the same day?',
	// 				],
	// 			},
	// 		},
	// 		{ text: { text: ['1) 49%    2) 7%    3) 97%'] } },
	// 	],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/bc6a4046-01ac-4a17-9ad5-571544026cec',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/edf8309e-1f72-423d-931a-337757e2f8a0',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// 	displayName: 'LASER.audit',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion-laser'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '6f43b969-70e0-4951-b79d-ef15dc354dc1',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: "it's scary", entityType: '@sys.any', alias: 'comment-video-laser', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: 'af459b5a-9e4a-4003-b704-b0eb2de078b7',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'great, really nice video',
	// 					entityType: '@sys.any',
	// 					alias: 'comment-video-laser',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: '198cc239-bfb0-4436-b6d4-d0acf4de9069',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'very cool video',
	// 					entityType: '@sys.any',
	// 					alias: 'comment-video-laser',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 	],
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/LASERaudit-followup',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	parameters: [
	// 		{
	// 			name: '17537237-5e8a-4d94-93e4-e48ba4d52921',
	// 			displayName: 'comment-video-laser',
	// 			value: '$comment-video-laser',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Right. But these algorithms are being challenged by many people. One example we could mention is the lawsuit against the Los Angeles predictive police program, LASER.',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'The police had to audit the program and a lot of inconsistencies were found, but LAPD continues to use it.',
	// 				],
	// 			},
	// 		},
	// 		{ payload: { type: 'tag', source: ['LASER'] } },
	// 		{ text: { text: ['I find it very alarming, should we mention it in our story?'] } },
	// 	],
	// 	followupIntentInfo: [
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/27a33ead-4ba9-4142-ab25-8e380d769bd0',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/da9de091-b091-47ef-98d0-2a8bdfd7d8fa',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/de8a5f6f-00f9-48be-9f07-d4e63b9976e1',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// 		},
	// 		{
	// 			followupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/eb31b0f2-4aa9-40df-acdc-412315614c3f',
	// 			parentFollowupIntentName:
	// 				'projects/dialogflow-project-1111/agent/intents/ee01998d-6bb9-40fc-902f-a75b93ec9d20',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/f22ff2d4-7e3f-4f12-9fe1-70ead3a81b62',
	// 	displayName: 'PredPol.bias.move.on.question',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/PredPolbias-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: 'c5079439-66c3-4a3f-92f5-e3e1e0b162aa',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no clue', entityType: '@sys.any', alias: 'PredPol-bias-comment', userDefined: true }],
	// 		},
	// 		{
	// 			name: '6ad464e2-9627-42e7-88e9-1480d3d9944c',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{
	// 					text: 'I think it is very problematic',
	// 					entityType: '@sys.any',
	// 					alias: 'PredPol-bias-comment',
	// 					userDefined: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: 'e2cc6c08-8542-4de3-af8c-d9f4dc9029e0',
	// 			type: 'EXAMPLE',
	// 			parts: [
	// 				{ text: 'yes i think', entityType: '@sys.any', alias: 'PredPol-bias-comment', userDefined: true },
	// 			],
	// 		},
	// 		{
	// 			name: '221bf579-2e26-4a0c-ad1c-e90c93aaf221',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'any', entityType: '@sys.any', alias: 'PredPol-bias-comment', userDefined: true }],
	// 		},
	// 	],
	// 	action: 'PredPolbias.PredPolbias-custom-2',
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/move-on-police-bias',
	// 			lifespanCount: 1,
	// 		},
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/approach1-laser', lifespanCount: 1 },
	// 	],
	// 	parameters: [
	// 		{
	// 			name: 'e97013ec-4f61-4de8-ace8-ebb1689bd703',
	// 			displayName: 'PredPol-bias-comment',
	// 			value: '$PredPol-bias-comment',
	// 			entityTypeDisplayName: '@sys.any',
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'Alright. Would you rather investigate now the first approach (predicting who will commit crime) or we move on?',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b3f6288f-5435-40f7-9fe0-7491b1a2ef55',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/b3f6288f-5435-40f7-9fe0-7491b1a2ef55',
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/f35cb125-c753-4d23-a31a-c1c25c47e77f',
	// 	displayName: 'Daily Life',
	// 	priority: 500000,
	// 	outputContexts: [
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/DefaultWelcomeIntent-followup',
	// 			lifespanCount: 5,
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: [
	// 					'When you look back to your life, did chance play an important role in it ?',
	// 					'Can you remember coincidences in your life?',
	// 					'Can you describe a random event in your life?',
	// 					'Do you think there’s randomness in the world?',
	// 					'Do you see randomness in your life?',
	// 				],
	// 			},
	// 		},
	// 		{
	// 			text: {
	// 				text: [
	// 					'Einstein famously said “God does not play dice”. How would you respond to that?',
	// 					'Many scientists say that random processes are part of nature and have a big presence in our daily lives, “yet most people do not understand them or think much about them”. What do you think about that?',
	// 					'Psychologist Daniel Kahnemann said that “We are far too willing to reject the belief that much of what we see in life is random.” What do you think?',
	// 					'Richard Dawkins said “The chances of each of us coming into existence are infinitesimally small, and even though we shall all die some day, we should count ourselves fantastically lucky to get our decades in the sun.” Do you agree?',
	// 					"Riz Ahmed once said: “Trajectories aren't linear. Life's just a roller coaster. I guess I'm a believer in the randomness of life rather than it being a linear trajectory or an arc, a consistent smooth arc, towards anything.” What’s your stand on this?",
	// 					'Kahneman said we tend to “see the world as more tidy, simple, predictable and coherent than it really is. The illusion that one has understood the past feeds the further illusion that one can predict and control the future. These illusions are comforting. They reduce the anxiety we would experience if we allowed ourselves to fully acknowledge the uncertainties of existence.” What do you think about this?',
	// 					"Writer Paul Auster said “The world is so unpredictable. Things happen suddenly, unexpectedly. We want to feel we are in control of our own existence. In some ways we are, in some ways we're not. We are ruled by the forces of chance and coincidence.” Do you agree?",
	// 				],
	// 			},
	// 		},
	// 	],
	// },
	// {
	// 	name: 'projects/dialogflow-project-1111/agent/intents/fd3c78e5-017c-4399-a739-953d269a7239',
	// 	displayName: 'Topic - no',
	// 	priority: 500000,
	// 	inputContextNames: ['projects/dialogflow-project-1111/agent/sessions/-/contexts/Topic-followup'],
	// 	trainingPhrases: [
	// 		{
	// 			name: '505b3b60-a112-47e3-9599-29e6b3c00755',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'never and would love to hear more' }],
	// 		},
	// 		{
	// 			name: '000f8115-8e43-48c7-a43a-e263c02677f2',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "i've never heard about it but would like to" }],
	// 		},
	// 		{
	// 			name: '36490425-3a2a-45af-b23d-fdf56fcccf50',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no but i would love to learn more' }],
	// 		},
	// 		{
	// 			name: '7788b995-2246-48b7-ad91-5668445c41b9',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no jana but it sounds interesting' }],
	// 		},
	// 		{ name: '40fd8902-04d9-44a0-9684-eb12d86668b1', type: 'EXAMPLE', parts: [{ text: 'no i have not' }] },
	// 		{ name: 'ca1e90f6-0027-46ef-a014-0feb499f1922', type: 'EXAMPLE', parts: [{ text: 'no jana' }] },
	// 		{ name: 'ffc03e82-eab3-4b87-af31-a2079d4e0537', type: 'EXAMPLE', parts: [{ text: 'thanks but no' }] },
	// 		{ name: 'aa093560-2146-4123-9a76-8dab2e6a1ff4', type: 'EXAMPLE', parts: [{ text: 'no way' }] },
	// 		{
	// 			name: '71620d96-450e-4e49-94b3-2bfe09c9e71f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '1bb52b57-b821-45ca-ace6-de6c9609e1a3', type: 'EXAMPLE', parts: [{ text: "no no don't" }] },
	// 		{ name: '320bc985-3b6b-44d1-99ef-4f610b63fea9', type: 'EXAMPLE', parts: [{ text: 'na' }] },
	// 		{
	// 			name: '1c00239d-fc2d-41e7-b698-babf7e50d475',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no it isn't" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '640221e1-4f97-4fbd-98ca-4573f3d3bbbc', type: 'EXAMPLE', parts: [{ text: "don't" }] },
	// 		{
	// 			name: 'dc88771f-a155-472e-b9d6-38dcba93784c',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "nah I'm good" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '50458e36-cc31-4417-afd6-737ea2988496',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'no I cannot' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '6ca22a00-18d4-420a-9e85-ae952bfc3735', type: 'EXAMPLE', parts: [{ text: "I can't" }] },
	// 		{ name: '85feeae0-ad61-444c-8c58-f17e6a92e9a4', type: 'EXAMPLE', parts: [{ text: 'nothing' }] },
	// 		{ name: '3db25696-c442-4255-a3ca-59caa6a59ff1', type: 'EXAMPLE', parts: [{ text: "no that's okay" }] },
	// 		{ name: 'd747d106-3e9c-4291-a203-909df65075a3', type: 'EXAMPLE', parts: [{ text: 'no not really' }] },
	// 		{ name: '4321d060-7d5b-473d-850f-33e57dcb6f5d', type: 'EXAMPLE', parts: [{ text: 'nope not really' }] },
	// 		{
	// 			name: '393651e4-b7e9-4be1-8191-c1b3cf8afb8a',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nope' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: '661bf487-0e5f-4cfe-957f-cfc4b9f65bd0',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'thanks but not this time' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'bcb790c8-fbff-4b32-97d2-020fc2d92bee',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I don't think so" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{
	// 			name: 'e6282627-2230-42ac-b462-74360458104f',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'I disagree' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: 'a0e89f9b-905f-4c1c-8847-e472a1990f86', type: 'EXAMPLE', parts: [{ text: 'no maybe next time' }] },
	// 		{ name: 'd14bf041-1a35-4af6-b229-766499baf4fe', type: 'EXAMPLE', parts: [{ text: 'not this time' }] },
	// 		{ name: '211034d5-0f9d-47e2-a8fb-f7b61baf067e', type: 'EXAMPLE', parts: [{ text: "no don't" }] },
	// 		{ name: '93c9034b-e4b2-4c74-b01d-0d8a3e588701', type: 'EXAMPLE', parts: [{ text: 'no we are good' }] },
	// 		{
	// 			name: '7315e368-ddb4-4835-8821-ae3cb6714d5b',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "don't do it" }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{ name: 'e4175e1d-97f2-45f1-97e2-4bc9ab3679a4', type: 'EXAMPLE', parts: [{ text: "no that's be all" }] },
	// 		{ name: '34358681-adfc-4871-a23e-590d6b883def', type: 'EXAMPLE', parts: [{ text: 'not right now' }] },
	// 		{ name: '9fa8a8c1-a8a7-4679-b5ce-9c8303c58e48', type: 'EXAMPLE', parts: [{ text: 'nothing else thanks' }] },
	// 		{ name: '9acc976a-38fa-46d0-becc-563a9dfe0051', type: 'EXAMPLE', parts: [{ text: 'no thanks' }] },
	// 		{
	// 			name: '92c94b97-4d1f-4f09-bcc7-54799e43135d',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's ok" }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: 'db8e9722-87a2-497a-949c-8110a0a03f65', type: 'EXAMPLE', parts: [{ text: "I don't want that" }] },
	// 		{
	// 			name: 'c822e247-2e5d-4726-b0d0-5230b7e384c6',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'definitely not' }],
	// 			timesAddedCount: 3,
	// 		},
	// 		{
	// 			name: '9a10fa48-ef84-481f-96b4-76ae0e2f4cdb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nothing else' }],
	// 			timesAddedCount: 1,
	// 		},
	// 		{ name: '89d222d6-f41d-4225-9ff8-d04e6e435644', type: 'EXAMPLE', parts: [{ text: 'not' }] },
	// 		{ name: '68bc6f05-8262-4a6c-89cb-58cf10dd9e40', type: 'EXAMPLE', parts: [{ text: 'not at all' }] },
	// 		{ name: '507790be-def7-4f4c-8915-ca25461c522d', type: 'EXAMPLE', parts: [{ text: 'no never' }] },
	// 		{ name: '401ad813-670f-4c6a-89e5-02fe50b151a8', type: 'EXAMPLE', parts: [{ text: 'never' }] },
	// 		{ name: 'beec1c6b-e08c-4304-9803-69f9dca34ea5', type: 'EXAMPLE', parts: [{ text: 'no way no' }] },
	// 		{ name: '820e30af-773f-4eff-af43-2dd2a4ac2b30', type: 'EXAMPLE', parts: [{ text: 'not really' }] },
	// 		{
	// 			name: '7b320630-82d3-4c0a-aca0-5e5feef01414',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'nah' }],
	// 			timesAddedCount: 2,
	// 		},
	// 		{ name: '6ae6b149-427d-4a15-9243-708f9eca8b6a', type: 'EXAMPLE', parts: [{ text: "I don't" }] },
	// 		{ name: '07e5fc62-7e8d-4c7b-9422-dfb89330d05f', type: 'EXAMPLE', parts: [{ text: "I don't want" }] },
	// 		{
	// 			name: '493733b9-e82d-451d-ae7a-b112255729fb',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: 'not ' }, { text: 'today', entityType: '@sys.ignore' }],
	// 		},
	// 		{ name: 'e36c4fb6-c03e-4b6a-9c08-8f0393c96d37', type: 'EXAMPLE', parts: [{ text: 'not interested' }] },
	// 		{
	// 			name: '8561b5ba-b4f7-49d3-a671-73139ae7d6f8',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "no that's fine thank you" }],
	// 		},
	// 		{
	// 			name: 'effe4ea8-11be-4195-ba79-57bbd5aec888',
	// 			type: 'EXAMPLE',
	// 			parts: [{ text: "I'm not" }],
	// 			timesAddedCount: 3,
	// 		},
	// 	],
	// 	action: 'Topic.Topic-no',
	// 	outputContexts: [
	// 		{ name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/getopinion1', lifespanCount: 1 },
	// 		{
	// 			name: 'projects/dialogflow-project-1111/agent/sessions/-/contexts/fallback-topic-followup',
	// 			lifespanCount: 1,
	// 		},
	// 	],
	// 	messages: [
	// 		{
	// 			text: {
	// 				text: ['No problem! I was very impressed when I realized that predictive algorithms are all over,'],
	// 			},
	// 		},
	// 		{ text: { text: ['from recommendations on Youtube and Netflix to the police and the criminal justice,'] } },
	// 		{
	// 			text: {
	// 				text: [
	// 					'But can we really trust an algorithm to make predictions for the police? Are those algorithms fair?',
	// 				],
	// 			},
	// 		},
	// 	],
	// 	rootFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/87fb743b-c15b-49d0-9984-476df73439c7',
	// 	parentFollowupIntentName: 'projects/dialogflow-project-1111/agent/intents/87fb743b-c15b-49d0-9984-476df73439c7',
	// },
];

export default {
  dataIntents,
};
