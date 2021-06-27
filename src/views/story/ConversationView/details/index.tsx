import {
  Box,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Tab,
  Tabs,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DeleteDialog from '@src/components/DeleteDialog';
import { useActions } from '@src/overmind';
import { Intent, NotificationType } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import Actions from './Actions';
import Contexts from './contexts';
import Header from './Header';
import IntentParams from './parameters';
import Responses from './responses';
import Training from './training';

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

const Details: FC<DetailsProps> = ({ open, handleClose, intentId }) => {
  const actions = useActions();
  const { t } = useTranslation(['intents', 'common', 'errorMessages', 'deleteDialog']);
  const [action, setAction] = useState<string>();
  const [activeTab, setActiveTab] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (!intentId) return setAction('create');

    const fetch = async () => {
      const selectedIntent = await actions.intents.getIntent(intentId);
      if (isError(selectedIntent)) return handleClose();
      setAction('edit');
    };
    fetch();

    return () => {
      setAction(undefined);
      setActiveTab(0);
      setDeleteDialogOpen(false);
    };
  }, [open]);

  const submit = async () => {
    setIsSubmitting(true);
    //create update
    const response =
      action === 'create'
        ? await actions.intents.createIntent()
        : await actions.intents.updateIntent();

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    //error
    if (isError(response)) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return;
    }

    //success
    const message = action === 'create' ? t('intentCreated') : t('intentUpdated');
    actions.ui.showNotification({ message, type });

    // handleClose();
    if (action === 'create') setAction('edit');
    setIsSubmitting(false);
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
          maxWidth={action === 'create' ? 'sm' : 'md'}
          onBackdropClick={handleClose}
          onClose={handleClose}
          open={open}
          TransitionComponent={Transition}
        >
          <DialogTitle
            sx={{
              color: ({ palette }) => palette.primary.light,
              textAlign: 'center',
            }}
          >
            <Header action={action} />
          </DialogTitle>
          <Divider />
          {action === 'edit' && (
            <>
              <Grid container>
                <Grid item xs={2}>
                  <Box mt={1}>
                    <Tabs
                      centered
                      indicatorColor="primary"
                      onChange={(_event: ChangeEvent, newValue: number) => setActiveTab(newValue)}
                      orientation="vertical"
                      textColor="primary"
                      value={activeTab}
                    >
                      <Tab icon={<CenterFocusWeakIcon />} label="Contexts" />
                      <Tab icon={<FitnessCenterIcon />} label="Traning" />
                      <Tab icon={<EditAttributesIcon />} label="Parameters" />
                      <Tab icon={<ChatOutlinedIcon />} label="Responses" />
                    </Tabs>
                  </Box>
                </Grid>
                <Grid item xs>
                  <DialogContent sx={{ height: 600 }}>
                    <TransitionGroup>
                      <Collapse>
                        <Contexts activeTabIndex={activeTab} index={0} />
                        {/* <Training activeTabIndex={activeTab} index={1} />
                        <IntentParams  activeTabIndex={activeTab} index={2}/>
                        <Responses activeTabIndex={activeTab} index={3} /> */}
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
              handleCancel={handleClose}
              handleDelete={() => setDeleteDialogOpen(true)}
              isSubmitting={isSubmitting}
              handleSubmit={submit}
            />
          </DialogActions>
          <DeleteDialog
            handleNo={() => setDeleteDialogOpen(false)}
            handleYes={() => {
              setDeleteDialogOpen(false);
              // submitDelete()
            }}
            isSubmitting={isSubmitting}
            message={t('deleteDialog:message', { object: t('intent') })}
            open={deleteDialogOpen}
            title={t('deleteDialog:title', { object: t('intent') })}
          />
        </Dialog>
      )}
    </>
  );
};

export default Details;
