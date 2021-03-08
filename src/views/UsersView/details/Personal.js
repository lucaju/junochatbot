import { Grid, makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import UserAvatar from './UserAvatar';

const useStyles = makeStyles((theme) => ({
  capitalize: { textTransform: 'capitalize' },
  marginBottom: { marginBottom: theme.spacing(1.5) },
}));

const Personal = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();
  const { t } = useTranslation(['users']);

  return (
    <>
      <Grid item md={3} xs={12}>
        <UserAvatar name="avatarUrl" active={values.active} values={values} />
      </Grid>
      <Grid item md={9} xs={12}>
        <TextField
          className={clsx(classes.marginBottom, classes.capitalize)}
          error={Boolean(touched.firstName && errors.firstName)}
          fullWidth
          disabled={values.id && !values.active}
          helperText={touched.firstName && errors.firstName}
          label={t('firstName')}
          name="firstName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName}
          variant="outlined"
          
        />
        <TextField
          className={clsx(classes.marginBottom, classes.capitalize)}
          error={Boolean(touched.lastName && errors.lastName)}
          fullWidth
          disabled={values.id && !values.active}
          helperText={touched.lastName && errors.lastName}
          label={t('lasttName')}
          name="lastName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lastName}
          variant="outlined"
        />
      </Grid>
    </>
  );
};

Personal.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Personal;
