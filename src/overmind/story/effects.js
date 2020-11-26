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

export const createStory = async (newStory) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const story = mock.storyDefault;
      story.new = true;
      story.id = 1000;
      story.title = newStory.title;
      story.slug = newStory.slug;
      story.language = newStory.language;
      story.owner = newStory.owner;

      //mock add to list
      const storyToList = {
        id: story.id ,
        title: story.title,
        slug: story.slug,
        icon: story.general.bot.avatar,
        image: story.general.featuredImage,
        genre: story.general.genre,
        authors: ['Luciano Frizzera'],
        year: 2020,
        published: story.general.publish,
        public: story.general.public,
        description: story.general.description
      };

      mock.dataStories.unshift(storyToList);

      resolve(story);
    }, 1000);
  });
};

export const getStory = async (storyID) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  // console.log(storyID);

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mock.storyExample);
    }, 1000);
  });
};

export const updateStory = async (story) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  // console.log(storyID);

  return await new Promise((resolve, reject) => {
    setTimeout(() => {

      //mock update list
      const storyToList = {
        id: story.id ,
        title: story.title,
        slug: story.slug,
        icon: story.general.bot.avatar,
        image: story.general.featuredImage,
        genre: story.general.genre,
        authors: ['Luciano Frizzera'],
        year: 2020,
        published: story.general.publish,
        public: story.general.public,
        description: story.general.description
      };

      mock.dataStories = mock.dataStories.map((story) => {
        if (story.id === storyToList.id) return storyToList;
        return story;
      });

      resolve(story);
    }, 1000);
  });
};

export const deleteStory = async (storyId) => {
  //access endpoint
  // const response = await fetch('/general/settings');
  // return await response.json();

  // console.log(storyID);

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      mock.dataStories = mock.dataStories.filter(
        (story) => story.id !== storyId
      );
      resolve(storyId);
    }, 1000);
  });
};
