import { Box, IconButton, Stack, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useActions, useAppState } from '@src/overmind';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';
import ContextComponent from './Context';

interface CollectionProps {
  type: 'input' | 'output';
}

const MAX_INPUT = 5;
const MAX_OUPUT = 30;

const Collection: FC<CollectionProps> = ({ type }) => {
  const {
    intents: { currentIntent },
  } = useAppState();
  const actions = useActions();

  const contexts = type === 'input' ? currentIntent?.inputContexts : currentIntent?.outputContexts;
  const reachedLimit = contexts && contexts.length >= (type === 'input' ? MAX_INPUT : MAX_OUPUT);

  const handleAddNew = () => {
    if (contexts?.[contexts?.length - 1].name === '') return;
    actions.intents.addContext(type);
  };

  return (
    <Stack spacing={1}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start">
        <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
          {type}
        </Typography>
        <IconButton color="primary" disabled={reachedLimit} onClick={handleAddNew}>
          <AddCircleOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        <AnimatePresence initial={false}>
          {contexts?.map((context) => (
            <Box
              key={context.id}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ContextComponent context={context} />
            </Box>
          ))}
        </AnimatePresence>
      </Box>
    </Stack>
  );
};

export default Collection;
