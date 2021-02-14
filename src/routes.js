import React from 'react';
import { Navigate } from 'react-router-dom';

import BlankLayout from './layouts/BlankLayout';
import StoryLayout from './layouts/StoryLayout';
import MainLayout from './layouts/MainLayout';

import {
  LoginView,
  ForgotView,
  // ResetPasswordView
} from './views/auth';

import NotFoundView from './views/errors/NotFoundView';

import StoriesView from './views/StoriesView';
import UsersListView from './views/UsersListView';

import {
  GeneralView,
  VideoCollectionView,
  ScreenplayView,
  ContextsView,
  TagsView,
} from './views/story';

// * react-router-dom REFERENCES:
// https://medium.com/frontend-digest/whats-new-in-react-router-6-732b06cc83e4
// https://reacttraining.com/blog/react-router-v6-pre/

// ? Can / should use /:storyID ?

const routes = [
  {
    path: 'story',
    element: <StoryLayout />,
    children: [
      { path: 'general', element: <GeneralView /> },
      { path: 'video-collection', element: <VideoCollectionView /> },
      { path: 'screenplay', element: <ScreenplayView /> },
      { path: 'contexts', element: <ContextsView /> },
      { path: 'tags', element: <TagsView /> },
      { path: '*', element: <Navigate to="/story/general" /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <StoriesView /> },
      { path: 'users', element: <UsersListView /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'forgot', element: <ForgotView /> },
      // { path: 'newuser', element: <ResetPasswordView /> },
      // { path: 'reset-password', element: <ResetPasswordView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
