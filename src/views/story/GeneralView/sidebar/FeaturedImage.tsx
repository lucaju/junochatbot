import { Box, CardMedia, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useField } from 'formik';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FeaturedImageProps {
  name: string;
  title: string;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  buttonRemove: {
    position: 'relative',
    top: spacing(1),
    left: 296,
    // backgroundColor: palette.type === 'light' ? palette.common.white :
    backgroundColor: palette.background.paper,
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
  const [imageToDisplay, setImageToDisplay] = useState<string | null>(null);
  const [file, setFile] = useState(null);
  const [showDropzone, setShowDropzone] = useState(false);

  useEffect(() => {
    setImageToDisplay(value);
    setShowDropzone(value !== '' ? false : true);
    return () => {};
  }, []);

  const handleDropZoneChange = (files: any[]) => {
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
          fileObjects={[]}
          onAdd={(files) => handleDropZoneChange(files)}
          showAlerts={['error']}
          showPreviewsInDropzone={false}
        />
      </Box>
    </>
  );
};

export default FeaturedImage;
