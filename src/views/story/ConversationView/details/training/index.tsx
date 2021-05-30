import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TrainingPhrase } from '@src/types';
import { useField } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';
import useTrainingPhrases from './hooks';

interface TrainingProps {
  fieldName: string;
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const Training: FC<TrainingProps> = ({ fieldName }) => {
  const classes = useStyles();
  const { t } = useTranslation(['intents']);
  const [, meta] = useField(fieldName);
  const { value }: { value: TrainingPhrase[] } = meta;
  const { createNewPhrase } = useTrainingPhrases();
  const [training, setTraining] = useState<TrainingPhrase[]>([]);

  useEffect(() => {
    setTraining(value);
    return () => {};
  }, [value]);

  const addNewPhrase = () => {
    const freshPhrase = createNewPhrase();
    setTraining([freshPhrase, ...value]);
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Typography variant="caption" gutterBottom>
          Phrases you can expect from user, that will trigger the intent.
        </Typography>
        <Button color="primary" onClick={addNewPhrase} startIcon={<AddCircleOutlineIcon />}>
          {t('addPhrase')}
        </Button>
      </Box>
      <Collection phraseList={training} />
    </Box>
  );
};

export default Training;
