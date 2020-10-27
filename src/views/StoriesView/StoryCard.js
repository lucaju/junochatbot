import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  colors,
  Typography,
  makeStyles,
} from '@material-ui/core';
import AdbIcon from '@material-ui/icons/Adb';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 325,
  },
  noImage: {
    backgroundColor: theme.palette.background.default,
  },
  media: {
    height: 180,
  },
  label: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[400],
    marginRight: -20,
  },
  labelHover: {
    backgroundColor: colors.orange[400],
  },
  authors: {
    textTransform: 'uppercase',
  },
}));

const StoryCard = ({ story, className, ...rest }) => {
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

  return (
    <Card
      className={clsx(classes.root, className, !story.image && classes.noImage)}
      elevation={elevation}
      {...rest}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <CardActionArea>
        {story.image && (
          <CardMedia
            className={classes.media}
            image={`/assets/stories/images/${story.image}`}
            title={story.title}
          />
        )}
        <CardContent>
          <Box display="flex" alignItems="center">
            <AdbIcon fontSize="small" />
            <Typography color="textSecondary" variant="h6">
              {story.title}
            </Typography>
            <Box flexGrow={1} />
            <div className={clsx(classes.label, hover && classes.labelHover)}>
              <Typography
                color="textSecondary"
                variant="overline"
                className={classes.year}
              >
                {story.year}
              </Typography>
            </div>
          </Box>
          <Box mt={1} display="flex" alignItems="flex-start">
            <Typography className={classes.authors} variant="caption">
              <span>{story.authors.join(' • ')}</span>
            </Typography>
          </Box>
          <Box mt={1} display="flex" alignItems="center">
            <Typography variant="body2">{story.description}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

StoryCard.propTypes = {
  story: PropTypes.object,
  className: PropTypes.string,
};

export default StoryCard;
