import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { useActions } from '@src/overmind';
import { Credential, NotificationType } from '@src/types';
import { isError } from '@src/util/utilities';
import { Formik } from 'formik';
import React, { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

interface PasswordDialogProps {
  handleClose: () => void;
  open: boolean;
}

const PasswordDialog: FC<PasswordDialogProps> = ({ handleClose, open }) => {
  const actions = useActions();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const formValidation = Yup.object().shape({
    password: Yup.string()
      .min(8)
      .max(255)
      .matches(/^(?=.{8,}$)(?=(?:.*[0-9]){2}).*/)
      .required(t('auth:passwordRequirement', { nCharacters: 8, nNumbers: 2 })),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const submit = async (values: Credential) => {
    if (!values.password) return;

    const response = await actions.session.changePassword(values.password);

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    const message = isError(response)
      ? response.errorMessage
      : // ? t('error:somethingWentWrong')
        t('profile:passwordChanged');

    actions.ui.showNotification({ message, type });
    if (type !== 'error') handleClose();
  };

  return (
    <Dialog aria-labelledby="change-password" disableEscapeKeyDown maxWidth="md" open={open}>
      <Formik
        initialValues={{ password: '' }}
        onSubmit={async (values: Credential) => await submit(values)}
        validationSchema={formValidation}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <>
            <DialogTitle id="change-password">{t('profile:changePassword')}</DialogTitle>
            <DialogContent dividers>
              <form onSubmit={handleSubmit}>
                <Box sx={{ width: 300 }}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel htmlFor="password">{t('profile:newPassword')}</InputLabel>
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
                </Box>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>{t('common:cancel')}</Button>
              <Box flexGrow={1} />
              <LoadingButton
                loading={isSubmitting}
                onClick={() => handleSubmit()}
                variant="contained"
              >
                {t('common:submit')}
              </LoadingButton>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default PasswordDialog;
