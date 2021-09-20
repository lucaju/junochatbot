import { Box } from '@mui/material';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';
import Details from './details';
import MenuBar from './menubar';

const VideosSection: FC = () => {
  const { story, videos } = useAppState();
  const actions = useActions();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasVideos, setHasVideos] = useState(true);

  const [currentVideoId, setCurrentVideoId] = useState<number | undefined>();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    const getCollection = async () => {
      setIsLoading(true);
      await actions.videos.getVideos();
      await actions.videos.getTags();
      actions.ui.setPageTitle(`${story.currentStory?.title} - ${t('common:videos')}`);
      setIsLoading(false);
      setHasVideos(videos.collection.length > 0);
    };

    getCollection();

    return () => {
      actions.ui.resetTagFilter();
    };
  }, []);

  const handleDetailOpen = (videoId?: number) => {
    setCurrentVideoId(videoId);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentVideoId(undefined);
    setDetailsOpen(false);
  };

  const handleSearch = async (value: string | undefined) => {
    setSearchQuery(value);
  };

  return (
    <Box>
      <Details open={detailsOpen} handleClose={handleDetailClose} videoId={currentVideoId} />
      {!isLoading && <MenuBar handleDetailOpen={handleDetailOpen} handleSearch={handleSearch} />}
      <Box mt={3} maxHeight={'calc(100vh - 154px)'} sx={{ overflowY: 'scroll' }}>
        <Collection
          handleDetailOpen={handleDetailOpen}
          isLoading={isLoading}
          searchQuery={searchQuery}
        />
      </Box>
    </Box>
  );
};

export default VideosSection;
