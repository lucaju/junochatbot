import { Box, TextField } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import type { Credential } from '@src/types';
import { Formik } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

interface ForgotFormProps {
  requestPassword: (credential: Credential) => void;
}

const ForgotForm: FC<ForgotFormProps> = ({ requestPassword }) => {
  const { t } = useTranslation();

  const formValidation = Yup.object().shape({
    email: Yup.string().email(t('auth:mustBeValidEmail')).max(255).required(t('common:required')),
  });

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={requestPassword}
      validationSchema={formValidation}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            autoComplete="username"
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label={t('common:email')}
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            sx={{ textTransform: 'capitalize' }}
            type="email"
            value={values.email}
            variant="standard"
          />
          <Box mt={2}>
            <LoadingButton
              color="primary"
              disableElevation
              fullWidth
              loading={isSubmitting}
              size="large"
              type="submit"
              variant="contained"
            >
              {t('auth:getNewPassowrd')}
            </LoadingButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ForgotForm;
