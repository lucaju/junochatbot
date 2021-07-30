import { Stack, TextField } from '@material-ui/core';
import { UserGroup } from '@src/types';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface FieldsProps {
  errors: FormikErrors<UserGroup>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<UserGroup>;
  values: Partial<UserGroup>;
}

const Fields: FC<FieldsProps> = ({ errors, handleBlur, handleChange, touched, values }) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={2}>
      <TextField
        error={Boolean(touched.name && errors.name)}
        fullWidth
        helperText={touched.name && errors.name}
        label={t('common:name')}
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ textTransform: 'capitalize' }}
        value={values.name}
        variant="standard"
      />
      <TextField
        error={Boolean(touched.institution && errors.institution)}
        fullWidth
        helperText={touched.institution && errors.institution}
        label={t('groups:institution')}
        name="institution"
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ textTransform: 'capitalize' }}
        value={values.institution}
        variant="standard"
      />
      <TextField
        error={Boolean(touched.description && errors.description)}
        fullWidth
        helperText={touched.description && errors.description}
        label={t('common:description')}
        name="description"
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ textTransform: 'capitalize' }}
        value={values.description}
        variant="standard"
      />
    </Stack>
  );
};

export default Fields;
