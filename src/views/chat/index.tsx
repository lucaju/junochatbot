import { Box, ThemeProvider, useMediaQuery, useTheme } from '@material-ui/core';
import Page from '@src/components/Page';
import { useActions, useAppState } from '@src/overmind';
import _theme from '@src/theme';
import { isError } from '@src/util/utilities';
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SideBar from './sidebar';
import Stage from './stage';
import TopBar from './topbar';

const sidebarWidth = 450;

const StoryPlay: FC = () => {
  const navigate = useNavigate();
  const { chat, session } = useAppState();
  const actions = useActions();
  const { storyId } = useParams();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    actions.story.resetState();
    actions.chat.resetState();

    if (!storyId) return navigate('/', { replace: true });
    !chat.currentStory ? getStory() : actions.ui.setPageTitle(chat.currentStory.title);

    return () => {};
  }, []);

  const getStory = async () => {
    setIsLoading(true);

    const query = new URLSearchParams(location.search);
    const isDraftStory = query.get('draft');

    const isSignIn = await actions.session.signedIn();
    if (isSignIn) {
      const isOwner = session.isStudent ? await actions.chat.checkOwnership(Number(storyId)) : null;
      if (isOwner || session.isInstructor || session.isAdmin) actions.chat.setDebug(true);
    }

    const story = isDraftStory
      ? await actions.story.getStory(Number(storyId))
      : await actions.chat.getStory(Number(storyId));

    if (isError(story)) return navigate('/', { replace: true });

    actions.chat.setCurrentStory(story);
    actions.ui.setPageTitle(story.title);

    setIsLoading(false);
  };

  return (
    <Page title="Juno Chatbot">
      <ThemeProvider theme={_theme(true)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <TopBar sidebarWidth={sidebarWidth} />
          <Stage sidebarWidth={sidebarWidth} />
          <SideBar width={sidebarWidth} />
        </Box>
      </ThemeProvider>
    </Page>
  );
};

export default StoryPlay;
