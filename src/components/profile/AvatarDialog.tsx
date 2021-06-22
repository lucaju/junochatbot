import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { APP_URL } from '@src/config/config.js';
import { useApp } from '@src/overmind';
import { DropFile, NotificationType } from '@src/types';
import { isError } from '@src/util/utilities';
import { Formik } from 'formik';
import { motion, useAnimation } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

interface AvatarDialogProps {
  handleClose: () => void;
  open: boolean;
}

const formValidation = Yup.object().shape({
  avatar: Yup.mixed(),
});

const AvatarDialog: FC<AvatarDialogProps> = ({ handleClose, open }) => {
  const theme = useTheme();
  const { state, actions } = useApp();
  const { t } = useTranslation(['common', 'profile', 'errorMessages']);
  const [value, setValue] = useState(state.session.user?.avatarUrl);
  const dropZoneAnim = useAnimation();
  const dropInnerZoneAnim = useAnimation();

  const [file, setFile] = useState<DropFile | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [showDropzone, setShowDropzone] = useState(false);

  useEffect(() => {
    const avatarFile = typeof value === 'string' ? value : value?.file?.name;
    file ? setImage(file.preview) : setImage(avatarFile);
    value === null || value === '' ? setShowDropzone(true) : setShowDropzone(false);
    return () => {};
  }, [value]);

  useEffect(() => {
    if (file) setImage(file.preview);
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const onDragEnter = () => {
    dropZoneAnim.start({
      scale: isDragReject ? 0.9 : 1.1,
      rotate: isDragReject ? 180 : 0,
      borderColor: isDragReject ? theme.palette.error.light : theme.palette.success.light,
      borderStyle: 'inset',
      borderWidth: '4px',
    });

    dropInnerZoneAnim.start({
      scale: 1,
      color: isDragReject ? theme.palette.error.light : theme.palette.success.light,
    });
  };

  const onDragLeave = () => {
    dropZoneAnim.start({
      scale: 1,
      rotate: 0,
      borderColor: theme.palette.grey[400],
      borderStyle: 'dashed',
      borderWidth: '1px',
    });
    dropInnerZoneAnim.start({
      scale: 1,
      color: theme.palette.grey[300],
    });
  };

  const onDrop = async (acceptedFiles: Array<File>, fileRejections: Array<FileRejection>) => {
    const accepted = acceptedFiles.length > 0;

    !accepted &&
      dropInnerZoneAnim.start({
        scale: 1,
        color: theme.palette.grey[300],
      });

    await dropZoneAnim.start({
      scale: accepted ? 0 : 1,
      rotate: 0,
      borderColor: theme.palette.grey[400],
      borderStyle: 'dashed',
      borderWidth: '1px',
    });

    if (accepted) handleUpdateAvatar(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    onDragEnter,
    onDragLeave,
    maxFiles: 1,
    accept: 'image/jpeg, image/png',
    noDragEventsBubbling: true,
  });

  const handleUpdateAvatar = (file: File) => {
    setFile({ file, preview: URL.createObjectURL(file) });
    setValue(file);
    setShowDropzone(false);
  };

  const handleDeleteAvatar = () => {
    setValue(null);
    setShowDropzone(true);
    setFile(null);
  };

  const submit = async ({ avatar }: { avatar: any }) => {
    const response = avatar
      ? await actions.session.uploadAvatar(avatar)
      : actions.session.deleteAvatar();

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    if (isError(response)) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return;
    }

    const message = avatar ? t('profile:avatarChanged') : t('profile:avatarRemoved');

    actions.ui.showNotification({ message, type });

    handleClose();
  };

  const handleClosePanel = () => {
    setValue(state.session.user?.avatarUrl);
    setImage(typeof value === 'string' ? value : null);
    setFile(null);
    handleClose();
  };

  return (
    <Dialog aria-labelledby="change-password" disableEscapeKeyDown maxWidth="md" open={open}>
      <Formik
        enableReinitialize={true}
        initialValues={{ avatar: value }}
        onSubmit={async (values) => await submit(values)}
        validationSchema={formValidation}
      >
        {({ handleSubmit, isSubmitting }) => (
          <>
            <DialogTitle id="change-password">{t('profile:changeAvatar')}</DialogTitle>
            <DialogContent dividers>
              <form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: 300 }}
                >
                  {showDropzone ? (
                    <Box
                      animate={dropZoneAnim}
                      component={motion.div}
                      sx={{
                        cursor: 'pointer',
                        height: 80,
                        width: 80,
                        borderStyle: 'dashed',
                        borderWidth: 1,
                        borderRadius: '50%',
                        borderColor: theme.palette.grey[400],
                        backgroundColor:
                          theme.palette.mode === 'light'
                            ? theme.palette.grey[50]
                            : theme.palette.grey[800],
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ height: '100%', width: '100%' }}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <Box
                          animate={dropInnerZoneAnim}
                          color={
                            theme.palette.mode === 'light'
                              ? theme.palette.grey[300]
                              : theme.palette.grey[700]
                          }
                          component={motion.div}
                          sx={{ height: 70, width: 70 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <AccountCircleIcon sx={{ height: '100%', width: '100%' }} />
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <IconButton
                        aria-label="remove picture"
                        onClick={handleDeleteAvatar}
                        size="small"
                        sx={{
                          position: 'absolute',
                          mb: 7,
                          ml: 8,
                          zIndex: 1,
                          backgroundColor:
                            theme.palette.mode === 'light'
                              ? theme.palette.background.default
                              : theme.palette.grey[800],
                        }}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                      <Avatar
                        src={!file ? `${APP_URL}/uploads/assets${image}` : ''}
                        sx={{ height: 80, width: 80 }}
                      >
                        {file && <img src={file.preview} height={80} />}
                      </Avatar>
                    </>
                  )}
                </Box>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePanel}>{t('cancel')}</Button>
              <Box flexGrow={1} />
              <LoadingButton
                disabled={value === state.session.user?.avatarUrl}
                loading={isSubmitting}
                onClick={() => handleSubmit()}
                sx={{
                  color: ({ palette }) => {
                    if (value === state.session.user?.avatarUrl) {
                      const color =
                        palette.mode === 'light' ? palette.grey[400] : palette.grey[500];
                      return `${color} !important`;
                    }
                    return 'inherent';
                  },
                }}
                variant="contained"
              >
                {t('submit')}
              </LoadingButton>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default AvatarDialog;

// {image && (
//   <>
//     <Avatar
//       src={
//         !uploadedImage && image && typeof value === 'string'
//           ? `${APP_URL}/uploads/assets${image}`
//           : ''
//       }
//       sx={{
//         height: 80,
//         width: 80,
//       }}
//     >
//       {uploadedImage && (
//         <img
//           style={{
//             height: 80,
//             width: 80,
//             minHeight: 80,
//             borderWidth: 1,
//             borderRadius: 5,
//           }}
//           src={image}
//         />
//       )}
//     </Avatar>
//     <IconButton
//       aria-label="remove picture"
//       component="span"
//       onClick={handleDeleteAvatar}
//       size="small"
//       sx={{ top: -3 }}
//     >
//       <HighlightOffIcon />
//     </IconButton>
//   </>
// )}
