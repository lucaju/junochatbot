import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useField } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { TrainingPhrase } from '@src/types';
import Phrase from './Phrase';

interface TrainingProps {
  fieldName: string;
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const Training: FC<TrainingProps> = ({ fieldName }) => {
  const classes = useStyles();
  const { t } = useTranslation(['intents']);
  const [field, meta, helpers] = useField(fieldName);
  const { value }: { value: TrainingPhrase[] } = meta;
  const { setValue } = helpers;
  const [training, setTraining] = useState<TrainingPhrase[] | undefined>(value);

  useEffect(() => {
    setTraining(value);
    return () => {};
  }, [value]);

  // console.log(training);

  const handleChange = (updatedPhrase: TrainingPhrase) => {
    let updateTrainingPhrases = value;

    // console.log(updatedPhrase);
    if (updatedPhrase.name?.startsWith('new-')) {
      (updatedPhrase.name = `added-${uuidv4()}`), //? Handle this (remove) on ACTIONS when submit, befeore send to DialogFLow
        (updateTrainingPhrases = [updatedPhrase, ...value]);
    } else {
      updateTrainingPhrases = value.map((phrase) => {
        if (phrase.name === updatedPhrase.name) return updatedPhrase;
        return phrase;
      });
    }

    // console.log(updateTrainingPhrases);
    setValue(updateTrainingPhrases);
  };

  const handleDelete = (name?: string) => {
    if (!name) return;
    const updateTrainingPhrases = value.filter((phrase) => phrase.name !== name);
    setValue(updateTrainingPhrases);
  };

  const addFreshPhrase = () => {
    const freshPhrase = {
      name: `new-${uuidv4()}`,
      type: 'EXAMPLE',
      parts: [],
    };
    setTraining([freshPhrase, ...value]);
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Typography variant="caption" gutterBottom>
          Phrases you can expect from user, that will trigger the intent.
        </Typography>
        <Button color="primary" onClick={addFreshPhrase} startIcon={<AddCircleOutlineIcon />}>
          {t('addPhrase')}
        </Button>
      </Box>
      {training && (
        <Box>
          {training.map(({ name, type, parts, timesAddedCount }) => (
            <Phrase
              key={name}
              name={name}
              type={type}
              parts={parts}
              timesAddedCount={timesAddedCount}
              handleDelete={handleDelete}
              handleChange={handleChange}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Training;
