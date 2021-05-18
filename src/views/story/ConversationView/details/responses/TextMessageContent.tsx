import { Box, IconButton, makeStyles, TextField, Zoom } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, { ChangeEvent, FC, FocusEvent, useEffect, useState } from 'react';

interface TextMessageContentProps {
  index: number;
  content?: string;
  removable?: boolean;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, value: string) => void;
}

const useStyles = makeStyles(({ spacing }) => ({
  removeButton: { marginLeft: spacing(1) },
  marginBottom: { marginBottom: spacing(1.5) },
}));

const TextMessageContent: FC<TextMessageContentProps> = ({
  index,
  content = '',
  removable = true,
  handleRemove,
  handleUpdate,
}) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [value, setValue] = useState(content);

  useEffect(() => {
    setValue(content);
  }, [content]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value === '') return handleRemove(index);
    handleUpdate(index, value);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TextField
        className={classes.marginBottom}
        fullWidth
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      <Zoom in={removable && hover}>
        <IconButton
          aria-label="delete"
          className={classes.removeButton}
          size="small"
          onClick={() => handleRemove(index)}
        >
          <HighlightOffIcon fontSize="inherit" />
        </IconButton>
      </Zoom>
    </Box>
  );
};

export default TextMessageContent;
