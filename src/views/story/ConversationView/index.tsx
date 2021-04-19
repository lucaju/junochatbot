import { Box, Container, makeStyles } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import NoContent from '../../../components/NoContent';
import Page from '../../../components/Page';
import { useApp } from '../../../overmind';
import { HandleFilterType } from '../../../types';
import { isError } from '../../../util/utilities';
import Collection from './Collection';
import MenuBar from './menubar';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    minHeight: '100%',
    paddingTop: spacing(3),
  },
}));

const ConversationView: FC = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { t } = useTranslation(['intents', 'common']);
  const [isLoading, setIsLoading] = useState(true);
  const [hasIntents, setHasIntents] = useState(true);
  const [filters, setFilters] = useState<Map<string, string>>(new Map());
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    if (!storyId) return navigate('/app', { replace: true });

    const getCollection = async () => {
      await actions.intents.getIntents();
      actions.ui.setPageTitle(
        `${state.story.currentStory?.title} - ${t('common:intents')}`
      );
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

  const updateFilters = ({ type, value, reset }: HandleFilterType) => {
    if (typeof value !== 'string') return;
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleSearch = async (value: string | undefined) => {
    setSearchQuery(value);
  };

  return (
    <Page className={classes.root} title={state.ui.pageTitle}>
      <Container maxWidth={false}>
        {!isLoading && (
          <MenuBar
            handleSearch={handleSearch}
            updateFilter={updateFilters}
            disabledFilters={!hasIntents}
          />
        )}
        {!hasIntents ? (
          <NoContent heading={t('noIntentsYet')} />
        ) : (
          <Box mt={3}>
            <Collection
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

export default ConversationView;
