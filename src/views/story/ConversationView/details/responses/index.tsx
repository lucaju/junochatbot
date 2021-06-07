import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Message as MessageType, Text, Payload } from '@src/types';
import { useField } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';

interface ResponsesProps {
  index: number;
  activeTabIndex: number;
  fieldName: string;
}

const useStyles = makeStyles(() => ({
  uppercase: { textTransform: 'uppercase' },
}));

const Responses: FC<ResponsesProps> = ({ index, activeTabIndex, fieldName }) => {
  const classes = useStyles();
  const { t } = useTranslation(['intents']);
  const [, meta, helpers] = useField(fieldName);
  const { value } = meta;
  const { setValue } = helpers;
  const [messageList, setMessageList] = useState<MessageType[]>([] as MessageType[]);

  useEffect(() => {
    setMessageList(value);
    return () => {};
  }, [value]);

  const addTextMessage = () => {
    if (unusedLastSlot()) return;
    const freshTextMessage: Text = { text: { text: [''] } };
    setMessageList([...messageList, freshTextMessage]);
  };

  const addVideoMessage = () => {
    if (unusedLastSlot()) return;
    const freshPayloadtMessage: Payload = { payload: { type: 'tag', source: [-1] } };
    setMessageList([...messageList, freshPayloadtMessage]);
  };

  const unusedLastSlot = () => {
    if (messageList.length === 0) return false;
    const last = messageList[messageList.length - 1];
    if ('text' in last && last.text.text?.[0] === '') return true;
    if ('payload' in last && last.payload.source[0] === -1) return true;
    return false;
  };

  return (
    <Box
      role="tabpanel"
      hidden={activeTabIndex !== index}
    >
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Typography variant="h6" className={classes.uppercase}>
          {t('responses')}
        </Typography>
        <Box display="flex" flexDirection="row" my={1.5}>
          <Button color="primary" startIcon={<AddCircleOutlineIcon />} onClick={addTextMessage}>
            {t('addText')}
          </Button>
          <Button color="primary" startIcon={<AddCircleOutlineIcon />} onClick={addVideoMessage}>
            {t('addVideo')}
          </Button>
        </Box>
      </Box>
      <Collection messageList={messageList} />
    </Box>
  );
};

export default Responses;
