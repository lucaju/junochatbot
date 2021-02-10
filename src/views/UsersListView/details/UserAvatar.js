import { Avatar, Box, IconButton, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useField } from 'formik';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.background.default,
  },
  dropzoneText: {
    // marginTop: 0,
    // marginBottom: 0,
  },
  icon: {
    marginTop: -20,
    height: 70,
    width: 70,
    color:
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
  },
}));

const UserAvatar = ({ name }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showDropzone, setShowDropzone] = useState(false);

  useEffect(() => {
    const avatarFile = typeof value === 'string' ? value : value?.file?.name;
    uploadedImage ? setImage(uploadedImage) : setImage(avatarFile);
    value === null ? setShowDropzone(true) : setShowDropzone(false);
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justify="center"
    >
      <Box className={showDropzone ? classes.show : classes.hide}>
        <DropzoneAreaBase
          classes={{
            root: classes.dropzone,
            icon: classes.icon,
          }}
          acceptedFiles={['image/*']}
          dropzoneText={''}
          Icon={AccountCircleIcon}
          dropzoneParagraphClass={classes.dropzoneText}
          filesLimit={1}
          showAlerts={['error']}
          onAdd={(files) => handleUpdateAvatar(files)}
          showPreviewsInDropzone={false}
        />
      </Box>
      {image && (
        <>
          <Avatar
            className={classes.avatar}
            src={!uploadedImage ? `/user/avatar/${image}` : ''}
          >
            {uploadedImage && <img src={image} className={classes.dropzone} />}
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
  );
};

UserAvatar.propTypes = {
  name: PropTypes.string,
};

export default UserAvatar;
