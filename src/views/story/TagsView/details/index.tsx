import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import DeleteDialog from '../../../../components/DeleteDialog';
import { useApp } from '../../../../overmind';
import { NotificationType, Tag } from '../../../../types';
import { isError } from '../../../../util/utilities';
import Actions from './Actions';

interface DetailsProps {
  open: boolean;
  handleClose: () => void;
  tagId?: number;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  alertInactive: {
    marginLeft: -spacing(2),
    marginRight: -spacing(2),
    marginTop: -spacing(1),
    marginBottom: spacing(1),
  },
  capitalize: { textTransform: 'capitalize' },
  dialogContent: { width: 400 },
  header: {
    color: palette.primary.light,
    textAlign: 'center',
  },
  marginBottom: { marginBottom: spacing(1) },
  section: { paddingBottom: spacing(1) },
}));

const initialValues: Partial<Tag> = {
  name: '',
};

const Details: FC<DetailsProps> = ({ open, handleClose, tagId }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const { t } = useTranslation([
    'tags',
    'common',
    'errorMessages',
    'deleteDialog',
  ]);
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
    active: Yup.bool(),
  });

  const submit = async (values: Partial<Tag>) => {
    const response = !values.id
      ? await actions.videos.createTag(values as Omit<Tag, 'id'>)
      : await actions.videos.updateTag(values as Tag);

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
    const message = values.id ? t('tagUpdated') : t('tagCreated');
    actions.ui.showNotification({ message, type });

    handleClose();
  };

  const submitDelete = async () => {
    if (!tagData.id) return;
    const response = await actions.videos.deleteTag(tagData.id);

    const type = isError(response)
      ? NotificationType.ERROR
      : NotificationType.SUCCESS;

    const message = isError(response)
      ? t('errorMessages:somethingWentWrong')
      : t('tagDeleted');

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
              {!tagData.id && <DialogTitle>{t('newTag')}</DialogTitle>}
              <DialogContent className={classes.dialogContent} dividers>
                <TextField
                  className={classes.capitalize}
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label={t('common:name')}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
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
                title={t('deleteDialog:title', { object: t('tag') })}
                message={t('deleteDialog:message', { object: t('tag') })}
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
