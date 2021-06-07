import { makeStyles, TextField} from '@material-ui/core';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Intent } from '@src/types';

interface HeadersProps {
  action?: string;
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

const Header: FC<HeadersProps> = ({
  action,
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['intents']);

  return (
    <>
      {action === 'create' && t('createIntent')}
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
    </>
  );
};

export default Header;
