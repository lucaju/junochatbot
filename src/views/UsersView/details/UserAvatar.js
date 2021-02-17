import { Avatar, Box, IconButton, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useField } from 'formik';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(({ palette }) => ({
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

const UserAvatar = ({ name, active, values }) => {
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

  return (
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
          disabled={!active}
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
            {uploadedImage && <img className={classes.dropzone} src={image} />}
          </Avatar>
          <IconButton
            aria-label="remove picture"
            component="span"
            className={classes.button}
            disabled={values.id && !active}
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
  active: PropTypes.bool,
  values: PropTypes.object,
};

export default UserAvatar;
