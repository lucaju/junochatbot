import { Box, Divider, FormControlLabel, Switch } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useField, useFormikContext } from 'formik';
import { DateTime } from 'luxon';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BottomBarProps {
  dirty: boolean;
  isSubmitting: boolean;
  publishedField: string;
  publishedDateField: string;
}

const BottomBar: FC<BottomBarProps> = ({
  dirty,
  isSubmitting,
  publishedField,
  publishedDateField,
}) => {
  const { t } = useTranslation(['common', 'storyGeneral']);
  const { submitForm } = useFormikContext();

  const [, metaPub, helpersPub] = useField(publishedField);
  const { value: published } = metaPub;
  const { setValue: setPublished } = helpersPub;

  const [, metaPubDate, helpersPubDate] = useField(publishedDateField);
  const { value: publishedDate } = metaPubDate;
  const { setValue: setPublishedDate } = helpersPubDate;

  const [publishedState, setPublishedState] = useState(published === 1 ? true : false);

  const handleChangePublisehdState = () => {
    const newValue = !publishedState;
    const pDate = newValue === true ? DateTime.now().toISO() : null;

    setPublished(newValue ? 1 : 0);
    setPublishedDate(pDate);
    setPublishedState(newValue);
  };

  return (
    <>
      <Divider sx={{ mt: 1, px: 2 }} />
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
          sx={{ ml: 2 }}
          variant="contained"
        >
          {t('save')}
        </LoadingButton>
      </Box>
    </>
  );
};

export default BottomBar;
