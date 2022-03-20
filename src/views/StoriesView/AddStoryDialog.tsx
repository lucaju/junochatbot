import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useActions, useAppState } from '@src/overmind';
import { NotificationType, Story } from '@src/types';
import { isError } from '@src/util/utilities';
import { Formik } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

interface AddStoryDialogProps {
  handleClose: () => void;
  open: boolean;
  triggerEditStory: (value: number) => void;
}

const AddStoryDialog: FC<AddStoryDialogProps> = ({ handleClose, open, triggerEditStory }) => {
  const { story, ui } = useAppState();
  const actions = useActions();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const handleCancel = () => handleClose();

  const submit = async (values: Partial<Story>) => {
    const response = await actions.story.createStory(values as Omit<Story, 'id'>);

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;
    const message = isError(response) ? t('error:somethingWentWrong') : t('stories:storyCreated');
    actions.ui.showNotification({ message, type });

    if (isError(response)) return;
    triggerEditStory(response.id);
  };

  const formValidation = Yup.object().shape({
    title: Yup.string().min(3).max(100).trim().required(t('error:titleRequired')),
    languageCode: Yup.string().required(),
  });

  return (
    <Dialog aria-labelledby="new-story-dialog" fullWidth onClose={handleClose} open={open}>
      <Formik
        initialValues={{ title: '', languageCode: ui.languageCode }}
        onSubmit={submit}
        validationSchema={formValidation}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <Typography
                sx={{ my: 1.5, textAlign: 'center', textTransform: 'uppercase', fontWeight: 700 }}
                variant="h6"
              >
                {t('stories:newStory')}
              </Typography>
              <Stack
                direction={isMobile ? 'column' : 'row'}
                alignItems="baseline"
                spacing={2}
                pb={1}
              >
                <TextField
                  error={Boolean(touched.title && errors.title)}
                  fullWidth
                  helperText={touched.title && errors.title}
                  label={t('common:title')}
                  margin="normal"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ textTransform: 'capitalize' }}
                  value={values.title}
                  variant="standard"
                />

                <TextField
                  error={Boolean(touched.languageCode && errors.languageCode)}
                  label={t('common:language')}
                  margin="normal"
                  name="languageCode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  select
                  sx={{ minWidth: 120, textTransform: 'capitalize' }}
                  value={values.languageCode}
                  variant="standard"
                >
                  {story.languages.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button color="inherit" disabled={isSubmitting} onClick={handleCancel}>
                {t('common:cancel')}
              </Button>
              <Box flexGrow={1} />
              <LoadingButton loading={isSubmitting} type="submit" variant="outlined">
                {t('common:create')}
              </LoadingButton>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddStoryDialog;
