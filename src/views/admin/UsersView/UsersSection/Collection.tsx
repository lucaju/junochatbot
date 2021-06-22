import { Box, Collapse, Skeleton } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useApp } from '@src/overmind';
import { User } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import UserCard from './UserCard';

interface CollectionProps {
  groupId?: number | undefined;
  filters: Map<string, number | string>;
  handleDetailOpen: (value: number) => void;
  searchQuery: string | undefined;
}

const Collection: FC<CollectionProps> = ({ groupId, filters, handleDetailOpen, searchQuery }) => {
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
      .filter(() => {
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
      <Skeleton key={i} height={80} sx={{ my: 2, mx: 1 }} variant="rectangular" />
    ));
  };

  return (
    <Box>
      {isLoading ? (
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {showSkeleton(4)}
        </Box>
      ) : filteredItems.length === 0 ? (
        <NoContent />
      ) : (
        <TransitionGroup>
          {filteredItems.map((user) => (
            <Collapse key={user.id}>
              <UserCard handleEditClick={handleDetailOpen} user={user} />
            </Collapse>
          ))}
        </TransitionGroup>
      )}
    </Box>
  );
};

export default Collection;
