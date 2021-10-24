import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import type { Credential } from '@src/types';
import { Formik } from 'formik';
import React, { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

interface ResetPasswordFormProps {
  resetPassword: (credential: Credential) => void;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ resetPassword }) => {
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

  return (
    <Formik
      initialValues={{ password: '' }}
      onSubmit={resetPassword}
      validationSchema={formValidation}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{ textTransform: 'capitalize' }} htmlFor="password">
              {t('common:password')}
            </InputLabel>
            <Input
              autoComplete={t('common:password')}
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
          <Box my={2}>
            <LoadingButton
              color="primary"
              disableElevation
              fullWidth
              loading={isSubmitting}
              size="large"
              type="submit"
              variant="contained"
            >
              {t('common:submit')}
            </LoadingButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
