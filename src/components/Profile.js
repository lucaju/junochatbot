import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  makeStyles,
  MenuItem,
  Popover,
  Select,
} from '@material-ui/core';
import { useApp } from 'src/overmind';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles(({ spacing }) => ({
  root: { width: 240 },
  listItemIconRoot: { minWidth: 40 },
  signOutArea: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
}));

const Profile = ({ anchor, handleClose }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const open = Boolean(anchor);

  const switchAppearenceMode = () => {
    actions.ui.setDarkMode(!state.ui.darkMode);
  };

  const switchLanguage = (e) => {
    actions.ui.switchLanguage(e.value);
    //TODO: USE I18n
  };

  const handleChangeAvatar = () => {
    //TODO
  };

  const handleChangePassword = () => {
    //TODO
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
        <ListItem button>
          <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Change Avatar" />
        </ListItem>
        <ListItem button>
          <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
      </List>
      <Divider />
      <Box
        className={classes.signOutArea}
        display="flex"
        justifyContent="center"
      >
        <Button onClick={handleSignOut} size="small" variant="outlined">
          Sign Out
        </Button>
      </Box>
    </Popover>
  );
};

Profile.propTypes = {
  anchor: PropTypes.any,
  handleClose: PropTypes.func,
};

export default Profile;
