import { Box, Button, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Parameter } from '@src/types';
import { useField } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';
import useParameter from './hooks';

interface IntentParamsProps {
  activeTabIndex: number;
  fieldName: string;
  index: number;
}

const IntentParams: FC<IntentParamsProps> = ({ activeTabIndex, fieldName, index }) => {
  const { t } = useTranslation(['intents']);
  const { createFreshParameter } = useParameter();

  const [, meta] = useField(fieldName);
  const { value } = meta;

  const [paramsList, setParamsList] = useState<Parameter[]>([] as Parameter[]);

  useEffect(() => {
    setParamsList(value);
    return () => {};
  }, [value]);

  const addParameter = () => {
    if (paramsList && unusedLastSlot()) return;
    let newList = paramsList ? paramsList : [];
    const freshParam = createFreshParameter();
    setParamsList([...newList, freshParam]);
  };

  const unusedLastSlot = () => {
    if (!paramsList) return true;
    if (paramsList.length === 0) return false;
    const last = paramsList[paramsList.length - 1];
    if (last.displayName === '') return true;
    return false;
  };

  return (
    <Box role="tabpanel" hidden={activeTabIndex !== index}>
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
          {t('parameters')}
        </Typography>
        <Box display="flex" flexDirection="row" my={1.5}>
          <Button color="primary" onClick={addParameter} startIcon={<AddCircleOutlineIcon />}>
            {t('addParameter')}
          </Button>
        </Box>
      </Box>
      <Collection paramsList={paramsList} />
    </Box>
  );
};

export default IntentParams;
