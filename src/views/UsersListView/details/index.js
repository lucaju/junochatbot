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

const Details = ({ open, handleDetailClose, userId }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isAdmin] = useState(state.session.isAdmin);
  const [submitType, setSubmitType] = useState(null);

  const initialValues = {
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    language: state.users.defaultLanguage,
    roleType: state.users.defaultRoleType,
    group: state.users.defaultGroup,
    stories: [],
    submitType: 'submit',
  };

  if (!isAdmin) initialValues.group = state.session.user.group;

  const [userData, setUserData] = useState(initialValues);

  useEffect(() => {
    if (open && userId !== 0) {
      const loadSelectedUserData = async (id) => {
        const selectedUserData = await actions.users.getUser(id);
        selectedUserData.password = '';
        selectedUserData.submitType = 'submit';
        setUserData(selectedUserData);
      };
      loadSelectedUserData(userId);
    }
    if (open && userId === 0) {
      setUserData(initialValues);
    }
    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    newAvatar: Yup.string(),
    firstName: Yup.string().trim().required('First name is required'),
    lastName: Yup.string().trim().required('Last name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().max(255),
    language: Yup.string().required(),
    roleType: Yup.string().required(),
    group: Yup.string(),
    stories: Yup.array(),
  });

  const handleCancelButton = () => {
    handleDetailClose();
    open = false;
  };

  const submit = async (values) => {
    const res = await actions.users.save(values);
    if (res) {
      const message = values.id ? 'User updated' : 'User created';
      actions.ui.showNotification({
        type: 'success',
        message,
      });
      handleDetailClose();
      open = false;
    } else {
      actions.ui.showNotification({
        type: 'error',
        message: 'Error: Something went wrong!',
      });
    }
  };

  const deleteUser = async (values) => {
    if (!values.id) return;
    const res = await actions.users.deleteUser(userId);

    if (!res) {
      actions.ui.showNotification({
        type: 'error',
        message: 'Error: Something went wrong!',
      });
      setDeleteDialogOpen(false);
      return;
    }

    actions.ui.showNotification({
      type: 'success',
      message: 'User removed',
    });

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
        onSubmit={async (values) => {
          if (submitType === 'delete') values.submitType = 'delete';
          values.submitType === 'delete'
            ? await deleteUser(values)
            : await submit(values);
          setSubmitType(null);
        }}
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
              {userData.id && (
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
                name="submitType"
                userId={userId}
              />
            </DialogActions>
            <DeleteDialog
              handleYes={() => {
                setSubmitType('delete');
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
    </Dialog>
  );
};

Details.propTypes = {
  handleDetailClose: PropTypes.func,
  open: PropTypes.bool,
  userId: PropTypes.any,
};

export default Details;
