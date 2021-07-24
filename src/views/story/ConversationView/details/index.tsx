import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import ConfirmationDialog from '@src/components/ConfirmationDialog';
import { useActions, useAppState } from '@src/overmind';
import { NotificationType } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { intents } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['intents', 'common', 'errorMessages', 'confirmationDialog']);

  const [action, setAction] = useState<string>();
  const [activeTab, setActiveTab] = useState('context');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
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
      setActiveTab('context');
      setDeleteDialogOpen(false);
    };
  }, [open]);

  const changeTab = async (value: string) => {
    await submit(); //autosave
    setActiveTab(value);
  };

  const submit = async () => {
    setIsSubmitting(true);
    //create update
    const response =
      action === 'create'
        ? await actions.intents.createIntent()
        : await actions.intents.updateIntent(intents.currentIntent);

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    //error
    if (isError(response)) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      setIsSubmitting(false);
      return;
    }

    //success
    const message = action === 'create' ? t('intentCreated') : t('intentUpdated');
    actions.ui.showNotification({ message, type });

    setIsSubmitting(false);

    if (action === 'create') return setAction('edit');
  };

  const submitDelete = async () => {
    const response = await actions.intents.deleteIntent(intents.currentIntent?.name);

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;
    const message = isError(response) ? t('errorMessages:somethingWentWrong') : t('intentDeleted');

    actions.ui.showNotification({ message, type });
    handleClose();
  };

  return (
    <>
      {action && (
        <Dialog
          aria-labelledby="intent-details-dialog"
          fullWidth
          keepMounted
          maxWidth={action === 'create' ? 'sm' : 'md'}
          open={open}
          TransitionComponent={Transition}
        >
          <DialogTitle
            sx={{
              color: ({ palette }) => palette.primary.light,
              textAlign: 'center',
            }}
          >
            <Header action={action} activeTab={activeTab} changeTab={changeTab} />
          </DialogTitle>
          <Divider />
          {action === 'edit' && (
            <DialogContent sx={{ height: 600 }}>
              {activeTab === 'context' && <Contexts />}
              {activeTab === 'training' && <Training />}
              {activeTab === 'parameters' && <IntentParams />}
              {activeTab === 'responses' && <Responses />}
            </DialogContent>
          )}
          <Divider />
          <DialogActions>
            <Actions
              // handleCancel={handleClose}
              handleCancel={() => setCancelDialogOpen(true)}
              handleDelete={() => setDeleteDialogOpen(true)}
              isSubmitting={isSubmitting}
              handleSubmit={submit}
            />
          </DialogActions>
          <ConfirmationDialog
            handleNo={() => setDeleteDialogOpen(false)}
            handleYes={() => {
              setDeleteDialogOpen(false);
              submitDelete();
            }}
            isSubmitting={isSubmitting}
            message={t('confirmationDialog:deleteMessage', { object: t('intent') })}
            open={deleteDialogOpen}
            title={t('intent')}
          />
          <ConfirmationDialog
            handleNo={() => setCancelDialogOpen(false)}
            handleYes={() => {
              setCancelDialogOpen(false);
              handleClose();
            }}
            message={t('confirmationDialog:cancelMessage', { object: t('intent') })}
            open={cancelDialogOpen}
          />
        </Dialog>
      )}
    </>
  );
};

export default Details;
