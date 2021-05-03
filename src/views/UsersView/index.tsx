import { Box, Container, makeStyles } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Page from '@src/components/Page';
import { useApp } from '@src/overmind';
import { HandleFilterType, RoleType } from '@src/types';
import Collection from './Collection';
import Details from './details';
import MenuBar from './menubar';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    minHeight: '100%',
    paddingTop: spacing(3),
  },
}));

const UsersView: FC = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const { t } = useTranslation(['users']);
  const [currentUserId, setCurrentUserId] = useState<number | undefined>();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filters, setFilters] = useState<Map<string, number>>(new Map());
  const [groupId, setGroupId] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    const userTypeAllowed = [RoleType.ADMIN, RoleType.INSTRUCTOR];
    if (
      !state.session.user ||
      !userTypeAllowed.includes(state.session.user.roleTypeId)
    ) {
      navigate('/app', { replace: true });
    }
    actions.ui.setPageTitle(t('users'));
    return () => {};
  }, []);

  const handleDetailOpen = (userId?: number) => {
    setCurrentUserId(userId);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentUserId(undefined);
    setDetailsOpen(false);
  };

  const updateFilters = ({ type, value, reset }: HandleFilterType) => {
    if (typeof value !== 'number') return;
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleFilterByGroup = async (value: number | undefined) => {
    if (value === -1) value = undefined;
    setGroupId(value);
  };

  const handleSearch = async (value: string | undefined) => {
    setSearchQuery(value);
  };

  return (
    <Page className={classes.root} title={state.ui.pageTitle}>
      <Container maxWidth={false}>
        <Details
          open={detailsOpen}
          handleClose={handleDetailClose}
          userId={currentUserId}
        />
        <MenuBar
          handleDetailOpen={handleDetailOpen}
          handleFilterByGroup={handleFilterByGroup}
          updateFilter={updateFilters}
          handleSearch={handleSearch}
        />
        <Box mt={3}>
          <Collection
            handleDetailOpen={handleDetailOpen}
            filters={filters}
            groupId={groupId}
            searchQuery={searchQuery}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default UsersView;
