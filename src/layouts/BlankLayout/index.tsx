import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const BlankLayout: FC = () => (
  <Box
    sx={{
      display: 'flex',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      backgroundColor: 'background.default',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        pt: 8,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: '1 1 auto',
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default BlankLayout;
