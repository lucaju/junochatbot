import { Box, ThemeProvider, useMediaQuery, useTheme } from '@material-ui/core';
import Page from '@src/components/Page';
import { useActions, useAppState } from '@src/overmind';
import { Story } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from './sidebar';
import Stage from './stage';
import TopBar from './topbar';
import _theme from '@src/theme';

const sidebarWidth = 450;

const StoryPlay: FC = () => {
  const { t } = useTranslation(['home']);
  const navigate = useNavigate();
  const { storyId } = useParams();

  const { chat } = useAppState();
  const actions = useActions();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isLoading, setIsLoading] = useState(false);

  const [story, setStory] = useState<Story | undefined>(chat.currentStory);

  useEffect(() => {
    actions.chat.resetState();
    if (!storyId) return navigate('/', { replace: true });

    const getStory = async () => {
      setIsLoading(true);
      const _story = await actions.chat.getStory(Number(storyId));
      if (isError(_story)) return navigate('/', { replace: true });

      setStory(_story);
      actions.ui.setPageTitle(_story.title);

      setIsLoading(false);
    };

    !chat.currentStory ? getStory() : actions.ui.setPageTitle(chat.currentStory.title);

    return () => {};
  }, []);

  return (
    <Page title={t('Home')}>
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
