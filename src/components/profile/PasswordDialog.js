import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';

const useStyles = makeStyles(() => ({
  progress: { position: 'absolute' },
}));

const formValidation = Yup.object().shape({
  password: Yup.string().min(5).max(255).required('Password is required'),
});

const PasswordDialog = ({ handleClose, open }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const submit = async (values) => {
    const response = await actions.session.changePassword(values);

    if (response.error) {
      actions.ui.showNotification({ message: 'Something went wrong!', type: 'error' });
      return;
    }
    actions.ui.showNotification({ message: 'Password changed', type: 'success' });

    handleClose();
  };

  return (
    <Dialog
      aria-labelledby="change-password"
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
      open={open}
    >
      <Formik
        initialValues={{ password: '' }}
        onSubmit={async (values) => await submit(values)}
        validationSchema={formValidation}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <>
            <DialogTitle id="change-password">Change Password</DialogTitle>
            <DialogContent dividers>
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password">New Password</InputLabel>
                  <Input
                    autoComplete="new-password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    error={Boolean(touched.password && errors.password)}
                    id="password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                  />
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={handleClose}>
                Cancel
              </Button>
              <Box flexGrow={1} />
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
                variant="outlined"
              >
                Submit
                {isSubmitting && (
                  <CircularProgress className={classes.progress} size={24} />
                )}
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

PasswordDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default PasswordDialog;
