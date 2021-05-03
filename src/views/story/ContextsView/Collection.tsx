import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import React, { FC, useEffect, useState } from 'react';
import NoContent from '@src/components/NoContent';
import { useApp } from '@src/overmind';
import { ContextRelation } from '@src/types';
import ContextCard from './ContextCard';

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
  const [filteredItems, setFilteredItems] = useState<ContextRelation[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, state.intents.contexts]);

  const items = () => {
    return state.intents.contexts
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          if  (prop === 'direction') {
            match = false;
            if (value === 'In' && item.inputs) match = true;
            if (value === 'Out' && item.outputs) match = true;
          } else {
            match = item[prop as keyof ContextRelation] === value;
            if (match === false) break;
          }
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
          {filteredItems.map((context) => (
            <ContextCard
              key={context.name}
              className={classes.card}
              context={context}
            />
          ))}
        </MuuriComponent>
      )}
    </Box>
  );
};

export default Collection;
