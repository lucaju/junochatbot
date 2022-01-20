import { Box, Card, CardContent, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useAppState } from '@src/overmind';
import { Entity } from '@src/types';
import React, { FC, useState } from 'react';

interface EntityCardProps {
  entity: Entity;
}

const EntityCard: FC<EntityCardProps> = ({ entity }) => {
  const { ui } = useAppState();
  const [hover, setHover] = useState(false);

  const { category_en_CA, category_fr_CA, description_en_CA, description_fr_CA, name } = entity;

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
            {ui.languageCode === 'en-CA' && category_en_CA}
            {ui.languageCode === 'fr-CA' && category_fr_CA}
            {ui.languageCode === 'pt-BR' && category_fr_CA}
          </Typography>
        </Box>
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>
        <Typography gutterBottom variant="body2">
          {ui.languageCode === 'en-CA' && description_en_CA}
          {ui.languageCode === 'fr-CA' && description_fr_CA}
          {ui.languageCode === 'pt-BR' && description_fr_CA}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EntityCard;
