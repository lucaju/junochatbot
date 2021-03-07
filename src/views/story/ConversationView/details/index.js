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
  active: true,
};

const formValidation = Yup.object().shape({
  url: Yup.string().trim().required('Url is required'),
  image: Yup.string(),
  title: Yup.string().max(255),
  channelTitle: Yup.string().max(255),
  publishedAt: Yup.string(),
  duration: Yup.string(),
  description: Yup.string(),
  tags: Yup.array(),
  active: Yup.bool(),
});

const Details = ({ open, handleDetailClose, intent }) => {
  const classes = useStyles();
  const { actions } = useApp();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [intentData, setIntentData] = useState(initialValues);

  useEffect(() => {
    if (open && intent?.id) {
      const fetch = async () => {
        const selectedIntent= await actions.intents.getIntent(intent.id);
        setIntentData(selectedIntent);
      };
      fetch();
    }
    if (open && !intent?.id) setIntentData(initialValues);
    return () => {};
  }, [open]);

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

    const type = response.error ? 'error' : 'success';

    //error
    if (response.error) {
      const message = 'Something went wrong!';
      actions.ui.showNotification({ message, type });
      return response;
    }

    //success
    const message = values.id ? 'Intent updated' : 'Intent created';
    actions.ui.showNotification({ message, type });

    handleClose();
  };

  // eslint-disable-next-line no-unused-vars
  const updateStatus = async (values, active) => {
    if (!values.id) return;

    //Since the API is PUT not PATCH, we need to send all fields
    const data = intentData;
    data.active = active; //change intent status

    const response = await actions.intent.updateIntentStatus(data);

    const type = response.error ? 'error' : 'success';

    //error
    if (response.error) {
      const message = 'Something went wrong!';
      actions.ui.showNotification({ message, type });
      return response;
    }

    //success
    const message = active ? 'Intent restored' : 'Intent deleted';
    actions.ui.showNotification({ message, type });

    //end
    if (active) return response;

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
              <DialogContent dividers>
                <Box className={classes.meta}>
                </Box>
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
                message="Are you sure you want to delete this intent?"
                open={deleteDialogOpen}
                title="Delete Video"
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
