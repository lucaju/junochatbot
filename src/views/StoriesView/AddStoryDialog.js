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
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  dialogSection: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  actionSection: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  heading: {
    textAlign: 'center',
    marginBottom: theme.spacing(1.5),
  },
  marginBottom: { marginBottom: theme.spacing(1.5) },
  buttonProgress: { position: 'absolute' },
  error: {
    marginTop: theme.spacing(1),
    color: theme.palette.secondary.light,
    textAlign: 'center',
  },
}));

const AddStoryDialog = ({ open, handleClose, triggerEditStory }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [error, setError] = useState();

  const handleCancelButton = () => {
    handleClose();
  };

  const submit = async (values) => {
    const res = await actions.story.createStory(values);
    if (res.error) return setError(res.error);
    triggerEditStory(res);
  };

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
        initialValues={{ title: '', language: state.session.user.language }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .min(2)
            .max(100)
            .trim()
            .required('Title is required'),
          language: Yup.string().required(),
        })}
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
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label="Story title"
                    margin="normal"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    variant="outlined"
                    className={classes.marginBottom}
                  />
                </Grid>
                <Grid item md={8}>
                  <TextField
                    error={Boolean(touched.language && errors.language)}
                    fullWidth
                    label="Language"
                    margin="normal"
                    name="language"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    value={values.language}
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
                    className={classes.buttonProgress}
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
