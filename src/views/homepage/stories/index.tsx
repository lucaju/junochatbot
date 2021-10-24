import { Box, Container, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import StoryCard from '@src/components/StoryCardFront';
import { useActions } from '@src/overmind';
import type { Story } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Stories: FC = () => {
  const { t } = useTranslation();
  const actions = useActions();
  const [isLoading, setIsloading] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsloading(true);
    const _stories = await actions.chat.getStories();
    setStories(_stories);
    setIsloading(false);
  };

  const showSkeleton = (qty = 5) => {
    return new Array(qty)
      .fill(0)
      .map((sk, i) => <Skeleton key={i} height={200} sx={{ m: 2.5 }} variant="rectangular" />);
  };

  return (
    <>
      {stories.length > 0 && (
        <Box id="stories">
          <Box mb={isMobile ? -2.5 : -4} sx={{ position: 'relative', zIndex: 0 }} width="100%">
            <Typography
              align="center"
              sx={{ fontWeight: 700, textTransform: 'uppercase', textShadow: '0 0 16px purple' }}
              variant={isMobile ? 'h2' : 'h1'}
            >
              {t('home:stories')}
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
                        : stories.map((story) => (
                            <Box
                              key={story.id}
                              component={motion.div}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <StoryCard story={story} />
                            </Box>
                          ))}
                    </Masonry>
                  </ResponsiveMasonry>
                </AnimatePresence>
              </Box>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Stories;
