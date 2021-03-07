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

const title = 'Juno Chatbot';

const ContextView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!state.story.currentStory.id) navigate('/app', { replace: true });
    const getCollection = async () => {
      await actions.intents.getContextCollection();
      setIsLoading(false);
    };
    getCollection();
    return () => {};
  }, []);

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
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
              <Collection contexts={state.intents.contextCollection} />
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
};

export default ContextView;
