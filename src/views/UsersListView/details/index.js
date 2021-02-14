import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';
import Actions from './Actions';
import Attributions from './Attributions';
import Credentials from './Credentials';
import Personal from './Personal';
import Stories from './Stories';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingRight: 0,
    paddingLeft: 0,
    marginBottom: theme.spacing(1),
  },
  section: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  credentialsSection: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[700],
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
}));

const Details = ({ open, handleDetailClose, user }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [isAdmin] = useState(state.session.isAdmin);

  const initialValues = {
    avatar: null,
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    roleTypeId: state.users.defaultRoleType,
    group: state.users.defaultGroup,
    active: true,
    stories: [],
  };

  if (!isAdmin) initialValues.group = state.session.user.group;

  const [userData, setUserData] = useState(initialValues);

  useEffect(() => {
    if (open && user.id === undefined) {
      const selectedUserData = Object.assign(initialValues);
      setUserData(selectedUserData);
    }

    if (open && user.id !== undefined) {
      const selectedUserData = Object.assign(user);
      selectedUserData.password = '';
      if (!selectedUserData.group) selectedUserData.group = 'None';
      setUserData(selectedUserData);
    }
    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    avatar: Yup.mixed(),
    firstName: Yup.string().trim().required('First name is required'),
    lastName: Yup.string().trim().required('Last name is required'),
    userName: Yup.string().email().required('Email is required'),
    password: Yup.string().max(255),
    roleTypeId: Yup.string().required(),
    group: Yup.string(),
    active: Yup.bool(),
    stories: Yup.array(),
  });

  const handleCancelButton = () => {
    handleDetailClose();
    open = false;
  };

  const submit = async (values) => {
    //if avatar changed, send oldFile to be removed.
    if (userData.avatar && (values.avatar?.name || !values.avatar)) {
      values = { ...values, removeAvatar: userData.avatar };
    }

    // remove unnecessary  info
    const cleandedValues = { ...values };
    delete cleandedValues.stories;

    const response = await actions.users.save(cleandedValues);

    if (response.error) {
      actions.ui.showNotification({
        type: 'error',
        message: 'Something went wrong!',
      });
      return;
    }

    const message = values.id ? 'User updated' : 'User created';
    actions.ui.showNotification({ type: 'success', message });

    handleDetailClose();
    open = false;
  };

  return (
    <Dialog
      open={open}
      onClose={handleDetailClose}
      maxWidth="sm"
      aria-labelledby="user-details-dialog"
    >
      <Formik
        initialValues={userData}
        validationSchema={formValidation}
        enableReinitialize={true}
        onSubmit={async (values) => await submit(values)}
      >
        {({
          errors,
          dirty,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent className={classes.dialogContent} dividers>
              <Grid container spacing={3} className={classes.section}>
                <Personal
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                />
              </Grid>
              <Grid
                container
                spacing={3}
                className={clsx(classes.section, classes.credentialsSection)}
              >
                <Credentials
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                />
              </Grid>
              <Grid container spacing={3} className={classes.section}>
                <Attributions
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                />
              </Grid>
              {userData.id && userData.stories && (
                <Grid container spacing={3} className={classes.section}>
                  <Stories name="stories" />
                </Grid>
              )}
            </DialogContent>
            <DialogActions>
              <Actions
                dirty={dirty}
                handleBlur={handleBlur}
                handleCancel={handleCancelButton}
                handleChange={handleChange}
                isSubmitting={isSubmitting}
                values={values}
                // userData={userData}
              />
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

Details.propTypes = {
  handleDetailClose: PropTypes.func,
  open: PropTypes.bool,
  user: PropTypes.any,
};

export default Details;
