import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DeleteDialog from 'src/components/DeleteDialog';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';
import Actions from './Actions';

const useStyles = makeStyles(({ spacing, palette }) => ({
  dialogContent: { width: 400 },
  header: {
    color: palette.primary.light,
    textAlign: 'center',
  },
  marginBottom: { marginBottom: spacing(1) },
  section: { paddingBottom: spacing(1) },
}));

const initialValues = {
  name: '',
  active: true,
};

const formValidation = Yup.object().shape({
  name: Yup.string().required(),
  active: Yup.bool(),
});

const Details = ({ handleDetailClose, open, tag }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tagData, setTagData] = useState(initialValues);

  useEffect(() => {
    if (open && tag.id) {
      const fetch = async () => {
        const selectedTag = await actions.videos.getTag(tag.id);
        setTagData(selectedTag);
      };
      fetch();
    }
    if (open && !tag.id) setTagData(initialValues);
    return () => {};
  }, [open]);

  const submit = async (values) => {
    const res = !values.id
      ? await actions.videos.createTag(values)
      : await actions.videos.updateTag(values);

    const type = !res ? 'error' : 'success';

    if (!res) {
      const message = 'Error: Something went wrong!';
      actions.ui.showNotification({ message, type });
      return;
    }

    const message = values.id ? 'Tag updated' : 'Tag created';
    actions.ui.showNotification({ message, type });

    handleClose();
  };

  const updateStatus = async (values, active) => {
    if (!values.id) return;

    //Since the API is PUT not PATCH, we need to send all fields
    const data = { ...tag };
    data.active = active; //change user status

    const res = await actions.videos.updateTagStatus(data);

    const type = !res ? 'error' : 'success';

    //error
    if (res.error) {
      const message = 'Something went wrong!';
      actions.ui.showNotification({ message, type });
      return res;
    }

    //success
    setTagData(data);
    const message = active ? 'Tag restored' : 'Tag deleted';
    actions.ui.showNotification({ message, type });

    if (!res) return;

    handleClose();
  };

  const handleClose = () => {
    setTagData(initialValues);
    handleDetailClose();
    open = false;
  };

  return (
    <Dialog
      aria-labelledby="tag-details-dialog"
      maxWidth="md"
      onBackdropClick={handleClose}
      onClose={handleDetailClose}
      open={open}
    >
      {tagData && (
        <Formik
          enableReinitialize={true}
          initialValues={tagData}
          onSubmit={async (values) => {
            //change status submission
            if (values.submitType) {
              const active = values.submitType === 'delete' ? false : true;
              const response = await updateStatus(values, active);
              if (!response?.error) values.active = active;
              return;
            }

            //normal submission
            await submit(values);
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
              <DialogTitle>{!tagData.id ? 'New Tag' : 'Edit Tag'}</DialogTitle>
              <DialogContent className={classes.dialogContent} dividers>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
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
                  tagData={tagData}
                  values={values}
                />
              </DialogActions>
              <DeleteDialog
                handleNo={() => setDeleteDialogOpen(false)}
                handleYes={() => {
                  setDeleteDialogOpen(false);
                  values.submitType = 'delete';
                  handleSubmit();
                }}
                isSubmitting={isSubmitting}
                message="Are you sure you want to delete this tag?"
                open={deleteDialogOpen}
                title="Delete Tag"
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
  tag: PropTypes.object,
};

export default Details;
