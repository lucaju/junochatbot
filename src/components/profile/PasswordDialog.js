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
import { useTranslation } from 'react-i18next';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';

const useStyles = makeStyles(({ palette }) => ({
  progress: { position: 'absolute' },
  textColor: { color: palette.type === 'light' && palette.common.white },
}));

const PasswordDialog = ({ handleClose, open }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const { t } = useTranslation(['common', 'profile', 'auth', 'errorMessages']);
  const [showPassword, setShowPassword] = useState(false);

  const formValidation = Yup.object().shape({
    password: Yup.string()
      .min(8)
      .max(255)
      .matches(/^(?=.{8,}$)(?=(?:.*[0-9]){2}).*/)
      .required(t('passwordRequirement', { nCharacters: 8, nNumbers: 2 })),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const submit = async (values) => {
    const response = await actions.session.changePassword(values);

    const type = response.error ? 'error' : 'success';

    if (response.error) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return;
    }

    actions.ui.showNotification({
      message: t('profile:passwordChanged'),
      type,
    });

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
            <DialogTitle id="change-password">
              {t('profile:changePassword')}
            </DialogTitle>
            <DialogContent dividers>
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password">
                    {t('profile:newPassword')}
                  </InputLabel>
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
              <Button onClick={handleClose}>{t('cancel')}</Button>
              <Box flexGrow={1} />
              <Button
                classes={{ containedPrimary: classes.textColor }}
                color="primary"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
                variant="contained"
              >
                {t('submit')}
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
