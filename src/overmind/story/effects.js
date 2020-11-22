import mock from 'src/mockData';

export const getStories = async () => {
  // const response = await fetch('/general/settings');
  // return await response.json();

  //access endpoint
  const response = await fetch('https://api.chatstories.ca/admin/projects/all');

  //  const response = await fetch('https://api.localhost/admin/projects/all');
  console.log(response);
  const result = await response.json();
  console.log(result);

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mock.dataStories);
    }, 1000);
  });
};

export const createStory = async (story) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        ...story,
        id: 111,
        permalink: story.permalink,
        title: story.title,
        language: story.language,
        owner: story.owner,
        general: mock.storyGeneralDefault,
      });
    }, 1000);
  });
};

export const editStory = async (storyID) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  console.log(storyID);

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: mock.storyExample.id,
        permalink: mock.storyExample.permalink,
        title: mock.storyExample.title,
        language: mock.storyExample.language,
        owner: mock.storyExample.owner,
        general: mock.storyExample.storyGeneralDefault,
      });
    }, 1000);
  });
};
