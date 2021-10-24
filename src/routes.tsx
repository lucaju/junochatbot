import React from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import BlankLayout from './layouts/BlankLayout';
import UsersView from './views/admin/UsersView';
import { ForgotView, LoginView, ResetPasswordView } from './views/auth';
import StoryPlay from './views/chat';
import NotFoundView from './views/errors/NotFoundView';
import HomeView from './views/homepage';
import StoriesView from './views/StoriesView';
import {
  ContextsView,
  ConversationView,
  EntitiesView,
  GeneralView,
  VideosView,
} from './views/story';
import TutorialView from './views/tutorial';

// * react-router-dom REFERENCES:
// https://medium.com/frontend-digest/whats-new-in-react-router-6-732b06cc83e4
// https://reacttraining.com/blog/react-router-v6-pre/

const routes = [
  {
    path: '/app/stories',
    element: <AppLayout showStoryMenu={true} />,
    children: [
      { path: ':storyId', element: <GeneralView /> },
      { path: ':storyId/videos', element: <VideosView /> },
      { path: ':storyId/conversation', element: <ConversationView /> },
      { path: ':storyId/contexts', element: <ContextsView /> },
      { path: ':storyId/entities', element: <EntitiesView /> },
      { index: true, element: <Navigate to="/app/" /> },
      { path: '*', element: <Navigate to="/app/" /> },
    ],
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <StoriesView /> },
      { path: 'users', element: <UsersView /> },
    ],
  },
  {
    path: '/story',
    element: <BlankLayout />,
    children: [{ path: ':storyId', element: <StoryPlay /> }],
  },
  {
    path: '/tutorial',
    element: <BlankLayout />,
    children: [{ index: true, element: <TutorialView /> }],
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
      { index: true, element: <HomeView /> },
    ],
  },
];

export default routes;
