import { Box, Skeleton } from '@mui/material';
import NoContent from '@src/components/NoContent';
import { useActions, useAppState } from '@src/overmind';
import { User } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserCard from './UserCard';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface CollectionProps {
  groupId?: number | undefined;
  filters: Map<string, number | string>;
  handleDetailOpen: (value: number) => void;
  searchQuery: string | undefined;
}

const Collection: FC<CollectionProps> = ({ groupId, filters, handleDetailOpen, searchQuery }) => {
  const { session, users } = useAppState();
  const actions = useActions();
  const { t } = useTranslation();

  const [filteredItems, setFilteredItems] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noContentMsg, setNoContentMsg] = useState<string | null>(null);
  const [_groupId, _setGroupId] = useState<number | undefined>();

  useEffect(() => {
    setIsLoading(true);
    const getCollection = async () => {
      if (session.isAdmin && users.groups.length === 0) await actions.users.getGroups();
      fetchUsers();
    };
    getCollection();
  }, [session.user?.groupId]);

  useEffect(() => {
    _setGroupId(groupId);
    if (_groupId === groupId) return;
    fetchUsers();
  }, [groupId]);

  useEffect(() => {
    const _items = items();
    setFilteredItems(_items);
    setNoContentMsg(
      users.list.length === 0
        ? t('users:noUsersYet')
        : _items.length === 0
        ? t('common:noMatch')
        : null
    );
  }, [filters, searchQuery, users.list]);

  const fetchUsers = async () => {
    setIsLoading(true);
    await actions.users.getUsers(groupId);
    setIsLoading(false);
  };

  const items = () => {
    return users.list
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
        <NoContent align="left" heading={noContentMsg} size="large" />
      )}
      <AnimatePresence initial={false}>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 1000: 2, 1300: 3, 1600: 4, 1900: 5, 2200: 6 }}
        >
          <Masonry>
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
          </Masonry>
        </ResponsiveMasonry>
      </AnimatePresence>
    </Box>
  );
};

export default Collection;
