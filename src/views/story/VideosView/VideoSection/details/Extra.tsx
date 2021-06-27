import { Autocomplete, Grid, Stack, TextField } from '@material-ui/core';
import { useAppState, useActions } from '@src/overmind';
import { Video } from '@src/types';
import { FormikErrors, FormikTouched, useField } from 'formik';
import { json } from 'overmind';
import React, { ChangeEvent, FC, FocusEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ExtraProps {
  errors: FormikErrors<Video>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<Video>;
  values: Partial<Video>;
}

const Extra: FC<ExtraProps> = ({ errors, handleBlur, handleChange, touched, values }) => {
  const { videos } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['common']);
  const [, meta, helpers] = useField('tags');
  // eslint-disable-next-line no-unused-vars
  const { value } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    const fetchData = async () => await actions.videos.getTags();
    if (videos.tagCollection.length === 0) fetchData();
    return () => {};
  }, []);

  return (
    <Grid item md={12} xs={12}>
      <Stack direction="column" spacing={2}>
        <TextField
          error={Boolean(touched['description'] && errors['description'])}
          fullWidth
          label={t('description')}
          name="description"
          multiline
          onBlur={handleBlur}
          onChange={handleChange}
          rows={3}
          size="small"
          sx={{ textTransform: 'capitalize' }}
          value={values.description}
          variant="outlined"
        />
        {videos.tagCollection.length > 0 && (
          <Autocomplete
            filterSelectedOptions
            getOptionLabel={(tag) => tag.name}
            id="tags"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            multiple
            onChange={(event: FocusEvent, value, reason) => {
              if (reason === 'blur') return handleBlur(event);
              setValue(json(value));
            }}
            options={videos.tagCollection}
            value={values.tags}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('tags')}
                fullWidth
                sx={{ textTransform: 'capitalize' }}
                variant="standard"
              />
            )}
          />
        )}
      </Stack>
    </Grid>
  );
};

export default Extra;
