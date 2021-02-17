import React from 'react';
import { Navigate } from 'react-router-dom';

import BlankLayout from './layouts/BlankLayout';
import AppLayout from './layouts/AppLayout';
// import MainLayout from './layouts/MainLayout';

import { LoginView, ForgotView, ResetPasswordView } from './views/auth';

import NotFoundView from './views/errors/NotFoundView';

import StoriesView from './views/StoriesView';
import UsersView from './views/UsersView';
import GroupsView from './views/GroupsView';

import {
  GeneralView,
  VideoCollectionView,
  NarrativeView,
  ContextsView,
  TagsView,
} from './views/story';

// * react-router-dom REFERENCES:
// https://medium.com/frontend-digest/whats-new-in-react-router-6-732b06cc83e4
// https://reacttraining.com/blog/react-router-v6-pre/

// ? Can / should use /:storyID ?

const routes = [
  {
    path: '/app/story',
    element: <AppLayout showStoryMenu={true} />,
    children: [
      { path: 'general', element: <GeneralView /> },
      { path: 'video-collection', element: <VideoCollectionView /> },
      { path: 'narrative', element: <NarrativeView /> },
      { path: 'contexts', element: <ContextsView /> },
      { path: 'tags', element: <TagsView /> },
      { path: '*', element: <Navigate to="/app/story/general" /> },
    ],
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { path: '/stories', element: <StoriesView /> },
      { path: '/users', element: <UsersView /> },
      { path: '/groups', element: <GroupsView /> },
      { path: '/', element: <Navigate to="/app/stories" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'forgot', element: <ForgotView /> },
      { path: 'newuser', element: <ResetPasswordView /> },
      { path: 'resetpassword', element: <ResetPasswordView /> },
      { path: '404', element: <NotFoundView /> },
      // { path: '*', element: <Navigate to="/404" /> },
      { path: '/', element: <Navigate to="/app" /> },
    ],
  },
];

export default routes;
