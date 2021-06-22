import { Box, IconButton, TextField, Zoom } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import useParameter from '../parameters/hooks';
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
  const { params } = useParameter();
  const TFref = useRef();

  const [elTarget, setElTarget] = useState<HTMLElement>();
  const [hover, setHover] = useState(false);
  const [value, setValue] = useState(content);
  const [showParameters, setShowParameters] = useState(false);

  useEffect(() => {
    setValue(content);
    return () => {};
  }, [content]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== '$') return;
    if (!params) return;
    setElTarget(event.currentTarget);
    setShowParameters(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value === '') return handleRemove(index);
    handleUpdate(index, value);
  };

  const handleParamSelect = (param: string, position: number) => {
    handleParamsClose();
    if (!param) return;

    const paramName = param.substring(1);
    const partA = value.substring(0, position);
    const partB = value.substring(position);
    const newValue = `${partA}${paramName}${partB}`;

    setValue(newValue);
    setShowParameters(false);
  };

  const handleParamsClose = () => {
    setShowParameters(false);
    setElTarget(undefined);
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
      />
      {params && (
        <MenuParameters
          handleClick={handleParamSelect}
          handleClose={handleParamsClose}
          inputElement={TFref.current}
          open={showParameters}
          target={elTarget}
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
