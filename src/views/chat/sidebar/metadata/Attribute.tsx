import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';

interface AttributeProps {
  level?: number;
  name: string;
  value?: String | number;
}

const Attribute: FC<AttributeProps> = ({ level = 0, name, value }) => {
  return (
    <Box ml={level}>
      <Typography fontSize="0.65rem" my={0.25} paragraph variant="caption" sx={{ fontWeight: 700 }}>
        {name}
        {value && ':'}
        {value && (
          <Typography ml={0.25} fontSize="0.65rem" variant="caption">
            {value}
          </Typography>
        )}
      </Typography>
    </Box>
  );
};

export default Attribute;
