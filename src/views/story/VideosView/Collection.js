import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import PropTypes from 'prop-types';
import React from 'react';
import NoMatch from 'src/components/NoMatch';
import { useApp } from 'src/overmind';
import VideoCard from './VideoCard';

const useStyles = makeStyles(({ spacing }) => ({
  card: { margin: spacing(1.5) },
  container: {
    maxHeight: '83vh',
    overflowY: 'scroll',
  },
}));

const Collection = ({
  filters,
  handleDetailOpen,
  isLoading,
  searchQuery,
  tagId,
}) => {
  const classes = useStyles();
  const { state } = useApp();

  const fileredItems = () => {
    return state.videos.collection
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of filters.entries()) {
          match = item[prop] === value;
          if (match === false) break;
        }
        return match;
      })
      .filter((item) => {
        if (!tagId) return item;
        const match = item.tags.some((tag) => tag.id === tagId);
        return match;
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
      ) : fileredItems().length === 0 ? (
        <NoMatch />
      ) : (
        <MuuriComponent>
          {fileredItems().map((video) => (
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

Collection.propTypes = {
  filters: PropTypes.object,
  handleDetailOpen: PropTypes.func,
  isLoading: PropTypes.bool,
  searchQuery: PropTypes.string,
  tagId: PropTypes.any,
};

export default Collection;
