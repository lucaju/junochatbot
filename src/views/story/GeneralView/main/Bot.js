import {
  Box,
  makeStyles,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useApp } from 'src/overmind';
import { getIcon } from './icons';

const useStyles = makeStyles((theme) => ({
  marginBottom: { marginBottom: theme.spacing(1) },
  label: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2)-1
  },
  avatarSelectBox: { marginTop: '-5px' }
}));

const Bot = ({ storyData }) => {
  const classes = useStyles();
  const { state } = useApp();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Bot
      </Typography>
      <Box p={1} width="100%">
        <TextField
          // error={Boolean(touched.firstName && errors.firstName)}
          fullWidth
          // helperText={touched.firstName && errors.firstName}
          label="Name"
          name="bot.name"
          // onBlur={handleBlur}
          // onChange={handleChange}
          value={storyData.general.bot.name}
          className={classes.marginBottom}
        />
      </Box>
      <Box p={1} width="100%">
        <TextField
          // error={Boolean(touched.firstName && errors.firstName)}
          fullWidth
          // helperText={touched.firstName && errors.firstName}
          label="Biography"
          name="bot.biography"
          multiline
          rowsMax={4}
          rows={2}
          // onBlur={handleBlur}
          // onChange={handleChange}
          value={storyData.general.bot.biography}
          variant="outlined"
          className={classes.marginBottom}
        />
      </Box>
      <Box p={1} display="flex" flexDirection="row" width="100%">
        <Box flexGrow={2} mr={2}>
          <Typography id="discrete-slider" gutterBottom className={classes.label}>
            Typing speed
          </Typography>
          <Slider
            defaultValue={storyData.general.bot.speed}
            getAriaValueText={() => `${storyData.general.bot.speed}`}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={80}
            max={200}
          />
        </Box>
        <Box flexGrow={1} mr={2}>
          <TextField
            fullWidth
            label="Ballon"
            name="bot.ballon"
            select
            value={storyData.general.bot.ballon}
          >
            {state.story.colors.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box width="50px" className={classes.avatarSelectBox}>
          <TextField
            fullWidth
            label="Avatar"
            name="bot.avatar"
            select
            value={storyData.general.bot.avatar}
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
    </>
  );
};

Bot.propTypes = {
  storyData: PropTypes.object,
};

export default Bot;
