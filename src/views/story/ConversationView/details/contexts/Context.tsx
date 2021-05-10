import { Box, IconButton, makeStyles, Typography, Zoom } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TimerIcon from '@material-ui/icons/Timer';
import clsx from 'clsx';
import React, { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';

export interface ContextData {
  name: string;
  id?: string;
  lifeSpan?: number;
  type?: 'input' | 'output';
}

interface ContextProps {
  type: 'input' | 'output';
  id?: string;
  name: string;
  lifeSpan?: number;
  addContext: ({ name, lifeSpan }: ContextData) => void;
  updateContext: ({ id, name, lifeSpan }: ContextData) => void;
  removeContex: (id: string) => void;
}

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  content: {
    backgroundColor: palette.action.hover,
    '&:focus-within': {
      boxShadow: `${palette.primary.light} 0px 0px 5px 1px !important`,
    },
    transition: transitions.create(['box-shadow'], {
      duration: transitions.duration.standard,
    }),
  },
  contentHover: { boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 10px 1px' },
  field: {
    flexGrow: 1,
    '&:focus-visible': { outlineStyle: 'none' },
  },
  nameField: { minWidth: spacing(5) },
  lifeSpanIcon: {
    marginLeft: spacing(1),
    marginRight: spacing(1),
  },
  removeButton: { marginLeft: spacing(1) },
}));

const ALLOWED_KEYS_LIFESPAN = ['Backspace', 'ArrowLeft', 'ArrowRight'];

const ContextComponent: FC<ContextProps> = ({
  type = 'input',
  id = 'new',
  name,
  lifeSpan = 0,
  addContext,
  updateContext,
  removeContex,
}) => {
  const classes = useStyles();
  const NameRef = useRef<any | undefined>();
  const LifespanRef = useRef<any | undefined>();
  const [hover, setHover] = useState(false);

  const matchName = name.match(/contexts\/(.+)/);
  const contextName = matchName ? matchName[1] : '';

  const matchPathPrefix = name.match(/.+\//);
  const prefix = matchPathPrefix ? matchPathPrefix[0] : '';

  useEffect(() => {
    if (contextName === '') NameRef.current.focus();
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
      handleUpdateContex();
      return;
    }
  };

  const handleKeyDownLife = (event: KeyboardEvent<HTMLElement>) => {
    const content = +LifespanRef.current.textContent;

    if (ALLOWED_KEYS_LIFESPAN.includes(event.key)) return;

    if (event.key === 'ArrowUp') {
      LifespanRef.current.textContent = content + 1;
      return;
    }

    if (event.key === 'ArrowDown' && content > 0) {
      LifespanRef.current.textContent = content - 1;
      return;
    }

    if (event.key.match(/\d/) && LifespanRef.current.textContent.length < 3) return;

    if (event.key === 'Enter') handleUpdateContex();

    event.stopPropagation();
    event.preventDefault();
  };

  const handleBlur = () => handleUpdateContex();

  const handleUpdateContex = () => {
    type === 'output' ? updateOutContex() : updateInContex();
  };

  const updateInContex = () => {
    const nameContent = NameRef.current.textContent;

    if (nameContent === '') {
      removeContex(type);
      return;
    }
    if (nameContent === contextName) return;

    const newName = `${prefix}${nameContent}`;

    if (id === 'new') {
      addContext({ type, name: newName });
      id = newName;
    } else {
      updateContext({ id, name: newName });
    }
  };

  const updateOutContex = () => {
    const nameContent = NameRef.current.textContent;
    const lifeContent = +LifespanRef.current.textContent;

    if (nameContent === '' || lifeContent === 0) {
      removeContex(id);
      return;
    }
    if (nameContent === contextName && lifeContent === lifeSpan) return;

    const newName = `${prefix}${nameContent}`;

    if (id === 'new') {
      addContext({ type, name: newName, lifeSpan: lifeContent });
      id = newName;
    } else {
      updateContext({ id, name: newName, lifeSpan: lifeContent });
    }
  };

  const handleRemoveClick = () => removeContex(id);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      my={1}
      ml={1}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        className={clsx(classes.content, hover && classes.contentHover)}
        display="flex"
        flexDirection="row"
        alignItems="center"
        borderRadius={24}
        py={0.5}
        px={2}
        onBlur={handleBlur}
      >
        <Typography
          ref={NameRef}
          className={clsx(classes.field, classes.nameField)}
          contentEditable={true}
          onKeyDown={handleKeyDownName}
          suppressContentEditableWarning={true}
        >
          {contextName}
        </Typography>
        {type === 'output' && (
          <>
            <TimerIcon fontSize="small" className={classes.lifeSpanIcon} />
            <Typography
              ref={LifespanRef}
              className={classes.field}
              contentEditable={true}
              onKeyDown={handleKeyDownLife}
              suppressContentEditableWarning={true}
            >
              {lifeSpan}
            </Typography>
          </>
        )}
      </Box>
      <Zoom in={hover}>
        <IconButton
          aria-label="delete"
          className={classes.removeButton}
          size="small"
          onClick={handleRemoveClick}
        >
          <HighlightOffIcon fontSize="inherit" />
        </IconButton>
      </Zoom>
    </Box>
  );
};

export default ContextComponent;
