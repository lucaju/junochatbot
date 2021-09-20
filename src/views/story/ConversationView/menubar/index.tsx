import { Box, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBox from '@src/components/menubar/SearchBox';
import { useAppState } from '@src/overmind';
import { HandleFilterType } from '@src/types';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface MenuBarProps {
  handleDetailOpen: () => void;
  handleSearch: (value: string) => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
}

const THRESHOOLD_SHOW_SEARCH = 3; //items

const MenuBar: FC<MenuBarProps> = ({ handleDetailOpen, handleSearch, updateFilter }) => {
  const { intents } = useAppState();
  const { t } = useTranslation();

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCreateClick = () => handleDetailOpen();

  return (
    <Stack direction={isSM ? 'column' : 'row'} spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
      <Button color="primary" onClick={handleCreateClick} startIcon={<AddCircleOutlineIcon />}>
        {t('intents:createIntent')}
      </Button>
      {!isSM && <Box flexGrow={1} />}
      {intents.collection.length > THRESHOOLD_SHOW_SEARCH && (
        <SearchBox handleSearch={handleSearch} />
      )}
    </Stack>
  );
};

export default MenuBar;
