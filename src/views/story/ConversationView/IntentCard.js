import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useRefresh } from 'muuri-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  root: { width: 320 },
  cardHover: { cursor: 'pointer' },
  title: {
    // minHeigh: 316,
  },
}));

const IntentCard = ({ className, handleEditClick, intent, ...rest }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(1);

  useRefresh([intent]);

  const mouseOver = () => {
    setHover(true);
    setElevation(6);
  };

  const mouseOut = () => {
    setHover(false);
    setElevation(1);
  };

  return (
    <Card
      className={clsx(classes.root, className, hover && classes.cardHover)}
      elevation={elevation}
      onClick={() => handleEditClick(intent)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      {...rest}
    >
      <CardContent>
        <Box className={classes.title}>
          <Typography gutterBottom variant="subtitle1">
            {intent.title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

IntentCard.propTypes = {
  className: PropTypes.string,
  handleEditClick: PropTypes.func,
  intent: PropTypes.object,
};

export default IntentCard;
