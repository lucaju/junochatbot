import PropTypes from 'prop-types';
import React from 'react';

const Logo = ({ type, ...props }) => (
  <img src={`/assets/logo/logo_${type}.png`} alt="Juno Chatbot" {...props} />
);

Logo.defaultProps = {
  type: 'full',
  height: 'auto',
};

Logo.propTypes = {
  type: PropTypes.string,
};

export default Logo;
