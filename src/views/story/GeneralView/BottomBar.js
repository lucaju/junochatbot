import {
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

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
  marginLeft: { marginLeft: theme.spacing(2) },
}));

const BottomBar = ({ storyData }) => {
  const classes = useStyles();
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
          variant={storyData.general.published ? 'text' : 'outlined'}
        >
          {storyData.general.published ? 'Switch to Draft' : 'Save draft'}
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
          {storyData.general.published ? 'Update' : 'Publish'}
          {isSubmitting && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </Box>
    </>
  );
};

BottomBar.propTypes = {
  storyData: PropTypes.object,
};

export default BottomBar;
