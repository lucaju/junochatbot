import { Box, Container, makeStyles } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NoContent from '../../../components/NoContent';
import Page from '../../../components/Page';
import { useApp } from '../../../overmind';
import { HandleFilterType } from '../../../types';
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

const VideosView: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const { t } = useTranslation(['videos']);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVideos, setHasVideos] = useState(true);
  const [currentVideoId, setCurrentVideoId] = useState<number | undefined>();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filters, setFilters] = useState<Map<string, number>>(new Map());
  const [tagId, setTagId] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    if (!state.story.currentStory) {
      navigate('/app', { replace: true });
      return;
    }

    actions.ui.updateTitle(state.story.currentStory.title);

    const getCollection = async () => {
      await actions.videos.getVideos();
      await actions.videos.getTags();
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
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <Details
          open={detailsOpen}
          handleClose={handleDetailClose}
          videoId={currentVideoId}
        />
        {!isLoading && (
          <MenuBar
            handleDetailOpen={handleDetailOpen}
            handleFilterByTag={handleFilterByTag}
            handleSearch={handleSearch}
            updateFilter={updateFilters}
            disabledFilters={!hasVideos}
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
