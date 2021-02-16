import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  filterActive: { width: 110 },
  marginRight: { marginRight: theme.spacing(2) },
}));

const filterActiveOptions = [
  { value: -1, name: 'All' },
  { value: true, name: 'Active' },
  { value: false, name: 'Inactive' },
];

const MenuBar = ({ handleDetailOpen, updateFilters }) => {
  const classes = useStyles();
  const [filterActive, setFilterActive] = useState(true);

  useEffect(() => {
    handleFilterActive(true);
    return () => {};
  }, []);

  const handleFilterActive = (value) => {
    setFilterActive(value);
    const reset = value === -1 ? true : false;
    updateFilters({ type: 'active', value, reset });
  };

  return (
    <Toolbar className={classes.root} variant="dense">
      <Button
        color="primary"
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => handleDetailOpen({})}
      >
        Add Group
      </Button>

      <Box flexGrow={1} />

      <Typography variant="subtitle1" className={classes.marginRight}>
        Filters
      </Typography>

      <TextField
        className={classes.filterActive}
        label="Active"
        name="filterActive"
        onChange={(e) => handleFilterActive(e.target.value)}
        select
        size="small"
        variant="outlined"
        value={filterActive}
      >
        {filterActiveOptions.map(({ name, value }) => (
          <MenuItem key={value} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </Toolbar>
  );
};

MenuBar.propTypes = {
  className: PropTypes.string,
  handleDetailOpen: PropTypes.func,
  handleFilterByGroup: PropTypes.func,
  updateFilters: PropTypes.func,
};

export default MenuBar;
