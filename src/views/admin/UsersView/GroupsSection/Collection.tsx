import { Box, Skeleton, useMediaQuery, useTheme } from '@material-ui/core';
import { useAppState } from '@src/overmind';
import React, { FC } from 'react';
import GroupCard from './GroupCard';

interface CollectionProps {
  handleDetailOpen: (groupId: number) => void;
  isLoading?: boolean;
}

const Collection: FC<CollectionProps> = ({ handleDetailOpen, isLoading = false }) => {
  const { users } = useAppState();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton key={i} height={90} width="100%" sx={{ m: 1 }} variant="rectangular" />
    ));
  };

  return (
    <Box>
      {isLoading ? (
        <Box display="inline-flex" flexDirection={isMobile ? 'row' : 'column'}>
          {showSkeleton(4)}
        </Box>
      ) : (
        users.groups.map((group) => (
          <GroupCard key={group.id} group={group} handleEditClick={handleDetailOpen} />
        ))
      )}
    </Box>
  );
};

export default Collection;
