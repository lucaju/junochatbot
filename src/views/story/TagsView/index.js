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
import Toolbar from './Toolbar';
import Details from './details';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const title = 'Juno Chatbot';

const TagsView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTagId, setCurrentTagId] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    if (!state.story.currentStory.id) navigate('/app', { replace: true });
    const getCollection = async () => {
      await actions.tag.getCollection();
      setIsLoading(false);
    };
    getCollection();
    return () => {};
  }, []);

  const handleDetailOpen = (id) => {
    setCurrentTagId(id);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentTagId(0);
    setDetailsOpen(false);
  };

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <Details
          open={detailsOpen}
          handleDetailClose={handleDetailClose}
          tagId={currentTagId}
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
                tags={state.tag.collection}
                handleDetailOpen={handleDetailOpen}
              />
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
};

export default TagsView;
