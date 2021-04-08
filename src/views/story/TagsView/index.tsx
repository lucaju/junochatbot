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

const TagsView: FC = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const { t } = useTranslation(['tags']);
  const [isLoading, setIsLoading] = useState(true);
  const [hasTags, setHasTags] = useState(true);
  const [currentTagId, setCurrentTagId] = useState<number | undefined>();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filters, setFilters] = useState<Map<string, number>>(new Map());
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    if (!state.story.currentStory) {
      navigate('/app', { replace: true });
      return;
    }

    actions.ui.updateTitle(state.story.currentStory.title);

    const getCollection = async () => {
      await actions.videos.getTags();
      setIsLoading(false);
      setHasTags(state.videos.tagCollection.length > 0);
    };

    getCollection();

    return () => {};
  }, []);

  const handleDetailOpen = (tagId?: number) => {
    setCurrentTagId(tagId);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentTagId(undefined);
    setDetailsOpen(false);
  };

  const updateFilters = ({ type, value, reset }: HandleFilterType) => {
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
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
          tagId={currentTagId}
        />
        {!isLoading && (
          <MenuBar
            handleDetailOpen={handleDetailOpen}
            handleSearch={handleSearch}
            updateFilter={updateFilters}
            disabledFilters={!hasTags}
          />
        )}
        {!hasTags ? (
          <NoContent heading={t('noTagsYet')} />
        ) : (
          <Box mt={3}>
            <Collection
              handleDetailOpen={handleDetailOpen}
              filters={filters}
              searchQuery={searchQuery}
              isLoading={isLoading}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default TagsView;
