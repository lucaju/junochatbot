import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  AppBar,
  Box,
  IconButton,
  Popover,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Logo from '@src/components/Logo';
import StoryCard from '@src/components/StoryCardFront';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, MouseEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface TopBarProps {
  sidebarWidth: number;
}

const TopBar: FC<TopBarProps> = ({ sidebarWidth }) => {
  const { chat } = useAppState();
  const actions = useActions();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const showStoryInfo = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReset = () => actions.chat.reset();

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position={isMobile ? 'fixed' : 'fixed'}
      sx={{
        width: isMobile ? '100vw' : `calc(100% - ${sidebarWidth}px)`,
        mr: isMobile ? 0 : `${sidebarWidth}px`,
      }}
    >
      <Toolbar variant="dense">
        <RouterLink to="/">
          <Logo height={24} sx={{ ml: 0.5, mt: 0.5 }} type="simplified" />
        </RouterLink>
        <Box flexGrow={1} />
        <Typography mr={1} variant="h6">
          {!isMobile && chat.currentStory?.title}
        </Typography>
        <IconButton onClick={showStoryInfo} size="small">
          <InfoOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={handleReset} size="small">
          <RestartAltIcon fontSize="small" />
        </IconButton>
      </Toolbar>
      <Popover
        anchorEl={anchorEl}
        id="story-info"
        onClose={handleClose}
        open={open}
        //@ts-expect-error
        placement="bottom-end"
        sx={{ top: 40, left: isMobile ? 0 : -312 }}
      >
        <Box sx={{ width: 400, m: -2 }}>
          {chat.currentStory && <StoryCard disabled story={chat.currentStory} />}
        </Box>
      </Popover>
    </AppBar>
  );
};

export default TopBar;
