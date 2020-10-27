import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import AddStoryCard from './AddStoryCard';

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: 50,
    textTransform: 'uppercase',
    fontWeight: 700,
    color: theme.palette.grey[700]
  },
  image: {
    marginBottom: 50,
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 400,
    opacity: 0.7,
  },
}));

const NoStories = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
      textAlign="center"
      alignItems="center"
    >
      <Typography variant="h4" gutterBottom className={classes.heading}>
        No stories yet
      </Typography>
      <img
        alt="No stories yet"
        className={classes.image}
        src="/assets/images/undraw_chat_bot_kli5.svg"
      />
      <AddStoryCard />
    </Box>
  );
};

export default NoStories;
