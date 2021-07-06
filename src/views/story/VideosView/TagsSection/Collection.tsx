import { Box, Skeleton, useMediaQuery, useTheme } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useAppState } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import TagCard from './TagCard';

interface CollectionProps {
  handleDetailOpen: (tagId: number) => void;
  isLoading?: boolean;
}

const Collection: FC<CollectionProps> = ({ handleDetailOpen, isLoading = false }) => {
  const { videos } = useAppState();
  const { t } = useTranslation(['tags']);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton key={i} height={36} width="100%" variant="rectangular" />
    ));
  };

  return (
    <Box
      display="inline-flex"
      flexDirection={isMobile ? 'row' : 'column'}
      width={isMobile ? 'fit-content' : '100%'}
    >
      {!isMobile && !isLoading && videos.tagCollection.length === 0 && (
        <NoContent align="left" heading={t('noTagsYet')} size="small"/>
      )}
      {isLoading
        ? showSkeleton(4)
        : videos.tagCollection.map((tag) => (
            <TagCard key={tag.id} handleEditClick={handleDetailOpen} tag={tag} />
          ))}
    </Box>
  );
};

export default Collection;
