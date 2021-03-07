import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
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

const Stories = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasStories, setHasStories] = useState(true);
  const [addStoryOpen, setAddStoryOpenn] = useState(false);
  const [filters, setFilters] = useState(new Map());
  const [groupId, setGroupId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    const getCollection = async () => {
      await actions.story.getStories();
      setIsLoading(false);
      setHasStories(state.story.stories.length > 0);
    };
    getCollection();
    actions.ui.updateTitle(title);
    return () => {};
  }, []);

  const handleAddDialogOpen = () => setAddStoryOpenn(true);
  const handleAddDiaglogClose = () => setAddStoryOpenn(false);

  const triggerEditStory = (story) => {
    if (!story.new) actions.story.setCurrentStory(story.id);
    navigate('/app/story/general', { replace: true });
  };

  const updateFilters = ({ type, value, reset }) => {
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleFilterByGroup = async (value) => {
    if (value === -1) value = null;
    setGroupId(value);
  };

  const handleSearch = async (value) => {
    if (value === '') value = null;
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
                filters={filters}
                groupId={groupId}
                handleDetailOpen={handleAddDialogOpen}
                isLoading={isLoading}
                searchQuery={searchQuery}
                triggerEditStory={triggerEditStory}
              />
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
};

export default Stories;
