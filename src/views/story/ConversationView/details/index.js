import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteDialog from 'src/components/DeleteDialog';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';
import Actions from './Actions';
import Extra from './Extra';

const useStyles = makeStyles(({ spacing, palette }) => ({
  header: {
    color: palette.primary.light,
    textAlign: 'center',
  },
  dialogContent: {
    // paddingRight: 0,
    // paddingLeft: 0,
    // marginBottom: spacing(1),
    // minHeight: 160,
    maxHeight: '70vh',
  },
  player: {
    marginTop: -spacing(2),
    marginBottom: -spacing(3),
    marginLeft: -spacing(3),
    marginRight: -spacing(3),
  },
  meta: {
    backgroundColor: palette.background.default,
    marginTop: -spacing(2),
    marginBottom: spacing(2),
    marginLeft: -spacing(3),
    marginRight: -spacing(3),
    paddingRight: spacing(3),
    paddingLeft: spacing(3),
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
  },
}));

const initialValues = {
  url: '',
  image: '',
  title: '',
  channelTitle: '',
  publishedAt: '',
  duration: '',
  description: '',
  tags: [],
};

const Details = ({ open, handleDetailClose, intent }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const { t } = useTranslation([
    'intents',
    'common',
    'errorMessages',
    'deleteDialog',
  ]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [intentData, setIntentData] = useState(initialValues);

  useEffect(() => {
    if (open && intent?.id) {
      const fetch = async () => {
        const selectedIntent = await actions.intents.getIntent(intent.id);
        setIntentData(selectedIntent);
      };
      fetch();
    }
    if (open && !intent?.id) setIntentData(initialValues);
    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    url: Yup.string().trim().required(t('common:required')),
    image: Yup.string(),
    title: Yup.string().max(255),
    channelTitle: Yup.string().max(255),
    publishedAt: Yup.string(),
    duration: Yup.string(),
    description: Yup.string(),
    tags: Yup.array(),
  });

  const handleClose = () => {
    setIntentData(initialValues);
    handleDetailClose();
    open = false;
  };

  // eslint-disable-next-line no-unused-vars
  const submit = async (values) => {
    //create update
    const response = values.id
      ? await actions.intents.updateIntent({ intentData, values })
      : actions.intents.createIntent(values);

    const type = response.errorMessage ? 'error' : 'success';

    //error
    if (response.errorMessage) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return response;
    }

    //success
    const message = values.id ? t('intentUpdated') : t('intentCreated');
    actions.ui.showNotification({ message, type });

    handleClose();
  };

  return (
    <Dialog
      aria-labelledby="intent-details-dialog"
      fullWidth
      maxWidth="sm"
      onBackdropClick={handleClose}
      onClose={handleDetailClose}
      open={open}
      scroll="body"
    >
      <Formik
        enableReinitialize={true}
        initialValues={intentData}
        onSubmit={async (values) => {await submit(values)}}
        validationSchema={formValidation}
      >
        {({
          errors,
          dirty,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <Box className={classes.meta}></Box>
              <Box>
                <Extra
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Actions
                dirty={dirty}
                handleCancel={handleClose}
                handleDelete={() => setDeleteDialogOpen(true)}
                intentData={intentData}
                isSubmitting={isSubmitting}
                values={values}
              />
            </DialogActions>
            <DeleteDialog
              handleNo={() => setDeleteDialogOpen(false)}
              handleYes={() => {
                setDeleteDialogOpen(false);
                values.submitType = 'delete';
                handleSubmit();
              }}
              isSubmitting={isSubmitting}
              message={t('deleteDialog:message', { object: t('intent') })}
              open={deleteDialogOpen}
              title={t('deleteDialog:title', { object: t('intent') })}
            />
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

Details.propTypes = {
  handleDetailClose: PropTypes.func,
  intent: PropTypes.object,
  open: PropTypes.bool,
};

export default Details;
