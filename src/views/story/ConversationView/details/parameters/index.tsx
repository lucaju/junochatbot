import { Box, makeStyles } from '@material-ui/core';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Intent } from '@src/types';

interface ParametersProps {
  errors: FormikErrors<Partial<Intent>>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<Partial<Intent>>;
  values: Partial<Intent>;
}

const useStyles = makeStyles(() => ({
  paperTab: {
    flexGrow: 1,
  },
}));

const Parameters: FC<ParametersProps> = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();
  const { t } = useTranslation(['users']);

  return <>Parameters</>;
};

export default Parameters;
