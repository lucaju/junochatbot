import {
  Box,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
}));

const Visibility = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();

  return (
    <Box p={2} mt={1} width={'100%'} display={'flex'} flexDirection={'row'}>
      <Typography variant="h6" gutterBottom>
        Visibility
      </Typography>
      <TextField
        className={classes.marginLeft}
        error={Boolean(touched['general.public'] && errors['general.public'])}
        // label="Status"
        name="general.public"
        onBlur={handleBlur}
        onChange={handleChange}
        select
        value={values.general.public}
      >
        <MenuItem key={'private'} value={false}>
          Private
        </MenuItem>
        <MenuItem key={'public'} value={true}>
          Public
        </MenuItem>
      </TextField>
    </Box>
  );
};

Visibility.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Visibility;
