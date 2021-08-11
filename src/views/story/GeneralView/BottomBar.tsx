import { Box, Divider, FormControlLabel, Switch } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useField } from 'formik';
import { DateTime } from 'luxon';
import React, { FC } from 'react';
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
  const { t } = useTranslation();

  const [, metaPub, helpersPub] = useField(publishedField);
  const { value: published } = metaPub;
  const { setValue: setPublished } = helpersPub;

  const [, metaPubDate, helpersPubDate] = useField(publishedDateField);
  // const { value: publishedDate } = metaPubDate;
  const { setValue: setPublishedDate } = helpersPubDate;

  const handleChangePublisehdState = () => {
    const newValue = !published;
    const publishDate = newValue === true ? DateTime.now().toISO() : null;

    setPublished(newValue);
    setPublishedDate(publishDate);
  };

  return (
    <>
      <Divider sx={{ mt: 1, px: 2 }} />
      <Box alignItems="center" display="flex" flexDirection="row" pt={2} px={2}>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={published}
              name="published"
              onChange={handleChangePublisehdState}
            />
          }
          label={t('common:published')}
          sx={{ textTransform: 'capitalize' }}
        />
        <Box flexGrow={1} />
        <LoadingButton
          color="primary"
          disabled={!dirty}
          loading={isSubmitting}
          sx={{ ml: 2 }}
          variant="contained"
          type="submit"
        >
          {t('common:save')}
        </LoadingButton>
      </Box>
    </>
  );
};

export default BottomBar;
