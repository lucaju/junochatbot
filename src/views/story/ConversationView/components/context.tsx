import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC } from 'react';

interface ContextProps {
  type: string;
  name: string;
  lifespanCount?: number;
}

const useStyles = makeStyles(({ shape, spacing, palette }) => ({
  root: {},
  content: {
    width: 'min-content',
    marginBottom: spacing(1),
    padding: spacing(0.5),
    paddingLeft: spacing(1.5),
    backgroundColor: palette.action.hover,
    '&:last-child': { marginBottom: 0 },
  },
  inContext: {
    paddingRight: spacing(1.5),
    borderRadius: shape.borderRadius,
  },
  outContext: {
    borderRadius: shape.borderRadius * 4,
  },
  life: {
    minWidth: spacing(3),
    marginLeft: spacing(1),
    borderRadius: shape.borderRadius * 6,
    backgroundColor: palette.background.paper,
    textAlign: 'center',
  },
}));

const Context: FC<ContextProps> = ({ type, name, lifespanCount }) => {
  const classes = useStyles();

  const splitName = name.split('/');
  const text = splitName[splitName.length - 1];

  return (
    <Box
      className={clsx(
        classes.content,
        type === 'in' ? classes.inContext : classes.outContext
      )}
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Typography variant="body2">{text}</Typography>
      {type === 'out' && (
        <Box className={classes.life}>
          <Typography variant="button">{lifespanCount}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Context;
