import { Box, Fab, Paper, Toolbar, useTheme } from '@material-ui/core';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player/youtube';
import type { Video } from '@src/types';

interface StageProps {
  sidebarWidth: number;
  videoUrl?: string;
}

const Stage: FC<StageProps> = ({ sidebarWidth, videoUrl }) => {
  const { t } = useTranslation(['home']);
  const { chat } = useAppState();
  const actions = useActions();
  const theme = useTheme();

  const [url, setUrl] = useState<string>();
  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!chat.currentVideo) return;
    loadNewVideo(chat.currentVideo.url);
    return () => {};
  }, [chat.currentVideo]);

  const handleMute = () => {
    setMuted(!muted);
  };

  const loadNewVideo = (url: string) => {
    setPlayed(0);
    setUrl(url);
    setPlaying(true);
  };

  return (
    <Box width="100%">
      <Paper elevation={0} square sx={{ height: '100vh' }}>
        <Toolbar variant="dense" />
        <Box
          display="flex"
          flexDirection="column"
          height="calc(100% - 48px)"
          justifyContent="center"
        >
          <Box
            display="flex"
            sx={{
              position: 'relative',
              aspectRatio: '16 / 9',
            }}
          >
            <ReactPlayer
              url={url}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
              muted={muted}
              playing={playing}
            />
          </Box>
          {playing && (
            <Fab
              aria-label="mute-sound"
              size="small"
              onClick={handleMute}
              sx={{
                position: 'absolute',
                right: `${sidebarWidth + 8}px`,
                bottom: 8,
                opacity: 0.25,
              }}
            >
              {muted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
            </Fab>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Stage;
