import React from 'react';
import { Navigate } from 'react-router-dom';

import BlankLayout from './layouts/BlankLayout';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';

import LoginView from './views/auth/LoginView';
import NotFoundView from './views/errors/NotFoundView';
import StoriesView from './views/StoriesView';
import UsersListView from './views/UsersListView';

import GeneralView from './views/GeneralView';

// * react-router-dom REFERENCES:
// https://medium.com/frontend-digest/whats-new-in-react-router-6-732b06cc83e4
// https://reacttraining.com/blog/react-router-v6-pre/

// ? Can / should use /:storyID ?

const routes = [
  {
    path: 'story',
    element: <DashboardLayout />,
    children: [
      { path: 'general', element: <GeneralView /> },
      // { path: 'videos', element: <VideosView /> },
      // { path: 'screenplay', element: <ScreenplayView /> },
      // { path: 'contexts', element: <ContextsView /> },
      // { path: 'tags', element: <TagsView /> },
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
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
