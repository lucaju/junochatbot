import { Box, CardMedia, IconButton, useTheme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PanoramaIcon from '@material-ui/icons/Panorama';
import { APP_URL } from '@src/config/config.js';
import type { DropFile } from '@src/types';
import { useField } from 'formik';
import { motion, useAnimation } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

interface FeaturedImageProps {
  name: string;
  title: string;
}

const FeaturedImage: FC<FeaturedImageProps> = ({ name, title }) => {
  const theme = useTheme();
  const { t } = useTranslation(['storyGeneral']);
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const dropZoneAnim = useAnimation();

  const [file, setFile] = useState<DropFile | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [showDropzone, setShowDropzone] = useState(false);

  useEffect(() => {
    const posterFile = typeof value === 'string' ? value : value?.file?.name;
    file ? setImage(file.preview) : setImage(posterFile);
    value === null || value === '' ? setShowDropzone(true) : setShowDropzone(false);
    return () => {};
  }, []);

  useEffect(() => {
    if (file) setImage(file.preview);
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const onDragEnter = () => {
    dropZoneAnim.start({
      height: isDragReject ? 90 : isDragAccept ? 110 : 100,
      color: isDragReject
        ? theme.palette.error.light
        : isDragAccept
        ? theme.palette.success.light
        : theme.palette.grey[400],
      borderColor: isDragReject
        ? theme.palette.error.light
        : isDragAccept
        ? theme.palette.success.light
        : theme.palette.grey[400],
      borderStyle: isDragReject || isDragReject ? 'inset' : 'dashed',
      borderWidth: isDragReject || isDragReject ? '2px' : '1px',
    });
  };

  const onDragLeave = () => {
    dropZoneAnim.start({
      height: 100,
      color: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      borderColor: theme.palette.grey[400],
      borderStyle: 'dashed',
      borderWidth: '1px',
    });
  };

  const onDrop = async (acceptedFiles: Array<File>, fileRejections: Array<FileRejection>) => {
    const accepted = acceptedFiles.length > 0;

    await dropZoneAnim.start({
      height: accepted ? 0 : 100,
      color: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      borderColor: theme.palette.grey[400],
      borderStyle: 'dashed',
      borderWidth: accepted ? '0px' : '1px',
    });

    if (accepted) handleUpdateImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragReject, isDragAccept } = useDropzone({
    onDrop,
    onDragEnter,
    onDragLeave,
    maxFiles: 1,
    accept: 'image/jpeg, image/png',
    noDragEventsBubbling: true,
  });

  const handleUpdateImage = (file: File) => {
    setFile({ file, preview: URL.createObjectURL(file) });
    setValue(file);
    setShowDropzone(false);
  };

  const handleDeleteImage = () => {
    setImage(null);
    setValue(null);
    setShowDropzone(true);
    setFile(null);
  };

  return (
    <>
      {image && (
        <CardMedia
          image={
            file
              ? file.preview
              : image.startsWith('http')
              ? image
              : `${APP_URL}/uploads/assets${image}`
          }
          sx={{ height: 200 }}
          title={title}
        >
          <IconButton
            aria-label="delete"
            onClick={handleDeleteImage}
            size="small"
            sx={{
              position: 'relative',
              top: 8,
              left: 316,
              backgroundColor: ({ palette }) => palette.background.paper,
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </CardMedia>
      )}

      {showDropzone && (
        <Box {...getRootProps()}>
          <input {...getInputProps()} />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            animate={dropZoneAnim}
            component={motion.div}
            sx={{
              cursor: 'pointer',
              height: 100,
              width: 334,
              m: 1,
              borderStyle: 'dashed',
              borderWidth: 1,
              borderRadius: 1,
              borderColor: theme.palette.grey[400],
              color:
                theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
              backgroundColor:
                theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[800],
            }}
          >
            {/* <Typgography >Drag 'n' drop some an image here</Typgography> */}
            <PanoramaIcon sx={{ height: '100%', width: '100%' }} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default FeaturedImage;
