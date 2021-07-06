import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';
import Details from './details';

const TagsSection: FC = () => {
  const { ui, videos } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['tags', 'common']);

  const [isLoading, setIsLoading] = useState(true);
  const [hasTags, setHasTags] = useState(true);
  const [currentTagId, setCurrentTagId] = useState<number | undefined>();
  const [detailsOpen, setDetailsOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const getCollection = async () => {
      setIsLoading(true);
      await actions.videos.getTags();
      setIsLoading(false);
      setHasTags(videos.tagCollection.length > 0);
    };

    getCollection();

    return () => {};
  }, []);

  const handleDetailOpen = (tagId?: number) => {
    setCurrentTagId(tagId);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentTagId(undefined);
    setDetailsOpen(false);
  };

  const handleSwitchTags = () => {
    actions.ui.setTagsPanelVisible(!ui.videoView.tagsPanelVisible);
    actions.ui.resetTagFilter();
  };

  return (
    <Box
      sx={{
        mt: 2.5,
        pl: isMobile ? 0 : 1.5,
        pb: isMobile ? 1.5 : 0,
        borderStyle: 'solid',
        borderColor: ({ palette }) => palette.action.disabledBackground,
        borderRadius: 1,
        borderTopWidth: 0,
        borderBottomWidth: isMobile ? 1 : 0,
        borderLeftWidth: isMobile ? 0 : 1,
        borderRightWidth: 0,
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
          {t('tags')}
        </Typography>
        <IconButton color="inherit" onClick={handleSwitchTags}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Details handleClose={handleDetailClose} open={detailsOpen} tagId={currentTagId} />
      <Stack
        direction={isMobile ? 'row' : 'column'}
        alignItems={isMobile ? 'center' : 'flex-start'}
        sx={{ overflowY: 'scroll' }}
      >
        {!isLoading && (
          <>
            {isMobile ? (
              <IconButton onClick={() => handleDetailOpen()} size="small" sx={{ mr: 2 }}>
                <AddCircleOutlineIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <Button
                onClick={() => handleDetailOpen()}
                startIcon={<AddCircleOutlineIcon />}
                sx={{ mb: 1 }}
              >
                {t('addTag')}
              </Button>
            )}
          </>
        )}
        <Collection handleDetailOpen={handleDetailOpen} isLoading={isLoading} />
      </Stack>
    </Box>
  );
};

export default TagsSection;
