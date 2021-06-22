import { Box, Card, CardContent, Chip, Typography } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import { ContextRelation } from '@src/types';
import React, { FC, useState } from 'react';

interface ContextCardProps {
  context: ContextRelation;
}

const ContextCard: FC<ContextCardProps> = ({ context }) => {
  const [hover, setHover] = useState(false);

  const { name, inputs, outputs } = context;

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
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>

        {inputs && (
          <Box>
            <Typography gutterBottom variant="overline">
              Inputs
            </Typography>
            <Box>
              {inputs.map((input) => (
                <Chip
                  key={input}
                  label={input.toUpperCase()}
                  size="small"
                  sx={{ mr: 1 }}
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        {outputs && (
          <Box>
            <Typography gutterBottom variant="overline">
              Outputs
            </Typography>
            <Box>
              {outputs.map((output) => (
                <Chip
                  key={output}
                  label={output.toUpperCase()}
                  size="small"
                  sx={{ mr: 1 }}
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ContextCard;
