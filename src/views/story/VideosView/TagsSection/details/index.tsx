import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import ConfirmationDialog from '@src/components/ConfirmationDialog';
import { useActions } from '@src/overmind';
import { NotificationType, Tag } from '@src/types';
import { isError } from '@src/util/utilities';
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import Actions from './Actions';

interface DetailsProps {
  handleClose: () => void;
  open: boolean;
  tagId?: number;
}

const initialValues: Partial<Tag> = {
  name: '',
};

const Details: FC<DetailsProps> = ({ handleClose, open, tagId }) => {
  const actions = useActions();
  const { t } = useTranslation(['tags', 'common', 'errorMessages', 'confirmationDialog']);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tagData, setTagData] = useState(initialValues);

  useEffect(() => {
    if (!open) return;
    if (!tagId) {
      setTagData(initialValues);
      return;
    }

    const fetch = async () => {
      const selectedTag = await actions.videos.getTag(tagId);
      if (!isError(selectedTag)) {
        setTagData(selectedTag);
      }
    };
    fetch();

    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string().required(t('common:required')),
  });

  const submit = async (values: Partial<Tag>) => {
    const response = !values.id
      ? await actions.videos.createTag(values as Omit<Tag, 'id'>)
      : await actions.videos.updateTag(values as Tag);

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    //error
    if (isError(response)) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return;
    }

    //success
    const message = values.id ? t('tagUpdated') : t('tagCreated');
    actions.ui.showNotification({ message, type });

    handleClose();
  };

  const submitDelete = async () => {
    if (!tagData.id) return;
    const response = await actions.videos.deleteTag(tagData.id);

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    const message = isError(response) ? t('errorMessages:somethingWentWrong') : t('tagDeleted');

    actions.ui.showNotification({ message, type });

    handleClose();
  };

  return (
    <Dialog
      aria-labelledby="tag-details-dialog"
      maxWidth="md"
      onBackdropClick={handleClose}
      onClose={handleClose}
      open={open}
    >
      {tagData && (
        <Formik
          enableReinitialize={true}
          initialValues={tagData}
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
              {!tagData.id && <DialogTitle>{t('newTag')}</DialogTitle>}
              <DialogContent dividers sx={{ width: 400 }}>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label={t('common:name')}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ textTransform: 'capitalize' }}
                  value={values.name}
                  variant="standard"
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
                message={t('confirmationDialog:deleteMessage', { object: t('tag') })}
                isSubmitting={isSubmitting}
                open={deleteDialogOpen}
                title={t('tag')}
              />
            </form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

export default Details;
