import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import NoMatch from 'src/components/NoMatch';
import { useApp } from 'src/overmind';
import UserCard from './UserCard';

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    minHeight: 80,
    width: '90%',
    margin: spacing(1),
  },
  container: {
    maxHeight: '83vh',
    overflowY: 'scroll',
  },
}));

const Collection = ({ filters, groupId, handleDetailOpen, searchQuery }) => {
  const classes = useStyles();
  const { actions, state } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getCollection = async () => {
      if (state.session.isAdmin) await actions.users.getGroups();
      fetchUsers();
    };
    getCollection();
    return () => {};
  }, [state.session.user.group]);

  useEffect(() => {
    fetchUsers();
    return () => {};
  }, [groupId]);

  const fetchUsers = async () => {
    setIsLoading(true);
    await actions.users.getUsers(groupId);
    setIsLoading(false);
  };

  const fileredItems = () => {
    return state.users.list
      .filter((item) => {
        if (state.session.isAdmin) return true;
        if (item.active === true) return true;
      })
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of filters.entries()) {
          match = item[prop] === value;
          if (match === false) break;
        }
        return match;
      })
      .filter((item) => {
        if (!searchQuery) return item;
        const fullName = `${item.firstName} ${item.lastName}`;
        const match = fullName.toLowerCase().match(searchQuery.toLowerCase());
        return match;
      });
  };

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton key={i} className={classes.card} height={80} variant="rect" />
    ));
  };

  return (
    <Box className={classes.container}>
      {isLoading ? (
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {showSkeleton(4)}
        </Box>
      ) : fileredItems().length === 0 ? (
        <NoMatch />
      ) : (
        <MuuriComponent>
          {fileredItems().map((user) => (
            <UserCard
              key={user.id}
              className={classes.card}
              user={user}
              handleEditClick={handleDetailOpen}
            />
          ))}
        </MuuriComponent>
      )}
    </Box>
  );
};

Collection.propTypes = {
  filters: PropTypes.object,
  groupId: PropTypes.any,
  handleDetailOpen: PropTypes.func,
  searchQuery: PropTypes.string,
};

export default Collection;
