import {
  Backdrop,
  Box,
  Fab,
  Paper,
  Slider,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { useAppState } from '@src/overmind';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

interface playerEvent {
  loaded: number;
  loadedSeconds: number;
  played: number;
  playedSeconds: number;
}
interface StageProps {
  sidebarWidth: number;
}

const Stage: FC<StageProps> = ({ sidebarWidth }) => {
  const { chat } = useAppState();

  const [url, setUrl] = useState<string | undefined>();
  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    chat.currentVideo ? loadVideo(chat.currentVideo.url) : stopVideo();
    return () => {};
  }, [chat.currentVideo]);

  const loadVideo = (url: string) => {
    setPlayed(0);
    setUrl(url);
    setPlaying(true);
  };

  const stopVideo = () => {
    setPlayed(0);
    setUrl(undefined);
    setPlaying(false);
  };

  const handleProgress = (event: playerEvent) => setPlayed(event.played);
  const handleMute = () => setMuted(!muted);

  const handleOnPlayerClick = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Box width="100%">
      <Paper elevation={0} square sx={{ height: isMobile ? '75vh' : '100vh' }}>
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
            onClick={handleOnPlayerClick}
          >
            <ReactPlayer
              height="100%"
              muted={muted}
              onEnded={stopVideo}
              onError={(e) => console.log('onError', e)}
              onProgress={handleProgress}
              playing={playing}
              style={{ position: 'absolute', top: 0, left: 0 }}
              url={url}
              width="100%"
            />
          </Box>
          {playing && (
            <>
              <Backdrop
                invisible
                open={true}
                sx={{
                  width: isMobile ? '100vw' : `calc(100vw - ${sidebarWidth}px)`,
                  height: isMobile ? 'calc(75vh - 48px)' : 'calc(100vh - 48px)',
                  top: 48,
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  color: '#fff',
                }}
              >
                <Fab
                  aria-label="mute-sound"
                  size="small"
                  onClick={handleMute}
                  sx={{
                    position: 'absolute',
                    // right: `${sidebarWidth + 8}px`,
                    right: 8,
                    bottom: 8,
                    opacity: 0.25,
                  }}
                >
                  {muted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
                </Fab>
              </Backdrop>
              <Slider
                aria-label="timeline"
                disabled
                min={0}
                max={1}
                value={played}
                size="small"
                valueLabelDisplay="off"
              />
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Stage;
