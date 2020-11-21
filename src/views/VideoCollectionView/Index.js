import {
    Box,
    CircularProgress,
    Container,
    makeStyles
  } from '@material-ui/core';
  import React, { useEffect, useState } from 'react';
//   import { useNavigate } from 'react-router-dom';
  import Page from 'src/components/Page';
  import { useApp } from 'src/overmind';
  
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
    },
  }));
  
  const title = 'Users';
  
  const UsersListView = () => {
    const classes = useStyles();
    const { state, actions } = useApp();
  
    return (
      <Page className={classes.root} title={title}>
        <Container maxWidth={false}>
        Video Collection
        </Container>
      </Page>
    );
  };
  
  export default UsersListView;
  