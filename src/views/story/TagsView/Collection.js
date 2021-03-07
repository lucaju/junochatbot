import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import PropTypes from 'prop-types';
import React from 'react';
import NoMatch from 'src/components/NoMatch';
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

const Collection = ({ filters, handleDetailOpen, isLoading, searchQuery }) => {
  const classes = useStyles();
  const { state } = useApp();

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
      ) : fileredItems().length === 0 ? (
        <NoMatch />
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
  isLoading: PropTypes.bool,
  searchQuery: PropTypes.string,
};

export default Collection;
