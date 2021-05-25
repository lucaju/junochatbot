import { Collapse, makeStyles } from '@material-ui/core';
import { Parameter as ParameterType } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import ParamsComponent from './ParamsComponent';

interface CollectionProps {
  paramsList: ParameterType[];
  handleUpdateParameters: (parameters: ParameterType[]) => void;
}

const useStyles = makeStyles(() => ({
  collection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Collection: FC<CollectionProps> = ({ paramsList, handleUpdateParameters }) => {
  const classes = useStyles();
  const [_paramsList, set_paramsList] = useState(paramsList);

  useEffect(() => {
    set_paramsList(paramsList);
    return () => {};
  }, [paramsList]);

  const handleRemove = (name: string) => {
    const updatedList = paramsList.filter((param) => param.name !== name);
    // set_paramsList(updatedList);
    handleUpdateParameters(updatedList);
  };

  const handleUpdate = (name: string, updatedParam: ParameterType) => {
    const updatedList = paramsList.map((param) => {
      if (param.name === name) return updatedParam;
      return param;
    });
    // set_paramsList(updatedList);
    handleUpdateParameters(updatedList);
  };

  return (
    <TransitionGroup className={classes.collection}>
      {_paramsList &&
        _paramsList.map((param) => (
          <Collapse key={param.name}>
            <ParamsComponent
              name={param.name}
              param={param}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
            />
          </Collapse>
        ))}
    </TransitionGroup>
  );
};

export default Collection;
