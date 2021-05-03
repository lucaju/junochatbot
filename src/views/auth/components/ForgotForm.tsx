import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import type { Credential } from '@src/types';

interface ForgotFormProps {
  requestPassword: (credential: Credential) => void;
}

const useStyles = makeStyles(({ palette }) => ({
  capitalize: { textTransform: 'capitalize' },
  submitButton: { color: palette.common.white },
  progress: { position: 'absolute' },
}));

const ForgotForm: FC<ForgotFormProps> = ({ requestPassword }) => {
  const classes = useStyles();
  const { t } = useTranslation(['auth', 'common']);

  const formValidation = Yup.object().shape({
    email: Yup.string()
      .email(t('mustBeValidEmail'))
      .max(255)
      .required(t('common:required')),
  });

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async (values: Credential) => await requestPassword(values)}
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
        <form onSubmit={handleSubmit}>
          <TextField
            autoComplete="username"
            className={classes.capitalize}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label={t('common:email')}
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
          />
          <Box mt={2}>
            <Button
              classes={{ containedPrimary: classes.submitButton }}
              color="primary"
              disabled={isSubmitting}
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {t('getNewPassowrd')}
              {isSubmitting && (
                <CircularProgress
                  className={classes.progress}
                  size={24}
                />
              )}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ForgotForm;
