import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Credentials = ({ errors, handleBlur, handleChange, touched, values }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid item md={6} xs={12}>
        <TextField
          error={Boolean(touched.userName && errors.userName)}
          fullWidth
          helperText={touched.userName && errors.userName}
          label="Email"
          name="userName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.userName}
          variant="outlined"
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            error={Boolean(touched.password && errors.password)}
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </Grid>
    </>
  );
};

Credentials.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Credentials;
