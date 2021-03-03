import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import TagCard from './TagCard';
import { useApp } from 'src/overmind';

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    margin: spacing(1),
  },
  container: {
    maxHeight: '83vh',
    overflowY: 'scroll',
  },
}));

const Collection = ({ filters, handleDetailOpen, searchQuery }) => {
  const classes = useStyles();
  const { state, actions } = useApp();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCollection = async () => {
      await actions.videos.getTags();
      setIsLoading(false);
    };
    getCollection();
    return () => {};
  }, []);

  const fileredItems = () => {
    return state.videos.tagCollection
      .filter((tag) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of filters.entries()) {
          match = tag[prop] === value;
          if (match === false) break;
        }
        return match;
      })
      .filter((tag) => {
        if (!searchQuery) return tag;
        const match = tag.name.toLowerCase().match(searchQuery.toLowerCase());
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
      ) : (
        <MuuriComponent>
          {fileredItems().map((tag) => (
            <TagCard
              key={tag.id}
              className={classes.card}
              handleEditClick={(tag) => handleDetailOpen(tag)}
              tag={tag}
            />
          ))}
        </MuuriComponent>
      )}
    </Box>
  );
};

Collection.propTypes = {
  filters: PropTypes.object,
  handleDetailOpen: PropTypes.func,
  searchQuery: PropTypes.string,
};

export default Collection;