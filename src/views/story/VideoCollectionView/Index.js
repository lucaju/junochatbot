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
import Collection from './Collection';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const title = 'Chat Stories';

const UsersListView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentVideoId, setCurrentVideoId] = React.useState(0);

  useEffect(() => {
    if (!state.story.currentStory.id) navigate('/', { replace: true });
    const getCollection = async () => {
      await actions.story.getVideoCollection(state.story.currentStory.id);
      console.log(state.story.currentStory);
      setIsLoading(false);
    };
    getCollection();
    return () => {};
  }, []);

  const handleDetailOpen = (id) => {
    setCurrentVideoId(id);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentVideoId(0);
    setDetailsOpen(false);
  };

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        {/* <Details
          open={detailsOpen}
          handleDetailClose={handleDetailClose}
          videoId={currentVideoId}
        /> */}
        {isLoading && (
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
        {!isLoading && (
          <>
            <Box mt={3}>
              <Collection
                videos={state.story.currentStory.videoCollection}
                handleDetailOpen={handleDetailOpen}
              />
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
};

export default UsersListView;
