import { Box, Container, makeStyles } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NoContent from '../../components/NoContent';
import Page from '../../components/Page';
import { useApp } from '../../overmind';
import { HandleFilterType } from '../../types';
import Collection from './Collection';
import Details from './details/';
import MenuBar from './menubar';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    minHeight: '100%',
    paddingTop: spacing(3),
  },
}));

const GroupsView: FC = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const { t } = useTranslation(['groups']);
  const [isLoading, setIsLoading] = useState(true);
  const [hasGroups, setHasGroups] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState<number | undefined>();
  const [filters, setFilters] = useState<Map<string, number>>(new Map());
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  const title = t('userGroups');

  useEffect(() => {
    const userTypeAllowed = [1];
    if (
      !state.session.user ||
      !userTypeAllowed.includes(state.session.user.roleTypeId)
    ) {
      navigate('/app', { replace: true });
    }

    actions.ui.updateTitle(title);

    const getCollection = async () => {
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

  const updateFilters = ({ type, value, reset }: HandleFilterType) => {
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleSearch = async (value: string | undefined) => {
    setSearchQuery(value);
  };

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <Details
          open={detailsOpen}
          handleClose={handleDetailClose}
          groupId={currentGroupId}
        />
        {!isLoading && (
          <MenuBar
            handleDetailOpen={handleDetailOpen}
            handleSearch={handleSearch}
            updateFilter={updateFilters}
            disabledFilters={!hasGroups}
          />
        )}
        {!hasGroups ? (
          <NoContent heading={t('noGroupsYet')} />
        ) : (
          <Box mt={3}>
            <Collection
              handleDetailOpen={handleDetailOpen}
              filters={filters}
              searchQuery={searchQuery}
              isLoading={isLoading}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default GroupsView;
