import { Box, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const { intents } = useAppState();
  const { alias, entityType, text, userDefined } = part;

  let paramIndex =
    intents.currentIntent?.parameters?.findIndex(
      (param) => param.entityTypeDisplayName === entityType
    ) ?? 0;
  paramIndex = paramIndex < intentParamColorPalette.length ? paramIndex : 0;

  const onContextMenu = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  let backgroundColor = entityType ? intentParamColorPalette[paramIndex] : 'inherent';
  backgroundColor = backgroundColor ?? 'inherent';
  const color =
    backgroundColor === 'inherent' ? 'inherent' : theme.palette.getContrastText(backgroundColor);

  return (
    <Box
      component="span"
      px={entityType ? 0.5 : 0}
      py={1.25}
      data-entity-type={entityType}
      data-alias={alias}
      data-user-define={userDefined}
      onContextMenu={onContextMenu}
      onClick={entityType ? handleClick : undefined}
      sx={{
        color,
        backgroundColor,
        cursor: entityType ? 'pointer' : 'default',
      }}
    >
      {type === 'empty' ? <>&nbsp;</> : text}
    </Box>
  );
};

export default Part;
