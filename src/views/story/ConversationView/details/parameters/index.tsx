import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button } from '@mui/material';
import { useActions } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';

const IntentParams: FC = () => {
  const actions = useActions();
  const { t } = useTranslation();

  const addParameter = () => actions.intents.createParameter();

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Box display="flex" flexDirection="row" my={1.5}>
          <Button color="primary" onClick={addParameter} startIcon={<AddCircleOutlineIcon />}>
            {t('intents:addParameter')}
          </Button>
        </Box>
      </Box>
      <Collection />
    </Box>
  );
};

export default IntentParams;
