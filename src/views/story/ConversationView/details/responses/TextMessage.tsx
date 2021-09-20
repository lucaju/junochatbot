import { useDraggable } from '@dnd-kit/core';
import { Box, Grid, IconButton, Stack, useTheme, Zoom } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useActions } from '@src/overmind';
import { Text } from '@src/types';
import React, { FC, useState } from 'react';
import TextMessageContent from './TextMessageContent';

interface TextMessageProps {
  message: Text;
  isDragging?: boolean;
}

const TextMessage: FC<TextMessageProps> = ({ message, isDragging = false }) => {
  const actions = useActions();
  const theme = useTheme();

  const { attributes, listeners } = useDraggable({
    id: message.id ?? '',
  });

  const [hover, setHover] = useState(false);
  const numberOfAlternatives = message.text.text?.length ?? 0;

  const addAlternative = () => {
    if (!message.id) return;
    actions.intents.addTextMessageAlternative(message.id);
  };

  const handleUpdateAlternative = (altIndex: number, value: string) => {
    actions.intents.updateTextMessageAlternative({
      messageId: message.id,
      alternativeIndex: altIndex,
      value,
    });
  };

  const handleRemoveAlternative = (altIndex: number) => {
    actions.intents.removeTextMessageAlternative({
      messageId: message.id,
      alternativeIndex: altIndex,
    });
  };

  const handleRemove = () => {
    if (!message.id) return;
    actions.intents.removeMessage(message.id);
  };

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      flexGrow={1}
      spacing={0}
      my={1}
      ml={3}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        p={2}
        borderRadius={'borderRadius'}
        sx={{
          width: '100%',
          backgroundColor: theme.palette.action.hover,
          '&:focus-within': {
            boxShadow: `${theme.palette.primary.light} 0px 0px 5px 1px !important`,
          },
          transition: theme.transitions.create(['box-shadow'], {
            duration: theme.transitions.duration.standard,
          }),
          boxShadow: hover
            ? 'rgb(0 0 0 / 20%) 0px 0px 10px 1px'
            : isDragging
            ? `${theme.palette.primary.light} 0px 0px 5px 1px !important`
            : 0,
        }}
      >
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <Stack direction="column" alignItems="center" mt={0.5} spacing={1}>
              <IconButton {...listeners} {...attributes} size="small" sx={{ cursor: 'grab' }}>
                <FormatAlignLeftIcon />
              </IconButton>
              {numberOfAlternatives > 1 && <ShuffleIcon />}
              <IconButton color="primary" onClick={addAlternative} size="small">
                <AddCircleOutlineIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs>
            {message.text.text?.map((text, i) => (
              <TextMessageContent
                key={i}
                content={text}
                index={i}
                handleRemove={handleRemoveAlternative}
                handleUpdate={handleUpdateAlternative}
                removable={numberOfAlternatives > 1}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
      <Zoom in={hover}>
        <IconButton
          aria-label="delete"
          onClick={handleRemove}
          size="small"
          sx={{ right: 16, bottom: 16 }}
        >
          <HighlightOffIcon />
        </IconButton>
      </Zoom>
    </Stack>
  );
};

export default TextMessage;
