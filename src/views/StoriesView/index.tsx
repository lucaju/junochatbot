import { Box, Container } from '@mui/material';
import Page from '@src/components/Page';
import { useActions, useAppState } from '@src/overmind';
import { HandleFilterType } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AddStoryDialog from './AddStoryDialog';
import Collection from './Collection';
import MenuBar from './menubar';

const Stories: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { session, story, ui } = useAppState();
  const actions = useActions();
  const [isLoading, setIsLoading] = useState(true);
  const [hasStories, setHasStories] = useState(true);
  const [addStoryOpen, setAddStoryOpenn] = useState(false);
  const [filters, setFilters] = useState<Map<string, number>>(new Map());
  const [groupId, setGroupId] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    actions.chat.resetState();
    actions.users.resetState();
    actions.story.resetState();
    actions.ui.setPageTitle(t('common:stories'));

    const getCollection = async () => {
      await actions.story.getStories();
      if (session.isAdmin) await actions.users.getGroups();
      setIsLoading(false);
      setHasStories(story.stories.length > 0);
    };
    getCollection();
  }, []);

  const handleAddDialogOpen = () => setAddStoryOpenn(true);
  const handleAddDiaglogClose = () => setAddStoryOpenn(false);

  const triggerEditStory = async (storyId: number) => {
    navigate(`/app/stories/${storyId}`, { replace: true });
  };

  const updateFilters = ({ type, value, reset }: HandleFilterType) => {
    if (typeof value !== 'number') return;
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleFilterByGroup = async (value: number | undefined) => {
    if (value === -1) value = undefined;
    setGroupId(value);
  };

  const handleSearch = async (value: string | undefined) => {
    setSearchQuery(value);
  };

  return (
    <Page title={ui.pageTitle}>
      <Container maxWidth={false}>
        <AddStoryDialog
          open={addStoryOpen}
          handleClose={handleAddDiaglogClose}
          triggerEditStory={triggerEditStory}
        />
        {!isLoading && hasStories && (
          <MenuBar
            handleDetailOpen={handleAddDialogOpen}
            handleFilterByGroup={handleFilterByGroup}
            handleSearch={handleSearch}
            updateFilter={updateFilters}
          />
        )}
        <Box mt={3} maxHeight={'calc(100vh - 154px)'} sx={{ overflowY: 'scroll' }}>
          <Collection
            filters={filters}
            groupId={groupId}
            handleAddDialogOpen={handleAddDialogOpen}
            isLoading={isLoading}
            searchQuery={searchQuery}
            triggerEditStory={triggerEditStory}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default Stories;
