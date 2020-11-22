import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Popover } from '@material-ui/core';
import { useApp } from 'src/overmind';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const Profile = ({ anchor, handleClose }) => {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const open = Boolean(anchor);

  const switchAppearenceMode = () => {
    actions.ui.setDarkMode(!state.ui.darkMode);
  };

  const handleSignOut = () => {
    const isSignIn = actions.session.signOut();
    if (!isSignIn) navigate('/login', { replace: true });
  };

  return (
    <Popover
      id="profile"
      open={open}
      anchorEl={anchor}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        p={2}
        width={225}
      >
        <Box alignItems="start" display="flex" flexDirection="column">
          <Button
            onClick={switchAppearenceMode}
            startIcon={
              state.ui.darkMode ? <Brightness7Icon /> : <Brightness4Icon />
            }
          >
            Appearence: {state.ui.darkMode ? 'Dark' : 'Light'}
          </Button>
          <Divider />
          <Button onClick={handleSignOut} startIcon={<ExitToAppIcon />}>
            Sign Out
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

Profile.propTypes = {
  anchor: PropTypes.any,
  handleClose: PropTypes.func,
};

export default Profile;
