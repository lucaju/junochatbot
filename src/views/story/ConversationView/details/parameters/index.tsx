import { Box, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useActions } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';

const IntentParams: FC = () => {
  const actions = useActions();
  const { t } = useTranslation(['intents']);

  const addParameter = () => actions.intents.createParameter();

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Box display="flex" flexDirection="row" my={1.5}>
          <Button color="primary" onClick={addParameter} startIcon={<AddCircleOutlineIcon />}>
            {t('addParameter')}
          </Button>
        </Box>
      </Box>
      <Collection />
    </Box>
  );
};

export default IntentParams;
