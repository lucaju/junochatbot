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
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getIcon } from 'src/util/icons';
import FeaturedImage from './FeaturedImage';

const useStyles = makeStyles(({ spacing }) => ({
  root: { width: 325 },
  botIcon: { marginRight: spacing(1) },
  divider: { width: '30%' },
  language: { marginLeft: spacing(1) },
  uppercase: { textTransform: 'uppercase' },
}));

const StoryCard = ({ values, ...rest }) => {
  const classes = useStyles();
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
        <FeaturedImage name={'image'} title={values.title} />
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
              {values.publishedAt === '' ? (
                <i>DRAFT</i>
              ) : (
                DateTime.fromISO(values.publishedAt).toFormat('yyyy')
              )}
            </Typography>
          </Box>
          <Box mt={1} display="flex" alignItems="flex-start">
            <Typography className={classes.uppercase} variant="caption">
              By {values.owner.firstName} {values.owner.lastName}
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
                  Starring
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

StoryCard.propTypes = {
  values: PropTypes.object,
};

export default StoryCard;
