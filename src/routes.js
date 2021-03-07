import React from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import BlankLayout from './layouts/BlankLayout';
import { ForgotView, LoginView, ResetPasswordView } from './views/auth';
import NotFoundView from './views/errors/NotFoundView';
import GroupsView from './views/GroupsView';
import StoriesView from './views/StoriesView';
import {
  ContextsView,
  ConversationView,
  GeneralView,
  TagsView,
  VideosView
} from './views/story';
import UsersView from './views/UsersView';


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
      { path: 'videos', element: <VideosView /> },
      { path: 'tags', element: <TagsView /> },
      { path: 'conversation', element: <ConversationView /> },
      { path: 'contexts', element: <ContextsView /> },
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
