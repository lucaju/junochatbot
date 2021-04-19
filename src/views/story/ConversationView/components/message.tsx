import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC } from 'react';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import TheatersIcon from '@material-ui/icons/Theaters';
import ShuffleIcon from '@material-ui/icons/Shuffle';

interface MessageProps {
  type: string;
  text: string;
  variation: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {},
  box: { marginBottom: spacing(1) },
  icon: { marginRight: spacing(1) },
}));

const Message: FC<MessageProps> = ({ type, text, variation }) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.box}
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      {type === 'payload' ? (
        <TheatersIcon fontSize="small" className={classes.icon} />
      ) : (
        <FormatAlignLeftIcon fontSize="small" className={classes.icon} />
      )}
      <Typography noWrap variant="body1">
        {text}
      </Typography>
      {variation && <ShuffleIcon fontSize="small" className={classes.icon} />}
    </Box>
  );
};

export default Message;
