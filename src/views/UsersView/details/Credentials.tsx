import { Grid, TextField } from '@material-ui/core';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@src/types';

interface CredentialsProps {
  errors: FormikErrors<User>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<User>;
  values: Partial<User>;
}

const Credentials: FC<CredentialsProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  const { t } = useTranslation(['users']);
  return (
    <Grid item md={12} xs={12}>
      <TextField
        error={Boolean(touched.userName && errors.userName)}
        disabled={!!values.id}
        fullWidth
        helperText={touched.userName && errors.userName}
        label={t('email')}
        name="userName"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.userName}
      />
    </Grid>
  );
};

export default Credentials;
