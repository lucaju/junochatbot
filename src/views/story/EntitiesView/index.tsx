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

const EntitiesView: FC = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { t } = useTranslation(['entities', 'common']);
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntities, setHasEntities] = useState(true);
  const [filters, setFilters] = useState<Map<string, string>>(new Map());
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    if (!storyId) return navigate('/app', { replace: true });

    const getCollection = async () => {
      await actions.intents.getEntities();
      actions.ui.setPageTitle(
        `${state.story.currentStory?.title} - ${t('common:entities')}`
      );
      setIsLoading(false);
      setHasEntities(state.intents.entities.length > 0);
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
            disabledFilters={!hasEntities}
          />
        )}
        {!hasEntities ? (
          <NoContent heading={t('noEntitiesYet')} />
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

export default EntitiesView;