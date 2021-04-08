import React, { FC } from 'react';

interface LogoProps {
  type?: string;
  height?: string | number;
  className?: string;
}

const Logo: FC<LogoProps> = ({ type = 'full', height = 'auto', ...props }) => (
  <img
    src={`/assets/logo/logo_${type}.png`}
    height={height}
    alt="Juno Chatbot"
    {...props}
  />
);

export default Logo;
