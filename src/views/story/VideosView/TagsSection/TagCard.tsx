import { IconButton, Stack, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';
import { useActions, useAppState } from '@src/overmind';
import { Tag } from '@src/types';
import React, { FC, MouseEvent, useState } from 'react';
import { useLongPress } from 'react-use';

interface TagCardProps {
  handleEditClick: (id: number) => void;
  tag: Tag;
}

const TagCard: FC<TagCardProps> = ({ handleEditClick, tag }) => {
  const { ui } = useAppState();
  const actions = useActions();

  const [hover, setHover] = useState(false);

  const onLongPress = () => handleEditClick(tag.id);

  const defaultOptions = {
    isPreventDefault: true,
    delay: 500,
  };

  const longPressEvent = useLongPress(onLongPress, defaultOptions);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const mouseOver = () => setHover(true);
  const mouseOut = () => setHover(false);

  const handleEditButtonClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    handleEditClick(tag.id);
  };

  const onClick = () => {
    ui.videoView.tagFilter === tag.id
      ? actions.ui.resetTagFilter()
      : actions.ui.setTagFilter(tag.id);
  };

  return (
    <Stack
      {...longPressEvent}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      onClick={onClick}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      sx={{
        cursor: 'pointer',
        width: isMobile ? 'max-content' : 'auto',
        mb: isMobile ? 0 : 1,
        mr: isMobile ? 1 : 0,
        p: 1,
        borderRadius: 1,
        backgroundColor: ({ palette }) => {
          if (ui.videoView.tagFilter === tag.id) {
            return hover ? alpha(palette.primary.light, 0.6) : palette.primary.light;
          } else {
            return hover ? palette.action.hover : palette.background.paper;
          }
        },
      }}
    >
      <Typography variant="body2" sx={{ textTransform: 'uppercase', userSelect: 'none' }}>
        {tag.name}
      </Typography>
      {hover && !isMobile && (
        <IconButton
          onClick={handleEditButtonClick}
          size="small"
          sx={{
            ml: 2,
            width: 20,
            height: 20,
          }}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
      )}
    </Stack>
  );
};

export default TagCard;
