import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { APP_URL } from '@src/config/config';
import { Story } from '@src/types';
import { getIcon } from '@src/util/icons';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { DateTime } from 'luxon';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as RouterLink } from 'react-router-dom';

interface UserCarddProps {
  showLaunch?: boolean;
  showEdit?: boolean;
  story: Story;
  triggerEditStory?: (value: number) => void;
}

const StoryCard: FC<UserCarddProps> = ({
  showLaunch = true,
  showEdit = false,
  story,
  triggerEditStory,
}) => {
  const { t } = useTranslation();
  const [hover, setHover] = useState(false);
  const hasImage = story.imageUrl;
  const BotAvatar = getIcon(story.botAvatar);
  const animateBot = useAnimation();

  const author = story.author
    ? story.author
    : story.user
    ? `${story.user.firstName} ${story.user.lastName}`
    : 'Anonymous';

  const mouseOver = () => {
    if (!showLaunch && !showEdit) return;
    setHover(true);
    animateBot.start({ rotate: 20 });
  };

  const mouseOut = () => {
    setHover(false);
    animateBot.start({ rotate: 0 });
  };

  const handleEditClick = () => {
    if (!triggerEditStory) return;
    triggerEditStory(story.id);
  };

  return (
    <Card elevation={hover ? 6 : 1} onMouseEnter={mouseOver} onMouseLeave={mouseOut} sx={{ m: 2 }}>
      {hasImage && (
        <CardMedia
          image={
            story.imageUrl.startsWith('http')
              ? story.imageUrl
              : `${APP_URL}/uploads/assets${story.imageUrl}`
          }
          sx={{
            height: 200,
            backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
          }}
          title={story.title}
        />
      )}
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            flexDirection="row"
            sx={{
              ml: -2.5,
              pl: 2,
              pr: 1,
              borderRadius: 1,
              backgroundColor: ({ palette }) => (hover ? palette.secondary.main : 'inherent'),
            }}
          >
            <Typography variant="h6">{story.title}</Typography>
          </Box>
          <Chip
            label={story.languageCode.substring(0, 2).toUpperCase()}
            size="small"
            sx={{ ml: 1 }}
            variant="outlined"
          />
          <Box flexGrow={1} />

          <Box sx={{ mr: -1, px: 1, color: 'text.secondary' }}>
            <Typography variant="overline">
              {!story.published ? (
                <Box component="span" sx={{ textTransform: 'uppercase', fontStyle: 'italic' }}>
                  {t('common:draft')}
                </Box>
              ) : (
                story.published &&
                story.publishedDate &&
                DateTime.fromISO(story.publishedDate).toFormat('yyyy')
              )}
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" alignItems="flex-start" mt={1} spacing={2}>
          <Typography sx={{ textTransform: 'uppercase' }} variant="caption">
            {`${t('common:by')} ${author}`}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography sx={{ textTransform: 'uppercase' }} variant="caption">
            {`${t('common:owner')} ${story.user?.firstName} ${story.user?.lastName}`}
          </Typography>
        </Stack>
        {story.synopsis && (
          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="body2">{story.synopsis}</Typography>
          </Box>
        )}
        {story.botName && (
          <>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-evenly"
              my={2}
            >
              <Divider sx={{ width: '30%' }} />
              <Typography sx={{ textTransform: 'uppercase' }} variant="caption">
                {t('common:starring')}
              </Typography>
              <Divider sx={{ width: '30%' }} />
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" pl={2}>
              <BotAvatar
                component={motion.svg}
                animate={animateBot}
                fontSize="small"
                sx={{ mr: 1 }}
              />
              <Typography variant="h6">{story.botName}</Typography>
            </Box>
            {story.botPersona && (
              <Box display="flex" alignItems="center" mt={1} pl={2}>
                <Typography variant="body2">{story.botPersona}</Typography>
              </Box>
            )}
          </>
        )}
        <AnimatePresence>
          {hover && (
            <Paper
              component={motion.div}
              initial={{ height: 0, y: 36 }}
              animate={{ height: 'auto', y: 0 }}
              exit={{ height: 0, y: 36 }}
              sx={{
                position: 'relative',
                float: 'left',
                width: 'calc(100% + 32px)',
                height: 36,
                ml: -2,
                mt: -1.5,
                overflowY: 'hidden',
                backgroundColor: ({ palette }) => palette.background.paper,
              }}
            >
              <Stack direction="row" sx={{ backgroundColor: alpha('#000', 0.01) }}>
                <Button
                  component={RouterLink}
                  color={hover ? 'primary' : 'inherit'}
                  fullWidth
                  target={'_blank'}
                  to={story.published ? `/story/${story.id}` : `/story/${story.id}?draft=true`}
                >
                  {t('common:play')}
                </Button>
                {showEdit && (
                  <Button color={hover ? 'primary' : 'inherit'} fullWidth onClick={handleEditClick}>
                    {t('common:edit')}
                  </Button>
                )}
              </Stack>
            </Paper>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
