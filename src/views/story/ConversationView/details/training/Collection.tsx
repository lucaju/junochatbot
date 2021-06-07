import { Collapse, makeStyles } from '@material-ui/core';
import { TrainingPhrase } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Phrase from './Phrase';
import useInfiniteScroll from 'react-infinite-scroll-hook';

interface CollectionProps {
  phraseList: TrainingPhrase[];
}

const useStyles = makeStyles(() => ({
  test: {
    height: 100,
  },
  collection: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const ITEMS_PER_PAGE = 20;

const Collection: FC<CollectionProps> = ({ phraseList }) => {
  const classes = useStyles();
  const [items, setItems] = useState<TrainingPhrase[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (phraseList.length !== 0) fetch();
    return () => {
      setItems([]);
      setPage(1);
    };
  }, [phraseList]);

  const fetch = () => {
    const list = phraseList.filter((item, i) => i < page * ITEMS_PER_PAGE);
    setItems(list);
    setPage(page + 1);
    setHasMore(list.length < phraseList.length);
  };

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: fetch,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: items.length >= phraseList.length,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
    delayInMs: 0,
  });

  return (
    <TransitionGroup className={classes.collection}>
      {items.map(({ name, type, parts, timesAddedCount }) => (
        <Collapse key={name}>
          <Phrase name={name} type={type} parts={parts} timesAddedCount={timesAddedCount} />
        </Collapse>
      ))}
      {hasMore && (
        <>
          <div ref={sentryRef} />
        </>
      )}
    </TransitionGroup>
  );
};

export default Collection;
