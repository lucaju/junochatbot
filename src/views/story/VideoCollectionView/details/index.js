import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DeleteDialog from 'src/components/DeleteDialog';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';
import Actions from './Actions';
import Meta from './Meta';
import Player from './Player';
import Source from './Source';

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.primary.light,
    textAlign: 'center',
  },
  dialogContent: {
    paddingRight: 0,
    paddingLeft: 0,
    marginBottom: theme.spacing(1),
    minHeight: 160,
    maxHeight: '70vh',
  },
  section: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
}));

const supportProviders = new Set(['youtube', 'vimeo']);

const initialValues = {
  source: '',
  provider: '',
  image: '',
  title: '',
  author: '',
  year: '',
  genre: '',
  description: '',
  tags: [],
  submitType: 'submit',
};

const formValidation = Yup.object().shape({
  source: Yup.string().trim().required('Source is required'),
  provider: Yup.string(),
  image: Yup.string(),
  title: Yup.string().max(255),
  author: Yup.string().max(255),
  year: Yup.string(),
  genre: Yup.string(),
  description: Yup.string(),
  tags: Yup.array(),
});

const Details = ({ open, handleDetailClose, videoId }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [submitType, setSubmitType] = useState(null);
  const [videoData, setVideoData] = useState(initialValues);
  const [videoProvider, setVideoProvider] = useState(null);

  useEffect(() => {
    if (open && videoId !== 0) {
      const fetch = async (id) => {
        const video = await actions.video.getVideo(id);
        video.submitType = 'submit';
        setVideoData(video);
        setVideoProvider(video.provider);
      };
      fetch(videoId);
    }
    if (open && videoId === 0) {
      setVideoData(initialValues);
    }
    return () => {};
  }, [open]);

  const parseVideoProvider = (input) => {
    let result = null;
    for (const provider of supportProviders) {
      if (input.includes(provider)) {
        result = provider;
        break;
      }
    }
    if (result) setVideoProvider(result);
  };

  const handleCancelButton = () => {
    handleDetailClose();
    open = false;
  };

  const submit = async (values) => {
    const res = !values.id
      ? await actions.video.createVideo(values)
      : await actions.video.updateVideo(values);

    if (!res) {
      actions.ui.showNotification({
        type: 'error',
        message: 'Error: Something went wrong!',
      });
      return;
    }

    const message = values.id ? 'Video updated' : 'Video created';
    actions.ui.showNotification({
      type: 'success',
      message,
    });
    handleDetailClose();
    open = false;
  };

  const deleteVideo = async (values) => {
    if (!values.id) return;
    const res = await actions.video.deleteVideo(values.id);
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
      message: 'Video removed',
    });
    handleDetailClose();
    open = false;
  };

  return (
    <Dialog
      open={open}
      onClose={handleDetailClose}
      maxWidth="sm"
      aria-labelledby="video-details-dialog"
      fullWidth
      scroll="body"
    >
      <DialogTitle className={classes.header}>Video</DialogTitle>
      <Formik
        initialValues={videoData}
        validationSchema={formValidation}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (submitType === 'delete') values.submitType = 'delete';
          values.submitType === 'delete'
            ? await deleteVideo(values)
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
              <Grid
                container
                spacing={3}
                className={classes.section}
                justify="center"
                alignItems="center"
              >
                <Source
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                  parseVideoProvider={parseVideoProvider}
                  videoProvider={videoProvider}
                />
              </Grid>
              {videoProvider && (
                <>
                  <Player provider={values.provider} source={values.source} />
                  <Grid container spacing={3} className={classes.section}>
                    <Meta
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      values={values}
                    />
                  </Grid>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Actions
                dirty={dirty}
                handleCancel={handleCancelButton}
                handleDelete={() => setDeleteDialogOpen(true)}
                isSubmitting={isSubmitting}
                name="submitType"
                videoId={videoId}
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
  videoId: PropTypes.any,
};

export default Details;
