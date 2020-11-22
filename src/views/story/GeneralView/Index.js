import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import BottomBar from './BottomBar';
import SideBar from './sidebar/index';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  container: {
    height: 'calc(100vh - 64px - 68px - 36px)',
  },
}));

const title = 'After Life: General';

const UsersListView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();

  return (
    <Page className={classes.root} title={title}>
      <Box flexGrow={1} height="100%">
        <Container maxWidth={false} className={classes.container}>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          className={classes.bar}
        >
        <Box flexGrow={1}>
          side 1
        </Box>
        <Box width="330px">
          <SideBar />
        </Box>
        </Box>
        </Container>
      </Box>
      <Box>
        <BottomBar />
      </Box>
    </Page>
  );
};

export default UsersListView;
