import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteDialog from '@src/components/DeleteDialog';
import { useApp } from '@src/overmind';
import * as Yup from 'yup';
import Actions from './Actions';
import { NotificationType, Intent } from '@src/types';
import { isError } from '@src/util/utilities';
import Header from './Header';
import Contexts from './contexts';
import Training from './training';
import IntentParams from './parameters';
import Responses from './responses';

interface DetailsProps {
  open: boolean;
  handleClose: () => void;
  intentId?: string;
}

const useStyles = makeStyles(({ palette }) => ({
  header: {
    color: palette.primary.light,
    textAlign: 'center',
  },
  dialogContent: { maxHeight: '70vh' },
}));

const initialValues: Partial<Intent> = {
  name: '',
  displayName: '',
  inputContextNames: [],
  trainingPhrases: [],
  outputContexts: [],
  parameters: [],
  messages: [],
};

const Details: FC<DetailsProps> = ({ open, handleClose, intentId }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const { t } = useTranslation(['intents', 'common', 'errorMessages', 'deleteDialog']);
  const [activeTab, setActiveTab] = useState(0);
  const [intentData, setintentData] = useState(initialValues);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (!intentId) {
      setintentData(initialValues);
      return;
    }

    const fetch = async () => {
      const selectedIntent = await actions.intents.getIntent(intentId);
      // console.log(selectedIntent);
      if (!isError(selectedIntent)) {
        setintentData(selectedIntent);
      }
    };
    fetch();

    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    displayName: Yup.string().max(120).trim().required(t('common:required')),
    inputContextNames: Yup.array(),
    trainingPhrases: Yup.array(),
    outputContexts: Yup.array(),
    parameters: Yup.array(),
    messages: Yup.array(),
  });

  // const submit = async (values: Partial<Intent>) => {
  //   //create update
  //   const response = !values.name
  //     ? await actions.intents.createIntent(values as Partial<Intent>)
  //     : await actions.intents.updateIntent({ intentData, values });

  //   const type = isError(response)
  //     ? NotificationType.ERROR
  //     : NotificationType.SUCCESS;

  //   //error
  //   if (isError(response)) {
  //     const message = t('errorMessages:somethingWentWrong');
  //     actions.ui.showNotification({ message, type });
  //     return;
  //   }

  //   //success
  //   const message = values.name ? t('intentUpdated') : t('intentCreated');
  //   actions.ui.showNotification({ message, type });

  //   handleClose();
  // };

  // const submitDelete = async () => {
  //   if (!intentData.name) return;
  //   const response = await actions.intents.deleteIntent(intentData.name);

  //   const type = isError(response)
  //     ? NotificationType.ERROR
  //     : NotificationType.SUCCESS;

  //   const message = isError(response)
  //     ? t('errorMessages:somethingWentWrong')
  //     : t('intentDeleted');

  //   actions.ui.showNotification({ message, type });

  //   handleClose();
  // };

  return (
    <Dialog
      aria-labelledby="intent-details-dialog"
      fullWidth
      maxWidth="md"
      onBackdropClick={handleClose}
      onClose={handleClose}
      open={open}
    >
      {!intentId ? (
        <>
          <DialogTitle className={classes.header}>{t('createIntent')}</DialogTitle>
        </>
      ) : (
        <Formik
          enableReinitialize={true}
          initialValues={intentData}
          onSubmit={async (values) => {
            // console.log(values);
            // await submit(values)
          }}
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
              <DialogTitle className={classes.header}>
                <Header
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                  handleChangeTab={setActiveTab}
                  activeTab={activeTab}
                />
              </DialogTitle>
              <DialogContent dividers className={classes.dialogContent}>
                {activeTab === 0 ? (
                  <Contexts
                    inputContextField="inputContextNames"
                    outputContextField="outputContexts"
                  />
                ) : activeTab === 1 ? (
                  <Training fieldName="trainingPhrases" />
                ) : activeTab === 2 ? (
                  <IntentParams fieldName="parameters" />
                ) : (
                  <Responses fieldName="messages" />
                )}
              </DialogContent>
              <DialogActions>
                <Actions
                  dirty={dirty}
                  handleCancel={handleClose}
                  handleDelete={() => setDeleteDialogOpen(true)}
                  isSubmitting={isSubmitting}
                  values={values}
                />
              </DialogActions>
              <DeleteDialog
                open={deleteDialogOpen}
                title={t('deleteDialog:title', { object: t('intent') })}
                message={t('deleteDialog:message', { object: t('intent') })}
                handleNo={() => setDeleteDialogOpen(false)}
                handleYes={() => {
                  setDeleteDialogOpen(false);
                  // submitDelete()
                }}
                isSubmitting={isSubmitting}
              />
            </form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

export default Details;
