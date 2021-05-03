import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import React, { FC, useEffect, useState } from 'react';
import NoContent from '@src/components/NoContent';
import { useApp } from '@src/overmind';
import { Entity } from '@src/types';
import EntityCard from './EntityCard';

interface CollectionProps {
  filters: Map<string, string>;
  searchQuery: string | undefined;
  isLoading?: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  card: { margin: spacing(3) },
  container: {
    maxHeight: '83vh',
    overflowY: 'scroll',
  },
}));

const Collection: FC<CollectionProps> = ({
  filters,
  searchQuery,
  isLoading = false,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const [filteredItems, setFilteredItems] = useState<Entity[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, state.intents.entities]);

  const items = () => {
    return state.intents.entities
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          match = item[prop as keyof Entity] === value;
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
          {filteredItems.map((entity) => (
            <EntityCard
              key={entity.id}
              className={classes.card}
              entity={entity}
            />
          ))}
        </MuuriComponent>
      )}
    </Box>
  );
};

export default Collection;
