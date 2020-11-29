import { Chip, makeStyles, Typography } from '@material-ui/core';
import TheatersIcon from '@material-ui/icons/Theaters';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const List = ({ name, title }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const handleDeleteS = (itemId) => {
    setValue(value.filter((item) => item.id !== itemId));
  };

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Intents
      </Typography>
      {value.length > 0 ? (
        value.map(({ id, title }) => (
          <Chip
            className={classes.chip}
            key={id}
            label={title}
            variant="outlined"
            onDelete={() => handleDeleteS(id)}
            icon={name === 'videos' ? <TheatersIcon /> : null}
          />
        ))
      ) : (
        <Typography variant="body2" gutterBottom>
          No {title}
        </Typography>
      )}
    </>
  );
};

List.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
};

export default List;
