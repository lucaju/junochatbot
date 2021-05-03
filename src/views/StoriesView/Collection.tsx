import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import React, { FC, useEffect, useState } from 'react';
import NoContent from '@src/components/NoContent';
import { useApp } from '@src/overmind';
import { Story } from '@src/types';
import StoryCard from './StoryCard';

interface CollectionProps {
  triggerEditStory: (value: number) => void;
  filters: Map<string, number>;
  searchQuery: string | undefined;
  groupId?: number;
  isLoading: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  card: { margin: spacing(2.5) },
  container: {
    maxHeight: '83vh',
    overflowY: 'scroll',
  },
}));

const Collection: FC<CollectionProps> = ({
  triggerEditStory,
  filters,
  searchQuery,
  groupId,
  isLoading,
}) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [filteredItems, setFilteredItems] = useState<Story[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, groupId, state.story.stories]);

  useEffect(() => {
    fetchStories();
    return () => {};
  }, [groupId]);

  const fetchStories = async () => {
    isLoading = true;
    groupId
      ? await actions.story.getStoriesByGroup(groupId)
      : await actions.story.getStories();
    isLoading = false;
  };

  const items = () => {
    return state.story.stories
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          switch(prop) {
            case 'user.id': {
              if (!item.user) {
                match = false;
                break;
              }
              match = item.user.id === value;
              break;
            }
            case 'published': {
              const valueAPublished: boolean = value === 1 ? true : false;
              match = !!item.publishedDate === valueAPublished;
              break;
            }
            default: {
              match = item[prop as keyof Story] === value;
              break;
            }
          }
          
          if (match === false) break;
        }
        return match;
      })
      .filter((item) => {
        if (!searchQuery) return item;
        const userFullName = item.user
          ? `${item.user.firstName} ${item.user.lastName}`
          : '';
        const match =
          item.title.toLowerCase().match(searchQuery.toLowerCase()) ||
          userFullName.toLowerCase().match(searchQuery.toLowerCase());
        return match;
      });
  };

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton
        key={i}
        className={classes.card}
        width={300}
        height={200}
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
          {filteredItems.map((story) => (
            <StoryCard
              key={story.id}
              className={classes.card}
              story={story}
              triggerEditStory={triggerEditStory}
              showEdit={true}
            />
          ))}
        </MuuriComponent>
      )}
    </Box>
  );
};

export default Collection;
