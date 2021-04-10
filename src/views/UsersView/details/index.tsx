import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import DeleteDialog from '../../../components/DeleteDialog';
import { useApp } from '../../../overmind';
import { NotificationType, User } from '../../../types';
import { isError } from '../../../util/utilities';
import Actions from './Actions';
import Attributions from './Attributions';
import Credentials from './Credentials';
import Personal from './Personal';

interface DetailsProps {
  open: boolean;
  handleClose: () => void;
  userId?: number;
}

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

const initialValues: Partial<User> = {
  avatarUrl: null,
  firstName: '',
  lastName: '',
  userName: '',
  roleTypeId: 3, // student
  groupId: '',
};

const Details: FC<DetailsProps> = ({ open, handleClose, userId }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const { t } = useTranslation([
    'users',
    'common',
    'errorMessages',
    'deleteDialog',
  ]);
  const [userData, setUserData] = useState<User | Partial<User>>(initialValues);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (!userId) {
      const selectedUserData: Partial<User> = Object.assign(initialValues);
      selectedUserData.groupId = '';
      if (state.session.user && state.session.isInstructor) {
        selectedUserData.groupId = state.session.user.groupId;
      }
      setUserData(selectedUserData);
      setLoaded(true);
    }

    if (userId) {
      const fetchData = async () => {
        //get user data
        const user = await actions.users.getUser(userId);

        if (isError(user)) {
          actions.ui.showNotification({
            type: NotificationType.ERROR,
            message: 'User Not Found',
          });
          handleClose();
          return;
        }

        //get user group
        await actions.users.getUserGroup(userId);

        const userData = { ...user };
        if (!userData.groupId) userData.groupId = '';

        setUserData(userData);
        setLoaded(true);
      };

      fetchData();
    }
    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    avatarUrl: Yup.mixed(),
    firstName: Yup.string().trim().required(t('common:required')),
    lastName: Yup.string().trim().required(t('common:required')),
    userName: Yup.string().email().required(t('common:required')),
    roleTypeId: Yup.number().required(),
    groupId: Yup.number(),
  });

  const submit = async (values: Partial<User>) => {
    //create update
    const response = !values.id
      ? await actions.users.createUser(values as Omit<User, 'id'>)
      : await actions.users.updateUser({ userData, values });

    const type = isError(response)
      ? NotificationType.ERROR
      : NotificationType.SUCCESS;

    //error
    if (isError(response)) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return;
    }

    //success
    const message = values.id ? t('userUpdated') : t('userCreated');
    actions.ui.showNotification({ message, type });

    handleClose();
  };

  const submitDelete = async () => {
    if (!userData.id) return;
    const response = await actions.users.deleteUser(userData.id);

    const type = isError(response)
      ? NotificationType.ERROR
      : NotificationType.SUCCESS;

    const message = isError(response)
      ? t('errorMessages:somethingWentWrong')
      : t('userDeleted');

    actions.ui.showNotification({ message, type });

    handleClose();
  };

  return (
    <Dialog
      aria-labelledby="user-details-dialog"
      maxWidth="sm"
      onClose={handleClose}
      open={open}
    >
      {loaded && (
        <Formik
          enableReinitialize={true}
          initialValues={userData}
          onSubmit={async (values) => await submit(values)}
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
              </DialogContent>
              <DialogActions>
                <Actions
                  dirty={dirty}
                  handleCancel={handleClose}
                  handleDelete={() => setDeleteDialogOpen(true)}
                  isSubmitting={isSubmitting}
                  values={values}
                />
              </DialogActions>
              <DeleteDialog
                open={deleteDialogOpen}
                title={t('deleteDialog:title', { object: t('user') })}
                message={t('deleteDialog:message', { object: t('user') })}
                handleNo={() => setDeleteDialogOpen(false)}
                handleYes={() => {
                  setDeleteDialogOpen(false);
                  submitDelete();
                }}
                isSubmitting={isSubmitting}
              />
            </form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

export default Details;
