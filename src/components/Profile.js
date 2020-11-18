import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Popover } from '@material-ui/core';
import { useApp } from 'src/overmind';

const Profile = ({ anchor, handleClose }) => {
  const { actions } = useApp();
  const navigate = useNavigate();
  const open = Boolean(anchor);

  const handleSignOut = () => {
    console.log('Signing Out');
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
      <Button onClick={handleSignOut}>Sign Out</Button>
    </Popover>
  );
};

Profile.propTypes = {
  anchor: PropTypes.any,
  handleClose: PropTypes.func,
};

export default Profile;
