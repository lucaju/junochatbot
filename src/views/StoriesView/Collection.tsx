import { Box, Skeleton } from '@mui/material';
import NoContent from '@src/components/NoContent';
import { useActions, useAppState } from '@src/overmind';
import { Story } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import NoStories from './NoStories';
import StoryCard from './StoryCard';
interface CollectionProps {
  filters: Map<string, number>;
  isLoading: boolean;
  handleAddDialogOpen: () => void;
  searchQuery: string | undefined;
  triggerEditStory: (value: number) => void;
  groupId?: number;
}

const Collection: FC<CollectionProps> = ({
  filters,
  groupId,
  handleAddDialogOpen,
  isLoading,
  searchQuery,
  triggerEditStory,
}) => {
  const { t } = useTranslation();
  const { story } = useAppState();
  const actions = useActions();
  const [filteredItems, setFilteredItems] = useState<Story[]>([]);
  const [noContentMsg, setNoContentMsg] = useState<string | null>(null);
  const [_groupId, _setGroupId] = useState<number | undefined>();

  useEffect(() => {
    const _items = items();
    setFilteredItems(_items);
    setNoContentMsg(
      story.stories.length === 0
        ? t('stories:noStoriesYet')
        : _items.length === 0
        ? t('common:noMatch')
        : null
    );
  }, [filters, searchQuery, groupId, story.stories]);

  useEffect(() => {
    _setGroupId(groupId);
    if (_groupId === groupId) return;
    fetchStories();
  }, [groupId]);

  const fetchStories = async () => {
    isLoading = true;
    groupId ? await actions.story.getStoriesByGroup(groupId) : await actions.story.getStories();
    isLoading = false;
  };

  const items = () => {
    return story.stories
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          switch (prop) {
            case 'user.id': {
              if (!item.user) {
                match = false;
                break;
              }
              match = item.user.id === value;
              break;
            }
            case 'published': {
              const valuePublished: boolean = value === 1 ? true : false;
              match = item.published === valuePublished;
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
        const userFullName = item.user ? `${item.user.firstName} ${item.user.lastName}` : '';
        const match =
          item.title.toLowerCase().match(searchQuery.toLowerCase()) ||
          userFullName.toLowerCase().match(searchQuery.toLowerCase());
        return match;
      });
  };

  const showSkeleton = (qty = 5) => {
    return new Array(qty)
      .fill(0)
      .map((sk, i) => <Skeleton key={i} height={200} sx={{ m: 2.5 }} variant="rectangular" />);
  };

  return (
    <Box>
      {!isLoading &&
        (noContentMsg === t('stories:noStoriesYet') ? (
          <NoStories openDialog={handleAddDialogOpen} />
        ) : (
          noContentMsg === t('common:noMatch') && (
            <NoContent align="left" heading={noContentMsg} size="large" />
          )
        ))}
      <AnimatePresence initial={false}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1400: 3, 1800: 4 }}>
          <Masonry>
            {isLoading
              ? showSkeleton(4)
              : filteredItems.map((story) => (
                  <Box
                    key={story.id}
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <StoryCard showEdit={true} story={story} triggerEditStory={triggerEditStory} />
                  </Box>
                ))}
          </Masonry>
        </ResponsiveMasonry>
      </AnimatePresence>
    </Box>
  );
};

export default Collection;
