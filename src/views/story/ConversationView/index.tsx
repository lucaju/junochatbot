import { Box, Container } from '@mui/material';
import Page from '@src/components/Page';
import { useActions, useAppState } from '@src/overmind';
import { HandleFilterType } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Collection from './Collection';
import Details from './details';
import MenuBar from './menubar';

const ConversationView: FC = () => {
  const { intents, story, ui } = useAppState();
  const actions = useActions();
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [hasIntents, setHasIntents] = useState(true);
  const [currentIntentId, setCurrentIntentId] = useState<string | undefined>();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filters, setFilters] = useState<Map<string, string>>(new Map());
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    if (!storyId) return navigate('/app', { replace: true });

    const getCollection = async () => {
      await actions.intents.getIntents();
      actions.ui.setPageTitle(`${story.currentStory?.title} - ${t('intents:intents')}`);
      setHasIntents(intents.collection.length > 0);
      setIsLoading(false);
    };

    const getStory = async () => {
      setIsLoading(true);
      const story = await actions.story.getStory(Number(storyId));
      if (isError(story)) return navigate('/app', { replace: true });

      actions.ui.setPageTitle(story.title);
      getCollection();
    };

    story.currentStory ? getCollection() : getStory();

    return () => {};
  }, []);

  const handleDetailOpen = (intentId?: string) => {
    if (!intentId) actions.intents.createNewIntent();
    setCurrentIntentId(intentId);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    actions.intents.closeCurrentIntent();
    setCurrentIntentId(undefined);
    setDetailsOpen(false);
  };

  const updateFilters = ({ type, value, reset }: HandleFilterType) => {
    if (typeof value !== 'string') return;
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleSearch = async (value: string | undefined) => {
    setSearchQuery(value);
  };

  return (
    <Page title={ui.pageTitle}>
      <Container maxWidth={false}>
        <Details handleClose={handleDetailClose} intentId={currentIntentId} open={detailsOpen} />
        {!isLoading && intents.collection && (
          <MenuBar
            handleDetailOpen={handleDetailOpen}
            handleSearch={handleSearch}
            updateFilter={updateFilters}
          />
        )}
        <Box mt={3} maxHeight={'calc(100vh - 154px)'} sx={{ overflowY: 'auto' }}>
          <Collection
            filters={filters}
            handleDetailOpen={handleDetailOpen}
            isLoading={isLoading}
            searchQuery={searchQuery}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default ConversationView;
