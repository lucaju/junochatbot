import { Box, IconButton, TextField, Zoom } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, { ChangeEvent, FC, FocusEvent, useState } from 'react';

interface PromptProps {
  handleRemove: (id: number) => void;
  handleUpdate: (id: number, value: string) => void;
  id: number;
  prompt: string;
}

const Prompt: FC<PromptProps> = ({ handleRemove, handleUpdate, id, prompt }) => {
  const [hover, setHover] = useState(false);
  const [_prompt, set_prompt] = useState(prompt);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    set_prompt(event.currentTarget.value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value === prompt) return;
    if (value === '') return handleRemove(id);
    handleUpdate(id, value);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      mt={2}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TextField fullWidth value={_prompt} onBlur={handleBlur} onChange={handleChange} />
      <Zoom in={hover}>
        <IconButton
          aria-label="delete"
          onClick={() => handleRemove(id)}
          size="small"
          sx={{ ml: 1 }}
        >
          <HighlightOffIcon />
        </IconButton>
      </Zoom>
    </Box>
  );
};

export default Prompt;
