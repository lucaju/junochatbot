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
import { useApp } from 'src/overmind';
import * as Yup from 'yup';

const useStyles = makeStyles(({ palette }) => ({
  progress: { position: 'absolute' },
  avatar: {
    height: 80,
    width: 80,
  },
  button: { top: -3 },
  hide: { display: 'none' },
  show: { display: 'block' },
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
  icon: {
    marginTop: -20,
    height: 70,
    width: 70,
    color: palette.type === 'light' ? palette.grey[300] : palette.grey[700],
  },
}));

const formValidation = Yup.object().shape({
  avatar: Yup.mixed(),
});

const AvatarDialog = ({ handleClose, open }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
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
    const response = await actions.session.uploadAvatar(avatar);

    if (response.error) {
      actions.ui.showNotification({
        type: 'error',
        message: 'Something went wrong!',
      });
      return;
    }
    actions.ui.showNotification({
      type: 'success',
      message: 'Avatar changed',
    });

    handleClosePanel();
  };

  const handleClosePanel = () => {
    setValue(null);
    setImage(null);
    setUploadedImage(null);
    setShowDropzone(false);
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
            <DialogTitle id="change-password">Change Avatar</DialogTitle>
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
                        src={!uploadedImage ? `/uploads${image}` : ''}
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
              <Button color="primary" onClick={handleClosePanel}>
                Cancel
              </Button>
              <Box flexGrow={1} />
              <Button
                color="primary"
                disabled={
                  isSubmitting || value === state.session.user.avatarUrl
                }
                onClick={() => handleSubmit()}
                variant="outlined"
              >
                Submit
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
