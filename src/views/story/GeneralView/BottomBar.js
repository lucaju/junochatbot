import {
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useApp } from 'src/overmind';

const useStyles = makeStyles((theme) => ({
  bar: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  divider: {
    paddingLeft: theme.spacing(2),
    paddingright: theme.spacing(2),
  },
  buttonProgress: { position: 'absolute' },
  marginLeft: { marginLeft: theme.spacing(2)}
}));

const BottomBar = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const { isSubmitting } = useState();

  const handleDeleteButton = () => {
    console.log('delete');
  };

  return (
    <>
      <Divider className={classes.divider} />
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        className={classes.bar}
      >
        <Button color="default" onClick={handleDeleteButton}>
          Delete Story
        </Button>
        <Box flexGrow={1} />
        <Button
          color="primary"
          disabled={isSubmitting}
          type="submit"
          variant={state.story.general.published ? 'text' : 'outlined'}
        >
          {state.story.general.published ? 'Switch to Draft' : 'Save draft'}
          {isSubmitting && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>

        <Button
          color="primary"
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          className={classes.marginLeft}
        >
         {state.story.general.published ? 'Update' : 'Publish'}
          {isSubmitting && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </Box>
    </>
  );
};

export default BottomBar;
