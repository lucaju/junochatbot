import { Box, Collapse, IconButton, makeStyles, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Context as ContextType } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import ContextComponent, { ContextData } from './Context';
import useContext from './hooks';

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
  const { value, createFreshContext } = useContext({ type });
  const [listContext, setListContext] = useState<ContextData[]>([]);

  useEffect(() => {
    if (!value) return setListContext([]);

    const list = value.map((context: string | ContextType) => {
      const name = typeof context === 'string' ? context : context.name;
      return {
        type,
        id: name,
        name,
        lifeSpan: typeof context !== 'string' ? context.lifespanCount : undefined,
      };
    });

    setListContext(list);

    return () => setListContext([]);
  }, [value]);

  const handleAddNew = () => {
    const newContext = createFreshContext();
    setListContext([...listContext, newContext]);
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
      {listContext && (
        <TransitionGroup className={classes.collection}>
          {listContext.map(({ id, name, lifeSpan }) => (
            <Collapse key={name}>
              <ContextComponent type={type} id={id} name={name} lifeSpan={lifeSpan} />
            </Collapse>
          ))}
        </TransitionGroup>
      )}
    </>
  );
};

export default Collection;
