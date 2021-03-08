import {
  Box,
  Chip,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ spacing }) => ({
  capitalize: { textTransform: 'capitalize' },
  languageChip: {
    marginTop: spacing(.75),
    marginLeft: spacing(1),
  },
}));

const Story = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'storyGeneral']);

  return (
    <>
      <Box p={1} display="flex" flexDirection="row" width="100%">
        <Typography className={classes.capitalize} gutterBottom variant="h6">
          {t('storyGeneral:story')}
        </Typography>
        <Chip
          className={classes.languageChip}
          label={values.languageCode.substring(0, 2).toUpperCase()}
          size="small"
        />
      </Box>
      <Box p={1} display="flex" flexDirection="row" width="100%">
        <Box flexGrow={1} mr={2} mt={1}>
          <TextField
            className={classes.capitalize}
            error={Boolean(touched.title && errors.title)}
            fullWidth
            helperText={touched.title && errors.title}
            label={t('title')}
            name="title"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
          />
        </Box>
      </Box>
      <Box p={1} width="100%" mt={1}>
        <TextField
          className={classes.capitalize}
          error={Boolean(touched['synopsis'] && errors['synopsis'])}
          fullWidth
          helperText={touched['synopsis'] && errors['synopsis']}
          label={t('storyGeneral:synopsis')}
          name="synopsis"
          multiline
          rowsMax={2}
          rows={2}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.synopsis}
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
