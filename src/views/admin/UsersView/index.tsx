import { Container, Grid } from '@material-ui/core';
import Page from '@src/components/Page';
import { useApp } from '@src/overmind';
import { RoleType } from '@src/types';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import GroupsSection from './GroupsSection';
import UsersSection from './UsersSection';

const UsersView: FC = () => {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const { t } = useTranslation(['users']);

  useEffect(() => {
    const userTypeAllowed = [RoleType.ADMIN, RoleType.INSTRUCTOR];
    if (!state.session.user || !userTypeAllowed.includes(state.session.user.roleTypeId)) {
      navigate('/app', { replace: true });
    }
    actions.ui.setPageTitle(t('users'));
    return () => {};
  }, []);

  return (
    <Page title={state.ui.pageTitle}>
      <Container maxWidth={false}>
        <Grid container spacing={5}>
          <Grid item xs={state.session.isAdmin ? 8 : 12}>
            <UsersSection />
          </Grid>
          {state.session.isAdmin && (
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
