import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import Results from './Results';
import Toolbar from './Toolbar';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const title = 'Users';

const UsersListView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userTypeAllowed = ['admin', 'instructor'];
    if (!userTypeAllowed.includes(state.session.user.role)) {
      navigate('/', { replace: true });
    }
    return () => {};
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await actions.users.getUsers();
      setIsLoaded(true);
      setIsLoading(false);
    };
    fetchData();
    actions.ui.updateTitle(title);
    return () => {};
  }, [isLoaded]);

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
        {isLoaded && (
          <>
            <Toolbar />
            <Box mt={3}>
              <Results users={state.users.list} />
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
};

export default UsersListView;
