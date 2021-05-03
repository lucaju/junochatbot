import { Box, CardMedia, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useField } from 'formik';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { APP_URL } from '@src/config/config.js';

interface FeaturedImageProps {
  name: string;
  title: string;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  buttonRemove: {
    position: 'relative',
    top: spacing(1),
    left: 316,
    backgroundColor: palette.background.paper,
  },
  media: { height: 200 },
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
    display: 'none',
  },
}));

const FeaturedImage: FC<FeaturedImageProps> = ({ name, title }) => {
  const classes = useStyles();
  const { t } = useTranslation(['storyGeneral']);
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const [image, setImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showDropzone, setShowDropzone] = useState(false);

  useEffect(() => {
    const posterFile = typeof value === 'string' ? value : value?.file?.name;
    uploadedImage ? setImage(uploadedImage) : setImage(posterFile);
    value === null || value === ''
      ? setShowDropzone(true)
      : setShowDropzone(false);
    return () => {};
  }, []);

  const handleUpdateImage = (files: any[]) => {
    setImage(files[0].data);
    setUploadedImage(files[0].data);
    setValue(files[0].file);
    setShowDropzone(false);
  };

  const handleDeleteImage = () => {
    setImage(null);
    setValue(null);
    setUploadedImage(null);
    setShowDropzone(true);
  };

  return (
    <>
      {image && image.endsWith('.', image.length - 3) && (
        <CardMedia
          className={classes.media}
          image={
            uploadedImage
              ? image
              : image.startsWith('http')
              ? image
              : `${APP_URL}/uploads/assets${image}`
          }
          title={title}
        >
          <IconButton
            aria-label="delete"
            className={classes.buttonRemove}
            onClick={handleDeleteImage}
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
          fileObjects={[]}
          onAdd={(files) => handleUpdateImage(files)}
          showAlerts={['error']}
          showPreviewsInDropzone={false}
        />
      </Box>
    </>
  );
};

export default FeaturedImage;
