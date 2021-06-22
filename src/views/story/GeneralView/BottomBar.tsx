import { Box, Divider, FormControlLabel, Switch } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useField, useFormikContext } from 'formik';
import { DateTime } from 'luxon';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BottomBarProps {
  dirty: boolean;
  isSubmitting: boolean;
  name: string;
}

const BottomBar: FC<BottomBarProps> = ({ name, dirty, isSubmitting }) => {
  const { t } = useTranslation(['common', 'storyGeneral']);
  const { submitForm } = useFormikContext();
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const [publishedState, setPublishedState] = useState(value ? true : false);

  const handleChangePublisehdState = () => {
    const newValue = !publishedState;
    const pDate = newValue === true ? DateTime.now().toISO() : null;
    setValue(pDate);
    setPublishedState(newValue);
  };

  return (
    <>
      <Divider sx={{ px: 2 }} />
      <Box alignItems="center" display="flex" flexDirection="row" pt={2} px={2}>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={publishedState}
              name="publishedState"
              onChange={handleChangePublisehdState}
            />
          }
          label="Published"
        />
        <Box flexGrow={1} />
        <LoadingButton
          color="primary"
          disabled={!dirty}
          loading={isSubmitting}
          onClick={submitForm}
          sx={{
            ml: 2,
            color: ({ palette }) =>
              dirty
                ? 'inherent'
                : palette.mode === 'light'
                ? `${palette.grey[400]} !important`
                : `${palette.grey[500]} !important`,
          }}
          variant="contained"
        >
          {t('save')}
        </LoadingButton>
      </Box>
    </>
  );
};

export default BottomBar;
