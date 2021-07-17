import { Box, IconButton, Typography, useTheme, Zoom } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TimerIcon from '@material-ui/icons/Timer';
import { useActions } from '@src/overmind';
import type { Context as ContextType } from '@src/types';
import React, { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';

export interface ContextComponentProps {
  context: ContextType;
}

const ALLOWED_KEYS_LIFESPAN = ['Backspace', 'ArrowLeft', 'ArrowRight'];

const ContextComponent: FC<ContextComponentProps> = ({ context }) => {
  const actions = useActions();
  const theme = useTheme();

  const NameHTMLRef = useRef<HTMLElement>(null);
  const LifespanHTMLRef = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);

  const { lifespanCount = 5, shortName, type } = context;

  useEffect(() => {
    if (shortName === '' && NameHTMLRef.current) NameHTMLRef.current.focus();
    return () => {};
  }, [NameHTMLRef]);

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
    if (
      !LifespanHTMLRef ||
      !LifespanHTMLRef.current ||
      LifespanHTMLRef.current.textContent === null
    )
      return;

    const content =
      LifespanHTMLRef.current.textContent !== null
        ? +LifespanHTMLRef.current.textContent
        : lifespanCount;

    if (ALLOWED_KEYS_LIFESPAN.includes(event.key)) return;

    if (event.key === 'ArrowUp') {
      LifespanHTMLRef.current.textContent = `${content + 1}`;
      return;
    }

    if (event.key === 'ArrowDown' && content > 0) {
      LifespanHTMLRef.current.textContent = `${content - 1}`;
      return;
    }

    if (event.key.match(/\d/) && LifespanHTMLRef.current.textContent.length < 3) return;

    if (event.key === 'Enter') handleUpdate();

    event.stopPropagation();
    event.preventDefault();
  };

  const handleBlur = () => handleUpdate();

  const handleUpdate = () => {
    if (!NameHTMLRef || !NameHTMLRef.current) return;

    const newName = NameHTMLRef.current.textContent ?? '';
    const sanitizedNewName = newName.trim().replace(/\s+/g, ''); //remove spaces.
    const newLifeCount = LifespanHTMLRef.current ? Number(LifespanHTMLRef.current.textContent) : 0;

    const updatedContext: ContextType = {
      ...context,
      shortName: sanitizedNewName,
      lifespanCount: newLifeCount,
    };
    actions.intents.updateContext(updatedContext);
  };

  const handleRemoveClick = () => {
    actions.intents.removeContext(context);
  };

  const ononMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      my={1}
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
          ref={NameHTMLRef}
          contentEditable={true}
          onKeyDown={handleKeyDownName}
          suppressContentEditableWarning={true}
          sx={{
            minWidth: 20,
            '&:focus-visible': { outlineStyle: 'none' },
          }}
        >
          {shortName}
        </Typography>
        {type === 'output' && (
          <>
            <TimerIcon fontSize="small" sx={{ mx: 1 }} />
            <Typography
              ref={LifespanHTMLRef}
              contentEditable={true}
              onKeyDown={handleKeyDownLife}
              suppressContentEditableWarning={true}
              sx={{
                flexGrow: 1,
                '&:focus-visible': { outlineStyle: 'none' },
              }}
            >
              {lifespanCount}
            </Typography>
          </>
        )}
      </Box>
      <Zoom in={hover}>
        <IconButton
          aria-label="delete"
          onClick={handleRemoveClick}
          size="small"
          sx={{ right: 4, bottom: 12 }}
        >
          <HighlightOffIcon fontSize="inherit" />
        </IconButton>
      </Zoom>
    </Box>
  );
};

export default ContextComponent;
