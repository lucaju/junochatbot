import { Box, Container, makeStyles } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import { useApp } from '../../overmind';
import { HandleFilterType } from '../../types';
import AddStoryDialog from './AddStoryDialog';
import Collection from './Collection';
import MenuBar from './menubar';
import NoStories from './NoStories';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    minHeight: '100%',
    paddingTop: spacing(3),
  },
}));

const title = 'Stories';

const Stories: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [hasStories, setHasStories] = useState(true);
  const [addStoryOpen, setAddStoryOpenn] = useState(false);
  const [filters, setFilters] = useState<Map<string, number>>(new Map());
  const [groupId, setGroupId] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    actions.ui.updateTitle(title);

    const getCollection = async () => {
      await actions.story.getStories();
      setIsLoading(false);
      setHasStories(state.story.stories.length > 0);
    };
    getCollection();

    return () => {};
  }, []);

  const handleAddDialogOpen = () => setAddStoryOpenn(true);
  const handleAddDiaglogClose = () => setAddStoryOpenn(false);

  const triggerEditStory = async (storyId: number) => {
    await actions.story.getStory(storyId);
    navigate('/app/story/general', { replace: true });
  };

  const updateFilters = ({ type, value, reset }: HandleFilterType) => {
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
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <AddStoryDialog
          open={addStoryOpen}
          handleClose={handleAddDiaglogClose}
          triggerEditStory={triggerEditStory}
        />
        {!hasStories ? (
          <NoStories openDialog={handleAddDialogOpen} />
        ) : (
          <>
            {!isLoading && (
              <MenuBar
                handleDetailOpen={handleAddDialogOpen}
                handleFilterByGroup={handleFilterByGroup}
                handleSearch={handleSearch}
                updateFilter={updateFilters}
              />
            )}
            <Box mt={3}>
              <Collection
                triggerEditStory={triggerEditStory}
                filters={filters}
                searchQuery={searchQuery}
                groupId={groupId}
                isLoading={isLoading}
              />
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
};

export default Stories;
