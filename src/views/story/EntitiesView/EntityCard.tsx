import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import { Entity } from '@src/types';
import React, { FC, useState } from 'react';

interface EntityCardProps {
  entity: Entity;
}

const EntityCard: FC<EntityCardProps> = ({ entity }) => {
  const [hover, setHover] = useState(false);

  const { category, description, name, outputFormat } = entity;

  const mouseOver = () => setHover(true);
  const mouseOut = () => setHover(false);

  return (
    <Card elevation={1} onMouseEnter={mouseOver} onMouseLeave={mouseOut} sx={{ m: 1 }}>
      <CardContent
        sx={{
          py: 1,
          px: 2,
          '&:last-child': { pb: 1 },
          backgroundColor: ({ palette }) =>
            hover
              ? alpha(palette.secondary.light, palette.action.selectedOpacity)
              : palette.background.default,
        }}
      >
        <Box display="flex" flexDirection="row">
          <Typography gutterBottom variant="button">
            {category}
          </Typography>
        </Box>
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>
        <Typography gutterBottom variant="body2">
          {description}
        </Typography>
        <Typography gutterBottom variant="body2">
          <Box component="span" sx={{ textDecoration: 'underline' }}>
            Output Format
          </Box>
          : {outputFormat}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EntityCard;
