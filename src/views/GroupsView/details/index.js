import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteDialog from 'src/components/DeleteDialog';
import { useApp } from 'src/overmind';
import { json } from 'overmind';
import * as Yup from 'yup';
import Actions from './Actions';
import Fields from './Fields';

const initialValues = {
  name: '',
  description: '',
  institution: '',
  active: true,
};

const Details = ({ group, open, handleDetailClose }) => {
  const { actions } = useApp();
  const { t } = useTranslation(['groups', 'common', 'errorMessages, deleteDialog']);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [groupData, setGroupData] = useState(initialValues);

  useEffect(() => {
    if (open && group.id) {
      const fetch = async () => {
        const selectedTag = await actions.users.getGroup(group.id);
        setGroupData(json(selectedTag));
      };
      fetch();
    }
    if (open && !group.id) setGroupData(initialValues);
    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    name: Yup.string().trim().required(t('common:required')),
    description: Yup.string().trim(),
    institution: Yup.string().trim(),
    active: Yup.bool(),
  });

  const submit = async (values) => {
    const res = !values.id
      ? await actions.users.createGroup(values)
      : await actions.users.updateGroup(values);

    const type = !res ? 'error' : 'success';

    if (!res) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return;
    }

    const message = values.id ? t('groupUpdated') : t('groupCreated');
    actions.ui.showNotification({ message, type });

    handleClose();
  };

  const updateStatus = async (values, active) => {
    if (!values.id) return;

    //Since the API is PUT not PATCH, we need to send all fields
    const data = { ...group };
    data.active = active; //change user status

    const res = await actions.users.updateGroupStatus(data);

    const type = !res ? 'error' : 'success';

    //error
    if (res.error) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return res;
    }

    //success
    setGroupData(data);
    const message = values.id ? t('groupRestored') : t('groupDeleted');
    actions.ui.showNotification({ message, type });

    if (!res) return;

    handleClose();
  };

  const handleClose = () => {
    setGroupData(initialValues);
    handleDetailClose();
    open = false;
  };

  return (
    <Dialog
      aria-labelledby="group-details-dialog"
      maxWidth="xs"
      onBackdropClick={handleClose}
      onClose={handleDetailClose}
      open={open}
    >
      {groupData && (
        <Formik
          enableReinitialize={true}
          initialValues={groupData}
          onSubmit={async (values) => {
            //change status submission
            if (values.submitType) {
              const active = values.submitType === 'delete' ? false : true;
              const response = await updateStatus(values, active);
              if (!response?.error) values.active = active;
              return;
            }

            //normal submission
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
              <DialogTitle>
                {!groupData.id ? t('newGroup') : t('editGroup')}
              </DialogTitle>
              <DialogContent dividers>
                <Fields
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                />
              </DialogContent>
              <DialogActions>
                <Actions
                  dirty={dirty}
                  groupData={groupData}
                  handleCancel={handleClose}
                  handleDelete={() => setDeleteDialogOpen(true)}
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
                message={t('deleteDialog:message', { object: t('group')})}
                open={deleteDialogOpen}
                title={t('deleteDialog:title', { object: t('group')})}
              />
            </form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

Details.propTypes = {
  group: PropTypes.any,
  handleDetailClose: PropTypes.func,
  open: PropTypes.bool,
};

export default Details;
