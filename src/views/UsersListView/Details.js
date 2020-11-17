import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useApp } from 'src/overmind';
import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
  },
  dialogContent: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  dialogSection: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  avatar: {
    height: 80,
    width: 80,
  },
  avatarIcon: {
    height: 70,
    width: 70,
  },
  inputAvatar: {
    display: 'none',
  },
  avatarButton: {
    marginTop: theme.spacing(1),
  },
  marginBottom: {
    marginBottom: theme.spacing(1.5),
  },
  credentialsSection: {
    backgroundColor: theme.palette.grey[100],
    marginBottom: theme.spacing(1),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  error: {
    marginTop: theme.spacing(1),
    color: theme.palette.secondary.light,
    textAlign: 'center',
  },
}));

const Details = ({ open, handleDetailClose, userId }) => {
  const classes = useStyles();
  const { state, actions } = useApp();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [isAdmin] = useState(state.session.isAdmin);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const newUserDefault = {
    avatarUrl: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    language: state.users.defaultLanguage,
    roleType: state.users.defaultRoleType,
    group: state.users.defaultGroup,
  };

  if (!isAdmin) newUserDefault.group = state.session.user.group;

  const [userData, setUserData] = useState(newUserDefault);

  useEffect(() => {
    if (open && userId !== 0) {
      const loadSelectedUserData = async (id) => {
        const selectedUserData = await actions.users.getUser(id);
        selectedUserData.password = '';
        setUserData(selectedUserData);
      };
      loadSelectedUserData(userId);
    }
    if (open && userId === 0) {
      setUserData(newUserDefault);
    }
    return () => {};
  }, [open]);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleDeleteStoryLink = (storyId) => {
    setUserData({
      ...userData,
      stories: userData.stories.filter((story) => story.id !== storyId),
    });
  };

  const handleDeleteButton = () => {
    setDeleteDialogOpen(true);
  };

  const handleCancelButton = () => {
    handleDetailClose();
    open = false;
  };

  const submit = async () => {
    const res = await actions.users.save(userData);
    if (res.error) {
      setError(res.error);
      return;
    }
    handleDetailClose();
    open = false;
  };

  const handleDeleteClose = async (userId) => {
    if (userId) {
      await actions.users.deleteUser(userId);
    }
    setDeleteDialogOpen(false);
    handleDetailClose();
    open = false;
  };

  return (
    <Dialog
      open={open}
      onClose={handleDetailClose}
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
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={3} className={classes.dialogSection}>
          <Grid
            item
            md={3}
            xs={12}
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Avatar
              className={classes.avatar}
              src={userData.avatar && `/assets/users/images/${userData.avatar}`}
            >
              {!userData.avatar && (
                <AccountCircleIcon className={classes.avatarIcon} />
              )}
            </Avatar>
            <input
              accept="image/*"
              className={classes.inputAvatar}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="small"
                className={classes.avatarButton}
              >
                <PhotoCamera fontSize="inherit" />
              </IconButton>
            </label>
          </Grid>
          <Grid item md={9} xs={12}>
            <TextField
              fullWidth
              // helperText="Please specify the first name"
              label="First name"
              name="firstName"
              onChange={handleChange}
              required
              value={userData.firstName}
              variant="outlined"
              className={classes.marginBottom}
            />
            <TextField
              fullWidth
              // helperText="Please specify the last name"
              label="Last name"
              name="lastName"
              onChange={handleChange}
              required
              value={userData.lastName}
              variant="outlined"
              className={classes.marginBottom}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          className={clsx(classes.dialogSection, classes.credentialsSection)}
        >
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              onChange={handleChange}
              required
              value={userData.email}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={userData.password}
                name="password"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.dialogSection}>
          <Grid item md={3} xs={12}>
            <TextField
              fullWidth
              label="Language"
              name="language"
              onChange={handleChange}
              required
              select
              value={userData.language}
              variant="outlined"
            >
              {state.users.languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth
              label="Role"
              name="roleType"
              onChange={handleChange}
              required
              select
              value={userData.roleType}
              disabled={!isAdmin}
              variant="outlined"
            >
              {state.users.roleTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={5} xs={12}>
            <TextField
              fullWidth
              label="Group"
              name="group"
              onChange={handleChange}
              select
              value={userData.group}
              disabled={!isAdmin}
              variant="outlined"
            >
              {state.users.groups.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        {userData.id && (
          <Grid container spacing={3} className={classes.dialogSection}>
            <Grid item md={12} xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Stories
              </Typography>
              {userData.stories.length > 0 ? (
                userData.stories.map(({ id, title }) => (
                  <Chip
                    className={classes.chip}
                    key={id}
                    label={title}
                    variant="outlined"
                    onDelete={() => handleDeleteStoryLink(id)}
                  />
                ))
              ) : (
                <Typography variant="body2" gutterBottom>
                  No stories
                </Typography>
              )}
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteButton} color="default">
          Delete
        </Button>
        <Box flexGrow={1} />
        <Button onClick={handleCancelButton} color="primary">
          Cancel
        </Button>
        <Box flexGrow={1} />
        <Button onClick={submit} color="primary" variant="outlined">
          Save
        </Button>
      </DialogActions>
      <DeleteDialog
        open={deleteDialogOpen}
        handleDeleteClose={handleDeleteClose}
        userId={userData.id}
      />
    </Dialog>
  );
};

Details.propTypes = {
  open: PropTypes.bool,
  handleDetailClose: PropTypes.func,
  userId: PropTypes.any,
};

export default Details;
