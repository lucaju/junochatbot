import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';
import { APP_URL } from '../../config/config.js';

const useStyles = makeStyles(({ palette }) => ({
  avatar: {
    height: 80,
    width: 80,
  },
  button: { top: -3 },
  dropzone: {
    borderWidth: 1,
    borderRadius: 40,
    height: 80,
    width: 80,
    minHeight: 80,
    backgroundColor: palette.background.default,
  },
  dropzoneText: {
    // marginTop: 0,
    // marginBottom: 0,
  },
  hide: { display: 'none' },
  icon: {
    marginTop: -20,
    height: 70,
    width: 70,
    color: palette.type === 'light' ? palette.grey[300] : palette.grey[700],
  },
  progress: { position: 'absolute' },
  show: { display: 'block' },
  textColor: { color: palette.type === 'light' && palette.common.white },
}));

const formValidation = Yup.object().shape({
  avatar: Yup.mixed(),
});

const AvatarDialog = ({ handleClose, open }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const { t } = useTranslation(['common', 'profile', 'errorMessages']);
  const [value, setValue] = useState(state.session.user.avatarUrl);
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showDropzone, setShowDropzone] = useState(false);

  useEffect(() => {
    const avatarFile = typeof value === 'string' ? value : value?.file?.name;
    uploadedImage ? setImage(uploadedImage) : setImage(avatarFile);
    value === null || value === ''
      ? setShowDropzone(true)
      : setShowDropzone(false);
    return () => {};
  }, [value]);

  const handleUpdateAvatar = (files) => {
    setUploadedImage(files[0].data);
    setValue(files[0].file);
    setShowDropzone(false);
  };

  const handleDeleteAvatar = () => {
    setValue(null);
    setUploadedImage(null);
    setShowDropzone(true);
  };

  const submit = async ({ avatar }) => {
    const response = avatar
      ? await actions.session.uploadAvatar(avatar)
      : actions.session.deleteAvatar();

    const type = response.error ? 'error' : 'success';

    if (response.error) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return;
    }

    const message = avatar
      ? t('profile:avatarChanged')
      : t('profile:avatarRemoved');
    actions.ui.showNotification({ message, type });

    handleClose();
  };

  const handleClosePanel = () => {
    setValue(state.session.user.avatarUrl);
    setImage(typeof value === 'string' ? value : null);
    setUploadedImage(null);
    handleClose();
  };

  return (
    <Dialog
      aria-labelledby="change-password"
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
      open={open}
    >
      <Formik
        enableReinitialize={true}
        initialValues={{ avatar: value }}
        onSubmit={async (values) => await submit(values)}
        validationSchema={formValidation}
      >
        {({ handleSubmit, isSubmitting }) => (
          <>
            <DialogTitle id="change-password">
              {t('profile:changeAvatar')}
            </DialogTitle>
            <DialogContent dividers>
              <form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justify="center"
                >
                  <Box className={showDropzone ? classes.show : classes.hide}>
                    <DropzoneAreaBase
                      acceptedFiles={['image/*']}
                      classes={{
                        root: classes.dropzone,
                        icon: classes.icon,
                      }}
                      dropzoneText={''}
                      dropzoneParagraphClass={classes.dropzoneText}
                      filesLimit={1}
                      Icon={AccountCircleIcon}
                      onAdd={(files) => handleUpdateAvatar(files)}
                      showAlerts={['error']}
                      showPreviewsInDropzone={false}
                    />
                  </Box>
                  {image && (
                    <>
                      <Avatar
                        className={classes.avatar}
                        src={
                          !uploadedImage && image && typeof value === 'string'
                            ? `${APP_URL}/uploads/assets${image}`
                            : ''
                        }
                      >
                        {uploadedImage && (
                          <img className={classes.dropzone} src={image} />
                        )}
                      </Avatar>
                      <IconButton
                        aria-label="remove picture"
                        component="span"
                        className={classes.button}
                        onClick={handleDeleteAvatar}
                        size="small"
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePanel}>{t('cancel')}</Button>
              <Box flexGrow={1} />
              <Button
                classes={{ containedPrimary: classes.textColor }}
                color="primary"
                disabled={
                  isSubmitting || value === state.session.user.avatarUrl
                }
                onClick={() => handleSubmit()}
                variant="contained"
              >
                {t('submit')}
                {isSubmitting && (
                  <CircularProgress className={classes.progress} size={24} />
                )}
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

AvatarDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AvatarDialog;
