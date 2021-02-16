import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import Details from './details/';
import GroupList from './GroupList';
import MenuBar from './MenuBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const title = 'User Groups';

const GroupsView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({});
  const [filters, setFilters] = useState(new Map());

  useEffect(() => {
    const userTypeAllowed = [1];
    if (!userTypeAllowed.includes(state.session.user.roleTypeId)) {
      navigate('/app', { replace: true });
    }
    actions.ui.updateTitle(title);
    return () => {};
  }, []);

  const handleDetailOpen = (group) => {
    setCurrentGroup(group);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentGroup({});
    setDetailsOpen(false);
  };

  const updateFilters = ({ type, value, reset }) => {
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <Details
          handleDetailClose={handleDetailClose}
          open={detailsOpen}
          group={currentGroup}
        />
        <MenuBar
          handleDetailOpen={handleDetailOpen}
          updateFilters={updateFilters}
        />
        <Box mt={3}>
          <GroupList filters={filters} handleDetailOpen={handleDetailOpen} />
        </Box>
      </Container>
    </Page>
  );
};

export default GroupsView;
