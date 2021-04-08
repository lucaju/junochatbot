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
import React, { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../overmind';
import * as Yup from 'yup';
import { isError } from '../../util/utilities';
import { Credential, NotificationType } from '../../types';

interface PasswordDialogProps {
  handleClose: () => void;
  open: boolean;
}

const useStyles = makeStyles(({ palette: { type, common } }) => ({
  progress: { position: 'absolute' },
  textColor: { color: type === 'light' ? common.white : common.black },
}));

const PasswordDialog: FC<PasswordDialogProps> = ({ handleClose, open }) => {
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
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const submit = async (values: Credential) => {
    if (!values.password) return;

    const response = await actions.session.changePassword(values.password);

    const type = isError(response)
      ? NotificationType.ERROR
      : NotificationType.SUCCESS;

    const message = isError(response)
      ? response.errorMessage
      // ? t('errorMessages:somethingWentWrong')
      : t('profile:passwordChanged');

    actions.ui.showNotification({ message, type });
    if (type !== 'error') handleClose();
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
        onSubmit={async (values: Credential) => await submit(values)}
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

export default PasswordDialog;
