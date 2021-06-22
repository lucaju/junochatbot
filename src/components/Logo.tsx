import Box, { BoxProps } from '@material-ui/core/Box';
import React, { FC } from 'react';

interface LogoProps extends BoxProps {
  height?: string | number;
  type?: string;
}

const Logo: FC<LogoProps> = ({ height = 'auto', type = 'full', ...props }) => (
  <Box {...props}>
    <img alt="Juno Chatbot" height={height} src={`/assets/logo/logo_${type}.png`} />
  </Box>
);

export default Logo;
