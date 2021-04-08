import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import React, { FC, useEffect, useState } from 'react';
import NoContent from '../../components/NoContent';
import { useApp } from '../../overmind';
import { UserGroup } from '../../types';
import GroupCard from './GroupCard';

interface CollectionProps {
  handleDetailOpen: (groupId: number) => void;
  filters: Map<string, number>;
  searchQuery: string | undefined;
  isLoading?: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  card: { margin: spacing(1) },
  container: {
    maxHeight: '83vh',
    overflowY: 'scroll',
  },
}));

const Collection: FC<CollectionProps> = ({
  filters,
  searchQuery,
  handleDetailOpen,
  isLoading = false,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const [filteredItems, setFilteredItems] = useState<UserGroup[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, state.users.groups]);

  const items = () => {
    return state.users.groups
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          const valueActive: number | boolean =
            prop !== 'active' ? value : value === 1 ? true : false;
          match = item[prop as keyof UserGroup] === valueActive;
          if (match === false) break;
        }
        return match;
      })
      .filter((item) => {
        if (!searchQuery) return item;
        const match = item.name.toLowerCase().match(searchQuery.toLowerCase());
        return match;
      });
  };

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton
        key={i}
        className={classes.card}
        height={44}
        width={30 + Math.random() * 100}
        variant="rect"
      />
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
          {filteredItems.map((group) => (
            <GroupCard
              key={group.id}
              className={classes.card}
              group={group}
              handleEditClick={handleDetailOpen}
            />
          ))}
        </MuuriComponent>
      )}
    </Box>
  );
};

export default Collection;
