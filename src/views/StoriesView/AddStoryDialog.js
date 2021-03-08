import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';

const useStyles = makeStyles(({ spacing, palette }) => ({
  actionSection: {
    paddingRight: spacing(3),
    paddingLeft: spacing(3),
  },
  capitalize: { textTransform: 'capitalize' },
  dialogSection: {
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
  },
  error: {
    marginTop: spacing(1),
    color: palette.secondary.light,
    textAlign: 'center',
  },
  heading: {
    textAlign: 'center',
    marginBottom: spacing(1.5),
  },
  marginBottom: { marginBottom: spacing(1.5) },
  progress: { position: 'absolute' },
}));

const AddStoryDialog = ({ open, handleClose, triggerEditStory }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const { t } = useTranslation(['common']);
  const [error, setError] = useState();

  const handleCancelButton = () => handleClose();

  const submit = async (values) => {
    const res = await actions.story.createStory(values);
    if (res.error) return setError(res.error);
    triggerEditStory(res);
  };

  const formValidation = Yup.object().shape({
    title: Yup.string().min(2).max(100).trim().required('Title is required'),
    languageCode: Yup.string().required(),
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      aria-labelledby="user-details-dialog"
    >
      {error && (
        <Typography
          component="h2"
          variant="subtitle1"
          className={classes.error}
        >
          Oh oh. Server Error.
        </Typography>
      )}
      <Formik
        initialValues={{
          title: '',
          languageCode: state.ui.languageCode,
        }}
        validationSchema={formValidation}
        onSubmit={async (values) => await submit(values)}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <Grid container spacing={3} className={classes.dialogSection}>
                <Grid item md={12}>
                  <Typography variant="h6" className={classes.heading}>
                    New Story
                  </Typography>
                  <TextField
                    className={clsx(classes.marginBottom, classes.capitalize)}
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label={t('title')}
                    margin="normal"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    variant="outlined"
                    
                  />
                </Grid>
                <Grid item md={8}>
                  <TextField
                    error={Boolean(touched.languageCode && errors.languageCode)}
                    fullWidth
                    label="language"
                    margin="normal"
                    name="languageCode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    value={values.languageCode}
                    variant="outlined"
                  >
                    {state.story.languages.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className={classes.actionSection}>
              <Button onClick={handleCancelButton} color="primary">
                Cancel
              </Button>
              <Box flexGrow={1} />
              <Button
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="outlined"
              >
                Create
                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.progress}
                  />
                )}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

AddStoryDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  triggerEditStory: PropTypes.func,
};

export default AddStoryDialog;
