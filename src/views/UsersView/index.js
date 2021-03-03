import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import Collection from './Collection';
import Details from './details/';
import MenuBar from './menubar';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    minHeight: '100%',
    paddingTop: spacing(3),
  },
}));

const title = 'Users';

const UsersView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filters, setFilters] = useState(new Map());
  const [groupId, setGroupId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    const userTypeAllowed = [1, 2];
    if (!userTypeAllowed.includes(state.session.user.roleTypeId)) {
      navigate('/app', { replace: true });
    }
    actions.ui.updateTitle(title);
    return () => {};
  }, []);

  const handleDetailOpen = (user = {}) => {
    setCurrentUser(user);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentUser(undefined);
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

  const handleSearch = async (value) => {
    if (value === '') value = null;
    setSearchQuery(value);
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
          handleDetailOpen={handleDetailOpen}
          handleFilterByGroup={handleFilterByGroup}
          updateFilter={updateFilters}
          handleSearch={handleSearch}
        />
        <Box mt={3}>
          <Collection
            filters={filters}
            groupId={groupId}
            handleDetailOpen={handleDetailOpen}
            searchQuery={searchQuery}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default UsersView;
