import { makeStyles, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(({ spacing }) => ({
  marginBottom: { marginBottom: spacing(1.5) },
}));

const Fields = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();
  return (
    <>
      <TextField
        error={Boolean(touched.name && errors.name)}
        fullWidth
        disabled={values.id && !values.active}
        helperText={touched.name && errors.name}
        label="Name"
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
        className={classes.marginBottom}
      />
      <TextField
        error={Boolean(touched.institution && errors.institution)}
        fullWidth
        disabled={values.id && !values.active}
        helperText={touched.institution && errors.institution}
        label="Institution"
        name="institution"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.institution}
        className={classes.marginBottom}
      />
      <TextField
        error={Boolean(touched.description && errors.description)}
        fullWidth
        disabled={values.id && !values.active}
        helperText={touched.description && errors.description}
        label="Description"
        name="description"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.description}
        className={classes.marginBottom}
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
