import { Box, Button, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchBox from '@src/components/menubar/SearchBox';
import { HandleFilterType } from '@src/types';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface MenuBarProps {
  disabledFilters?: boolean;
  handleDetailOpen: () => void;
  handleSearch: (value: string) => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
}

const MenuBar: FC<MenuBarProps> = ({
  disabledFilters = false,
  handleDetailOpen,
  handleSearch,
  updateFilter,
}) => {
  const { t } = useTranslation(['intents']);

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCreateClick = () => handleDetailOpen();

  return (
    <Stack direction={isSM ? 'column' : 'row'} spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
      <Button color="primary" onClick={handleCreateClick} startIcon={<AddCircleOutlineIcon />}>
        {t('createIntent')}
      </Button>
      {!disabledFilters && (
        <>
          {!isSM && <Box flexGrow={1} />}
          <SearchBox handleSearch={handleSearch} />
        </>
      )}
    </Stack>
  );
};

export default MenuBar;
