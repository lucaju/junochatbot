import { Grid, makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useField } from 'formik';
import { json } from 'overmind';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useApp } from 'src/overmind';

const useStyles = makeStyles(({ spacing }) => ({
  marginBottom: { marginBottom: spacing(2) },
}));

const Folsonomy = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();
  const { state, actions } = useApp();

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
        className={classes.marginBottom}
        error={Boolean(touched['description'] && errors['description'])}
        fullWidth
        label="Description"
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
          getOptionSelected={(option, value) =>
            option.id === value.id && option.active === true
          }
          id="tags"
          multiple
          onChange={(event, value, reason) => {
            if (reason === 'blur') return handleBlur();
            setValue(json(value));
          }}
          options={state.videos.tagCollection.filter(
            (tag) => tag.active === true
          )}
          value={values.tags.filter((tag) => tag.active === true)}
          renderInput={(params) => (
            <TextField fullWidth label="Tags" {...params} />
          )}
        />
      )}
    </Grid>
  );
};

Folsonomy.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Folsonomy;
