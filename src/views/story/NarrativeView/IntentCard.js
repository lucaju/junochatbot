import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  colors,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AdbIcon from '@material-ui/icons/Adb';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 325,
  },
  title: {
    marginLeft: -theme.spacing(2.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.secondary,
  },
  titleHover: {
    backgroundColor: colors.orange[400],
    color:
      theme.palette.type === 'light'
        ? theme.palette.text.primary
        : theme.palette.grey[800],
  },
  label: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor:
      theme.palette.type === 'light'
        ? theme.palette.background.default
        : theme.palette.grey[700],
    color: theme.palette.text.secondary,
    marginRight: -theme.spacing(1),
  },
  authors: { textTransform: 'uppercase' },
  icon: { marginRight: theme.spacing(1) },
}));

const IntentCard = ({ story, triggerEditStory, className, ...rest }) => {
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

  const handleEditClick = () => {
    triggerEditStory(story);
  };

  const handlePlayClick = () => {
    console.log(story);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      elevation={elevation}
      {...rest}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
    >
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
          <Typography variant="caption">
            <span>{story.authors.join(' • ')}</span>
          </Typography>
        </Box>
        <Box mt={1} display="flex" alignItems="center">
          <Typography variant="body2">{story.description}</Typography>
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

IntentCard.propTypes = {
  story: PropTypes.object,
  triggerEditStory: PropTypes.func,
  className: PropTypes.string,
};

export default IntentCard;
