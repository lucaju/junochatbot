import {
  Box,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useApp } from 'src/overmind';

const useStyles = makeStyles((theme) => ({
  marginBottom: { marginBottom: theme.spacing(1) },
}));

const Story = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();
  const { state } = useApp();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Story
      </Typography>
      <Box p={1} display="flex" flexDirection="row" width="100%">
        <Box flexGrow={1} mr={2}>
          <TextField
            error={Boolean(touched.title && errors.title)}
            fullWidth
            helperText={touched.title && errors.title}
            label="Title"
            name="title"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            className={classes.marginBottom}
          />
        </Box>
        <Box width="150px" mr={2}>
          <TextField
            error={Boolean(touched['general.genre'] && errors.general['general.genre'])}
            fullWidth
            label="Genre"
            name="general.genre"
            onBlur={handleBlur}
            onChange={handleChange}
            select
            value={values.general.genre}
          >
            {state.story.genres.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box width="100px">
          <TextField
            disabled
            fullWidth
            label="Language"
            name="language"
            onBlur={handleBlur}
            onChange={handleChange}
            select
            value={values.language}
          >
            {state.story.languages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      <Box p={1} width="100%">
        <TextField
          error={Boolean(
            touched['general.description'] && errors['general.description']
          )}
          fullWidth
          helperText={touched['general.description'] && errors['general.description']}
          label="Description"
          name="general.description"
          multiline
          rowsMax={2}
          rows={2}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.general.description}
          variant="outlined"
          className={classes.marginBottom}
        />
      </Box>
    </>
  );
};

Story.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Story;
