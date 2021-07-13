import { Box, Container, Stack, Typography } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityProps } from './Card';
import ContentDialog from './ContentDialog';
import Stack3D from './Stack3D';

const ResearchActivities: FC = () => {
  const { t } = useTranslation(['home']);
  const [activities, setActivities] = useState<ActivityProps[]>();
  const [content, setContent] = useState<ActivityProps>();

  useEffect(() => {
    fetch('./assets/activities/activities.json')
      .then((res) => res.json())
      .then((res) => setActivities(res))
      .catch((err) => console.log(err));
  }, []);

  const showContent = (activity: ActivityProps) => {
    setContent(activity);
  };

  const handleCloseContentDialog = () => {
    setContent(undefined);
  };

  return (
    <Box id="activities" py={7} minHeight={600} sx={{ backgroundColor: '#333' }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={8}>
          <Typography align="center" color="#fff" sx={{ textTransform: 'capitalize' }} variant="h4">
            {t('researchActivities')}
          </Typography>
          {activities && <Stack3D activities={activities} showContent={showContent} />}
        </Stack>
        <ContentDialog
          content={content}
          onClose={handleCloseContentDialog}
        />
      </Container>
    </Box>
  );
};

export default ResearchActivities;
