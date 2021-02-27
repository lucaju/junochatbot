import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
// import { Duration, DateTime } from 'luxon';
// import { useRefresh } from 'muuri-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: { width: 300 },
  cardHover: { cursor: 'pointer' },
  icon: {
    opacity: .7,
    paddingRight: spacing(0.5),
    fontSize: '.9rem'
  },
  media: { height: 180 },
  meta: {
    backgroundColor: palette.background.default,
    marginTop: spacing(1),
    marginLeft: -spacing(2),
    marginRight: -spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
  tag: { marginRight: spacing(1) },
  tags: {
    height: 40,
    overflowX: 'auto',
    marginBottom: -spacing(2),
    marginLeft: -spacing(2),
    marginRight: -spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
  title: {
    // minHeigh: 316,
  },
}));

const VideoCard = ({ className, triggerEditVideo, video, ...rest }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(1);

  // useRefresh([hover]);

  const mouseOver = () => {
    setHover(true);
    setElevation(6);
  };

  const mouseOut = () => {
    setHover(false);
    setElevation(1);
  };

  const truncateString = (str, num) => {
    if (str.length <= num) return str
    return `${str.slice(0, num)}...`;
  }

  const handleEditClick = () => triggerEditVideo(video);

  return (
    <Card
      className={clsx(classes.root, className, hover && classes.cardHover)}
      elevation={elevation}
      onClick={handleEditClick}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      {...rest}
    >
      <CardMedia
        className={classes.media}
        // image={`/assets/stories/images/${video.image}`}
        image={video.image}
        title={video.title}
      />
      <CardContent>
        <Box className={classes.title}>
          <Typography gutterBottom variant="subtitle1">{truncateString(video.title, 68)}</Typography>
        </Box>
        {/* <Typography gutterBottom variant="button">{video.channelTitle}</Typography>
        <Box display="flex" alignItems="center" className={classes.meta}>
          <CalendarTodayIcon className={classes.icon} />
          <Typography variant="overline">
            {DateTime.fromISO(video.publishedAt).toFormat('yyyy')}
          </Typography>
          <Box flexGrow={1} />
          <AccessTimeIcon className={classes.icon} />
          <Typography variant="overline">
            {Duration.fromISO(video.duration).toFormat('hh:mm:ss')}
          </Typography>
        </Box>
        {video.description && (
          <Box mt={1} display="flex" alignItems="center">
            <Typography variant="body2">{video.description}</Typography>
          </Box>
        )} */}
        {video.tags.length > 0 && (
          <Box
            display="flex"
            flexDirection="row"
            className={classes.tags}
            mt={2}
          >
            {video.tags.map(({ id, name }) => (
              <Chip
                key={id}
                className={classes.tag}
                label={name.toUpperCase()}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

VideoCard.propTypes = {
  className: PropTypes.string,
  triggerEditVideo: PropTypes.func,
  video: PropTypes.object,
};

export default VideoCard;
