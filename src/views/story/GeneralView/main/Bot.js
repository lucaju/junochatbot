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
import { getIcon } from './icons';
import SliderFormik from './SliderFormik';

const useStyles = makeStyles((theme) => ({
  marginBottom: { marginBottom: theme.spacing(1) },
  label: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2) - 1,
  },
  avatarSelectBox: { marginTop: '-5px' },
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
            error={Boolean(
              touched['general.bot.name'] && errors['general.bot.name']
            )}
            fullWidth
            label="Name"
            name="general.bot.name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.general.bot.name}
            className={classes.marginBottom}
          />
        </Box>
        {/* <Box width="100px" mr={2}>
          <TextField
            fullWidth
            label="Balloon"
            name="general.bot.balloon"
            select
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.general.bot.balloon}
          >
            {state.story.colors.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box> */}
        <Box width="50px" className={classes.avatarSelectBox}>
          <TextField
            fullWidth
            label="Avatar"
            name="general.bot.avatar"
            select
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.general.bot.avatar}
          >
            {state.story.icons.map((option) => {
              const Icon = getIcon(option.value);
              return (
                <MenuItem key={option.value} value={option.value}>
                  <Icon fontSize="small" />
                </MenuItem>
              );
            })}
          </TextField>
        </Box>
      </Box>
      <Box p={1} width="100%">
        <TextField
          error={Boolean(
            touched['general.bot.persona'] && errors['general.bot.persona']
          )}
          fullWidth
          label="Persona"
          name="general.bot.persona"
          multiline
          rowsMax={2}
          rows={2}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.general.bot.persona}
          variant="outlined"
          className={classes.marginBottom}
        />
      </Box>
      <Box
        p={1}
        display="flex"
        flexDirection="row"
        width="100%"
        alignContent="flex-end"
      >
        <Box mr={2}>
          <Typography
            id="discrete-slider"
            gutterBottom
            className={classes.label}
          >
            Typing speed (Miliiseconds per word)
          </Typography>
        </Box>
        <SliderFormik name="general.bot.speed" />
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
