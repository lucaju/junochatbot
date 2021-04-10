import { Grid, makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';
import { FormikErrors, FormikTouched, useField } from 'formik';
import { json } from 'overmind';
import React, { ChangeEvent, FC, FocusEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../../../overmind';
import { Video } from '../../../../types';

interface ExtraProps {
  errors: FormikErrors<Video>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<Video>;
  values: Partial<Video>;
}

const useStyles = makeStyles(({ spacing }) => ({
  capitalize: { textTransform: 'capitalize' },
  marginBottom: { marginBottom: spacing(2) },
}));

const Extra: FC<ExtraProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const { t } = useTranslation(['common']);
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('tags');
  // eslint-disable-next-line no-unused-vars
  const { value } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    const fetchData = async () => await actions.videos.getTags();
    if (state.videos.tagCollection.length === 0) fetchData();
    return () => {};
  }, []);

  return (
    <Grid item md={12} xs={12}>
      <TextField
        className={clsx(classes.marginBottom, classes.capitalize)}
        error={Boolean(touched['description'] && errors['description'])}
        fullWidth
        label={t('description')}
        name="description"
        multiline
        onBlur={handleBlur}
        onChange={handleChange}
        rows={3}
        rowsMax={3}
        size="small"
        value={values.description}
        variant="outlined"
      />
      {state.videos.tagCollection.length > 0 && (
        <Autocomplete
          filterSelectedOptions
          getOptionLabel={(tag) => tag.name}
          getOptionSelected={(option, value) => option.id === value.id}
          id="tags"
          multiple
          onChange={(event: FocusEvent, value, reason) => {
            if (reason === 'blur') return handleBlur(event);
            setValue(json(value));
          }}
          options={state.videos.tagCollection}
          value={values.tags}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.capitalize}
              label={t('tags')}
              fullWidth
            />
          )}
        />
      )}
    </Grid>
  );
};

export default Extra;
