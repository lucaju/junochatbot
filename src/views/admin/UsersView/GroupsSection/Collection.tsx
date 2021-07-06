import { Box, Skeleton, useMediaQuery, useTheme } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useAppState } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import GroupCard from './GroupCard';

interface CollectionProps {
  handleDetailOpen: (groupId: number) => void;
  isLoading?: boolean;
}

const Collection: FC<CollectionProps> = ({ handleDetailOpen, isLoading = false }) => {
  const { users } = useAppState();
  const { t } = useTranslation(['groups']);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton key={i} height={60} width={160} sx={{ m: 1 }} variant="rectangular" />
    ));
  };

  return (
    <Box display="inline-flex" flexDirection={isMobile ? 'row' : 'column'}>
      {!isMobile && !isLoading && users.groups.length === 0 && (
        <NoContent align="left" heading={t('noGroupsYet')} size="small" />
      )}
      {isLoading
        ? showSkeleton(4)
        : users.groups.map((group) => (
            <GroupCard key={group.id} group={group} handleEditClick={handleDetailOpen} />
          ))}
    </Box>
  );
};

export default Collection;
