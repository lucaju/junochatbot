import { Box, Skeleton } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useActions, useAppState } from '@src/overmind';
import { User } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserCard from './UserCard';

interface CollectionProps {
  groupId?: number | undefined;
  filters: Map<string, number | string>;
  handleDetailOpen: (value: number) => void;
  searchQuery: string | undefined;
}

const Collection: FC<CollectionProps> = ({ groupId, filters, handleDetailOpen, searchQuery }) => {
  const { session, users } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['users', 'noContent']);

  const [filteredItems, setFilteredItems] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noContentMsg, setNoContentMsg] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const getCollection = async () => {
      if (session.isAdmin) await actions.users.getGroups();
      fetchUsers();
    };
    getCollection();
    return () => {};
  }, [session.user?.groupId]);

  useEffect(() => {
    fetchUsers();
    return () => {};
  }, [groupId]);

  useEffect(() => {
    const _items = items();
    setFilteredItems(_items);
    setNoContentMsg(
      users.list.length === 0 ? 'noUsersYet' : _items.length === 0 ? 'noContent:noMatch' : null
    );
    return () => {};
  }, [filters, searchQuery, users.list]);

  const fetchUsers = async () => {
    setIsLoading(true);
    await actions.users.getUsers(groupId);
    setIsLoading(false);
  };

  const items = () => {
    return users.list
      .filter(() => {
        if (session.isAdmin) return true;
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
      {!isLoading && noContentMsg !== null && (
        <NoContent align="left" heading={t(noContentMsg)} size="large" />
      )}
      <AnimatePresence initial={false}>
        {isLoading
          ? showSkeleton(4)
          : filteredItems.map((user) => (
              <Box
                key={user.id}
                component={motion.div}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                sx={{ overflowY: 'hidden' }}
              >
                <UserCard handleEditClick={handleDetailOpen} user={user} />
              </Box>
            ))}
      </AnimatePresence>
    </Box>
  );
};

export default Collection;
