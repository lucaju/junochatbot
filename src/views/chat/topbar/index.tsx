import { AppBar, Box, IconButton, Popover, Toolbar, Typography } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Logo from '@src/components/Logo';
import { useAppState } from '@src/overmind';
import StoryCard from '@src/views/StoriesView/StoryCard';
import React, { FC, MouseEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

interface TopBarProps {
  sidebarWidth: number;
}

const TopBar: FC<TopBarProps> = ({ sidebarWidth }) => {
  const navigate = useNavigate();
  const { chat } = useAppState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const goBack = () => navigate(-1);

  const showStoryInfo = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${sidebarWidth}px)`, mr: `${sidebarWidth}px` }}
    >
      <Toolbar variant="dense">
        <IconButton onClick={goBack}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <RouterLink to="/">
          <Logo height={24} sx={{ ml: 0.5, mt: 0.5 }} type="simplified" />
        </RouterLink>
        <Box flexGrow={1} />
        <Typography mr={1} variant="h6">
          {chat.currentStory?.title}
        </Typography>
        <IconButton onClick={showStoryInfo}>
          <InfoOutlinedIcon />
        </IconButton>
      </Toolbar>
      <Popover
        anchorEl={anchorEl}
        id="story-info"
        onClose={handleClose}
        open={open}
        //@ts-expect-error
        placement="bottom-end"
        sx={{ top: 40, left: -312 }}
      >
        <Box sx={{ width: 400, m: -2 }}>
          {chat.currentStory && (
            <StoryCard showLaunch={false} showEdit={false} story={chat.currentStory} />
          )}
        </Box>
      </Popover>
    </AppBar>
  );
};

export default TopBar;
