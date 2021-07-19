import { Box, Container, Skeleton, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useActions, useAppState } from '@src/overmind';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import StoryCard from '../../StoriesView/StoryCard';

const Stories: FC = () => {
  const { t } = useTranslation(['home']);
  const { chat } = useAppState();
  const actions = useActions();
  const [isLoading, setIsloading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const fetchData = async () => {
    setIsloading(true);
    await actions.chat.getStories();
    setIsloading(false);
  };

  const showSkeleton = (qty = 5) => {
    return new Array(qty)
      .fill(0)
      .map((sk, i) => <Skeleton key={i} height={200} sx={{ m: 2.5 }} variant="rectangular" />);
  };

  return (
    <Box id="stories">
      <Box mb={isMobile ? -2.5 : -4} sx={{ position: 'relative', zIndex: 0 }} width="100%">
        <Typography
          align="center"
          sx={{ fontWeight: 700, textTransform: 'uppercase', textShadow: '0 0 16px purple' }}
          variant={isMobile ? 'h2' : 'h1'}
        >
          {t('stories')}
        </Typography>
      </Box>
      <Box
        py={1}
        sx={{
          position: 'relative',
          zIndex: 100,
          backgroundColor: 'black',
          boxShadow: '0 0 5px 2px black',
          overflow: 'auto',
          background:
            'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        }}
      >
        <Container maxWidth="xl">
          <Box maxHeight={'75vh'} sx={{ overflow: 'auto' }}>
            <AnimatePresence initial={false}>
              <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1250: 3, 1650: 4 }}>
                <Masonry>
                  {isLoading
                    ? showSkeleton(4)
                    : chat.stories.map((story) => (
                        <Box
                          key={story.id}
                          component={motion.div}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <StoryCard showEdit={false} story={story} />
                        </Box>
                      ))}
                </Masonry>
              </ResponsiveMasonry>
            </AnimatePresence>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Stories;
