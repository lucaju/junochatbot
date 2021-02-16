import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  MenuItem,
  Popover,
  Select,
  Switch,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import LanguageIcon from '@material-ui/icons/Language';
import LockIcon from '@material-ui/icons/Lock';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from 'src/overmind';
import AvatarDialog from './AvatarDialog';
import PasswordDialog from './PasswordDialog';

const useStyles = makeStyles(({ spacing }) => ({
  root: { width: 240 },
  listItemIconRoot: { minWidth: 40 },
}));

const Profile = ({ anchor, handleClose }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();

  const open = Boolean(anchor);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [avatardDialogOpen, setAvatardDialogOpen] = useState(false);

  const switchAppearenceMode = () => {
    actions.ui.setDarkMode(!state.ui.darkMode);
  };

  const switchLanguage = (e) => {
    actions.ui.switchLanguage(e.value);
    //TODO: USE I18n
  };

  const handleSignOut = () => {
    const isSignIn = actions.session.signOut();
    if (!isSignIn) navigate('/login', { replace: true });
  };

  return (
    <Popover
      anchorEl={anchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id="profile"
      onClose={handleClose}
      open={open}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignContent="flex-start"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          // onClick={handleProfileClick}
          src={
            state.session.user.avatarUrl &&
            `/assets/users/images/${state.session.user.avatarUrl}`
          }
        >
          {!state.session.user.avatarUrl && <AccountCircleIcon />}
        </Avatar>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignContent="flex-start"
          ml={2}
          pt={0}
        >
          <Typography variant="button">
            {state.session.user.firstName} {state.session.user.lastName}
          </Typography>
          <Typography variant="body2">{state.session.user.userName}</Typography>
          <Typography variant="caption">Dawson College</Typography>
          {state.session.user.groups.length > 0 && (
            <Typography>{state.session.user.groups[0].name}</Typography>
          )}
        </Box>
      </Box>

      <Divider />
      <List className={classes.root}>
        <ListItem>
          <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
            {state.ui.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemIcon>
          <ListItemText id="dark-mode" primary="Dark Mode" />
          <ListItemSecondaryAction>
            <Switch
              checked={state.ui.darkMode}
              edge="end"
              inputProps={{ 'aria-labelledby': 'dark-mode' }}
              onChange={switchAppearenceMode}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Language" />
          <ListItemSecondaryAction>
            <Select
              onChange={(e) => switchLanguage(e.target)}
              value={state.ui.languageCode}
            >
              {state.ui.languages.map(({ value, name }) => (
                <MenuItem key={value} value={value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Divider />
      <List className={classes.root}>
        <ListItem button onClick={() => setAvatardDialogOpen(true)}>
          <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Change Avatar" />
        </ListItem>
        <ListItem button onClick={() => setPasswordDialogOpen(true)}>
          <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
      </List>
      <Divider />
      <Box display="flex" justifyContent="center" mt={2} mb={2}>
        <Button onClick={handleSignOut} size="small" variant="outlined">
          Sign Out
        </Button>
      </Box>
      <AvatarDialog
        handleClose={() => setAvatardDialogOpen(false)}
        open={avatardDialogOpen}
      />
      <PasswordDialog
        handleClose={() => setPasswordDialogOpen(false)}
        open={passwordDialogOpen}
      />
    </Popover>
  );
};

Profile.propTypes = {
  anchor: PropTypes.any,
  handleClose: PropTypes.func,
};

export default Profile;
