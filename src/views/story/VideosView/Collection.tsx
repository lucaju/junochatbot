import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import React, { FC, useEffect, useState } from 'react';
import NoContent from '../../../components/NoContent';
import { useApp } from '../../../overmind';
import VideoCard from './VideoCard';
import { Tag, Video } from '../../../types';

interface CollectionProps {
  handleDetailOpen: (value: number) => void;
  filters: Map<string, number>;
  tagId?: number | undefined;
  searchQuery?: string | undefined;
  isLoading?: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  card: { margin: spacing(1.5) },
  container: {
    maxHeight: '83vh',
    overflowY: 'scroll',
  },
}));

const Collection: FC<CollectionProps> = ({
  handleDetailOpen,
  filters,
  searchQuery,
  tagId,
  isLoading = false
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const [filteredItems, setFilteredItems] = useState<Video[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, tagId, state.videos.collection]);

  const items = () => {
    return state.videos.collection
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          match = item[prop as keyof Video] === value;
          if (match === false) break;
        }
        return match;
      })
      .filter((item) => {
        if (!tagId) return item;
        if (item.tags) {
          const match = item.tags.some((tag:Tag) => tag.id === tagId);
          return match;
        }
      })
      .filter((item) => {
        if (!searchQuery) return item;
        const match = item.title.toLowerCase().match(searchQuery.toLowerCase());
        return match;
      });
  };

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton
        key={i}
        className={classes.card}
        height={288}
        width={320}
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
          {filteredItems.map((video) => (
            <VideoCard
              key={video.id}
              className={classes.card}
              handleEditClick={handleDetailOpen}
              video={video}
            />
          ))}
        </MuuriComponent>
      )}
    </Box>
  );
};

export default Collection;
