import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useAppState, useActions } from '@src/overmind';
import type { Message as MesasgeType } from '@src/types';
import React, { FC } from 'react';

interface MessageProps {
  message: MesasgeType;
}

const Message: FC<MessageProps> = ({ message }) => {
  const actions = useActions();

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  let type = 'text';
  let variation = false;
  let text = '';
  let show = true;

  if ('payload' in message) {
    type = 'payload';
    const { source, type: payloadType } = message.payload;
    if (typeof source[0] === 'string') {
      text = source[0];
    } else {
      if (payloadType === 'tag') {
        const tag = actions.intents.getTagById(source[0]);
        text = tag ? tag.name : '';
        variation = true;
      } else {
        const video = actions.intents.getVideoById(source[0]);
        text = video ? video.title : '';
        variation = source.length > 1;
      }
    }
  } else if (message.text.text) {
    text = message.text.text[0];
    variation = message.text.text.length > 1;
  }

  show = text !== '';

  return (
    <>
      {show && (
        <Box display="flex" flexDirection="row" alignItems={isSM ? 'flex-start' : 'center'} mb={1}>
          {type === 'payload' ? (
            <YouTubeIcon fontSize="small" sx={{ mr: 1 }} />
          ) : (
            <ChatOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          )}
          <Typography noWrap={isSM ? false : true} variant="body2">
            {text}
          </Typography>
          {variation && <ShuffleIcon fontSize="small" sx={{ mr: 1 }} />}
        </Box>
      )}
    </>
  );
};

export default Message;
