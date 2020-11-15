import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import { MuuriComponent } from 'muuri-react';
import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import AddStoryCard from './AddStoryCard';
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

  const stories = state.session.stories
    ? [AddStoryCard, ...state.session.stories]
    : null;

  return (
    <Page className={classes.root} title={title}>
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
        {isLoaded && stories && (
          <MuuriComponent>
            {stories.map((story, index) => {
              return index === 0 ? (
                <AddStoryCard className={classes.item} key="addCard" />
              ) : (
                <StoryCard
                  className={classes.item}
                  key={story.title}
                  story={story}
                />
              );
            })}
          </MuuriComponent>
        )}
        {isLoaded && !stories && <NoStories />}
      </Container>
    </Page>
  );
};

export default Stories;
