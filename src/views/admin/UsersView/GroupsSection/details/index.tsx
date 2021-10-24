import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ConfirmationDialog from '@src/components/ConfirmationDialog';
import { useActions } from '@src/overmind';
import { NotificationType, UserGroup } from '@src/types';
import { isError } from '@src/util/utilities';
import { Formik } from 'formik';
import { json } from 'overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import Actions from './Actions';
import Fields from './Fields';

interface DetailsProps {
  groupId?: number;
  handleClose: () => void;
  open: boolean;
}

const initialValues: Partial<UserGroup> = {
  name: '',
  description: '',
  institution: '',
};

const Details: FC<DetailsProps> = ({ groupId, handleClose, open }) => {
  const { ui, users } = useActions();
  const { t } = useTranslation();
  const [groupData, setGroupData] = useState<UserGroup | Partial<UserGroup>>(initialValues);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (!groupId) {
      setGroupData(initialValues);
      return;
    }

    const fetch = async () => {
      const selectedGroup = await users.getGroup(groupId);
      if (!isError(selectedGroup)) setGroupData(json(selectedGroup));
    };
    fetch();
  }, [open]);

  const formValidation = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string().trim().required(t('common:required')),
    description: Yup.string().trim(),
    institution: Yup.string().trim(),
  });

  const submit = async (values: Partial<UserGroup>): Promise<void> => {
    const response = !values.id
      ? await users.createGroup(values as Omit<UserGroup, 'id'>)
      : await users.updateGroup(values as UserGroup);

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    //error
    if (isError(response)) {
      const message = t('error:somethingWentWrong');
      ui.showNotification({ message, type });
      return;
    }

    //success
    const message = values.id ? t('groups:groupUpdated') : t('groups:groupCreated');
    ui.showNotification({ message, type });

    handleClose();
  };

  const submitDelete = async () => {
    if (!groupData.id) return;
    const response = await users.deleteGroup(groupData.id);

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    const message = isError(response) ? t('error:somethingWentWrong') : t('groups:groupDeleted');

    ui.showNotification({ message, type });

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
              {!groupData.id && <DialogTitle>{t('groups:newGroup')}</DialogTitle>}
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
              <ConfirmationDialog
                handleNo={() => setDeleteDialogOpen(false)}
                handleYes={() => {
                  setDeleteDialogOpen(false);
                  submitDelete();
                }}
                isSubmitting={isSubmitting}
                message={t('confirmation:deleteMessage', { object: t('common:group') })}
                open={deleteDialogOpen}
                title={t('common:group')}
              />
            </form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

export default Details;
