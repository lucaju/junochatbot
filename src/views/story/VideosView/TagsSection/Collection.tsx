import { Box, Skeleton, useMediaQuery, useTheme } from '@material-ui/core';
import { useAppState, useActions } from '@src/overmind';
import React, { FC } from 'react';
import TagCard from './TagCard';

interface CollectionProps {
  handleDetailOpen: (tagId: number) => void;
  isLoading?: boolean;
}

const Collection: FC<CollectionProps> = ({ handleDetailOpen, isLoading = false }) => {
  const { videos } = useAppState();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton key={i} height={90} width="100%" variant="rectangular" />
    ));
  };

  return (
    <Box display="inline-flex" flexDirection={isMobile ? 'row' : 'column'}>
      {isLoading ? (
        showSkeleton(4)
      ) : (
        videos.tagCollection.map((tag) => (
          <TagCard key={tag.id} handleEditClick={handleDetailOpen} tag={tag} />
        ))
      )}
    </Box>
  );
};

export default Collection;
