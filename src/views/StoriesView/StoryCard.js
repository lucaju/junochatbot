import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grow,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import { useRefresh } from 'muuri-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getIcon } from 'src/util/icons';

const useStyles = makeStyles(({ palette, shape, spacing }) => ({
  root: { width: 325 },
  actionPanel: {
    position: 'fixed',
    right: 0,
  },
  actionPanelMarginTop: { marginTop: spacing(4) },
  divider: { width: '30%' },
  draft: {
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
  icon: { marginRight: spacing(1) },
  label: {
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    color: palette.text.secondary,
    marginRight: -spacing(1),
  },
  language: { marginLeft: spacing(1) },
  marginTop: { marginTop: spacing(0.5) },
  media: { height: 180 },
  noMedia: { backgroundColor: palette.background.default },
  title: {
    marginLeft: -spacing(2.5),
    paddingLeft: spacing(2),
    paddingRight: spacing(1),
    borderRadius: shape.borderRadius,
    color: palette.type === 'light' ? palette.grey[800] : palette.common.white,
  },
  titleHover: {
    backgroundColor: palette.secondary.main,
    color: palette.type === 'light' ? palette.common.white : palette.grey[800],
  },
  uppercase: { textTransform: 'uppercase' },
}));

const StoryCard = ({
  className,
  showEdit,
  story,
  triggerEditStory,
  ...rest
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(0);

  useRefresh([hover]);

  const BotAvatar = getIcon(story.botAvatar);

  const mouseOver = () => {
    setHover(true);
    setElevation(6);
  };

  const mouseOut = () => {
    setHover(false);
    setElevation(0);
  };

  const handleEditClick = () => triggerEditStory(story);

  const handlePlayClick = () => {
    //TODO
    console.log(story);
  };

  return (
    <Card
      className={clsx(classes.root, className, !story.image && classes.noMedia)}
      elevation={elevation}
      {...rest}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
    >
      {story.image && (
        <CardMedia
          className={classes.media}
          image={`/assets/stories/images/${story.image}`}
          title={story.title}
        />
      )}
      <CardContent>
        <Box display="flex" alignItems="center">
          <Grow in={hover}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              className={clsx(
                classes.actionPanel,
                !story.image && classes.noMedia,
                showEdit && classes.actionPanelMarginTop
              )}
              pr={1}
            >
              <Button onClick={handlePlayClick} size="small" variant="outlined">
                {t('launch')}
              </Button>
              {showEdit && (
                <Button
                  className={classes.marginTop}
                  onClick={handleEditClick}
                  size="small"
                  variant="outlined"
                >
                  {t('edit')}
                </Button>
              )}
            </Box>
          </Grow>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="row"
            className={clsx(classes.title, hover && classes.titleHover)}
          >
            <Typography variant="h6">{story.title}</Typography>
          </Box>
          <Chip
            className={classes.language}
            label={story.languageCode.substring(0, 2).toUpperCase()}
            size="small"
            variant="outlined"
          />
          <Box flexGrow={1} />
          <Grow in={!hover}>
            <Box className={classes.label}>
              <Typography variant="overline">
                {story.publishedAt === '' ? (
                  <span className={classes.draft}>{t('draft')}</span>
                ) : (
                  DateTime.fromISO(story.publishedAt).toFormat('yyyy')
                )}
              </Typography>
            </Box>
          </Grow>
        </Box>
        <Box mt={1} display="flex" alignItems="flex-start">
          <Typography className={classes.uppercase} variant="caption">
            By {story.owner.firstName} {story.owner.lastName}
          </Typography>
        </Box>
        {story.synopsis && (
          <Box mt={1} display="flex" alignItems="center">
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
              mt={2}
              mb={2}
            >
              <Divider className={classes.divider} />
              <Typography className={classes.uppercase} variant="caption">
                {t('starring')}
              </Typography>
              <Divider className={classes.divider} />
            </Box>
            <Box display="flex" alignItems="center" flexDirection="row" pl={2}>
              <BotAvatar fontSize="small" className={classes.icon} />
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
    </Card>
  );
};

StoryCard.defaultProps = {
  showEdit: true,
};

StoryCard.propTypes = {
  className: PropTypes.string,
  showEdit: PropTypes.bool,
  story: PropTypes.object,
  triggerEditStory: PropTypes.func,
};

export default StoryCard;
