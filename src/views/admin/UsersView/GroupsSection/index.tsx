import { Box, IconButton, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import NoContent from '@src/components/NoContent';
import { useApp } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';
import Details from './details';

const GroupsView: FC = () => {
  const { state, actions } = useApp();
  const { t } = useTranslation(['groups']);
  const [isLoading, setIsLoading] = useState(true);
  const [hasGroups, setHasGroups] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState<number | undefined>();

  useEffect(() => {
    const getCollection = async () => {
      setIsLoading(true);
      await actions.users.getGroups();
      setIsLoading(false);
      setHasGroups(state.users.groups.length > 0);
    };

    getCollection();

    return () => {};
  }, []);

  const handleDetailOpen = (groupId?: number) => {
    setCurrentGroupId(groupId);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentGroupId(undefined);
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
          {t('groups')}
        </Typography>
        <IconButton color="primary" onClick={() => handleDetailOpen()} size="small">
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Details groupId={currentGroupId} handleClose={handleDetailClose} open={detailsOpen} />
      {!hasGroups ? (
        <NoContent heading={t('noGroupsYet')} />
      ) : (
        <Box maxHeight={'calc(100vh - 154px)'} mt={3} sx={{ overflowY: 'scroll' }}>
          <Collection isLoading={isLoading} handleDetailOpen={handleDetailOpen} />
        </Box>
      )}
    </Box>
  );
};

export default GroupsView;
