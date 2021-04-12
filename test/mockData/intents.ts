type Intent = {};

type IntentCollection = Intent[];

export const dataIntents: IntentCollection = [];
//   export const dataIntents = [
//   {
//     id: 1,
//     title: 'Welcome',
//     context: [
//       {
//         id: 1,
//         name: 'getName',
//         type: 'input',
//         spanLife: 2,
//       },
//     ],
//     tranning: 3,
//     paramenters: [
//       {
//         name: 'Name',
//         required: true,
//       },
//     ],
//     responses: [
//       {
//         id: 1,
//         type: 'text',
//         alternatives: true,
//         text: 'Hi, you’re the new writer, welcome!',
//       },
//       {
//         id: 2,
//         type: 'text',
//         alternatives: false,
//         text: 'I’m Jana. What’s your name?',
//       },
//       {
//         id: 3,
//         type: 'video',
//         alternatives: true,
//         text: 'Welcome',
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: 'Welcome Name',
//     context: [
//       {
//         id: 1,
//         name: 'getName',
//         type: 'input',
//         spanLife: 1,
//       },
//       {
//         id: 2,
//         name: 'Welcome Has Name',
//         type: 'output',
//         spanLife: 3,
//       },
//     ],
//     tranning: 3,
//     paramenters: [
//       {
//         name: 'Name',
//         required: true,
//       },
//     ],
//     responses: [
//       {
//         id: 1,
//         type: 'text',
//         alternatives: true,
//         text: 'Hi, you’re the new writer, welcome!',
//       },
//       {
//         id: 2,
//         type: 'text',
//         alternatives: false,
//         text: 'I’m Jana. What’s your name?',
//       },
//       {
//         id: 3,
//         type: 'video',
//         alternatives: true,
//         text: 'Welcome',
//       },
//     ],
//   },
// ];

export default {
  dataIntents,
};
