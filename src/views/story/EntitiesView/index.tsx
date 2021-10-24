import { Box, Container } from '@mui/material';
import Page from '@src/components/Page';
import { useActions, useAppState } from '@src/overmind';
import { HandleFilterType } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Collection from './Collection';
import MenuBar from './menubar';

const EntitiesView: FC = () => {
  const { intents, story, ui } = useAppState();
  const actions = useActions();
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Map<string, string>>(new Map());
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    if (!storyId) return navigate('/app', { replace: true });

    const getCollection = async () => {
      await actions.intents.getEntities();
      if (intents.collection.length === 0) await actions.intents.getIntents();
      actions.ui.setPageTitle(`${story.currentStory?.title} - ${t('intents:entities')}`);
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
  }, []);

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
        {!isLoading && <MenuBar handleSearch={handleSearch} updateFilter={updateFilters} />}
        <Box mt={3} maxHeight={'calc(100vh - 154px)'} sx={{ overflowY: 'scroll' }}>
          <Collection filters={filters} isLoading={isLoading} searchQuery={searchQuery} />
        </Box>
      </Container>
    </Page>
  );
};

export default EntitiesView;
