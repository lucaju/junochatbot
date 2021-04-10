import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import React, { FC, useEffect, useState } from 'react';
import NoContent from '../../components/NoContent';
import { useApp } from '../../overmind';
import UserCard from './UserCard';
import { User } from '../../types';

interface CollectionProps {
  handleDetailOpen: (value: number) => void;
  filters: Map<string, number>;
  searchQuery: string | undefined;
  groupId?: number | undefined;
}

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

const Collection: FC<CollectionProps> = ({
  filters,
  groupId,
  handleDetailOpen,
  searchQuery,
}) => {
  const classes = useStyles();
  const { actions, state } = useApp();
  const [filteredItems, setFilteredItems] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getCollection = async () => {
      if (state.session.isAdmin) await actions.users.getGroups();
      fetchUsers();
    };
    getCollection();
    return () => {};
  }, [state.session.user?.groupId]);

  useEffect(() => {
    fetchUsers();
    return () => {};
  }, [groupId]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, state.users.list]);

  const fetchUsers = async () => {
    setIsLoading(true);
    await actions.users.getUsers(groupId);
    setIsLoading(false);
  };

  const items = () => {
    return state.users.list
      .filter((item) => {
        if (state.session.isAdmin) return true;
      })
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          match = item[prop as keyof User] === value;
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
      ) : filteredItems.length === 0 ? (
        <NoContent />
      ) : (
        <MuuriComponent>
          {filteredItems.map((user) => (
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

export default Collection;
