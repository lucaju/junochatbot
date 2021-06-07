import { Badge, Box, Chip, makeStyles, Typography } from '@material-ui/core';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import type { TrainingPhrase } from '@src/types';
import React, { FC } from 'react';

interface GeneralProps {
  displayName: string;
  trainingPhrases?: TrainingPhrase[];
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  chip: {
    marginLeft: spacing(1),
    marginTop: spacing(0.5),
  },
}));

const General: FC<GeneralProps> = ({ displayName, trainingPhrases }) => {
  const classes = useStyles();

  const training = trainingPhrases ? trainingPhrases.length : 0;

  return (
    <Box display="flex" flexDirection="row">
      <Typography variant="h6">{displayName}</Typography>
      <Chip
        className={classes.chip}
        color={training < 10 ? 'secondary' : 'default'}
        icon={<FitnessCenterIcon />}
        label={training}
        size="small"
        // variant={training < 10 ? 'default' : 'outlined'}
        variant="outlined"
      />
      {/* <Badge badgeContent={trainingPhrases ? trainingPhrases.length : 0} showZero>
        <FitnessCenterIcon fontSize="small" />
      </Badge> */}
      {/* <Box display="flex" flexDirection="row" ml={2} pt={0.25}>
        <FitnessCenterIcon fontSize="small" />
        <Typography variant="body2">{trainingPhrases ? trainingPhrases.length : 0}</Typography>
      </Box> */}
    </Box>
  );
};

export default General;
