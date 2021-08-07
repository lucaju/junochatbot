import {
  Autocomplete,
  AutocompleteChangeReason,
  Box,
  Grid,
  Stack,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useActions, useAppState } from '@src/overmind';
import { Tag, Video } from '@src/types';
import { FormikErrors, FormikTouched, useField } from 'formik';
import { json } from 'overmind';
import React, { FC, SyntheticEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ExtraProps {
  errors: FormikErrors<Video>;
  handleBlur: (e: SyntheticEvent<any>) => void;
  handleChange: (e: SyntheticEvent<any>) => void;
  touched: FormikTouched<Video>;
  values: Partial<Video>;
}

const Extra: FC<ExtraProps> = ({ errors, handleBlur, handleChange, touched, values }) => {
  const { videos } = useAppState();
  const actions = useActions();
  const { t } = useTranslation();
  const [, meta, helpers] = useField('tags');
  // eslint-disable-next-line no-unused-vars
  const { value } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    const fetchData = async () => await actions.videos.getTags();
    if (videos.tagCollection.length === 0) fetchData();
    return () => {};
  }, []);

  const tagsOnChange = (event: SyntheticEvent, value: Tag[], reason: AutocompleteChangeReason) => {
    if (reason === 'blur') return handleBlur(event);
    setValue(json(value));
  };

  return (
    <Grid item md={12} xs={12}>
      <Stack direction="column" spacing={2}>
        <TextField
          error={Boolean(touched['description'] && errors['description'])}
          fullWidth
          label={t('common:description')}
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
        {/* {videos.tagCollection.length > 0 && ( */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <Autocomplete
            filterSelectedOptions
            getOptionLabel={(tag) => tag.name}
            id="tags"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            multiple
            onChange={tagsOnChange}
            options={videos.tagCollection}
            sx={{ width: '100%' }}
            value={values.tags}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('common:tags')}
                fullWidth
                sx={{ textTransform: 'capitalize' }}
                variant="standard"
              />
            )}
          />
        </Box>
        {/* )} */}
      </Stack>
    </Grid>
  );
};

export default Extra;
