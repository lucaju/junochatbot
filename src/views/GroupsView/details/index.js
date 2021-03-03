import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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

const formValidation = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  description: Yup.string().trim(),
  institution: Yup.string().trim(),
  active: Yup.bool(),
});

const Details = ({ group, open, handleDetailClose }) => {
  const { actions } = useApp();
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

  const submit = async (values) => {
    const res = !values.id
      ? await actions.users.createGroup(values)
      : await actions.users.updateGroup(values);

    const type = !res ? 'error' : 'success';

    if (!res) {
      const message = 'Error: Something went wrong!';
      actions.ui.showNotification({ message, type });
      return;
    }

    const message = values.id ? 'Group updated' : 'Group created';
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
      const message = 'Something went wrong!';
      actions.ui.showNotification({ message, type });
      return res;
    }

    //success
    setGroupData(data);
    const message = active ? 'Group restored' : 'Group deleted';
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
                {!groupData.id ? 'New Group' : 'Edit Group'}
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
                message="Are you sure you want to delete this group?"
                open={deleteDialogOpen}
                title="Delete Group"
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
