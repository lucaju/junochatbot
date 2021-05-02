import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, MouseEvent } from 'react';
import { Part as PartType } from '../../../../../types';

interface PartProps {
  type?: 'empty' | 'text' | 'semantic';
  part?: PartType;
  handleClick?: (event: MouseEvent<HTMLSpanElement>) => void;
}

const useStyles = makeStyles(() => ({
  highlight: {
    backgroundColor: 'rgba(255,145,0,.2)',
    cursor: 'pointer',
  },
}));

const Part: FC<PartProps> = ({ type = 'empty', part = {}, handleClick }) => {
  const classes = useStyles();

  const { entityType, text, alias, userDefined } = part;

  return (
    <Box
      component="span"
      className={clsx(entityType && classes.highlight)}
      px={0.5}
      py={0.25}
      borderRadius={entityType ? 'borderRadius' : 0}
      data-entity-type={entityType}
      data-alias={alias}
      data-user-define={userDefined}
      onClick={entityType ? handleClick : undefined}
    >
      {type === 'empty' ? <>&nbsp;</> : text}
    </Box>
  );
};

export default Part;
