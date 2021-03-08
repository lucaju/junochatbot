import { Box, Button, makeStyles, Toolbar } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchBox from 'src/components/menubar/SearchBox';

const useStyles = makeStyles(({ spacing }) => ({
  marginRight: { marginRight: spacing(2) },
}));

const MenuBar = ({
  disabledFilters,
  handleDetailOpen,
  handleSearch,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['intents']);

  return (
    <Toolbar className={classes.root} disableGutters variant="dense">
      <Button
        color="primary"
        onClick={() => handleDetailOpen()}
        startIcon={<AddCircleOutlineIcon />}
      >
       {t('createIntent')}
      </Button>
      {!disabledFilters && (
        <>
          <Box flexGrow={1} />
          <SearchBox
            className={classes.marginRight}
            handleSearch={handleSearch}
          />
        </>
      )}
    </Toolbar>
  );
};

MenuBar.DefaultProps = {
  disabledFilters: false,
};

MenuBar.propTypes = {
  disabledFilters: PropTypes.bool,
  handleDetailOpen: PropTypes.func,
  handleSearch: PropTypes.func,
};

export default MenuBar;
