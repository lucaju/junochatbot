import {
  Box,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useApp } from 'src/overmind';

const useStyles = makeStyles((theme) => ({
  marginBottom: { marginBottom: theme.spacing(1) },
}));

const Ui = ({ storyData }) => {
  const classes = useStyles();
  const { state } = useApp();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        User Interface
      </Typography>
      <Box p={1} display="flex" flexDirection="row" width="100%">
        <Box flexGrow={1} mr={2}>
          <TextField
            fullWidth
            label="Sidebar"
            name="ui.sidebar"
            select
            value={storyData.general.ui.sidebar}
          >
            <MenuItem key="left" value="left">
              Left
            </MenuItem>
            <MenuItem key="right" value="right">
              Right
            </MenuItem>
          </TextField>
        </Box>
        <Box flexGrow={2} mr={2}>
          <TextField
            // error={Boolean(touched.firstName && errors.firstName)}
            fullWidth
            // helperText={touched.firstName && errors.firstName}
            label="User input placeholder"
            name="user.inputPlacehold"
            // onBlur={handleBlur}
            // onChange={handleChange}
            value={storyData.general.user.inputPlacehold}
            className={classes.marginBottom}
          />
        </Box>
        <Box flexGrow={1}>
          <TextField
            fullWidth
            label="User Ballon"
            name="user.ballon"
            select
            value={storyData.general.user.ballon}
          >
            {state.story.colors.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </>
  );
};

Ui.propTypes = {
  storyData: PropTypes.object,
};

export default Ui;
