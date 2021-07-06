import { Dialog, DialogActions, DialogContent, Grid } from '@material-ui/core';
import DeleteDialog from '@src/components/DeleteDialog';
import { useAppState, useActions } from '@src/overmind';
import { NotificationType, RoleType, User } from '@src/types';
import { isError } from '@src/util/utilities';
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import Actions from './Actions';
import Attributions from './Attributions';
import Credentials from './Credentials';
import Personal from './Personal';

interface DetailsProps {
  open: boolean;
  handleClose: () => void;
  userId?: number;
}

const initialValues: Partial<User> = {
  avatarUrl: null,
  firstName: '',
  groupId: '',
  lastName: '',
  roleTypeId: RoleType.STUDENT, // student
  userName: '',
};

const Details: FC<DetailsProps> = ({ open, handleClose, userId }) => {
  const { session } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['users', 'common', 'errorMessages', 'deleteDialog']);
  const [userData, setUserData] = useState<User | Partial<User>>(initialValues);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (!userId) {
      const selectedUserData: Partial<User> = Object.assign(initialValues);
      selectedUserData.groupId = '';
      if (session.user && session.isInstructor) {
        selectedUserData.groupId = session.user.groupId;
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
    roleTypeId: Yup.string().required(),
    groupId: Yup.number(),
  });

  const submit = async (values: Partial<User>) => {
    // create update
    const response = !values.id
      ? await actions.users.createUser(values as Omit<User, 'id'>)
      : await actions.users.updateUser({ userData, values });
    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;
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

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    const message = isError(response) ? t('errorMessages:somethingWentWrong') : t('userDeleted');

    actions.ui.showNotification({ message, type });

    handleClose();
  };

  return (
    <Dialog aria-labelledby="user-details-dialog" maxWidth="sm" onClose={handleClose} open={open}>
      {loaded && (
        <Formik
          enableReinitialize={true}
          initialValues={userData}
          onSubmit={submit}
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
              <DialogContent dividers sx={{ mb: 1, px: 0 }}>
                <Grid container spacing={3} sx={{ px: 2, pt: 2, pb: 1 }}>
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
                  sx={{
                    mt: 0,
                    mb: 2,
                    py: 2,
                    px: 2,
                    backgroundColor: ({ palette }) =>
                      palette.mode === 'light' ? palette.grey[100] : palette.grey[700],
                  }}
                >
                  <Credentials
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                    values={values}
                  />
                </Grid>
                <Grid container spacing={3} sx={{ px: 2, pt: 2, pb: 1 }}>
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
                handleNo={() => setDeleteDialogOpen(false)}
                handleYes={() => {
                  setDeleteDialogOpen(false);
                  submitDelete();
                }}
                isSubmitting={isSubmitting}
                message={t('deleteDialog:message', { object: t('user') })}
                open={deleteDialogOpen}
                title={t('deleteDialog:title', { object: t('user') })}
              />
            </form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

export default Details;
