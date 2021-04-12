import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  makeStyles,
  Switch,
} from '@material-ui/core';
import { DateTime } from 'luxon';
import { useField, useFormikContext } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BottomBarProps {
  name: string;
  dirty: boolean;
  isSubmitting: boolean;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  bar: {
    paddingTop: spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
  buttonProgress: { position: 'absolute' },
  divider: {
    paddingLeft: spacing(2),
    paddingright: spacing(2),
  },
  marginLeft: { marginLeft: spacing(2) },
  textColor: {
    color:
      palette.type === 'light' ? palette.common.white : palette.common.black,
  },
}));

const BottomBar: FC<BottomBarProps> = ({ name, dirty, isSubmitting }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'storyGeneral']);
  const { submitForm } = useFormikContext();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
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
      <Divider className={classes.divider} />
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        className={classes.bar}
      >
        <FormControlLabel
          control={
            <Switch
              checked={publishedState}
              onChange={handleChangePublisehdState}
              name="publishedState"
              color="primary"
            />
          }
          label="Published"
        />
        <Box flexGrow={1} />
        <Button
          classes={{ containedPrimary: classes.textColor }}
          color="primary"
          disabled={isSubmitting || !dirty}
          onClick={submitForm}
          variant="contained"
          className={classes.marginLeft}
        >
          {t('save')}
          {isSubmitting && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </Box>
    </>
  );
};

export default BottomBar;
