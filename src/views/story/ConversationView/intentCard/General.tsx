import { Box, Chip, Typography } from '@material-ui/core';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import type { TrainingPhrase } from '@src/types';
import React, { FC } from 'react';

interface GeneralProps {
  displayName: string;
  trainingPhrases?: TrainingPhrase[];
}

const General: FC<GeneralProps> = ({ displayName, trainingPhrases }) => {
  const training = trainingPhrases ? trainingPhrases.length : 0;

  return (
    <Box display="flex" flexDirection="row">
      <Typography variant="h6">{displayName}</Typography>
      <Chip
        color={training < 10 ? 'secondary' : 'default'}
        icon={<FitnessCenterIcon />}
        label={training}
        size="small"
        sx={{ ml: 1, mt: 0.5 }}
        variant="outlined"
      />
    </Box>
  );
};

export default General;
