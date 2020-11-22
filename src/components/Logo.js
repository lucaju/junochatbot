import React from 'react';
import { useApp } from 'src/overmind';

const Logo = (props) => {
  const { state } = useApp();

  return (
    <img
      src={state.ui.darkMode ? '/assets/logo_dark.png' : '/assets/logo.png'} 
      alt="Chat Stories"
      {...props}
    />
  );
};

export default Logo;
