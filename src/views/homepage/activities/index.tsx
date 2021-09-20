import { Box, Container, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ActivityCard, { ActivityProps } from './ActivityCard';
import VideoContent from './VideoContent';

const ResearchActivities: FC = () => {
  const { t } = useTranslation();
  const [activities, setActivities] = useState<ActivityProps[]>();
  const [content, setContent] = useState<ActivityProps>();

  useEffect(() => {
    fetch('./assets/activities/activities.json')
      .then((res) => res.json())
      .then((res) => setActivities(res))
      .catch((err) => console.log(err));
  }, []);

  const showContent = (activity: ActivityProps) => setContent(activity);
  const handleCloseContentDialog = () => setContent(undefined);

  return (
    <Box
      id="activities"
      py={7}
      sx={{
        backgroundImage:
          'linear-gradient(to right bottom, #2c3e50, #39516a, #486485, #5978a2, #6b8cbf, #7f91ce, #9796da, #b299e3, #d38bd2, #ed7db7, #fc7493, #fd746c)',
      }}
    >
      <Typography
        align="center"
        color="#fff"
        mb={4}
        sx={{ textTransform: 'capitalize' }}
        variant="h4"
      >
        {t('home:researchActivities')}
      </Typography>
      {activities && (
        <Container maxWidth="xl">
          <Box maxHeight={'60vh'} sx={{ overflow: 'auto' }}>
            <AnimatePresence initial={false}>
              <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1250: 3, 1650: 4 }}>
                <Masonry>
                  {activities.map((activity, i) => (
                    <Box
                      key={i}
                      component={motion.div}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <ActivityCard activity={activity} showContent={showContent} />
                    </Box>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </AnimatePresence>
          </Box>
        </Container>
      )}
      <VideoContent content={content} onClose={handleCloseContentDialog} />
    </Box>
  );
};

export default ResearchActivities;
