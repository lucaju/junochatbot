import { Box, Skeleton } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useApp } from '@src/overmind';
import React, { FC } from 'react';
import GroupCard from './GroupCard';

interface CollectionProps {
  handleDetailOpen: (groupId: number) => void;
  isLoading?: boolean;
}

const Collection: FC<CollectionProps> = ({ handleDetailOpen, isLoading = false }) => {
  const { state } = useApp();

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton key={i} height={90} width="100%" sx={{ m: 1 }} variant="rectangular" />
    ));
  };

  return (
    <Box>
      {isLoading ? (
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {showSkeleton(4)}
        </Box>
      ) : state.users.groups.length === 0 ? (
        <NoContent />
      ) : (
        state.users.groups.map((group) => (
          <GroupCard key={group.id} group={group} handleEditClick={handleDetailOpen} />
        ))
      )}
    </Box>
  );
};

export default Collection;
