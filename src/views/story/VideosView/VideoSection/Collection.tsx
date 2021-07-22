import { Box, Skeleton } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useAppState } from '@src/overmind';
import { Video } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import VideoCard from './VideoCard';

interface CollectionProps {
  handleDetailOpen: (value: number) => void;
  isLoading?: boolean;
  searchQuery?: string | undefined;
}

const Collection: FC<CollectionProps> = ({ handleDetailOpen, isLoading = false, searchQuery }) => {
  const { t } = useTranslation(['videos', 'common, noContent']);
  const { ui, videos } = useAppState();
  const [filteredItems, setFilteredItems] = useState<Video[]>([]);
  const [noContentMsg, setNoContentMsg] = useState<string | null>(null);

  useEffect(() => {
    const _items = items();
    setFilteredItems(_items);
    setNoContentMsg(
      videos.collection.length === 0
        ? 'noVideosYet'
        : _items.length === 0
        ? 'noContent:noMatch'
        : null
    );
    return () => {};
  }, [searchQuery, videos.collection, ui.videoView.tagFilter]);

  const items = () => {
    return videos.collection
      .filter((item) => {
        if (!ui.videoView.tagFilter) return item;
        if (item.tags) {
          const match = item.tags.some((tag) => tag.id === ui.videoView.tagFilter);
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
      <Skeleton key={i} height={288} sx={{ m: 1.5 }} variant="rectangular" />
    ));
  };

  return (
    <Box>
      {!isLoading && noContentMsg !== null && (
        <NoContent align="left" heading={t(noContentMsg)} size="large" />
      )}
      <AnimatePresence initial={false}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 1000: 2, 1400: 3, 1650: 4 }}>
          <Masonry>
            {isLoading
              ? showSkeleton(4)
              : filteredItems.map((video) => (
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
    </Box>
  );
};

export default Collection;
