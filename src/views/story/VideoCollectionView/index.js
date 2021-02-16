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
import Details from './details';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const title = 'Juno Chatbot';

const VideoCollectionView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentVideoId, setCurrentVideoId] = React.useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    if (!state.story.currentStory.id) navigate('/app', { replace: true });
    const getCollection = async () => {
      await actions.video.getCollection();
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
        <Details
          open={detailsOpen}
          handleDetailClose={handleDetailClose}
          videoId={currentVideoId}
        />
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
            <Toolbar handleDetailOpen={handleDetailOpen} />
            <Box mt={3}>
              <Collection
                videos={state.video.collection}
                handleDetailOpen={handleDetailOpen}
              />
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
};

export default VideoCollectionView;
