import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import type { Credential } from '@src/types';
import { Formik } from 'formik';
import React, { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

interface LoginFormProps {
  authenticate: (credential: Credential) => void;
}

const LoginForm: FC<LoginFormProps> = ({ authenticate }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const formValidation = Yup.object().shape({
    email: Yup.string().email(t('auth:mustBeValidEmail')).max(255).required(t('common:required')),
    password: Yup.string().max(255).required(t('common:required')),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={authenticate}
      validationSchema={formValidation}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Stack spacing={4} alignItems="stretch">
            <TextField
              autoComplete="username"
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label={t('common:email')}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              sx={{ textTransform: 'capitalize' }}
              type="email"
              value={values.email}
              variant="standard"
            />
            <FormControl variant="standard">
              <InputLabel htmlFor="password" sx={{ textTransform: 'capitalize' }}>
                {t('common:password')}
              </InputLabel>
              <Input
                autoComplete={t('common:password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      // edge="end"
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
                {t('auth:signin')}
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
