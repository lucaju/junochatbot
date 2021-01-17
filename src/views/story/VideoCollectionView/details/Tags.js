import {
  Box,
  Chip,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useApp } from 'src/overmind';

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    width: '-webkit-fill-available',
    marginBottom: theme.spacing(1),
  },
  chip: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

const Tags = ({ name }) => {
  const classes = useStyles();
  const { actions } = useApp();

  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await actions.tag.getCollection();
      setAvailableTags(tags);
    };
    fetchTags();
    return () => {};
  }, []);

  const handleDelete = (name) => {
    setValue(value.filter((tag) => tag.name !== name));
  };

  const handleAutocompleteChange = (tag) => {
    if (tag === null || tag === '') return;
    // if tag has no ID, create a new one with the name provided
    if (!tag.id) tag = { new: true, name: tag };
    setValue([...value, tag]);
  };

  return (
    <Box p={2} mt={1} width={'100%'}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems="center"
        justify="flex-start"
        mb={1}
      >
        <Typography variant="h6">Tags</Typography>
      </Box>
      <Box
        width={'100%'}
        diplay="flex"
        flexDirection="row"
        alignItems="center"
        justify="flex-start"
        flexWrap="wrap"
      >
        <Autocomplete
          blurOnSelect
          clearOnBlur
          className={classes.autocomplete}
          filterSelectedOptions
          freeSolo
          fullWidth
          getOptionLabel={({ name }) => (name ? name : '')}
          id="tag"
          onChange={(e, value) => handleAutocompleteChange(value)}
          options={availableTags}
          renderInput={(params) => <TextField {...params} label="Add tag" />}
          size={'small'}
        />
        {value.map(({ name }) => (
          <Chip
            className={classes.chip}
            key={name}
            label={name}
            onDelete={() => handleDelete(name)}
            size="small"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
};

Tags.propTypes = {
  name: PropTypes.string,
};

export default Tags;
