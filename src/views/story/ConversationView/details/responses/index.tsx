import { Box, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useActions } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';

const Responses: FC = () => {
  const actions = useActions();
  const { t } = useTranslation();

  const addTextMessage = () => actions.intents.addTextMessage();
  const addVideoMessage = () => actions.intents.addVideoMessage();
  const addVideoTagMessage = () => actions.intents.addVideoTagMessage();

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Box display="flex" flexDirection="row" my={1.5}>
          <Button color="primary" onClick={addTextMessage} startIcon={<AddCircleOutlineIcon />}>
            {t('intents:addText')}
          </Button>
          <Button color="primary" onClick={addVideoMessage} startIcon={<AddCircleOutlineIcon />}>
            {t('intents:addVideo')}
          </Button>
          <Button color="primary" onClick={addVideoTagMessage} startIcon={<AddCircleOutlineIcon />}>
            {t('intents:addVideoTag')}
          </Button>
        </Box>
      </Box>
      <Collection />
    </Box>
  );
};

export default Responses;
