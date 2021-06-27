import { Container, Grid } from '@material-ui/core';
import Page from '@src/components/Page';
import { useAppState, useActions } from '@src/overmind';
import { RoleType } from '@src/types';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import GroupsSection from './GroupsSection';
import UsersSection from './UsersSection';

const UsersView: FC = () => {
  const { session, ui } = useAppState();
  const actions = useActions();
  const navigate = useNavigate();
  const { t } = useTranslation(['users']);

  useEffect(() => {
    const userTypeAllowed = [RoleType.ADMIN, RoleType.INSTRUCTOR];
    if (!session.user || !userTypeAllowed.includes(session.user.roleTypeId)) {
      navigate('/app', { replace: true });
    }
    actions.ui.setPageTitle(t('users'));
    return () => {};
  }, []);

  return (
    <Page title={ui.pageTitle}>
      <Container maxWidth={false}>
        <Grid container spacing={5}>
          <Grid item xs={session.isAdmin ? 8 : 12}>
            <UsersSection />
          </Grid>
          {session.isAdmin && (
            <Grid item xs={4}>
              <GroupsSection />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default UsersView;
