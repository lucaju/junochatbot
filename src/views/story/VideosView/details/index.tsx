import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteDialog from '../../../../components/DeleteDialog';
import { useApp } from '../../../../overmind';
import * as Yup from 'yup';
import Actions from './Actions';
import Extra from './Extra';
import Meta from './Meta';
import Player from './Player';
import Source from './Source';
import { NotificationType, Video } from '../../../../types';
import { isError } from '../../../../util/utilities';

interface DetailsProps {
  open: boolean;
  handleClose: () => void;
  videoId?: number;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  alertInactive: {
    marginLeft: -spacing(2),
    marginRight: -spacing(2),
    marginTop: -spacing(1),
    marginBottom: spacing(1),
  },
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

const initialValues: Partial<Video> = {
  url: '',
  imageUrl: '',
  title: '',
  channelName: '',
  publishedAt: '',
  duration: '',
  description: '',
  tags: [],
};

const Details: FC<DetailsProps> = ({ open, handleClose, videoId }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const { t } = useTranslation([
    'videos',
    'common',
    'errorMessages',
    'deleteDialog',
  ]);
  const [videoData, setVideoData] = useState(initialValues);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | undefined>();
  const [dirtyFromYoutube, setDirtyFromYoutube] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (!videoId) {
      setVideoData(initialValues);
      return;
    }

    const fetch = async () => {
      const selectedVideo = await actions.videos.getVideo(videoId);
      if (!isError(selectedVideo)) {
        setVideoData(selectedVideo);
        parseVideoUrl(selectedVideo.url);
      }
    };
    fetch();

    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    id: Yup.number(),
    url: Yup.string().trim().required(t('common:required')),
    imageUrl: Yup.string(),
    title: Yup.string().max(255),
    channelTitle: Yup.string().max(255),
    publishedAt: Yup.string(),
    duration: Yup.string(),
    description: Yup.string(),
    tags: Yup.array(),
    active: Yup.bool(),
  });

  const parseVideoUrl = (input: string) => {
    //REGEX
    // extract the params from URL
    //anything after the '/watch?'
    //ex: https://www.youtube.com/watch?v=2MQx0SXLCcE&t=4274s
    // -> v=2MQx0SXLCcE&t=4274s
    const regex = /(?:watch\?)(.+)/; //
    const match = input.match(regex);
    if (!match) return;

    const rawParams = match[1].split('&');

    const videoParams:Map<string, string> = new Map();
    rawParams.forEach((params) => {
      const [key, value] = params.split('=');
      videoParams.set(key, value);
    });

    const id = videoParams.get('v');
    videoData.url = input;
    setYoutubeVideoId(id);
  };

  const fetchYoutubeData = async () => {
    if(!youtubeVideoId) return;
    const ytData = await actions.videos.getYoutubeData(youtubeVideoId);
    if (isError(ytData)) return;
    setVideoData({ ...videoData, ...ytData });
    setDirtyFromYoutube(true);
  };

  const submit = async (values: Partial<Video>) => {
    //create update
    const response = !values.id
      ? await actions.videos.createVideo(values as Omit<Video, 'id'>)
      : await actions.videos.updateVideo({ videoData, values });

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
    const message = values.id ? t('videoUpdated') : t('videoAdded');
    actions.ui.showNotification({ message, type });

    handleBeforeClose();
  };

  const submitDelete = async () => {
    if (!videoData.id) return;
    const response = await actions.videos.deleteVideo(videoData.id);

    const type = isError(response)
      ? NotificationType.ERROR
      : NotificationType.SUCCESS;

    const message = isError(response)
      ? t('errorMessages:somethingWentWrong')
      : t('videoDeleted');

    actions.ui.showNotification({ message, type });

    handleBeforeClose();
  };

  const handleBeforeClose = () => {
    setVideoData(initialValues);
    setDirtyFromYoutube(false);
    setYoutubeVideoId(undefined);
    handleClose();
  };

  return (
    <Dialog
      aria-labelledby="video-details-dialog"
      fullWidth
      maxWidth="sm"
      onBackdropClick={handleBeforeClose}
      onClose={handleBeforeClose}
      open={open}
      scroll="body"
    >
      {!videoId && !youtubeVideoId ? (
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
          onSubmit={async (values) =>  await submit(values)}
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
                />
              </DialogActions>
              <DeleteDialog
                open={deleteDialogOpen}
                title={t('deleteDialog:title', { object: t('video') })}
                message={t('deleteDialog:message', { object: t('video') })}
                handleNo={() => setDeleteDialogOpen(false)}
                handleYes={() => {
                  setDeleteDialogOpen(false);
                  submitDelete()
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
