import { Box, IconButton, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import NoContent from '@src/components/NoContent';
import { useApp } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';
import Details from './details';

const TagsSection: FC = () => {
  const { state, actions } = useApp();
  const { t } = useTranslation(['tags', 'common']);
  const [isLoading, setIsLoading] = useState(true);
  const [hasTags, setHasTags] = useState(true);
  const [currentTagId, setCurrentTagId] = useState<number | undefined>();
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const getCollection = async () => {
      setIsLoading(true);
      await actions.videos.getTags();
      setIsLoading(false);
      setHasTags(state.videos.tagCollection.length > 0);
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

  return (
    <Box
      sx={{
        mt: 2.5,
        pl: 1.5,
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: ({ palette }) => palette.action.disabledBackground,
      }}
    >
      <Box display="flex" flexDirection="row" alignItems="center" columnGap={1}>
        <Typography sx={{ textTransform: 'capitalize' }} variant="h6">
          {t('tags')}
        </Typography>
        <IconButton color="primary" onClick={() => handleDetailOpen()} size="small">
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Details handleClose={handleDetailClose} open={detailsOpen} tagId={currentTagId} />
      {!hasTags ? (
        <NoContent heading={t('noTagsYet')} />
      ) : (
        <Box maxHeight={'calc(100vh - 154px)'} mt={3} sx={{ overflowY: 'scroll' }}>
          <Collection handleDetailOpen={handleDetailOpen} isLoading={isLoading} />
        </Box>
      )}
    </Box>
  );
};

export default TagsSection;
