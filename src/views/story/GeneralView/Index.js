import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import BottomBar from './BottomBar';
import Main from './main';
import SideBar from './sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  container: { height: 'calc(100vh - 64px - 68px - 36px)' },
}));

const title = 'Chat Stories';

const GeneralView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    if (!state.story.currentStory) navigate('/', { replace: true });

    const getStory = async () => {
      await actions.story.getStory(state.story.currentStory.id);
      setStoryData(state.story.currentStory);
      actions.ui.updateTitle(state.story.currentStory.title);
      setIsLoading(false);
    };

    console.log(state.story.currentStory);

    if (state.story.currentStory.new) {
      setStoryData(state.story.currentStory);
      actions.ui.updateTitle(state.story.currentStory.title);
      setIsLoading(false);
    } else {
      getStory();
    }

    return () => {};
  }, []);

  return (
    <Page className={classes.root} title={title}>
      {isLoading ? (
        <Box
          display="flex"
          height="100%"
          justifyContent="center"
          alignItems="flex-start"
        >
          <CircularProgress
            className={classes.spinner}
            size={60}
            thickness={4}
          />
        </Box>
      ) : (
        <>
          <Box flexGrow={1} height="100%">
            <Container maxWidth={false} className={classes.container}>
              <Box
                alignItems="flex-start"
                display="flex"
                flexDirection="row"
                className={classes.bar}
              >
                <Box flexGrow={1} pr={2}>
                  <Main storyData={storyData} />
                </Box>
                <Box width="330px">
                  <SideBar storyData={storyData} />
                </Box>
              </Box>
            </Container>
          </Box>
          <Box>
            <BottomBar storyData={storyData} />
          </Box>
        </>
      )}
    </Page>
  );
};

export default GeneralView;
