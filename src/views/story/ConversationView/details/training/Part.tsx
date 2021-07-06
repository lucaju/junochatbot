import { Box } from '@material-ui/core';
import { useAppState } from '@src/overmind';
import { Part as PartType } from '@src/types';
import { intentParamColorPalette } from '@src/util/utilities';
import React, { FC, MouseEvent } from 'react';

interface PartProps {
  index?: number;
  handleClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  part?: PartType;
  type?: 'empty' | 'text' | 'semantic';
}

const Part: FC<PartProps> = ({ index, handleClick, part = {}, type = 'empty' }) => {
  const { intents } = useAppState();
  const { alias, entityType, text, userDefined } = part;

  let paramIndex =
    intents.currentIntent?.parameters?.findIndex(
      (param) => param.entityTypeDisplayName === entityType
    ) ?? 0;
  paramIndex = paramIndex < intentParamColorPalette.length ? paramIndex : 0;
  return (
    <Box
      component="span"
      px={entityType ? 0.5 : 0}
      py={1.25}
      data-entity-type={entityType}
      data-alias={alias}
      data-user-define={userDefined}
      onClick={entityType ? handleClick : undefined}
      sx={{
        backgroundColor: entityType ? intentParamColorPalette[paramIndex] : 'inherent',
        cursor: entityType ? 'pointer' : 'default',
      }}
    >
      {type === 'empty' ? <>&nbsp;</> : text}
    </Box>
  );
};

export default Part;
