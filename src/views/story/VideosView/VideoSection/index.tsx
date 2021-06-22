import { Box } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useApp } from '@src/overmind';
import { HandleFilterType } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';
import Details from './details';
import MenuBar from './menubar';

const VideosSection: FC = () => {
  const { state, actions } = useApp();
  const { t } = useTranslation(['videos', 'common']);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVideos, setHasVideos] = useState(true);
  const [currentVideoId, setCurrentVideoId] = useState<number | undefined>();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filters, setFilters] = useState<Map<string, number>>(new Map());
  const [tagId, setTagId] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    const getCollection = async () => {
      setIsLoading(true);
      await actions.videos.getVideos();
      await actions.videos.getTags();
      actions.ui.setPageTitle(`${state.story.currentStory?.title} - ${t('common:videos')}`);
      setIsLoading(false);
      setHasVideos(state.videos.collection.length > 0);
    };

    getCollection();

    return () => {};
  }, []);

  const handleDetailOpen = (videoId?: number) => {
    setCurrentVideoId(videoId);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentVideoId(undefined);
    setDetailsOpen(false);
  };

  const updateFilters = ({ type, value, reset }: HandleFilterType) => {
    if (typeof value !== 'number') return;
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleFilterByTag = async (value: number | undefined) => {
    if (value === -1) value = undefined;
    setTagId(value);
  };

  const handleSearch = async (value: string | undefined) => {
    setSearchQuery(value);
  };

  return (
    <Box>
      <Details open={detailsOpen} handleClose={handleDetailClose} videoId={currentVideoId} />
      {!isLoading && (
        <MenuBar
          disabledFilters={!hasVideos}
          handleDetailOpen={handleDetailOpen}
          handleFilterByTag={handleFilterByTag}
          handleSearch={handleSearch}
          updateFilter={updateFilters}
        />
      )}
      {!hasVideos ? (
        <NoContent heading={t('noVideosYet')} />
      ) : (
        <Box mt={3} maxHeight={'calc(100vh - 154px)'} sx={{ overflowY: 'scroll' }}>
          <Collection
            filters={filters}
            handleDetailOpen={handleDetailOpen}
            isLoading={isLoading}
            searchQuery={searchQuery}
            tagId={tagId}
          />
        </Box>
      )}
    </Box>
  );
};

export default VideosSection;
