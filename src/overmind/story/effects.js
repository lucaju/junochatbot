import mock from 'src/mockData';
import { API_URL } from '../../../config/config.js';

export const storyAPI = {
  async getStories() {
    //access endpoint
    // const response = await fetch(
    //   'https://api.junochatbot.ca/admin/projects/all'
    // );
    // console.log(response);
    // const result = await response.json();
    // console.log(result);

    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mock.dataStories);
      }, 1000);
    });
  },

  async createStory(newStory) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        const story = mock.storyDefault;
        story.new = true;
        story.id = 1000;
        story.title = newStory.title;
        story.slug = newStory.slug;
        story.languageCode = newStory.languageCode;
        story.owner = newStory.owner;

        //mock add to list
        const storyToList = {
          id: story.id,
          title: story.title,
          slug: story.slug,
          icon: story.general.bot.avatar,
          image: story.general.featuredImage,
          authors: ['Luciano Frizzera'],
          year: 2020,
          published: story.general.publish,
          public: story.general.public,
          synopsis: story.general.synopsis,
        };

        mock.dataStories.unshift(storyToList);

        resolve(story);
      }, 1000);
    });
  },

  async getStory(storyID) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mock.storyExample);
      }, 1000);
    });
  },

  async updateStory(story) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        //mock update list
        const storyToList = {
          id: story.id,
          title: story.title,
          slug: story.slug,
          icon: story.general.bot.avatar,
          image: story.general.featuredImage,
          authors: ['Luciano Frizzera'],
          year: 2020,
          published: story.general.publish,
          public: story.general.public,
          synopsis: story.general.synopsis,
        };

        mock.dataStories = mock.dataStories.map((story) => {
          if (story.id === storyToList.id) return storyToList;
          return story;
        });

        resolve(story);
      }, 1000);
    });
  },

  async deleteStory(storyId) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        mock.dataStories = mock.dataStories.filter(
          (story) => story.id !== storyId
        );
        resolve(storyId);
      }, 1000);
    });
  },
};
