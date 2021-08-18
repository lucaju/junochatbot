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
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
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
  const { t } = useTranslation();

  const [action, setAction] = useState<string>();
  const [activeTab, setActiveTab] = useState('training');
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
      setActiveTab('training');
      setDeleteDialogOpen(false);
    };
  }, [open]);

  const changeTab = async (value: string) => {
    await autoSave();
    setActiveTab(value);
  };

  const autoSave = async () => {
    if (intents.currentIntent?.hasChanged) {
      await submit();
      actions.intents.setIntentHaChange(false);
    }
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
      const message = t('error:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      setIsSubmitting(false);
      return;
    }

    //success
    const message = action === 'create' ? t('intents:intentCreated') : t('intents:intentUpdated');
    actions.ui.showNotification({ message, type });

    setIsSubmitting(false);

    if (action === 'create') return setAction('edit');
  };

  const submitDelete = async () => {
    const response = await actions.intents.deleteIntent(intents.currentIntent?.name);

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;
    const message = isError(response) ? t('error:somethingWentWrong') : t('intents:intentDeleted');

    actions.ui.showNotification({ message, type });
    handleClose();
  };

  const handleCancelButtonClick = () => {
    action == 'edit' && intents.currentIntent?.hasChanged
      ? setCancelDialogOpen(true)
      : handleClose();
  };

  const onBackdropClick = (event: SyntheticEvent<{}, Event>) => {
    event.preventDefault();
    event.stopPropagation();

    action == 'edit' && intents.currentIntent?.hasChanged
      ? setCancelDialogOpen(true)
      : handleClose();
  };

  const handleDeleteButtonClick = () => setDeleteDialogOpen(true);

  return (
    <>
      {action && (
        <Dialog
          aria-labelledby="intent-details-dialog"
          fullWidth
          keepMounted
          maxWidth={action === 'create' ? 'sm' : 'md'}
          onBackdropClick={onBackdropClick}
          open={open}
          TransitionComponent={Transition}
        >
          <DialogTitle
            sx={{
              color: ({ palette }) => palette.primary.light,
              textAlign: 'center',
            }}
          >
            <Header
              action={action}
              activeTab={activeTab}
              changeTab={changeTab}
              handleSubmit={submit}
            />
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
              handleCancel={handleCancelButtonClick}
              handleDelete={handleDeleteButtonClick}
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
            message={t('confirmation:deleteMessage', { object: t('intents:intent') })}
            open={deleteDialogOpen}
            title={t('intents:intent')}
          />
          <ConfirmationDialog
            handleNo={() => setCancelDialogOpen(false)}
            handleYes={() => {
              setCancelDialogOpen(false);
              handleClose();
            }}
            message={t('confirmation:cancelMessage', { object: t('intents:intent') })}
            open={cancelDialogOpen}
          />
        </Dialog>
      )}
    </>
  );
};

export default Details;
