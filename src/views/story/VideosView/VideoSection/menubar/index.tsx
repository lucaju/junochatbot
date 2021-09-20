import { Box, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBox from '@src/components/menubar/SearchBox';
import { useActions, useAppState } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface MenuBarProps {
  handleDetailOpen: () => void;
  handleSearch: (value: string) => void;
}

const THRESHOOLD_SHOW_SEARCH = 3; //items

const MenuBar: FC<MenuBarProps> = ({ handleDetailOpen, handleSearch }) => {
  const { t } = useTranslation();
  const { ui, videos } = useAppState();
  const actions = useActions();

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSwitchTags = () => {
    actions.ui.setTagsPanelVisible(!ui.videoView.tagsPanelVisible);
  };

  return (
    <Stack
      direction={isSM ? 'column-reverse' : 'row'}
      spacing={2}
      justifyContent="flex-end"
      sx={{ pt: 3 }}
    >
      <Button
        color="primary"
        onClick={() => handleDetailOpen()}
        startIcon={<AddCircleOutlineIcon />}
      >
        {t('videos:addVideo')}
      </Button>
      {!isSM && <Box flexGrow={1} />}
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        {videos.collection.length > THRESHOOLD_SHOW_SEARCH && (
          <SearchBox handleSearch={handleSearch} />
        )}
        {!ui.videoView.tagsPanelVisible && (
          <Button onClick={handleSwitchTags} variant="outlined">
            {t('videos:showTags')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default MenuBar;
