import { Box, IconButton, Typography, useTheme, Zoom } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TimerIcon from '@material-ui/icons/Timer';
import React, { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import useContext from './hooks';

interface ContextProps {
  handleEmptyContext: () => void;
  id?: string;
  lifeSpan?: number;
  name: string;
  type: 'input' | 'output';
}

const ALLOWED_KEYS_LIFESPAN = ['Backspace', 'ArrowLeft', 'ArrowRight'];

const ContextComponent: FC<ContextProps> = ({
  handleEmptyContext,
  id = 'new',
  lifeSpan = 5,
  name,
  type = 'input',
}) => {
  const theme = useTheme();
  const NameRef = useRef<HTMLElement>(null);
  const LifespanRef = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);

  const { removeContex, updateContext } = useContext({
    currentLifeSpan: lifeSpan,
    currentName: name,
    id,
    type,
  });

  useEffect(() => {
    if (name === '' && NameRef.current) NameRef.current.focus();
    return () => {};
  }, [NameRef]);

  const handleKeyDownName = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === ' ') {
      event.stopPropagation();
      event.preventDefault();
      //TODO Error msg
      console.warn('Context name cannot contain spaces');
      return;
    }

    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      handleUpdate();
      return;
    }
  };

  const handleKeyDownLife = (event: KeyboardEvent<HTMLElement>) => {
    if (!LifespanRef || !LifespanRef.current || LifespanRef.current.textContent === null) return;

    const content =
      LifespanRef.current.textContent !== null ? +LifespanRef.current.textContent : lifeSpan;

    if (ALLOWED_KEYS_LIFESPAN.includes(event.key)) return;

    if (event.key === 'ArrowUp') {
      LifespanRef.current.textContent = `${content + 1}`;
      return;
    }

    if (event.key === 'ArrowDown' && content > 0) {
      LifespanRef.current.textContent = `${content - 1}`;
      return;
    }

    if (event.key.match(/\d/) && LifespanRef.current.textContent.length < 3) return;

    if (event.key === 'Enter') handleUpdate();

    event.stopPropagation();
    event.preventDefault();
  };

  const handleBlur = () => handleUpdate();

  const handleUpdate = () => {
    if (!NameRef || !NameRef.current) return;

    const newName = NameRef.current.textContent ?? '';
    if (newName === '') return handleEmptyContext();

    const newLifeCount = LifespanRef.current ? Number(LifespanRef.current.textContent) : 0;
    updateContext({ name: newName, lifeSpan: newLifeCount });
  };

  const handleRemoveClick = () => removeContex(id);

  const ononMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      my={1}
      ml={1}
      onMouseEnter={ononMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        py={0.5}
        px={2}
        borderRadius={3}
        onBlur={handleBlur}
        sx={{
          backgroundColor: theme.palette.action.hover,
          '&:focus-within': {
            boxShadow: `${theme.palette.primary.light} 0px 0px 5px 1px !important`,
          },
          transition: theme.transitions.create(['box-shadow'], {
            duration: theme.transitions.duration.standard,
          }),

          boxShadow: hover ? 'rgb(0 0 0 / 20%) 0px 0px 10px 1px' : 0,
        }}
      >
        <Typography
          ref={NameRef}
          contentEditable={true}
          onKeyDown={handleKeyDownName}
          suppressContentEditableWarning={true}
          sx={{ minWidth: 20 }}
        >
          {name}
        </Typography>
        {type === 'output' && (
          <>
            <TimerIcon fontSize="small" sx={{ mx: 1 }} />
            <Typography
              ref={LifespanRef}
              contentEditable={true}
              onKeyDown={handleKeyDownLife}
              suppressContentEditableWarning={true}
              sx={{
                flexGrow: 1,
                '&:focus-visible': { outlineStyle: 'none' },
              }}
            >
              {lifeSpan}
            </Typography>
          </>
        )}
      </Box>
      <Zoom in={hover}>
        <IconButton aria-label="delete" onClick={handleRemoveClick} size="small" sx={{ ml: 1 }}>
          <HighlightOffIcon fontSize="inherit" />
        </IconButton>
      </Zoom>
    </Box>
  );
};

export default ContextComponent;
