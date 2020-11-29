/* eslint-disable quotes */
import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Provider from './Provider';

const useStyles = makeStyles((theme) => ({
  marginBottom: { marginBottom: theme.spacing(1.5) },
  centerText: { textAlign: 'center' },
}));

const Source = ({
  errors,
  handleBlur,
  handleChange,
  parseVideoProvider,
  touched,
  values,
  videoProvider,
}) => {
  const classes = useStyles();

  const onType = (e) => {
    handleChange(e);
    parseVideoProvider(e.target.value);
  };

  return (
    <>
      <Grid item md={videoProvider ? 10 : 12}>
        <TextField
          error={Boolean(touched.source && errors.source)}
          fullWidth
          helperText={touched.source && errors.source}
          label="Source"
          name="source"
          onBlur={handleBlur}
          onChange={(e) => onType(e)}
          value={values.source}
          className={videoProvider && classes.marginBottom}
        />
        {!videoProvider && (
          <Typography variant="caption">
            {`Paste the url to the video. Support Vimeo and Youtube. E.g., "https://www.youtube.com/watch?v=jWMFpeGYOoE&quot"`}
          </Typography>
        )}
      </Grid>
      {videoProvider && (
        <Grid item md={2} className={classes.centerText}>
          <Provider name="provider" videoProvider={videoProvider} />
        </Grid>
      )}
    </>
  );
};

Source.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  parseVideoProvider: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
  videoProvider: PropTypes.string,
};

export default Source;
