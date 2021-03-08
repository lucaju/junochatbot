import { Box, CardMedia, IconButton, makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(({ spacing, palette }) => ({
  buttonRemove: {
    position: 'relative',
    top: spacing(1),
    left: 296,
    // backgroundColor: palette.type === 'light' ? palette.common.white : 
    backgroundColor: palette.background.paper
  },
  media: { height: 180 },
  hide: { display: 'none' },
  show: { display: 'block' },
  dropzone: {
    borderWidth: 2,
    maxWidth: 314,
    minHeight: 60,
    backgroundColor: palette.background.paper,
    margin: spacing(1),
  },
  dropzoneText: { fontSize: 14 },
  icon: {
    width: 0,
    height: 0,
    display: 'none'
  },
}));

const FeaturedImage = ({ name, title }) => {
  const classes = useStyles();
  const { t } = useTranslation(['storyGeneral']);
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const [imageToDisplay, setImageToDisplay] = useState(null);
  const [file, setFile] = useState(null);
  const [showDropzone, setShowDropzone] = useState(null);

  const { value } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    setImageToDisplay(value);
    setShowDropzone(value !== '' ? false : true);
    return () => {};
  }, []);

  const handleDropZoneChange = (files) => {
    console.log('Files:', files);
    setFile(files[0].file);
    const image = files[0].data;
    setValue(files[0].file.name);
    setImageToDisplay(image);
    setShowDropzone(false);
  };

  const handleRemoveImage = () => {
    setImageToDisplay(null);
    setValue('');
    setShowDropzone(true);
  };

  return (
    <>
      {imageToDisplay && (
        <CardMedia
          className={classes.media}
          image={file ? imageToDisplay : `/uploads/assets${imageToDisplay}`}
          title={title}
        >
          <IconButton
            aria-label="delete"
            className={classes.buttonRemove}
            onClick={handleRemoveImage}
            size="small"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </CardMedia>
      )}

      <Box className={showDropzone ? classes.show : classes.hide}>
        <DropzoneAreaBase
          acceptedFiles={['image/*']}
          classes={{
            root: classes.dropzone,
            icon: classes.icon,
          }}
          dropzoneText={t('addImage')}
          dropzoneParagraphClass={classes.dropzoneText}
          filesLimit={1}
          onAdd={(files) => handleDropZoneChange(files)}
          showAlerts={['error']}
          showPreviewsInDropzone={false}
        />
      </Box>
    </>
  );
};

FeaturedImage.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
};

export default FeaturedImage;
