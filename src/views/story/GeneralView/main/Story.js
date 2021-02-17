import {
  Chip,
  Box,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  marginRight: { marginRight: theme.spacing(1) },
}));

const Story = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();

  return (
    <>
      <Box p={1} display="flex" flexDirection="row" width="100%">
        <Typography className={classes.marginRight} gutterBottom variant="h6">
          Story
        </Typography>
        <Chip label={values.languageCode} />
      </Box>
      <Box p={1} display="flex" flexDirection="row" width="100%">
        <Box flexGrow={1} mr={2} mt={1}>
          <TextField
            error={Boolean(touched.title && errors.title)}
            fullWidth
            helperText={touched.title && errors.title}
            label="Title"
            name="title"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
          />
        </Box>
      </Box>
      <Box p={1} width="100%" mt={1}>
        <TextField
          error={Boolean(
            touched['general.synopsis'] && errors['general.synopsis']
          )}
          fullWidth
          helperText={touched['general.synopsis'] && errors['general.synopsis']}
          label="synopsis"
          name="general.synopsis"
          multiline
          rowsMax={2}
          rows={2}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.general.synopsis}
          variant="outlined"
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
