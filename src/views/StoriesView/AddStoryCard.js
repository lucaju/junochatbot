import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  colors,
  Typography,
  makeStyles,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 325,
    borderStyle: 'dashed',
  },
  icon: {
    marginRight: theme.spacing(1),
    color: colors.orange[600],
  },
  uppercase: {
    textTransform: 'uppercase',
  },
}));

const StoryCard = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className, classes.cardBackground)}
      variant="outlined"
      {...rest}
    >
      <CardActionArea>
        <CardContent>
          <Box display="flex" alignItems="center">
            <AddCircleIcon className={classes.icon} fontSize="large" />
            <Typography variant="h6" className={classes.uppercase}>
              Create a new story
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

StoryCard.propTypes = {
  className: PropTypes.string,
};

export default StoryCard;
