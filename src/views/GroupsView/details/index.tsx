import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { Formik } from 'formik';
import { json } from 'overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import DeleteDialog from '@src/components/DeleteDialog';
import { useApp } from '@src/overmind';
import { NotificationType, UserGroup } from '@src/types';
import { isError } from '@src/util/utilities';
import Actions from './Actions';
import Fields from './Fields';

interface DetailsProps {
  open: boolean;
  handleClose: () => void;
  groupId?: number;
}

const useStyles = makeStyles(() => ({}));

const initialValues: Partial<UserGroup> = {
  name: '',
  description: '',
  institution: '',
};

const Details: FC<DetailsProps> = ({ open, handleClose, groupId }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const { t } = useTranslation([
    'groups',
    'common',
    'errorMessages',
    'deleteDialog',
  ]);
  const [groupData, setGroupData] = useState<UserGroup | Partial<UserGroup>>(
    initialValues
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (!groupId) {
      setGroupData(initialValues);
      return;
    }

    const fetch = async () => {
      const selectedGroup = await actions.users.getGroup(groupId);
      if (!isError(selectedGroup)) setGroupData(json(selectedGroup));
    };
    fetch();

    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string().trim().required(t('common:required')),
    description: Yup.string().trim(),
    institution: Yup.string().trim(),
  });

  const submit = async (values: Partial<UserGroup>): Promise<void> => {
    const response = !values.id
      ? await actions.users.createGroup(values as Omit<UserGroup, 'id'>)
      : await actions.users.updateGroup(values as UserGroup);

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
    const message = values.id ? t('groupUpdated') : 'groupCreated';
    actions.ui.showNotification({ message, type });

    handleClose();
  };

  const submitDelete = async () => {
    if (!groupData.id) return;
    const response = await actions.users.deleteGroup(groupData.id);

    const type = isError(response)
      ? NotificationType.ERROR
      : NotificationType.SUCCESS;

    const message = isError(response)
      ? t('errorMessages:somethingWentWrong')
      : t('groupDeleted');

    actions.ui.showNotification({ message, type });

    handleClose();
  };

  return (
    <Dialog
      aria-labelledby="group-details-dialog"
      maxWidth="xs"
      onBackdropClick={handleClose}
      onClose={handleClose}
      open={open}
    >
      {groupData && (
        <Formik
          enableReinitialize={true}
          initialValues={groupData}
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
              {!groupData.id && <DialogTitle>{t('newGroup')}</DialogTitle>}
              <DialogContent dividers>
                <Fields
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                />
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
                title={t('deleteDialog:title', { object: t('group') })}
                message={t('deleteDialog:message', { object: t('group') })}
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
