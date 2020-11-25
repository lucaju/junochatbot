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

const Story = ({ storyData }) => {
  const classes = useStyles();
  const { state } = useApp();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Story
      </Typography>
      <Box p={1} display="flex" flexDirection="row" width="100%">
        <Box flexGrow={4} mr={2}>
          <TextField
            // error={Boolean(touched.firstName && errors.firstName)}
            fullWidth
            // helperText={touched.firstName && errors.firstName}
            label="Title"
            name="title"
            // onBlur={handleBlur}
            // onChange={handleChange}
            value={storyData.title}
            className={classes.marginBottom}
          />
        </Box>
        <Box flexGrow={1} mr={2}>
          <TextField
            // error={Boolean(touched.language && errors.language)}
            fullWidth
            label="Genre"
            name="genre"
            // onBlur={handleBlur}
            // onChange={handleChange}
            select
            value={storyData.general.genre}
          >
            {state.story.genres.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box flexGrow={1}>
          <TextField
            disabled
            fullWidth
            label="Language"
            name="language"
            select
            value={storyData.language}
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
          // error={Boolean(touched.firstName && errors.firstName)}
          fullWidth
          // helperText={touched.firstName && errors.firstName}
          label="Description"
          name="description"
          multiline
          rowsMax={4}
          rows={2}
          // onBlur={handleBlur}
          // onChange={handleChange}
          value={storyData.general.description}
          variant="outlined"
          className={classes.marginBottom}
        />
      </Box>
    </>
  );
};

Story.propTypes = {
  storyData: PropTypes.object,
};

export default Story;
