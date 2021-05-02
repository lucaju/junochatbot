import { Box, makeStyles, TextField, Tabs, Tab } from '@material-ui/core';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import NfcRoundedIcon from '@material-ui/icons/NfcRounded';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Intent } from '../../../../types';

interface HeadersProps {
  errors: FormikErrors<Partial<Intent>>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<Partial<Intent>>;
  values: Partial<Intent>;
  handleChangeTab: (value: number) => void;
  activeTab?: number;
}

const useStyles = makeStyles(() => ({
  paperTab: {
    flexGrow: 1,
  },
}));

const Header: FC<HeadersProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
  activeTab = 0,
  handleChangeTab,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['users']);

  return (
    <>
      <TextField
        error={Boolean(touched.displayName && errors.displayName)}
        fullWidth
        helperText={touched.displayName && errors.displayName}
        label={t('name')}
        name="displayName"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.displayName}
      />
      <Box className={classes.paperTab} mt={1}>
        <Tabs
          value={activeTab}
          onChange={(e: ChangeEvent<{}>, newValue: number) => handleChangeTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab icon={<CenterFocusWeakIcon />} label="Contexts" />
          <Tab icon={<FitnessCenterIcon />} label="Traning" />
          <Tab icon={<NfcRoundedIcon />} label="Parameters" />
          <Tab icon={<QuestionAnswerIcon />} label="Responses" />
        </Tabs>
      </Box>
    </>
  );
};

export default Header;
