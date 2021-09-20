import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useActions } from '@src/overmind';
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
    if (payloadType === 'tag') {
      const tag = actions.intents.getTagById(Number(source));
      text = tag ? tag.name : '';
      variation = true;
    } else {
      const video = actions.intents.getVideoById(Number(source));
      text = video ? video.title : '';
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
