import { Box, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useActions, useAppState } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';

const Training: FC = () => {
  const { intents } = useAppState();
  const actions = useActions();
  const { t } = useTranslation();

  const addNewPhrase = () => actions.intents.createPhrase();

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Button color="primary" onClick={addNewPhrase} startIcon={<AddCircleOutlineIcon />}>
          {t('intents:addPhrase')}
        </Button>
        <Typography gutterBottom variant="caption">
          {intents.currentIntent?.isFallback
            ? t('intents:trainingFallbackExplainer')
            : t('intents:trainingExplainer')}
        </Typography>
      </Box>
      <Collection />
    </Box>
  );
};

export default Training;
