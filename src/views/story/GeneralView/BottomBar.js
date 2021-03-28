import {
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({spacing, palette }) => ({
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
  textColor: { color: palette.type === 'light' && palette.common.white },
}));

const BottomBar = ({
  dirty,
  handleDelete,
  isSubmitting,
  name,
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
  const [pushedButton, setPushedButton] = useState(null);

  useEffect(() => {
    setStatus(value);
    return () => {};
  }, []);

  useEffect(() => {
    if (submitSuccess) setStatus(value);
  }, [submitSuccess]);

  const handleSubmit = async (type) => {
    setPushedButton(type);
    if (type === 'draft') setValue(false);
    if (type === 'publish') setValue(true);
    await submitForm();
    setPushedButton(null);
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
        {/* <Button color="default" disabled={isSubmitting} onClick={handleDelete}>
          Delete Story
        </Button> */}
        <Box flexGrow={1} />
        <Button
          color="primary"
          disabled={isSubmitting || !dirty}
          onClick={() => handleSubmit('draft')}
          variant={status ? 'text' : 'outlined'}
        >
          {status ? t('storyGeneral:switchToDraft') : t('storyGeneral:saveDraft')}
          {isSubmitting && pushedButton === 'draft' && (
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
          {isSubmitting && pushedButton === 'publish' && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </Box>
    </>
  );
};

BottomBar.propTypes = {
  dirty: PropTypes.bool,
  handleDelete: PropTypes.func,
  isSubmitting: PropTypes.bool,
  name: PropTypes.string,
  submitSuccess: PropTypes.bool,
};

export default BottomBar;
