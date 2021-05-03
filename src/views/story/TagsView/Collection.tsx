import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import React, { FC, useEffect, useState } from 'react';
import NoContent from '@src/components/NoContent';
import { useApp } from '@src/overmind';
import { Tag } from '@src/types';
import TagCard from './TagCard';

interface CollectionProps {
  handleDetailOpen: (tagId: number) => void;
  filters: Map<string, number>;
  searchQuery: string | undefined;
  isLoading?: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    margin: spacing(1),
  },
  container: {
    maxHeight: '83vh',
    overflowY: 'scroll',
  },
}));

const Collection: FC<CollectionProps> = ({
  filters,
  handleDetailOpen,
  searchQuery,
  isLoading = false,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const [filteredItems, setFilteredItems] = useState<Tag[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, state.videos.tagCollection]);

  const items = () => {
    return state.videos.tagCollection
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          match = item[prop as keyof Tag] === value;
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
          {filteredItems.map((tag) => (
            <TagCard
              key={tag.id}
              className={classes.card}
              tag={tag}
              handleEditClick={handleDetailOpen}
            />
          ))}
        </MuuriComponent>
      )}
    </Box>
  );
};

export default Collection;
