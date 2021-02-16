import { Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  chip: { marginRight: theme.spacing(1) },
}));

const Stories = ({ name }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const handleDeleteStoryLink = (storyId) => {
    setValue(value.filter((story) => story.id !== storyId));
  };

  return (
    <Grid item md={12} xs={12}>
      <Typography variant="subtitle1" gutterBottom>
        Stories
      </Typography>
      {value.length > 0 ? (
        value.map(({ id, title }) => (
          <Chip
            className={classes.chip}
            key={id}
            label={title}
            variant="outlined"
            onDelete={() => handleDeleteStoryLink(id)}
          />
        ))
      ) : (
        <Typography variant="body2" gutterBottom>
          No stories
        </Typography>
      )}
    </Grid>
  );
};

Stories.propTypes = {
  name: PropTypes.string,
};

export default Stories;
