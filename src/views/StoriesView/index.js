import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import { MuuriComponent } from 'muuri-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import AddStoryCard from './AddStoryCard';
import AddStoryDialog from './AddStoryDialog';
import NoStories from './NoStories';
import StoryCard from './StoryCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  grid: {
    position: 'relative',
    maxWidth: 1280,
    margin: '0 -10px',
    '-moz-box-sizing': 'content-box',
    '-webkit-box-sizing': 'content-box',
    boxSizing: 'content-box',
  },
  item: {
    margin: 20,
  },
  spinner: {
    marginTop: '25%',
  },
}));

const title = 'My Stories';

const Stories = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await actions.session.getStories();
      setIsLoaded(true);
      setIsLoading(false);
    };
    fetchData();
    actions.ui.updateTitle(title);
    return () => {};
  }, []);

  const stories =
    state.session.stories.length > 0 && !state.session.isStudent
      ? [AddStoryCard, ...state.session.stories]
      : state.session.stories;

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDiaglogClose = () => {
    setAddDialogOpen(false);
  };

  const triggerEditStory = (storyId) => {
    actions.session.editStory(storyId);
    navigate('/story/general', { replace: true });
  };

  return (
    <Page className={classes.root} title={title}>
      <AddStoryDialog
        open={addDialogOpen}
        handleClose={handleAddDiaglogClose}
        triggerEditStory={triggerEditStory}
      />
      <Container maxWidth={false}>
        {!isLoaded && isLoading && (
          <Box
            display="flex"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress
              className={classes.spinner}
              size={60}
              thickness={4}
            />
          </Box>
        )}
        {isLoaded && stories.length > 0 && (
          <MuuriComponent>
            {stories.map((story, index) => {
              return index === 0 && !state.session.isStudent ? (
                <AddStoryCard
                  className={classes.item}
                  key="addCard"
                  openDialog={handleAddDialogOpen}
                />
              ) : (
                <StoryCard
                  className={classes.item}
                  key={story.title}
                  story={story}
                  triggerEditStory={triggerEditStory}
                />
              );
            })}
          </MuuriComponent>
        )}
        {isLoaded && stories.length === 0 && (
          <NoStories openDialog={handleAddDialogOpen} />
        )}
      </Container>
    </Page>
  );
};

export default Stories;
