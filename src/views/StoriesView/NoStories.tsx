import { Box, Typography, useTheme } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import AddStoryCard from './AddStoryCard';

interface NoStoriesProps {
  openDialog: () => void;
}

const NoStories: FC<NoStoriesProps> = ({ openDialog }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
    >
      <Typography
        gutterBottom
        sx={{
          mt: '50px',
          color: theme.palette.grey[700],
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
        variant="h4"
      >
        {t('stories:noStoriesYet')}
      </Typography>
      <img
        alt={t('stories:noStoriesYet')}
        src="/assets/images/undraw_chat_bot_kli5.svg"
        style={{
          display: 'inline-block',
          maxWidth: '100%',
          width: 400,
          marginBottom: 50,
          marginTop: 50,
          opacity: 0.7,
        }}
      />
      <AddStoryCard openDialog={openDialog} />
    </Box>
  );
};

export default NoStories;
