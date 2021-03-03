import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import AddStoryDialog from './AddStoryDialog';
import Collection from './Collection';
import MenuBar from './menubar';

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
  const { actions } = useApp();
  const [addStoryOpen, setAddStoryOpenn] = React.useState(false);
  const navigate = useNavigate();
  const [filters, setFilters] = useState(new Map());
  const [groupId, setGroupId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
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
        <MenuBar
          handleDetailOpen={handleAddDialogOpen}
          handleFilterByGroup={handleFilterByGroup}
          handleSearch={handleSearch}
          updateFilter={updateFilters}
        />
        <Box mt={3}>
          <Collection
            filters={filters}
            groupId={groupId}
            handleDetailOpen={handleAddDialogOpen}
            searchQuery={searchQuery}
            triggerEditStory={triggerEditStory}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default Stories;
