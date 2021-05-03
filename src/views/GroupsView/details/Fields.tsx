import { makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { UserGroup } from '@src/types';

interface FieldsProps {
  errors: FormikErrors<UserGroup>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<UserGroup>;
  values: Partial<UserGroup>;
}

const useStyles = makeStyles(({ spacing }) => ({
  capitalize: { textTransform: 'capitalize' },
  marginBottom: { marginBottom: spacing(1.5) },
}));

const Fields: FC<FieldsProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'groups']);

  return (
    <>
      <TextField
        className={clsx(classes.marginBottom, classes.capitalize)}
        error={Boolean(touched.name && errors.name)}
        fullWidth
        helperText={touched.name && errors.name}
        label={t('name')}
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
      />
      <TextField
        className={clsx(classes.marginBottom, classes.capitalize)}
        error={Boolean(touched.institution && errors.institution)}
        fullWidth
        helperText={touched.institution && errors.institution}
        label={t('groups:institution')}
        name="institution"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.institution}
      />
      <TextField
        className={clsx(classes.marginBottom, classes.capitalize)}
        error={Boolean(touched.description && errors.description)}
        fullWidth
        helperText={touched.description && errors.description}
        label={t('description')}
        name="description"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.description}
      />
    </>
  );
};

export default Fields;
