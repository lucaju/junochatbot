import { Box, Grid, IconButton, Stack, useTheme, Zoom } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import React, { FC, useEffect, useState } from 'react';
import { TextComp } from './Collection';
import TextMessageContent from './TextMessageContent';

interface TextMessageProps {
  content: TextComp;
  handleRemove: (index: string) => void;
  handleUpdate: (index: string, value: TextComp) => void;
  index: string;
  isDragging?: boolean;
}

const TextMessage: FC<TextMessageProps> = ({
  content,
  handleRemove,
  handleUpdate,
  index,
  isDragging = false,
}) => {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const [alternatives, setAlternatives] = useState<string[]>([]);

  useEffect(() => {
    setAlternatives(content.text.text ? content.text.text : []);
    return () => {};
  }, [content]);

  const handleRemoveAlternative = (altIndex: number) => {
    const updatedAlternatives = alternatives.filter((_text: string, i: number) => i !== altIndex);
    setAlternatives(updatedAlternatives);

    if (updatedAlternatives.length === 0) return handleRemove(index);

    const updatedContent = content;
    updatedContent.text.text = updatedAlternatives;
    handleUpdate(index, updatedContent);
  };

  const handleUpdateAlternative = (altIndex: number, value: string) => {
    const updatedAlternatives = alternatives.map((text, i) => {
      if (i === altIndex) return value;
      return text;
    });

    setAlternatives(updatedAlternatives);

    const updatedContent = content;
    updatedContent.text.text = updatedAlternatives;
    handleUpdate(index, updatedContent);
  };

  const addEmpty = () => {
    if (alternatives[alternatives.length - 1] === '') return;
    setAlternatives([...alternatives, '']);
  };

  return (
    <Box
      my={1}
      p={2}
      borderRadius={'borderRadius'}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
          <Stack direction="row" alignItems="center" mt={0.5} spacing={1}>
            <FormatAlignLeftIcon />
            {alternatives.length > 1 && <ShuffleIcon />}
            <IconButton color="primary" onClick={addEmpty} size="small">
              <AddCircleOutlineIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs>
          {alternatives?.map((content: string, altIndex: number) => (
            <TextMessageContent
              key={altIndex}
              content={content}
              index={altIndex}
              handleRemove={handleRemoveAlternative}
              handleUpdate={handleUpdateAlternative}
              removable={alternatives.length > 1}
            />
          ))}
        </Grid>
        <Grid item>
          <Zoom in={hover}>
            <IconButton
              aria-label="delete"
              onClick={() => handleRemove(index)}
              size="small"
              sx={{ ml: 1 }}
            >
              <HighlightOffIcon />
            </IconButton>
          </Zoom>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextMessage;
