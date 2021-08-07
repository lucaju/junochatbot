import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import ConfirmationDialog from '@src/components/ConfirmationDialog';
import { useActions } from '@src/overmind';
import { NotificationType, Video } from '@src/types';
import { isError } from '@src/util/utilities';
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Url from 'url-parse';
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
  const { t } = useTranslation();
  const [videoData, setVideoData] = useState(initialValues);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | undefined>();
  const [isValidYTiD, setIsValidYTiD] = useState(false);
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
    const videoUrl = new Url(input, true);

    let videoId: string | undefined;
    if (!['youtu.be', 'www.youtube.com'].includes(videoUrl.hostname))
      return { errorMessage: t('error:videoUrlInvalid') };
    if (videoUrl.hostname === 'youtu.be') videoId = videoUrl.pathname.slice(1);
    if (videoUrl.hostname === 'www.youtube.com') videoId = videoUrl.query?.v;

    if (!videoId) return { errorMessage: t('error:videoIDNotFound') };

    videoData.url = input;
    setYoutubeVideoId(videoId);

    return videoId;
  };

  const fetchVideo = async (input: string) => {
    const videoId = parseVideoUrl(input);
    if (isError(videoId)) return videoId;

    const response = await actions.videos.getYoutubeData(videoId);
    if (isError(response)) return { errorMessage: t('error:videoNotFound') };

    setIsValidYTiD(true);
    return;
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
      const message = t('error:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return;
    }

    //success
    const message = values.id ? t('videos:videoUpdated') : t('videos:videoAdded');
    actions.ui.showNotification({ message, type });

    handleBeforeClose();
  };

  const submitDelete = async () => {
    if (!videoData.id) return;
    const response = await actions.videos.deleteVideo(videoData.id);

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    const message = isError(response) ? t('error:somethingWentWrong') : t('videos:videoDeleted');

    actions.ui.showNotification({ message, type });

    handleBeforeClose();
  };

  const handleBeforeClose = () => {
    setDirtyFromYoutube(false);
    setYoutubeVideoId(undefined);
    setIsValidYTiD(false);
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
      {!videoId && !isValidYTiD ? (
        <>
          <DialogTitle
            sx={{
              color: ({ palette }) => palette.primary.light,
              textAlign: 'center',
              textTransform: 'capitalize',
            }}
          >
            {t('videos:addVideo')}
          </DialogTitle>
          <DialogContent dividers>
            <Source fetchVideo={fetchVideo} />
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
                message={`${t('confirmation:assetDeleteWarning')} ${t(
                  'confirmation:deleteMessage',
                  { object: t('common:video') }
                )}`}
                open={deleteDialogOpen}
                title={t('common:video')}
              />
            </form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

export default Details;
