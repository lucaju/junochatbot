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
import DeleteDialog from 'src/components/DeleteDialog';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';
import Actions from './Actions';
import Attributions from './Attributions';
import Credentials from './Credentials';
import Personal from './Personal';
import Stories from './Stories';

const useStyles = makeStyles(({ palette, spacing }) => ({
  dialogContent: {
    paddingRight: 0,
    paddingLeft: 0,
    marginBottom: spacing(1),
  },
  section: {
    paddingRight: spacing(2),
    paddingLeft: spacing(2),
    paddingTop: spacing(2),
    paddingBottom: spacing(1),
  },
  credentialsSection: {
    paddingTop: spacing(1),
    marginBottom: spacing(2),
    marginTop: 0,
    paddingBottom: spacing(1),
    backgroundColor:
      palette.type === 'light' ? palette.grey[100] : palette.grey[700],
  },
}));

const Details = ({ open, handleDetailClose, user }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const initialValues = {
    id: null,
    avatarUrl: null,
    firstName: '',
    lastName: '',
    userName: '',
    roleTypeId: state.users.defaultRoleType,
    groupId: -1,
    active: true,
  };

  const [userData, setUserData] = useState(initialValues);

  useEffect(() => {
    if (open && user.id === undefined) {
      const selectedUserData = Object.assign(initialValues);
      if (!state.session.isAdmin) {
        selectedUserData.groupId = state.session.user.groups[0];
      }
      setUserData(selectedUserData);
      setLoaded(true);
    }

    if (open && user.id !== undefined) {
      const fetchData = async () => {
        const userGroups = await actions.users.getUserGroups(user.id);

        const selectedUserData = Object.assign(user);
        selectedUserData.groupId = userGroups ? userGroups[0].id : -1;

        setUserData(selectedUserData);
        setLoaded(true);
      };

      fetchData();
    }
    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    avatarUrl: Yup.mixed(),
    firstName: Yup.string().trim().required('First name is required'),
    lastName: Yup.string().trim().required('Last name is required'),
    userName: Yup.string().email().required('Email is required'),
    roleTypeId: Yup.number().required(),
    groupId: Yup.number(),
    active: Yup.bool(),
  });

  const handleCancelButton = () => {
    handleDetailClose();
    open = false;
  };

  const submit = async (values) => {
    // if avatar changed, send oldFile to be removed.
    if (userData.avatarUrl && (values.avatarUrl?.name || !values.avatarUrl)) {
      values = { ...values, removeAvatar: userData.avatarUrl };
    }

    // remove unnecessary  info
    const cleandedValues = { ...values };
    delete cleandedValues.stories;

    //check group Change
    if (cleandedValues.groupId === user.groupId) delete cleandedValues.groupId;

    const response = await actions.users.saveUser(cleandedValues);

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

  const restoreUser = async (values) => {
    if (!values.id) return;

    const data = user;
    data.active = true;

    const response = await actions.users.saveUser(data);

    if (response.error) {
      actions.ui.showNotification({
        type: 'error',
        message: 'Something went wrong!',
      });
      return response;
    }

    userData.active = true;
    actions.ui.showNotification({ type: 'success', message: 'User restored' });

    return response;
  };

  const deleteUser = async (values) => {
    if (!values.id) return;

    const data = user;
    data.active = false;

    const response = await actions.users.saveUser(data);
    setDeleteDialogOpen(false);

    if (response.error) {
      actions.ui.showNotification({
        type: 'error',
        message: 'Something went wrong!',
      });
      return;
    }

    actions.ui.showNotification({ type: 'success', message: 'User deleted' });

    handleDetailClose();
    open = false;
  };

  return (
    <Dialog
      aria-labelledby="user-details-dialog"
      maxWidth="sm"
      onClose={handleDetailClose}
      open={open}
    >
      {loaded && (
        <Formik
          enableReinitialize={true}
          initialValues={userData}
          onSubmit={async (values) => {
            if (values.submitType === 'delete') {
              await deleteUser(values);
            } else if (values.submitType === 'restore') {
              const response = await restoreUser(values);
              if (!response.error) values.active = true;
            } else {
              await submit(values);
            }
          }}
          validationSchema={formValidation}
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
                  handleCancel={handleCancelButton}
                  handleDelete={() => setDeleteDialogOpen(true)}
                  isSubmitting={isSubmitting}
                  userData={userData}
                  values={values}
                />
              </DialogActions>
              <DeleteDialog
                handleYes={() => {
                  values.submitType = 'delete';
                  handleSubmit();
                }}
                handleNo={() => setDeleteDialogOpen(false)}
                isSubmitting={isSubmitting}
                message="Are you sure you want to delete this user?"
                open={deleteDialogOpen}
                title="Delete User"
              />
            </form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

Details.propTypes = {
  handleDetailClose: PropTypes.func,
  open: PropTypes.bool,
  user: PropTypes.any,
};

export default Details;
