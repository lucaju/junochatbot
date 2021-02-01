import PropTypes from 'prop-types';
import React from 'react';
import { useApp } from 'src/overmind';

const Logo = ({ type, ...props }) => {
  const { state } = useApp();

  const path = '/assets/logo';
  const file = `logo_${type}.png`;
  // const file = `logo_${type}_${state.ui.darkMode}.png`;

  return <img src={`${path}/${file}`} alt="Juno Chatbot" {...props} />;
};

Logo.defaultProps = {
  type: 'full',
  height: 'auto',
};

Logo.propTypes = {
  type: PropTypes.string,
};

export default Logo;
