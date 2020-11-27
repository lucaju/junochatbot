import { Grid, makeStyles, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import UserAvatar from './UserAvatar';

const useStyles = makeStyles((theme) => ({
  marginBottom: { marginBottom: theme.spacing(1.5) },
}));

const Personal = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item md={3} xs={12}>
        <UserAvatar name="avatar" />
      </Grid>
      <Grid item md={9} xs={12}>
        <TextField
          error={Boolean(touched.firstName && errors.firstName)}
          fullWidth
          helperText={touched.firstName && errors.firstName}
          label="First name"
          name="firstName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName}
          variant="outlined"
          className={classes.marginBottom}
        />
        <TextField
          error={Boolean(touched.lastName && errors.lastName)}
          fullWidth
          helperText={touched.lastName && errors.lastName}
          label="Last name"
          name="lastName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lastName}
          variant="outlined"
          className={classes.marginBottom}
        />
      </Grid>
    </>
  );
};

Personal.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Personal;
