import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteDialog from 'src/components/DeleteDialog';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';
import Actions from './Actions';
import Extra from './Extra';
import Meta from './Meta';
import Player from './Player';
import Source from './Source';

const useStyles = makeStyles(({ spacing, palette }) => ({
  header: {
    color: palette.primary.light,
    textAlign: 'center',
  },
  dialogContent: {
    // paddingRight: 0,
    // paddingLeft: 0,
    // marginBottom: spacing(1),
    // minHeight: 160,
    maxHeight: '70vh',
  },
  player: {
    marginTop: -spacing(2),
    marginBottom: -spacing(3),
    marginLeft: -spacing(3),
    marginRight: -spacing(3),
  },
  meta: {
    backgroundColor: palette.background.default,
    marginTop: -spacing(2),
    marginBottom: spacing(2),
    marginLeft: -spacing(3),
    marginRight: -spacing(3),
    paddingRight: spacing(3),
    paddingLeft: spacing(3),
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
  },
}));

const initialValues = {
  url: '',
  image: '',
  title: '',
  channelTitle: '',
  publishedAt: '',
  duration: '',
  description: '',
  tags: [],
  active: true,
};

const Details = ({ open, handleDetailClose, video }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const { t } = useTranslation(['videos', 'common', 'errorMessages', 'deleteDialog']);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [videoData, setVideoData] = useState(initialValues);
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);
  const [dirtyFromYoutube, setDirtyFromYoutube] = useState(false);

  const formValidation = Yup.object().shape({
    url: Yup.string().trim().required(t('common:required')),
    image: Yup.string(),
    title: Yup.string().max(255),
    channelTitle: Yup.string().max(255),
    publishedAt: Yup.string(),
    duration: Yup.string(),
    description: Yup.string(),
    tags: Yup.array(),
    active: Yup.bool(),
  });

  useEffect(() => {
    if (open && video?.id) {
      const fetch = async () => {
        const selectedVideo = await actions.videos.getVideo(video.id);
        setVideoData(selectedVideo);
        parseVideoUrl(selectedVideo.url);
      };
      fetch();
    }
    if (open && !video?.id) setVideoData(initialValues);
    return () => {};
  }, [open]);

  const parseVideoUrl = (input) => {
    //REGEX
    // extract the ID from the url
    //anything after the character "=", exclusively;
    //ex: https://www.youtube.com/watch?v=2MQx0SXLCcE&t=4274s -> 2MQx0SXLCcE
    const regex = /(?<==)((.*)|(.+?)(?=&))/g; //
    const match = input.match(regex);
    if (!match) return;

    const id = match[0];
    videoData.url = input;
    setYoutubeVideoId(id);
  };

  const fetchYoutubeData = async () => {
    const ytData = await actions.videos.getYoutubeData(youtubeVideoId);
    setVideoData({ ...videoData, ...ytData });
    setDirtyFromYoutube(true);
  };

  const handleClose = () => {
    setVideoData(initialValues);
    setDirtyFromYoutube(false);
    setYoutubeVideoId(null);
    handleDetailClose();
    open = false;
  };

  // eslint-disable-next-line no-unused-vars
  const submit = async (values) => {
    //create update
    const response = values.id
      ? await actions.videos.updateVideo({ videoData, values })
      : actions.videos.createVideo(values);

    const type = response.error ? 'error' : 'success';

    //error
    if (response.error) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return response;
    }

    //success
    const message = values.id ? t('videoUpdated') : t('videoAdded');
    actions.ui.showNotification({ message, type });

    handleClose();
  };

  // eslint-disable-next-line no-unused-vars
  const updateStatus = async (values, active) => {
    if (!values.id) return;

    //Since the API is PUT not PATCH, we need to send all fields
    const data = videoData;
    data.active = active; //change video status

    const response = await actions.videos.updateVideoStatus(data);

    const type = response.error ? 'error' : 'success';

    //error
    if (response.error) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return response;
    }

    //success
    const message = active ? t('videoRestored') : t('videoDeleted');
    actions.ui.showNotification({ message, type });

    //end
    if (active) return response;

    handleClose();
  };

  return (
    <Dialog
      aria-labelledby="video-details-dialog"
      fullWidth
      maxWidth="sm"
      onBackdropClick={handleClose}
      onClose={handleDetailClose}
      open={open}
      scroll="body"
    >
      {!video?.id && !youtubeVideoId ? (
        <>
          <DialogTitle className={classes.header}>{t('addVideo')}</DialogTitle>
          <DialogContent dividers>
            <Source parseVideoUrl={parseVideoUrl} />
          </DialogContent>
        </>
      ) : (
        <Formik
          enableReinitialize={true}
          initialValues={videoData}
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
              {youtubeVideoId && (
                <DialogTitle className={classes.player}>
                  <Player youtubeVideoId={youtubeVideoId} />
                </DialogTitle>
              )}

              <DialogContent dividers>
                <Box className={classes.meta}>
                  <Meta
                    handleRefresh={fetchYoutubeData}
                    values={values}
                    youtubeVideoId={youtubeVideoId}
                  />
                </Box>
                <Box>
                  <Extra
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                    values={values}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Actions
                  dirty={dirty}
                  dirtyFromYoutube={dirtyFromYoutube}
                  handleCancel={handleClose}
                  handleDelete={() => setDeleteDialogOpen(true)}
                  isSubmitting={isSubmitting}
                  values={values}
                  videoData={videoData}
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
                message={t('deleteDialog:message', { object: t('video')})}
                open={deleteDialogOpen}
                title={t('deleteDialog:title', { object: t('video')})}
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
  video: PropTypes.object,
};

export default Details;
