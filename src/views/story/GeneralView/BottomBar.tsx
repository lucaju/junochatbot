import {
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BottomBarProps {
  name: string;
  dirty: boolean;
  isSubmitting: boolean;
  submitSuccess: boolean | undefined;
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

const BottomBar: FC<BottomBarProps> = ({
  name,
  dirty,
  isSubmitting,
  submitSuccess,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'storyGeneral']);
  const { submitForm } = useFormikContext();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  const [status, setStatus] = useState(false);
  const [buttonClicked, setButtonClicked] = useState<string | undefined>();

  useEffect(() => {
    setStatus(value);
    return () => {};
  }, []);

  useEffect(() => {
    if (submitSuccess) setStatus(value);
  }, [submitSuccess]);

  const handleSubmit = async (source: string) => {
    const typeValue = source === 'publish' ? true : false;
    setValue(typeValue);
    setButtonClicked(source);
    await submitForm();
    setButtonClicked(undefined);
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
        <Box flexGrow={1} />
        <Button
          color="primary"
          disabled={isSubmitting || !dirty}
          onClick={() => handleSubmit('draft')}
          variant={status ? 'text' : 'outlined'}
        >
          {status
            ? t('storyGeneral:switchToDraft')
            : t('storyGeneral:saveDraft')}
          {isSubmitting && buttonClicked === 'draft' && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>

        <Button
          classes={{ containedPrimary: classes.textColor }}
          color="primary"
          disabled={isSubmitting || !dirty}
          onClick={() => handleSubmit('publish')}
          variant="contained"
          className={classes.marginLeft}
        >
          {status ? t('update') : t('publish')}
          {isSubmitting && buttonClicked === 'publish' && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </Box>
    </>
  );
};

export default BottomBar;
