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
import Details from './details/';
import UsersList from './UsersList';
import Toolbar from './Toolbar';

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
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [currentUserId, setCurrentUserId] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userTypeAllowed = ['Admin', 'Instructor'];
    if (!userTypeAllowed.includes(state.session.user.roleType)) {
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

  const handleDetailOpen = (id) => {
    setCurrentUserId(id);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentUserId(0);
    setDetailsOpen(false);
  };

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <Details
          open={detailsOpen}
          handleDetailClose={handleDetailClose}
          userId={currentUserId}
        />
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
            <Toolbar handleDetailOpen={handleDetailOpen} />
            <Box mt={3}>
              <UsersList
                users={state.users.list}
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
