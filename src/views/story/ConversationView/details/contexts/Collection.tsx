import { Box, Collapse, IconButton, makeStyles, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useApp } from '@src/overmind';
import { Context as ContextType } from '@src/types';
import { useField } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import ContextComponent, { ContextData } from './Context';

interface CollectionProps {
  type: 'input' | 'output';
  fieldName: string;
  setCrossContext: (name?: string) => void;
  crossContext?: string;
}

const useStyles = makeStyles(() => ({
  collection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  uppercase: { textTransform: 'uppercase' },
}));

const DEFAULT_LIFESPANCOUNT = 5;

const Collection: FC<CollectionProps> = ({
  type = 'input',
  fieldName,
  setCrossContext,
  crossContext,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['intents']);
  const [, meta, helpers] = useField(fieldName);
  const { value } = meta;
  const { setValue } = helpers;
  const [listContext, setListContext] = useState<ContextData[]>([] as ContextData[]);

  useEffect(() => {
    if (!value) return setListContext([] as ContextData[]);

    const list = value.map((context: string | ContextType) => {
      let data = { type } as Partial<ContextData>;
      if (typeof context === 'string') {
        data = { id: context, name: context, ...data };
      } else {
        data = { id: context.name, name: context.name, lifeSpan: context.lifespanCount, ...data };
      }
      return data;
    });

    setListContext(list);
    return () => {};
  }, [value]);

  useEffect(() => {
    if (!crossContext || type === 'input') return;
    handleAdd({ name: crossContext, lifeSpan: DEFAULT_LIFESPANCOUNT });
    setCrossContext();
  }, [crossContext]);

  const handleUpdate = ({ id, name, lifeSpan = -1 }: ContextData) => {
    const updateSource = value.map((context: string | ContextType) => {
      if (typeof context === 'string' && context === id) {
        return name;
      }
      if (typeof context !== 'string' && context.name === id) {
        context.name = name;
        context.lifespanCount = lifeSpan;
      }
      return context;
    });

    setValue(updateSource);
  };

  const handleAdd = ({ name, lifeSpan }: ContextData) => {
    const source = value ?? [];
    const updateSource =
      type === 'input' ? [...source, name] : [...source, { name, lifespanCount: lifeSpan }];

    setValue(updateSource);

    if (type === 'input') setCrossContext(name);
  };

  const handleRemove = (name: string) => {
    const updateSource = value.filter((context: string | ContextType) => {
      return typeof context === 'string' ? context !== name : context.name !== name;
    });

    setValue(updateSource);
  };

  const handleAddNew = () => {
    const lifeSpan = type === 'output' ? DEFAULT_LIFESPANCOUNT : undefined;

    setListContext([
      ...listContext,
      {
        type,
        id: 'new',
        name: `projects/${state.intents.currentProjectName}/agent/sessions/-/contexts/`,
        lifeSpan,
      },
    ]);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" my={1.5}>
        <Typography variant="h6" className={classes.uppercase}>
          {type}
        </Typography>
        <IconButton color="primary" onClick={handleAddNew}>
          <AddCircleOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
      {listContext && (
        <TransitionGroup className={classes.collection}>
          {listContext.map(({ id, name, lifeSpan }) => (
            <Collapse key={name}>
              <ContextComponent
                type={type}
                id={id}
                name={name}
                lifeSpan={lifeSpan}
                addContext={handleAdd}
                updateContext={handleUpdate}
                removeContex={handleRemove}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      )}
    </>
  );
};

export default Collection;
