import { Collapse, makeStyles } from '@material-ui/core';
import { Parameter as ParameterType } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import ParamsComponent from './ParamsComponent';

interface CollectionProps {
  paramsList: ParameterType[];
}

const useStyles = makeStyles(() => ({
  collection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Collection: FC<CollectionProps> = ({ paramsList }) => {
  const classes = useStyles();
  const [_paramsList, set_paramsList] = useState(paramsList);

  useEffect(() => {
    set_paramsList(paramsList);
    return () => {};
  }, [paramsList]);

  return (
    <TransitionGroup className={classes.collection}>
      {_paramsList &&
        _paramsList.map((param) => (
          <Collapse key={param.name}>
            <ParamsComponent name={param.name} param={param} />
          </Collapse>
        ))}
    </TransitionGroup>
  );
};

export default Collection;