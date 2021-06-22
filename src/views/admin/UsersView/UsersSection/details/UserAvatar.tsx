import { Avatar, Box, IconButton, useTheme } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { APP_URL } from '@src/config/config.js';
import type { DropFile } from '@src/types';
import { useField } from 'formik';
import { motion, useAnimation } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

interface UserAvatarProps {
  name: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ name }) => {
  const theme = useTheme();
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const dropZoneAnim = useAnimation();
  const dropInnerZoneAnim = useAnimation();

  const [file, setFile] = useState<DropFile | null>(null);
  const [showDropzone, setShowDropzone] = useState(false);
  const [image, setImage] = useState<string | null>(null);

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

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
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
              theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[800],
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
                theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700]
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
              top: 24,
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
            {file && <img src={file.preview} height={80}/>}
          </Avatar>
        </>
      )}
    </Box>
  );
};

export default UserAvatar;
