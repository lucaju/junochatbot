import { Box, makeStyles, Typography } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import React, { FC } from 'react';

interface ContextProps {
  name: string;
  type?: string;
  lifespan?: number;
}

const useStyles = makeStyles(({ palette }) => ({
  content: { backgroundColor: palette.action.hover },
}));

const Context: FC<ContextProps> = ({ name, type = 'inpout', lifespan = 0 }) => {
  const classes = useStyles();

  const splitName = name.split('/');
  const text = splitName[splitName.length - 1];

  return (
    <Box
      className={classes.content}
      display="flex"
      flexDirection="row"
      alignItems="center"
      borderRadius={16}
      mr={1}
      py={0.5}
      px={1.5}
    >
      <Typography variant="body2">{text}</Typography>
      {type === 'output' && (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="flex-end"
          ml={1}
          color="text.secondary"
        >
          <TimerIcon fontSize="small" />
          <Typography align="center" variant="caption">
            {lifespan}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Context;
