import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useApp } from 'src/overmind';

const useStyles = makeStyles((theme) => ({
  dialogSection: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  heading: {
    textAlign: 'center',
    marginBottom: theme.spacing(1.5),
  },
  marginBottom: {
    marginBottom: theme.spacing(1.5),
  },
  error: {
    marginTop: theme.spacing(1),
    color: theme.palette.secondary.light,
    textAlign: 'center',
  },
}));

const AddStoryDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [error, setError] = useState();
  const [isAdmin] = useState(state.session.isAdmin);
  const [isInstructor] = useState(state.session.isInstructor);
  const [isUserBehalf, setIsUserBehalf] = React.useState(false);

  const newStoryDefault = {
    title: '',
    language: state.users.defaultLanguage,
    user: null,
  };

  const [story, setStory] = useState(newStoryDefault);

  useEffect(() => {
     if (open) setStory(newStoryDefault);
  }, [open]);

  const handleChange = (event) => {
    setStory({
      ...story,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnUserBehalf = () => {
    setIsUserBehalf(!isUserBehalf);
  };

  const handleCancelButton = () => {
    handleClose();
  };

  const submit = async () => {
    const res = await actions.story.createStory(story);
    console.log(res);
    if (res.error) {
      setError(res.error);
      return;
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      aria-labelledby="user-details-dialog"
    >
      {error && (
        <Typography
          component="h2"
          variant="subtitle1"
          className={classes.error}
        >
          Oh oh. Server Error.
        </Typography>
      )}
      <DialogContent>
        <Grid
          container
          spacing={3}
          className={classes.dialogSection}
          justify="center"
        >
          <Grid item>
            <Typography variant="h6" className={classes.heading}>
              New Story
            </Typography>
            <TextField
              fullWidth
              label="Story title"
              name="title"
              onChange={handleChange}
              required
              value={story.title}
              variant="outlined"
              className={classes.marginBottom}
            />
            <TextField
              fullWidth
              label="Language"
              name="language"
              onChange={handleChange}
              required
              select
              value={story.language}
              variant="outlined"
            >
              {state.users.languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            {(isAdmin || isInstructor) && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isUserBehalf}
                    onChange={handleOnUserBehalf}
                    name="userBehalf"
                  />
                }
                label="User behalf?"
              />
            )}
            {(isAdmin || isInstructor) && isUserBehalf && (
              <TextField
                fullWidth
                label="On behalf of"
                name="user"
                onChange={handleChange}
                select
                value={story.user}
                variant="outlined"
              >
                {/* {state.users.list.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.firstName} {option.lastname}
                  </MenuItem>
                ))} */}
                <MenuItem key={1} value={1}>
                    Luciano Frizzera
                </MenuItem>
              </TextField>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelButton} color="primary">
          Cancel
        </Button>
        <Box flexGrow={1} />
        <Button onClick={submit} color="primary" variant="outlined">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddStoryDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddStoryDialog;
