import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AdbIcon from '@material-ui/icons/Adb';
import clsx from 'clsx';
import { useRefresh } from 'muuri-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(({ palette, shape, spacing }) => ({
  root: { width: 325 },
  authors: { textTransform: 'uppercase' },
  icon: { marginRight: spacing(1) },
  label: {
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    borderRadius: shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor:
      palette.type === 'light' ? palette.background.default : palette.grey[700],
    color: palette.text.secondary,
    marginRight: -spacing(1),
  },
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
    backgroundColor: palette.primary.light,
    color: palette.type === 'light' ? palette.common.white : palette.grey[800],
  },
}));

const StoryCard = ({ story, triggerEditStory, className, ...rest }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(0);

  const mouseOver = () => {
    setHover(true);
    setElevation(6);
  };

  const mouseOut = () => {
    setHover(false);
    setElevation(0);
  };

  useRefresh([hover]);

  const handleEditClick = () => {
    triggerEditStory(story);
  };

  const handlePlayClick = () => {
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
          <Box
            display="flex"
            alignItems="center"
            flexDirection="row"
            className={clsx(classes.title, hover && classes.titleHover)}
          >
            <AdbIcon fontSize="small" className={classes.icon} />
            <Typography variant="h6">{story.title}</Typography>
          </Box>
          <Box flexGrow={1} />
          <div className={classes.label}>
            <Typography variant="overline">{story.year}</Typography>
          </div>
        </Box>
        <Box mt={1} display="flex" alignItems="flex-start">
          <Typography className={classes.authors} variant="caption">
            <span>{story.authors.join(' • ')}</span>
          </Typography>
        </Box>
        <Box mt={1} display="flex" alignItems="center">
          <Typography variant="body2">{story.synopsis}</Typography>
        </Box>
      </CardContent>
      {hover && (
        <CardActions disableSpacing>
          <Button onClick={handleEditClick}>Edit</Button>
          <Box flexGrow={1} />
          <Button onClick={handlePlayClick} variant="outlined">
            Play
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

StoryCard.propTypes = {
  story: PropTypes.object,
  triggerEditStory: PropTypes.func,
  className: PropTypes.string,
};

export default StoryCard;
