import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from '@material-ui/core';
import { APP_URL } from '@src/config/config.js';
import { Story } from '@src/types';
import { getIcon } from '@src/util/icons';
import { DateTime } from 'luxon';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface UserCarddProps {
  disabled?: boolean;
  story: Story;
}

const StoryCard: FC<UserCarddProps> = ({ disabled = false, story }) => {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const hasImage = story.imageUrl && story.imageUrl.endsWith('.', story.imageUrl.length - 3);
  const BotAvatar = getIcon(story.botAvatar);

  const mouseOver = () => setHover(true);
  const mouseOut = () => setHover(false);
  
  const handleClick = () => {
    if (!disabled) navigate(`/story/${story.id}`, { replace: true });
  }

  return (
    <Card
      elevation={hover ? 6 : story.imageUrl ? 2 : 0}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      sx={{ m: 2 }}
    >
      <CardActionArea onClick={handleClick}>
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
                {story.published === 0 ? (
                  <Box
                    component="span"
                    sx={{
                      textTransform: 'uppercase',
                      fontStyle: 'italic',
                    }}
                  >
                    {t('draft')}
                  </Box>
                ) : (
                  story.published === 1 &&
                  story.publishedDate &&
                  DateTime.fromISO(story.publishedDate).toFormat('yyyy')
                )}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="flex-start" mt={1}>
            <Typography sx={{ textTransform: 'uppercase' }} variant="caption">
              {story.user ? `By ${story.user.firstName} ${story.user.lastName}` : 'By Anonymous'}
            </Typography>
          </Box>
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
                  {t('starring')}
                </Typography>
                <Divider sx={{ width: '30%' }} />
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center" pl={2}>
                <BotAvatar fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="h6">{story.botName}</Typography>
              </Box>
              {story.botPersona && (
                <Box display="flex" alignItems="center" mt={1} pl={2}>
                  <Typography variant="body2">{story.botPersona}</Typography>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default StoryCard;