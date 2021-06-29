import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import NoContent from '@src/components/NoContent';
import { useAppState, useActions } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';
import Details from './details';

const TagsSection: FC = () => {
  const { videos } = useAppState();
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

  return (
    <Box
      sx={{
        mt: 2.5,
        pl: isMobile ? 0 : 1.5,
        pb: isMobile ? 1.5 : 0,
        borderStyle: 'solid',
        borderColor: ({ palette }) => palette.action.disabledBackground,
        borderTopWidth: 0,
        borderBottomWidth: isMobile ? 1 : 0,
        borderLeftWidth: isMobile ? 0 : 1,
        borderRightWidth: 0,
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
        !isMobile && <NoContent heading={t('noTagsYet')} />
      ) : (
        <Box mt={3} sx={{ overflowY: 'scroll' }}>
          <Collection handleDetailOpen={handleDetailOpen} isLoading={isLoading} />
        </Box>
      )}
    </Box>
  );
};

export default TagsSection;
