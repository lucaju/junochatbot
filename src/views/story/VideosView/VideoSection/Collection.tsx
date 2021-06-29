import { Box, Skeleton } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useAppState } from '@src/overmind';
import { Tag, Video } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import VideoCard from './VideoCard';

interface CollectionProps {
  filters: Map<string, number>;
  handleDetailOpen: (value: number) => void;
  isLoading?: boolean;
  searchQuery?: string | undefined;
  tagId?: number | undefined;
}

const Collection: FC<CollectionProps> = ({
  filters,
  handleDetailOpen,
  isLoading = false,
  searchQuery,
  tagId,
}) => {
  const { videos } = useAppState();
  const [filteredItems, setFilteredItems] = useState<Video[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, tagId, videos.collection]);

  const items = () => {
    return videos.collection
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
          const match = item.tags.some((tag: Tag) => tag.id === tagId);
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
      <Skeleton key={i} height={288} width={320} sx={{ m: 1.5 }} variant="rectangular" />
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
        <AnimatePresence initial={false}>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 1000: 2, 1400: 3, 1650: 4 }}>
            <Masonry>
              {filteredItems.map((video) => (
                <Box
                  key={video.id}
                  component={motion.div}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <VideoCard handleEditClick={handleDetailOpen} video={video} />
                </Box>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </AnimatePresence>
      )}
    </Box>
  );
};

export default Collection;
