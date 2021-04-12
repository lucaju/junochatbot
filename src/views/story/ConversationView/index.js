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

const ConverastionView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation(['intents']);
  const { state, actions } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [hasIntents, setHasIntents] = useState(true);
  const [currentIntent, setCurrentIntent] = useState(undefined);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filters, setFilters] = useState(new Map());
  const [tagId, setTagId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    if (!state.story.currentStory.id) navigate('/app', { replace: true });

    const getCollection = async () => {
      await actions.intents.getIntents();
      setIsLoading(false);
      setHasIntents(state.intents.collection.length > 0);
    };

    getCollection();
    actions.ui.setPageTitle(state.story.currentStory.title);

    return () => {};
  }, []);

  const handleDetailOpen = (intent = {}) => {
    setCurrentIntent(intent);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentIntent(undefined);
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
    <Page className={classes.root} title={state.ui.pageTitle}>
      <Container maxWidth={false}>
        <Details
          handleDetailClose={handleDetailClose}
          intent={currentIntent}
          open={detailsOpen}
        />
        {!isLoading && (
          <MenuBar
            disabledFilters={!hasIntents}
            handleDetailOpen={handleDetailOpen}
            handleFilterByTag={handleFilterByTag}
            handleSearch={handleSearch}
            updateFilter={updateFilters}
          />
        )}
        {!hasIntents ? (
          <NoContent heading={t('noIntentsYet')} />
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

export default ConverastionView;
