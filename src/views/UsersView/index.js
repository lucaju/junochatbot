import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import Details from './details/';
import UsersList from './UsersList';
import MenuBar from './MenuBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(3),
  },
}));

const title = 'Users';

const UsersView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [filters, setFilters] = useState(new Map());
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    const userTypeAllowed = [1, 2];
    if (!userTypeAllowed.includes(state.session.user.roleTypeId)) {
      navigate('/app', { replace: true });
    }
    actions.ui.updateTitle(title);
    return () => {};
  }, []);

  const handleDetailOpen = (user) => {
    setCurrentUser(user);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentUser({});
    setDetailsOpen(false);
  };

  const updateFilters = ({ type, value, reset }) => {
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleFilterByGroup = async (value) => {
    if (value === -1) value = null;
    setGroupId(value);
  };

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <Details
          handleDetailClose={handleDetailClose}
          open={detailsOpen}
          user={currentUser}
        />
        <MenuBar
          handleFilterByGroup={handleFilterByGroup}
          updateFilters={updateFilters}
        />
        <Box mt={3}>
          <UsersList
            filters={filters}
            groupId={groupId}
            handleDetailOpen={handleDetailOpen}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default UsersView;
