import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NoContent from 'src/components/NoContent';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import Collection from './Collection';
import Details from './details';
import MenuBar from './menubar';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    minHeight: '100%',
    paddingTop: spacing(3),
  },
}));

const title = 'Juno Chatbot';

const VideosView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const { t } = useTranslation(['videos']);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVideos, setHasVideos] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(undefined);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filters, setFilters] = useState(new Map());
  const [tagId, setTagId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    if (!state.story.currentStory.id) navigate('/app', { replace: true });

    const getCollection = async () => {
      await actions.videos.getVideos();
      await actions.videos.getTags();
      setIsLoading(false);
      setHasVideos(state.videos.collection.length > 0);
    };

    getCollection();
    actions.ui.updateTitle(state.story.currentStory.title);

    return () => {};
  }, []);

  const handleDetailOpen = (video = {}) => {
    setCurrentVideo(video);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentVideo(undefined);
    setDetailsOpen(false);
  };

  const updateFilters = ({ type, value, reset }) => {
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleFilterByTag = async (value) => {
    if (value === -1) value = null;
    setTagId(value);
  };

  const handleSearch = async (value) => {
    if (value === '') value = null;
    setSearchQuery(value);
  };

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <Details
          handleDetailClose={handleDetailClose}
          open={detailsOpen}
          video={currentVideo}
        />
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
          <Box mt={3}>
            <Collection
              filters={filters}
              handleDetailOpen={handleDetailOpen}
              isLoading={isLoading}
              searchQuery={searchQuery}
              tagId={tagId}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default VideosView;
