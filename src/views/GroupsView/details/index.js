import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DeleteDialog from 'src/components/DeleteDialog';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';
import Actions from './Actions';
import Fields from './Fields';

const initialValues = {
  id: null,
  name: '',
  description: '',
  institution: '',
  active: true,
};

const Details = ({ open, handleDetailClose, group }) => {
  const { actions } = useApp();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [groupData, setGroupData] = useState(initialValues);

  useEffect(() => {
    if (open && group.id === undefined) {
      const selectedGroupData = Object.assign(initialValues);
      setGroupData(selectedGroupData);
    }

    if (open && group.id !== undefined) {
      const selectedGroupData = Object.assign(group);
      setGroupData(selectedGroupData);
    }
    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    description: Yup.string().trim(),
    institution: Yup.string().trim(),
    active: Yup.bool(),
  });

  const handleCancelButton = () => {
    handleDetailClose();
    open = false;
  };

  const submit = async (values) => {
    const response = await actions.users.saveGroup(values);

    if (response.error) {
      actions.ui.showNotification({
        type: 'error',
        message: 'Something went wrong!',
      });
      return;
    }

    const message = values.id ? 'Group updated' : 'Group created';
    actions.ui.showNotification({ type: 'success', message });

    handleDetailClose();
    open = false;
  };

  const restoreGroup = async (values) => {
    if (!values.id) return;

    const data = group;
    data.active = true;

    const response = await actions.users.saveGroup(data);

    if (response.error) {
      actions.ui.showNotification({
        type: 'error',
        message: 'Something went wrong!',
      });
      return response;
    }

    groupData.active = true;
    actions.ui.showNotification({ type: 'success', message: 'Group restored' });

    return response;
  };

  const deleteGroup = async (values) => {
    if (!values.id) return;

    const data = group;
    data.active = false;

    const response = await actions.users.saveGroup(data);
    setDeleteDialogOpen(false);

    if (response.error) {
      actions.ui.showNotification({
        type: 'error',
        message: 'Something went wrong!',
      });
      return;
    }

    actions.ui.showNotification({ type: 'success', message: 'Group deleted' });

    handleDetailClose();
    open = false;
  };

  return (
    <Dialog
      aria-labelledby="group-details-dialog"
      maxWidth="xs"
      onClose={handleDetailClose}
      open={open}
    >
      <Formik
        enableReinitialize={true}
        initialValues={groupData}
        onSubmit={async (values) => {
          if (values.submitType === 'delete') {
            await deleteGroup(values);
          } else if (values.submitType === 'restore') {
            const response = await restoreGroup(values);
            if (!response.error) values.active = true;
          } else {
            await submit(values);
          }
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
              {group.id === undefined ? 'New Group' : 'Edit Group'}
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Fields
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Actions
                dirty={dirty}
                groupData={groupData}
                handleCancel={handleCancelButton}
                handleDelete={() => setDeleteDialogOpen(true)}
                isSubmitting={isSubmitting}
                values={values}
              />
            </DialogActions>
            <DeleteDialog
              handleYes={() => {
                setDeleteDialogOpen(false)
                values.submitType = 'delete';
                handleSubmit();
              }}
              handleNo={() => setDeleteDialogOpen(false)}
              isSubmitting={isSubmitting}
              message="Are you sure you want to delete this group?"
              open={deleteDialogOpen}
              title="Delete Group"
            />
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

Details.propTypes = {
  group: PropTypes.any,
  handleDetailClose: PropTypes.func,
  open: PropTypes.bool,
};

export default Details;
