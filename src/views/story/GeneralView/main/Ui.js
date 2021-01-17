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

const Ui = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();
  const { state } = useApp();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        User Interface
      </Typography>
      <Box p={1} display="flex" flexDirection="row" width="100%">
        <Box width="70px" mr={2}>
          <TextField
            fullWidth
            label="Sidebar"
            name="general.ui.sidebar"
            select
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.general.ui.sidebar}
          >
            <MenuItem key="left" value="left">
              Left
            </MenuItem>
            <MenuItem key="right" value="right">
              Right
            </MenuItem>
          </TextField>
        </Box>
        <Box width="200px" mr={2}>
          <TextField
            error={Boolean(
              touched['general.user.inputPlacehold'] &&
                errors['general.user.inputPlacehold']
            )}
            fullWidth
            label="Input placeholder"
            name="general.user.inputPlacehold"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.general.user.inputPlacehold}
            className={classes.marginBottom}
          />
        </Box>
        <Box width="100px">
          <TextField
            fullWidth
            label="Balloon"
            name="general.user.balloon"
            select
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.general.user.balloon}
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
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Ui;
