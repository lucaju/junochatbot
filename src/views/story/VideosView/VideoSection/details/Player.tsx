import { Box } from '@mui/material';
import React, { FC } from 'react';
import ReactPlayer from 'react-player/youtube';

interface PlayerProps {
  url?: string;
}

const Player: FC<PlayerProps> = ({ url = '' }) => (
  <Box display="flex" sx={{ position: 'relative', aspectRatio: '16 / 9' }}>
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      controls={true}
      style={{ position: 'absolute', top: 0, left: 0 }}
      onError={(e) => console.log('onError', e)}
    />
  </Box>
);

export default Player;
