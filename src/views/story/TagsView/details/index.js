import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
import List from './List';

const useStyles = makeStyles((theme) => ({
  dialog: {
    // width: 500,
  },
  header: {
    color: theme.palette.primary.light,
    textAlign: 'center',
  },
  marginBottom: { marginBottom: theme.spacing(1) },
  section: {
    paddingBottom: theme.spacing(1),
  },
}));

const Details = ({ open, handleDetailClose, tagId }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [submitType, setSubmitType] = useState(null);
  const [tagData, setTagData] = useState(initialValues);

  const initialValues = {
    id: null,
    name: '',
    intents: [],
    videos: [],
    submitType: 'submit',
  };

  useEffect(() => {
    if (open && tagId !== 0) {
      const fetch = async (id) => {
        const selectedTag = await actions.tag.getTag(id);
        selectedTag.submitType = 'submit';
        setTagData(selectedTag);
      };
      fetch(tagId);
    }
    if (open && tagId === 0) {
      setTagData(initialValues);
    }
    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    name: Yup.string().required(),
    intents: Yup.array(),
    videos: Yup.array(),
  });

  const handleCancelButton = () => {
    handleDetailClose();
    open = false;
  };

  const submit = async (values) => {
    const res = !values.id
      ? await actions.tag.createTag(values)
      : await actions.tag.updateTag(values);

    if (!res) {
      actions.ui.showNotification({
        type: 'error',
        message: 'Error: Something went wrong!',
      });
      return;
    }

    const message = values.id ? 'Tag updated' : 'Tag created';
    actions.ui.showNotification({
      type: 'success',
      message,
    });
    handleDetailClose();
    open = false;
  };

  const deleteTag = async (values) => {
    if (!values.id) return;
    const res = await actions.tag.deleteTag(tagId);
    setDeleteDialogOpen(false);

    if (!res) {
      actions.ui.showNotification({
        type: 'error',
        message: 'Error: Something went wrong!',
      });
      return;
    }

    actions.ui.showNotification({
      type: 'success',
      message: 'Tag removed',
    });
    handleDetailClose();
    open = false;
  };

  return (
    <>
      {tagData && (
        <Dialog
          open={open}
          onClose={handleDetailClose}
          maxWidth="md"
          aria-labelledby="user-details-dialog"
        >
          <DialogTitle className={classes.header}>Tag</DialogTitle>
          <Formik
            initialValues={tagData}
            validationSchema={formValidation}
            enableReinitialize={true}
            onSubmit={async (values) => {
              if (submitType === 'delete') values.submitType = 'delete';
              values.submitType === 'delete'
                ? await deleteTag(values)
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
                <DialogContent dividers className={classes.dialog}>
                  <Grid container spacing={3} className={classes.marginBottom}>
                    <Grid item xs>
                      <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Name"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <>
                      {values.intents.length > 0 && (
                        <Grid item md={6} sm={6}>
                          <List name="intents" title="Intents" />
                        </Grid>
                      )}
                      {values.videos.length > 0 && (
                        <Grid item md={6} sm={6}>
                          <List name="videos" title="Videos" />
                        </Grid>
                      )}
                    </>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Actions
                    dirty={dirty}
                    handleCancel={handleCancelButton}
                    handleDelete={() => setDeleteDialogOpen(true)}
                    isSubmitting={isSubmitting}
                    name="submitType"
                  />
                </DialogActions>
                <DeleteDialog
                  handleYes={() => {
                    setSubmitType('delete');
                    handleSubmit();
                  }}
                  handleNo={() => setDeleteDialogOpen(false)}
                  isSubmitting={isSubmitting}
                  message="Are you sure you want to delete this tag?"
                  open={deleteDialogOpen}
                  title="Delete Tag"
                />
              </form>
            )}
          </Formik>
        </Dialog>
      )}
    </>
  );
};

Details.propTypes = {
  handleDetailClose: PropTypes.func,
  open: PropTypes.bool,
  tagId: PropTypes.any,
};

export default Details;
