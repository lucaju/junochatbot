import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Parameter } from '@src/types';
import { useField } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import Collection from './Collection';

interface IntentParamsProps {
  fieldName: string;
}

const useStyles = makeStyles(() => ({
  uppercase: { textTransform: 'uppercase' },
}));

const IntentParams: FC<IntentParamsProps> = ({ fieldName }) => {
  const classes = useStyles();
  const { t } = useTranslation(['intents']);

  const [, meta, helpers] = useField(fieldName);
  const { value } = meta;
  const { setValue } = helpers;

  const [paramsList, setParamsList] = useState<Parameter[]>([] as Parameter[]);

  useEffect(() => {
    setParamsList(value);
    return () => {};
  }, [value]);

  const addParameter = () => {
    if (paramsList && unusedLastSlot()) return;
    let newList = paramsList ? paramsList : [];
    const freshParams: Parameter = { name: `added-${uuidv4()}`, displayName: '' };
    setParamsList([...newList, freshParams]);
  };

  const unusedLastSlot = () => {
    if (!paramsList) return true;
    if (paramsList.length === 0) return false;
    const last = paramsList[paramsList.length - 1];
    if (last.displayName === '') return true;
    return false;
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Typography variant="h6" className={classes.uppercase}>
          {t('parameters')}
        </Typography>
        <Box display="flex" flexDirection="row" my={1.5}>
          <Button color="primary" startIcon={<AddCircleOutlineIcon />} onClick={addParameter}>
            {t('addParameter')}
          </Button>
        </Box>
      </Box>
      <Collection paramsList={paramsList} />
    </Box>
  );
};

export default IntentParams;
