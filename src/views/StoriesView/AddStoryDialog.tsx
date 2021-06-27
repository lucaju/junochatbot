import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useAppState, useActions } from '@src/overmind';
import { NotificationType, Story } from '@src/types';
import { isError } from '@src/util/utilities';
import { Formik } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

interface AddStoryDialogProps {
  handleClose: () => void;
  open: boolean;
  triggerEditStory: (value?: number | undefined) => void;
}

const AddStoryDialog: FC<AddStoryDialogProps> = ({ handleClose, open, triggerEditStory }) => {
  const { story, ui } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['common', 'story', 'errorMessages']);
  const [error, setError] = useState();

  const handleCancelButton = () => handleClose();

  const submit = async (values: Partial<Story>) => {
    const response = await actions.story.createStory(values as Omit<Story, 'id'>);

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    //error
    if (isError(response)) {
      const message = t('errorMessages:somethingWentWrong');
      actions.ui.showNotification({ message, type });
      return;
    }

    //success
    const message = t('createStory');
    actions.ui.showNotification({ message, type });

    triggerEditStory(response.id);
  };

  const formValidation = Yup.object().shape({
    title: Yup.string().min(2).max(100).trim().required('Title is required'),
    languageCode: Yup.string().required(),
  });

  return (
    <Dialog aria-labelledby="user-details-dialog" maxWidth="sm" onClose={handleClose} open={open}>
      {error && (
        <Typography
          component="h2"
          sx={{
            mt: 1,
            color: 'secondary.light',
            textAlign: 'center',
          }}
          variant="subtitle1"
        >
          Oh oh. Server Error.
        </Typography>
      )}
      <Formik
        initialValues={{
          title: '',
          languageCode: ui.languageCode,
        }}
        onSubmit={submit}
        validationSchema={formValidation}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <Grid container spacing={3} sx={{ py: 2 }}>
                <Grid item md={12}>
                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: 'center',
                    }}
                    variant="h6"
                  >
                    New Story
                  </Typography>
                  <TextField
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label={t('title')}
                    margin="normal"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{
                      mb: 1.5,
                      textTransform: 'capitalize',
                    }}
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
                    {story.languages.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3 }}>
              <Button color="primary" onClick={handleCancelButton}>
                Cancel
              </Button>
              <Box flexGrow={1} />
              <LoadingButton
                color="primary"
                loading={isSubmitting}
                type="submit"
                variant="outlined"
              >
                Create
              </LoadingButton>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddStoryDialog;
