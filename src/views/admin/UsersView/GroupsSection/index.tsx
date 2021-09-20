import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';
import Details from './details';

const GroupsView: FC = () => {
  const { users } = useAppState();
  const actions = useActions();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState<number | undefined>();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const getCollection = async () => setTimeout(fetchGroups, 1000);
    getCollection();

    return () => {};
  }, []);

  const fetchGroups = async () => {
    setIsLoading(true);
    if (users.groups.length === 0) actions.users.getGroups();
    setIsLoading(false)
  }

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
          {t('groups:groups')}
        </Typography>
        <IconButton color="primary" onClick={() => handleDetailOpen()} size="small">
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Details groupId={currentGroupId} handleClose={handleDetailClose} open={detailsOpen} />
      <Box maxHeight={'calc(100vh - 154px)'} mt={3} sx={{ overflowY: 'scroll' }}>
        <Collection isLoading={isLoading} handleDetailOpen={handleDetailOpen} />
      </Box>
    </Box>
  );
};

export default GroupsView;
