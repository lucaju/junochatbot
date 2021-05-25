import { Box, IconButton, makeStyles, TextField, Zoom } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, { ChangeEvent, FC, FocusEvent, useState } from 'react';

interface PromptProps {
  id: number;
  prompt: string;
  handleRemove: (id: number) => void;
  handleUpdate: (id: number, value: string) => void;
}

const useStyles = makeStyles(({ spacing }) => ({
  removeButton: { marginLeft: spacing(1) },
}));

const Prompt: FC<PromptProps> = ({ id, prompt, handleRemove, handleUpdate }) => {
  const classes = useStyles();
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
          className={classes.removeButton}
          size="small"
          onClick={() => handleRemove(id)}
        >
          <HighlightOffIcon />
        </IconButton>
      </Zoom>
    </Box>
  );
};

export default Prompt;
