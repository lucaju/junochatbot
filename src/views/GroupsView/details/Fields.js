import { makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ spacing }) => ({
  capitalize: { textTransform: 'capitalize' },
  marginBottom: { marginBottom: spacing(1.5) },
}));

const Fields = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'groups']);

  return (
    <>
      <TextField
        className={clsx(classes.marginBottom, classes.capitalize)}
        error={Boolean(touched.name && errors.name)}
        fullWidth
        disabled={values.id && !values.active}
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
        disabled={values.id && !values.active}
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
        disabled={values.id && !values.active}
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

Fields.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Fields;
