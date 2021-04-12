import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import { DateTime } from 'luxon';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Story } from '../../../../types';
import { getIcon } from '../../../../util/icons';
import FeaturedImage from './FeaturedImage';

interface StoryCardProps {
  values: Story;
}

const useStyles = makeStyles(({ spacing }) => ({
  root: { width: 325 },
  botIcon: { marginRight: spacing(1) },
  divider: { width: '30%' },
  draft: {
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
  language: { marginLeft: spacing(1) },
  uppercase: { textTransform: 'uppercase' },
}));

const StoryCard: FC<StoryCardProps> = ({ values, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const [BotAvatar, setBotAvatar] = useState(getIcon(values.botAvatar));

  useEffect(() => {
    setBotAvatar(getIcon(values.botAvatar));
    return () => {};
  }, [values]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Poster
      </Typography>
      <Card
        className={classes.root}
        elevation={theme.palette.type === 'light' ? 1 : 3}
        {...rest}
      >
        <FeaturedImage name={'imageUrl'} title={values.title} />
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">{values.title}</Typography>
            <Chip
              className={classes.language}
              label={values.languageCode.substring(0, 2).toUpperCase()}
              size="small"
              variant="outlined"
            />
            <Box flexGrow={1} />
            <Typography variant="overline">
              {values.publishedDate === null ? (
                <span className={classes.draft}>{t('draft')}</span>
              ) : (
                values.publishedDate !== null && DateTime.fromISO(values.publishedDate).toFormat('yyyy')
              )}
            </Typography>
          </Box>
          <Box mt={1} display="flex" alignItems="flex-start">
            <Typography className={classes.uppercase} variant="caption">
              {values.user
                ? `By ${values.user.firstName} ${values.user.lastName}`
                : 'By Anonymous'}
            </Typography>
          </Box>
          {values.synopsis && (
            <Box mt={1} display="flex" alignItems="center">
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
                mt={2}
                mb={2}
              >
                <Divider className={classes.divider} />
                <Typography className={classes.uppercase} variant="caption">
                  {t('starring')}
                </Typography>
                <Divider className={classes.divider} />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                pl={2}
              >
                <BotAvatar fontSize="small" className={classes.botIcon} />
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
