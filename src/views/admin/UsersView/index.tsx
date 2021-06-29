import { Container, Grid, useMediaQuery, useTheme } from '@material-ui/core';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Grid
          container
          direction={isMobile ? 'column-reverse' : 'row'}
          spacing={5}
          flexWrap="nowrap"
        >
          <Grid
            item
            xs={12}
            sm={session.isAdmin ? 8 : 12}
            md={session.isAdmin ? 8 : 12}
            lg={session.isAdmin ? 9 : 12}
          >
            <UsersSection />
          </Grid>
          {session.isAdmin && (
            <Grid item xs={12} sm={4} md={4} lg={3}>
              <GroupsSection />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default UsersView;
