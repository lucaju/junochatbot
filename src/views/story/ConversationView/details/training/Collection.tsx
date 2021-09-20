import { Box } from '@mui/material';
import { useAppState } from '@src/overmind';
import { TrainingPhrase } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Phrase from './Phrase';

const ITEMS_PER_PAGE = 20;

const Collection: FC = () => {
  const {
    intents: { currentIntent },
  } = useAppState();

  const [items, setItems] = useState<TrainingPhrase[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const totalLength = currentIntent?.trainingPhrases?.length ?? 0;

  useEffect(() => {
    if (!currentIntent?.trainingPhrases) return;
    if (currentIntent?.trainingPhrases?.length !== 0) fetch();
    return () => {
      setItems([]);
      setPage(1);
    };
  }, [currentIntent?.trainingPhrases]);

  const fetch = () => {
    if (!currentIntent?.trainingPhrases) return;
    const list = currentIntent?.trainingPhrases?.filter((item, i) => i < page * ITEMS_PER_PAGE);

    setItems(list);
    setPage(page + 1);
    setHasMore(list.length < totalLength);
  };

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: fetch,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: items.length >= totalLength,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
    delayInMs: 0,
  });

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" columnGap={0.5}>
      <AnimatePresence initial={false}>
        {items.map(({ name, type, parts, timesAddedCount }) => (
          <Box
            key={name}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Phrase name={name} parts={parts} timesAddedCount={timesAddedCount} type={type} />
          </Box>
        ))}
        {hasMore && (
          <>
            <div ref={sentryRef} />
          </>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Collection;
