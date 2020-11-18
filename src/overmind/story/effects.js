export const createStory = async (story) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log(newStory);
      resolve({...story, id: 111});
    }, 1000);
  });
};

// const newStory = {
//   id: 111,
//   title: 'Vai',
//   language: 'en-CA',
//   user: 'lucaju@gmail.com',
// };