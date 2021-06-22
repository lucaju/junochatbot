import { Box } from '@material-ui/core';
import { Part as PartType } from '@src/types';
import React, { FC, MouseEvent } from 'react';

interface PartProps {
  index?: number;
  handleClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  part?: PartType;
  type?: 'empty' | 'text' | 'semantic';
}

const Part: FC<PartProps> = ({ index, handleClick, part = {}, type = 'empty' }) => {
  const { alias, entityType, text, userDefined } = part;

  return (
    <Box
      component="span"
      px={entityType ? 0.5 : 0}
      py={0.25}
      borderRadius={entityType ? 'borderRadius' : 0}
      data-entity-type={entityType}
      data-alias={alias}
      data-user-define={userDefined}
      onClick={entityType ? handleClick : undefined}
      sx={{
        backgroundColor: entityType ? 'rgba(255,145,0,.2)' : 'inherent',
        cursor: entityType ? 'pointer' : 'default',
      }}
    >
      {type === 'empty' ? <>&nbsp;</> : text}
    </Box>
  );
};

export default Part;
