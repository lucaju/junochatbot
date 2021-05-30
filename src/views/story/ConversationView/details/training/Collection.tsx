import { Collapse, makeStyles } from '@material-ui/core';
import { TrainingPhrase } from '@src/types';
import React, { FC } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Phrase from './Phrase';

interface CollectionProps {
  phraseList: TrainingPhrase[];
}

const useStyles = makeStyles(() => ({
  collection: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Collection: FC<CollectionProps> = ({ phraseList }) => {
  const classes = useStyles();

  return (
    <TransitionGroup className={classes.collection}>
      {phraseList.map(({ name, type, parts, timesAddedCount }) => (
        <Collapse key={name}>
          <Phrase
            key={name}
            name={name}
            type={type}
            parts={parts}
            timesAddedCount={timesAddedCount}
          />
        </Collapse>
      ))}
    </TransitionGroup>
  );
};

export default Collection;
