import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoContent from 'src/components/NoContent';
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

const title = 'User Groups';

const GroupsView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasGroups, setHasGroups] = useState(true);
  const [currentGroup, setCurrentGroup] = useState(undefined);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filters, setFilters] = useState(new Map());
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    const userTypeAllowed = [1];
    if (!userTypeAllowed.includes(state.session.user.roleTypeId)) {
      navigate('/app', { replace: true });
    }

    actions.ui.updateTitle(title);

    const getCollection = async () => {
      await actions.users.getGroups();
      setIsLoading(false);
      setHasGroups(state.users.groups.length > 0);
    };
    getCollection();

    return () => {};
  }, []);

  const handleDetailOpen = (group = {}) => {
    setCurrentGroup(group);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentGroup(undefined);
    setDetailsOpen(false);
  };

  const updateFilters = ({ type, value, reset }) => {
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleSearch = async (value) => {
    if (value === '') value = null;
    setSearchQuery(value);
  };

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <Details
          group={currentGroup}
          handleDetailClose={handleDetailClose}
          open={detailsOpen}
        />
        {!isLoading && (
          <MenuBar
            disabledFilters={!hasGroups}
            handleDetailOpen={handleDetailOpen}
            handleSearch={handleSearch}
            updateFilter={updateFilters}
          />
        )}
        {!hasGroups ? (
          <NoContent heading="No groups yet" />
        ) : (
          <Box mt={3}>
            <Collection
              filters={filters}
              handleDetailOpen={handleDetailOpen}
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default GroupsView;
