import { Box, Chip, TextField, Typography } from '@material-ui/core';
import { Story as StoryType } from '@src/types';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState } from '@src/overmind';

interface StoryProps {
  errors: FormikErrors<StoryType>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<StoryType>;
  values: StoryType;
}

const Story: FC<StoryProps> = ({ errors, handleBlur, handleChange, touched, values }) => {
  const { story } = useAppState();
  const { t } = useTranslation(['common', 'storyGeneral']);

  const author = story.currentStory?.user
    ? `${story.currentStory?.user.firstName} ${story.currentStory?.user.lastName}`
    : 'Anonymous';

  return (
    <>
      <Box p={1} display="flex" flexDirection="row" width="100%">
        <Typography gutterBottom sx={{ textTransform: 'capitalize' }} variant="h6">
          {t('storyGeneral:story')}
        </Typography>
        <Chip
          label={values.languageCode.substring(0, 2).toUpperCase()}
          size="small"
          sx={{ mt: 0.75, ml: 1 }}
        />
      </Box>
      <Box display="flex" flexDirection="row" width="100%" p={1}>
        <Box flexGrow={2} mr={2} mt={1}>
          <TextField
            error={Boolean(touched.title && errors.title)}
            fullWidth
            helperText={touched.title && errors.title}
            label={t('title')}
            name="title"
            onBlur={handleBlur}
            onChange={handleChange}
            sx={{ textTransform: 'capitalize' }}
            value={values.title}
            variant="standard"
          />
        </Box>
        <Box flexGrow={1} mr={2} mt={1}>
          <TextField
            error={Boolean(touched.author && errors.author)}
            fullWidth
            helperText={touched.author && errors.author}
            InputLabelProps={{ shrink: true }}
            label={t('storyGeneral:author')}
            name="author"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={author}
            sx={{ textTransform: 'capitalize' }}
            value={values.author}
            variant="standard"
          />
        </Box>
      </Box>
      <Box width="100%" mt={1} p={1}>
        <TextField
          error={Boolean(touched['synopsis'] && errors['synopsis'])}
          fullWidth
          helperText={touched['synopsis'] && errors['synopsis']}
          label={t('storyGeneral:synopsis')}
          name="synopsis"
          multiline
          rows={2}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.synopsis}
          sx={{ textTransform: 'capitalize' }}
          variant="outlined"
        />
      </Box>
    </>
  );
};

export default Story;
