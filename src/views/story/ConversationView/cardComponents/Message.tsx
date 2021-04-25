import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import TheatersIcon from '@material-ui/icons/Theaters';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import type { Message as MesasgeType } from '../../../../types';

interface MessageProps {
  message: MesasgeType;
}

const useStyles = makeStyles(({ spacing }) => ({
  icon: { marginRight: spacing(1) },
}));

const Message: FC<MessageProps> = ({ message }) => {
  const classes = useStyles();

  let type = 'text';
  let variation = false;
  let text = '';
  let show = true;

  if ('payload' in message) {
    const { source } = message.payload;
    type = 'payload';
    text = typeof source === 'string' ? source : source.join(', ');
    variation = message.payload.type === 'TAG';
  } else if (message.text.text) {
    text = message.text.text[0];
    variation = message.text.text.length > 1;
  }

  show = text !== '';

  return (
    <>
      {show && (
        <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
          {type === 'payload' ? (
            <TheatersIcon fontSize="small" className={classes.icon} />
          ) : (
            <FormatAlignLeftIcon fontSize="small" className={classes.icon} />
          )}
          <Typography noWrap variant="body2">
            {text}
          </Typography>
          {variation && (
            <ShuffleIcon fontSize="small" className={classes.icon} />
          )}
        </Box>
      )}
    </>
  );
};

export default Message;
