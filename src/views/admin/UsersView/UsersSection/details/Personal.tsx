import { Grid, TextField } from '@mui/material';
import { User } from '@src/types';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import UserAvatar from './UserAvatar';

interface PersonalProps {
  errors: FormikErrors<User>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<User>;
  values: Partial<User>;
}

const Personal: FC<PersonalProps> = ({ errors, handleBlur, handleChange, touched, values }) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item md={3} xs={12}>
        <UserAvatar />
      </Grid>
      <Grid item md={9} xs={12}>
        <TextField
          error={Boolean(touched.firstName && errors.firstName)}
          fullWidth
          helperText={touched.firstName && errors.firstName}
          label={t('users:firstName')}
          name="firstName"
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{ mb: 1.5, textTransform: 'capitalize' }}
          value={values.firstName}
          variant="outlined"
        />
        <TextField
          error={Boolean(touched.lastName && errors.lastName)}
          fullWidth
          helperText={touched.lastName && errors.lastName}
          label={t('users:lasttName')}
          name="lastName"
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{ mb: 1.5, textTransform: 'capitalize' }}
          value={values.lastName}
          variant="outlined"
        />
      </Grid>
    </>
  );
};

export default Personal;
