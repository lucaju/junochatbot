import { Box, Button, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useActions, useAppState } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';

const Training: FC = () => {
  const { intents } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['intents']);

  const addNewPhrase = () => actions.intents.createPhrase();

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Typography gutterBottom variant="caption">
          {intents.currentIntent?.isFallback
            ? t('trainingFallbackExplainer')
            : t('trainingExplainer')}
        </Typography>
        <Button color="primary" onClick={addNewPhrase} startIcon={<AddCircleOutlineIcon />}>
          {t('addPhrase')}
        </Button>
      </Box>
      <Collection />
    </Box>
  );
};

export default Training;
