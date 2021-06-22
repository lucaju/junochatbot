import { Box, Collapse, IconButton, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Context as ContextType } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import ContextComponent from './Context';
import useContext, { ContextData } from './hooks';

interface CollectionProps {
  type: 'input' | 'output';
}

const MAX_INPUT = 5;
const MAX_OUPUT = 30;

const Collection: FC<CollectionProps> = ({ type = 'input' }) => {
  const { contexts, createFreshContext, extractContextName } = useContext({ type });
  const [listContext, setListContext] = useState<ContextData[]>([]);

  useEffect(() => {
    // console.log(type, contexts)
    if (!contexts) return setListContext([]);

    const list = contexts.map((context: string | ContextType) => {
      const name = typeof context === 'string' ? context : context.name;
      const contextName = extractContextName(name);
      return {
        type,
        id: name,
        name: contextName,
        lifeSpan: typeof context !== 'string' ? context.lifespanCount : undefined,
      };
    });

    setListContext(list);

    return () => setListContext([]);
  }, [contexts]);

  const handleAddNew = () => {
    if (listContext.length > 0 && listContext[listContext.length - 1].name === '') return;
    const newContext = createFreshContext();
    console.log(newContext);
    setListContext([...listContext, newContext]);
  };

  const removeEmptyContext = () => {
    const newContext = createFreshContext();
    console.log(newContext);
    setListContext(listContext.filter(({ name }) => name !== ''));
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" my={1.5}>
        <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
          {type}
        </Typography>
        <IconButton
          color="primary"
          disabled={
            type === 'output' ? listContext.length >= MAX_OUPUT : listContext.length >= MAX_INPUT
          }
          onClick={handleAddNew}
        >
          <AddCircleOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
      <TransitionGroup
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {listContext.map(({ id, name, lifeSpan }) => (
          <Collapse key={name}>
            <ContextComponent
              handleEmptyContext={removeEmptyContext}
              id={id}
              lifeSpan={lifeSpan}
              name={name}
              type={type}
            />
          </Collapse>
        ))}
      </TransitionGroup>
    </>
  );
};

export default Collection;
