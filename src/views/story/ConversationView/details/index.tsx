import {
  Box,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  Slide,
  Tabs,
  Tab,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
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
import { TransitionGroup } from 'react-transition-group';

import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  dialogContent: { height: 600 },
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
  const [action, setAction] = useState<string>();
  const [activeTab, setActiveTab] = useState(0);
  const [intentData, setintentData] = useState(initialValues);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (!intentId) {
      setAction('create');
      setintentData(initialValues);
      return;
    }

    const fetch = async () => {
      const selectedIntent = await actions.intents.getIntent(intentId);
      if (!isError(selectedIntent)) {
        setintentData(selectedIntent);
        setAction('edit');
      }
    };
    fetch();

    return () => {
      setAction(undefined);
      setActiveTab(0);
      setintentData(initialValues);
      setDeleteDialogOpen(false);
    };
  }, [open]);

  const formValidation = Yup.object().shape({
    displayName: Yup.string().max(120).trim().required(t('common:required')),
    inputContextNames: Yup.array(),
    trainingPhrases: Yup.array(),
    outputContexts: Yup.array(),
    parameters: Yup.array(),
    messages: Yup.array(),
  });

  const submit = async (values: Partial<Intent>) => {
    const response = await actions.intents.createIntent(values as Partial<Intent>);

    //create update
    // const response = action === 'create'
    //   ? await actions.intents.createIntent(values as Partial<Intent>)
    //   : await actions.intents.updateIntent({ intentData, values });

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    //error
    if (isError(response)) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return;
    }

    //success
    const message = values.name ? t('intentUpdated') : t('intentCreated');
    actions.ui.showNotification({ message, type });

    handleClose();
  };

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
    <>
      {action && (
        <Dialog
          aria-labelledby="intent-details-dialog"
          fullWidth
          TransitionComponent={Transition}
          maxWidth={action === 'create' ? 'sm' : 'md'}
          onBackdropClick={handleClose}
          onClose={handleClose}
          open={open}
        >
          <Formik
            enableReinitialize={true}
            initialValues={intentData}
            onSubmit={async (values) => {
              console.log(values);
              await submit(values);
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
                    action={action}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                    values={values}
                  />
                </DialogTitle>
                <Divider />
                {action === 'edit' && (
                  <>
                    <Grid container>
                      <Grid item xs={2}>
                        <Box mt={1}>
                          <Tabs
                            orientation="vertical"
                            value={activeTab}
                            onChange={(_event: ChangeEvent<{}>, newValue: number) =>
                              setActiveTab(newValue)
                            }
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                          >
                            <Tab icon={<CenterFocusWeakIcon />} label="Contexts" />
                            <Tab icon={<FitnessCenterIcon />} label="Traning" />
                            <Tab icon={<EditAttributesIcon />} label="Parameters" />
                            <Tab icon={<ChatOutlinedIcon />} label="Responses" />
                          </Tabs>
                        </Box>
                      </Grid>
                      <Grid item xs>
                        <DialogContent className={classes.dialogContent}>
                          <TransitionGroup>
                            <Collapse>
                              <Contexts index={0} activeTabIndex={activeTab} />
                              <Training
                                index={1}
                                activeTabIndex={activeTab}
                                fieldName="trainingPhrases"
                              />
                              <IntentParams
                                index={2}
                                activeTabIndex={activeTab}
                                fieldName="parameters"
                              />
                              <Responses
                                index={3}
                                activeTabIndex={activeTab}
                                fieldName="messages"
                              />
                            </Collapse>
                          </TransitionGroup>
                        </DialogContent>
                      </Grid>
                    </Grid>
                  </>
                )}
                <Divider />
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
        </Dialog>
      )}
    </>
  );
};

export default Details;
