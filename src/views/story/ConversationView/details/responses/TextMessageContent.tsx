import { Box, IconButton, makeStyles, TextField, Zoom } from '@material-ui/core';
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
import MenuParameters from './MenuParameters';

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
  const TFref = useRef();
  const [elTarget, setElTarget] = useState<HTMLElement>();
  const [hover, setHover] = useState(false);
  const [value, setValue] = useState(content);
  const [showParameters, setShowParameters] = useState(false);

  useEffect(() => {
    setValue(content);
  }, [content]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== '$') return;
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
        className={classes.marginBottom}
        fullWidth
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        value={value}
      />
      <MenuParameters
        inputElement={TFref.current}
        open={showParameters}
        target={elTarget}
        handleClick={handleParamSelect}
        handleClose={handleParamsClose}
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
