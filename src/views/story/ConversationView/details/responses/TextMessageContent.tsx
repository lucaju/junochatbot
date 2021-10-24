import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, IconButton, TextField, Zoom } from '@mui/material';
import { useAppState } from '@src/overmind';
import React, { ChangeEvent, FC, FocusEvent, KeyboardEvent, useRef, useState } from 'react';
import MenuParameters from './MenuParameters';

interface TextMessageContentProps {
  content?: string;
  index: number;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, value: string) => void;
  removable?: boolean;
}

const TextMessageContent: FC<TextMessageContentProps> = ({
  content = '',
  index,
  handleRemove,
  handleUpdate,
  removable = true,
}) => {
  const { currentIntent } = useAppState().intents;
  const TFref = useRef();

  const [elTarget, setElTarget] = useState<HTMLElement>();
  const [hover, setHover] = useState(false);
  const [value, setValue] = useState(content);
  const [showMenu, setShowMenu] = useState(false);
  const [menuType, setMenuType] = useState<'parameters' | 'contexts' | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLElement>) => {
    if (currentIntent?.isFallback) return;
    if (event.key === '$') displayParams(event);
    if (event.key === '#') displayContext(event);
  };

  const displayParams = (event: KeyboardEvent<HTMLElement>) => {
    if (!currentIntent?.parameters) return;
    setMenuType('parameters');
    setElTarget(event.currentTarget);
    setShowMenu(true);
  };

  const displayContext = (event: KeyboardEvent<HTMLElement>) => {
    if (!currentIntent?.inputContexts && !currentIntent?.outputContexts) return;
    setMenuType('contexts');
    setElTarget(event.currentTarget);
    setShowMenu(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value === '') return handleRemove(index);
    handleUpdate(index, value);
  };

  const handleMenuSelect = (param: string, position: number) => {
    handleParamsClose();
    if (!param) return;

    const paramName = menuType === 'parameters' ? param.substring(1) : param;
    const partA = value.substring(0, position);
    const partB = value.substring(position);
    const newValue = `${partA}${paramName}${partB}`;

    setValue(newValue);
  };

  const handleParamsClose = () => {
    setShowMenu(false);
    setElTarget(undefined);
    setMenuType(null);
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
        inputRef={TFref}
        fullWidth
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        sx={{ mb: 1.5 }}
        value={value}
        variant="standard"
      />
      {currentIntent?.parameters && (
        <MenuParameters
          inputElement={TFref.current}
          onClose={handleParamsClose}
          onSelect={handleMenuSelect}
          open={showMenu}
          target={elTarget}
          type={menuType}
        />
      )}
      <Zoom in={removable && hover}>
        <IconButton
          aria-label="delete"
          onClick={() => handleRemove(index)}
          size="small"
          sx={{ ml: 1 }}
        >
          <HighlightOffIcon fontSize="inherit" />
        </IconButton>
      </Zoom>
    </Box>
  );
};

export default TextMessageContent;
