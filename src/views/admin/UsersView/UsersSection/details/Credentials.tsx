import { Grid, TextField } from '@material-ui/core';
import { User } from '@src/types';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <Grid item md={12} xs={12}>
      <TextField
        disabled={!!values.id}
        error={Boolean(touched.userName && errors.userName)}
        fullWidth
        helperText={touched.userName && errors.userName}
        label={t('users:email')}
        name="userName"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.userName}
        variant="standard"
      />
    </Grid>
  );
};

export default Credentials;
