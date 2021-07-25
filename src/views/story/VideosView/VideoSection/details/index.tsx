import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import ConfirmationDialog from '@src/components/ConfirmationDialog';
import { useActions } from '@src/overmind';
import { NotificationType, Video } from '@src/types';
import { isError } from '@src/util/utilities';
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import Actions from './Actions';
import Extra from './Extra';
import Meta from './Meta';
import Player from './Player';
import Source from './Source';

interface DetailsProps {
  handleClose: () => void;
  open: boolean;
  videoId?: number;
}

const initialValues: Partial<Video> = {
  url: '',
  imageUrl: '',
  title: '',
  channelTitle: '',
  publishedAt: '',
  duration: '',
  description: '',
  tags: [],
};

const Details: FC<DetailsProps> = ({ handleClose, open, videoId }) => {
  const actions = useActions();
  const { t } = useTranslation(['videos', 'common', 'errorMessages', 'confirmationDialog']);
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
  });

  const parseVideoUrl = (input: string) => {
    //REGEX: extract the params from URL. anything after the '/watch?'
    //ex: https://www.youtube.com/watch?v=2MQx0SXLCcE&t=4274s
    // -> v=2MQx0SXLCcE&t=4274s
    const regex = /(?:watch\?)(.+)/;
    const match = input.match(regex);
    if (!match) return;

    const rawParams = match[1].split('&');

    const videoParams: Map<string, string> = new Map();
    rawParams.forEach((params) => {
      const [key, value] = params.split('=');
      videoParams.set(key, value);
    });

    const id = videoParams.get('v');
    videoData.url = input;
    setYoutubeVideoId(id);
  };

  const fetchYoutubeData = async () => {
    if (!youtubeVideoId) return;
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

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

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

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    const message = isError(response) ? t('errorMessages:somethingWentWrong') : t('videoDeleted');

    actions.ui.showNotification({ message, type });

    handleBeforeClose();
  };

  const handleBeforeClose = () => {
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
          <DialogTitle
            sx={{
              color: ({ palette }) => palette.primary.light,
              textAlign: 'center',
            }}
          >
            {t('addVideo')}
          </DialogTitle>
          <DialogContent dividers>
            <Source parseVideoUrl={parseVideoUrl} />
          </DialogContent>
        </>
      ) : (
        <Formik
          enableReinitialize={true}
          initialValues={videoData}
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
              {videoData.url && (
                <Box>
                  <Player url={videoData.url} />
                </Box>
              )}

              <DialogContent dividers>
                <Box mt={-2} mb={2} mx={-3} py={2} px={3}>
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
              <ConfirmationDialog
                handleNo={() => setDeleteDialogOpen(false)}
                handleYes={() => {
                  setDeleteDialogOpen(false);
                  submitDelete();
                }}
                isSubmitting={isSubmitting}
                message={`${t('confirmationDialog:assetDeleteWarning')} ${t(
                  'confirmationDialog:deleteMessage',
                  { object: t('video') }
                )}`}
                open={deleteDialogOpen}
                title={t('video')}
              />
            </form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

export default Details;
