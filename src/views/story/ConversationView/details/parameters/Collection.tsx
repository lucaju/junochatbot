import { Box } from '@mui/material';
import { useAppState } from '@src/overmind';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';
import ParamsComponent from './ParamsComponent';

const Collection: FC = () => {
  const { currentIntent }  = useAppState().intents;

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" rowGap={0.5}>
      <AnimatePresence initial={false}>
        {currentIntent?.parameters?.map((param, index) => (
          <Box
            key={param.name}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ParamsComponent index={index} name={param.name} param={param} />
          </Box>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default Collection;
