import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Story } from '@src/types';
import { getIcon } from '@src/util/icons';
import { motion, useAnimation } from 'framer-motion';
import { DateTime } from 'luxon';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FeaturedImage from './FeaturedImage';

interface StoryCardProps {
  values: Story;
}

const StoryCard: FC<StoryCardProps> = ({ values }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [BotAvatar, setBotAvatar] = useState(getIcon(values.botAvatar));
  const animateBot = useAnimation();

  const author = values.author
    ? values.author
    : values.user
    ? `${values.user.firstName} ${values.user.lastName}`
    : 'Anonymous';

  const mouseOver = () => {
    animateBot.start({ rotate: 20 });
  };

  const mouseOut = () => {
    animateBot.start({ rotate: 0 });
  };

  useEffect(() => {
    setBotAvatar(getIcon(values.botAvatar));
    return () => {};
  }, [values]);

  return (
    <>
      <Typography gutterBottom sx={{ textTransform: 'capitalize' }} variant="h6">
        {t('common:poster')}
      </Typography>
      <Card
        elevation={theme.palette.mode === 'light' ? 1 : 3}
        onMouseEnter={mouseOver}
        onMouseLeave={mouseOut}
        sx={{ width: isSM ? 'auto' : 300 }}
      >
        <FeaturedImage title={values.title} />
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">{values.title}</Typography>
            <Chip
              label={values.languageCode.substring(0, 2).toUpperCase()}
              size="small"
              sx={{ ml: 1 }}
              variant="outlined"
            />
            <Box flexGrow={1} />
            <Typography variant="overline">
              {values.published === 0 ? (
                <Box
                  component="span"
                  sx={{
                    textTransform: 'uppercase',
                    fontStyle: 'italic',
                  }}
                >
                  {t('common:draft')}
                </Box>
              ) : (
                values.published == 1 &&
                values.publishedDate &&
                DateTime.fromISO(values.publishedDate).toFormat('yyyy')
              )}
            </Typography>
          </Box>
          <Box display="flex" alignItems="flex-start" mt={1}>
            <Typography sx={{ textTransform: 'uppercase' }} variant="caption">
              {`${t('common:by')} ${author}`}
            </Typography>
          </Box>
          {values.synopsis && (
            <Box display="flex" alignItems="center" mt={1}>
              <Typography variant="body2">{values.synopsis}</Typography>
            </Box>
          )}
          {values.botName && (
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
              <Box display="flex" alignItems="center" flexDirection="row" pl={2}>
                <BotAvatar
                  component={motion.svg}
                  animate={animateBot}
                  fontSize="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="h6">{values.botName}</Typography>
              </Box>
              {values.botPersona && (
                <Box display="flex" alignItems="center" mt={1} pl={2}>
                  <Typography variant="body2">{values.botPersona}</Typography>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default StoryCard;
