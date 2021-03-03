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
import { getIcon } from 'src/util/icons';
import BotDelaySlider from './BotDelaySlider';

const useStyles = makeStyles(({ spacing, palette }) => ({
  avatarSelectBox: { marginTop: '-5px' },
  marginBottom: { marginBottom: spacing(1) },
  label: {
    fontSize: '0.75rem',
    color: palette.text.secondary,
  },
}));

const Bot = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();
  const { state } = useApp();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Character Bot
      </Typography>
      <Box
        p={1}
        display="flex"
        flexDirection="row"
        width="100%"
        alignItems="flex-start"
      >
        <Box flexGrow={1} mr={2}>
          <TextField
            className={classes.marginBottom}
            error={Boolean(touched['botName'] && errors['botName'])}
            fullWidth
            label="Name"
            name="botName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.botName}
          />
        </Box>
        <Box width="50px" className={classes.avatarSelectBox}>
          <TextField
            fullWidth
            label="Avatar"
            name="botAvatar"
            select
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.botAvatar}
          >
            {state.story.icons.map(({ value }) => {
              const Icon = getIcon(value);
              return (
                <MenuItem key={value} value={value}>
                  <Icon fontSize="small" />
                </MenuItem>
              );
            })}
          </TextField>
        </Box>
      </Box>
      <Box p={1} width="100%">
        <TextField
          className={classes.marginBottom}
          error={Boolean(touched['botPersona'] && errors['botPersona'])}
          fullWidth
          label="Persona"
          name="botPersona"
          multiline
          rowsMax={2}
          rows={2}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.botPersona}
          variant="outlined"
        />
      </Box>
      <Box p={1} width="50%" minWidth={'330px'}>
        <Box>
          <Typography className={classes.label}>
            {`Message Delay (characters per millissecond)`}
          </Typography>
        </Box>
        <BotDelaySlider name="botDelay" />
      </Box>
    </>
  );
};

Bot.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Bot;
