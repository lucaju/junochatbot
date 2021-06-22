import { Box, Container } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import Page from '@src/components/Page';
import { useApp } from '@src/overmind';
import { HandleFilterType } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Collection from './Collection';
import Details from './details';
import MenuBar from './menubar';

const ConversationView: FC = () => {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { t } = useTranslation(['intents', 'common']);

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
      actions.ui.setPageTitle(`${state.story.currentStory?.title} - ${t('common:intents')}`);
      setHasIntents(state.intents.collection.length > 0);
      setIsLoading(false);
    };

    const getStory = async () => {
      setIsLoading(true);
      const story = await actions.story.getStory(Number(storyId));
      if (isError(story)) return navigate('/app', { replace: true });

      actions.ui.setPageTitle(story.title);
      getCollection();
    };

    state.story.currentStory ? getCollection() : getStory();

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
    <Page title={state.ui.pageTitle}>
      <Container maxWidth={false}>
        <Details handleClose={handleDetailClose} intentId={currentIntentId} open={detailsOpen} />
        {!isLoading && (
          <MenuBar
            disabledFilters={!hasIntents}
            handleDetailOpen={handleDetailOpen}
            handleSearch={handleSearch}
            updateFilter={updateFilters}
          />
        )}
        {!hasIntents ? (
          <NoContent heading={t('noIntentsYet')} />
        ) : (
          <Box mt={3} maxHeight={'calc(100vh - 154px)'} sx={{ overflowY: 'scroll' }}>
            <Collection
              filters={filters}
              handleDetailOpen={handleDetailOpen}
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default ConversationView;
