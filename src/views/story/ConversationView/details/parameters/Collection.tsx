import { Collapse } from '@material-ui/core';
import { Parameter as ParameterType } from '@src/types';
import React, { FC } from 'react';
import { TransitionGroup } from 'react-transition-group';
import ParamsComponent from './ParamsComponent';

interface CollectionProps {
  paramsList: ParameterType[];
}

const Collection: FC<CollectionProps> = ({ paramsList }) => {
  return (
    <TransitionGroup
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {paramsList &&
        paramsList.map((param) => (
          <Collapse key={param.name}>
            <ParamsComponent name={param.name} param={param} />
          </Collapse>
        ))}
    </TransitionGroup>
  );
};

export default Collection;
