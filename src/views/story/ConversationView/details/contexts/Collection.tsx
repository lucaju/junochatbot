import { Box, Collapse, IconButton, makeStyles, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Context as ContextType } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import ContextComponent from './Context';
import useContext, { ContextData } from './hooks';

interface CollectionProps {
  type: 'input' | 'output';
}

const useStyles = makeStyles(() => ({
  collection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  uppercase: { textTransform: 'uppercase' },
}));

const MAX_INPUT = 5;
const MAX_OUPUT = 30;

const Collection: FC<CollectionProps> = ({ type = 'input' }) => {
  const classes = useStyles();
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
        <Typography variant="h6" className={classes.uppercase}>
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
      <TransitionGroup className={classes.collection}>
        {listContext.map(({ id, name, lifeSpan }) => (
          <Collapse key={name}>
            <ContextComponent
              type={type}
              id={id}
              name={name}
              lifeSpan={lifeSpan}
              handleEmptyContext={removeEmptyContext}
            />
          </Collapse>
        ))}
      </TransitionGroup>
    </>
  );
};

export default Collection;
