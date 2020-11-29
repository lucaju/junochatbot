import { Grid, makeStyles, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Tags from './Tags';

const useStyles = makeStyles((theme) => ({
  marginBottom: { marginBottom: theme.spacing(1.5) },
}));

const Meta = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item md={6} xs={6}>
        <TextField
          className={classes.marginBottom}
          error={Boolean(touched.title && errors.title)}
          fullWidth
          helperText={touched.title && errors.title}
          label="Title"
          name="title"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.title}
        />
        <TextField
          className={classes.marginBottom}
          error={Boolean(touched.author && errors.author)}
          fullWidth
          helperText={touched.author && errors.author}
          label="Author"
          name="author"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.author}
        />
        <Grid container spacing={2}>
          <Grid item md={3}>
            <TextField
              className={classes.marginBottom}
              error={Boolean(touched.year && errors.year)}
              fullWidth
              helperText={touched.year && errors.year}
              inputProps={{ maxLength: 4 }}
              label="Year"
              name="year"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.year}
            />
          </Grid>
          <Grid item md={9}>
            <TextField
              className={classes.marginBottom}
              error={Boolean(touched.genre && errors.genre)}
              fullWidth
              helperText={touched.genre && errors.genre}
              label="Genre"
              name="genre"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.genre}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={6}>
        <TextField
          className={classes.marginBottom}
          error={Boolean(touched['description'] && errors['description'])}
          fullWidth
          label="Description"
          name="description"
          multiline
          onBlur={handleBlur}
          onChange={handleChange}
          rowsMax={3}
          rows={3}
          value={values.description}
          variant="outlined"
        />
        <Tags name="tags" />
      </Grid>
    </>
  );
};

Meta.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Meta;
