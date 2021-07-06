import { Box, Container } from '@material-ui/core';
import Page from '@src/components/Page';
import { useActions, useAppState } from '@src/overmind';
import { isError } from '@src/util/utilities';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Collection from './Collection';
import MenuBar from './menubar';

const ContextView: FC = () => {
  const { intents, story, ui } = useAppState();
  const actions = useActions();
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { t } = useTranslation(['contexts', 'common']);

  const [isLoading, setIsLoading] = useState(true);
  const [hasContexts, setHasContexts] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    if (!storyId) return navigate('/app', { replace: true });

    const getCollection = async () => {
      if (intents.collection.length === 0) await actions.intents.getIntents();
      actions.ui.setPageTitle(`${story.currentStory?.title} - ${t('common:contexts')}`);
      setIsLoading(false);
      setHasContexts(intents.contexts.length > 0);
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

  const handleSearch = async (value: string | undefined) => {
    setSearchQuery(value);
  };

  return (
    <Page title={ui.pageTitle}>
      <Container maxWidth={false}>
        {!isLoading && hasContexts && <MenuBar handleSearch={handleSearch} />}
        <Box mt={3} maxHeight={'calc(100vh - 154px)'} sx={{ overflowY: 'scroll' }}>
          <Collection isLoading={isLoading} searchQuery={searchQuery} />
        </Box>
      </Container>
    </Page>
  );
};

export default ContextView;
