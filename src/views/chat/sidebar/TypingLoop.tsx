import { Box, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const TypingLoop: FC = () => {
  const theme = useTheme();
  const dots = [0, 0.5, 1];

  return (
    <Stack direction="row">
      {dots.map((d) => (
        <Box
          key={d}
          component={motion.div}
          sx={{
            width: 5,
            height: 5,
            mr: 0.25,
            borderRadius: '50%',
            backgroundColor: theme.palette.secondary.main,
          }}
          initial={{ y: 10 }}
          animate={{ y: [0, 10, 10] }}
          transition={{ repeat: Infinity, repeatType: 'mirror', delay: d }}
        />
      ))}
    </Stack>
  );
};

export default TypingLoop;
