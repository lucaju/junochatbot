import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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

const useStyles = makeStyles((theme) => ({
  root: {
    // height: 20,
  },
  filterActive: { width: 110 },
  filterRole: { width: 110 },
  marginRight: { marginRight: theme.spacing(2) },
}));

const filterRoleOptions = [
  { value: 'all', name: 'All' },
  { value: 1, name: 'Admin' },
  { value: 2, name: 'Instructor' },
  { value: 3, name: 'Student' },
];

const filterActiveOptions = [
  { value: 'all', name: 'All' },
  { value: true, name: 'Active' },
  { value: false, name: 'Inactive' },
];

const MenuBar = ({ handleDetailOpen, updateFilters }) => {
  const classes = useStyles();
  const [filterRole, setFilterRole] = useState('all');
  const [filterActive, setFilterActive] = useState('all');

  const handleFilterRole = (value) => {
    setFilterRole(value);
    const reset = value === 'all' ? true : false;
    updateFilters({ type: 'roleTypeId', value, reset });
  };

  const handleFilterActive = (value) => {
    setFilterActive(value);
    const reset = value === 'all' ? true : false;
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
        Add user
      </Button>

      <Box flexGrow={1} />

      <Typography variant="subtitle1" className={classes.marginRight}>
        Filters
      </Typography>

      <TextField
        className={clsx(classes.filterRole, classes.marginRight)}
        label="Role"
        name="filterRole"
        onChange={(e) => handleFilterRole(e.target.value)}
        select
        value={filterRole}
        variant="outlined"
        size="small"
      >
        {filterRoleOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        className={classes.filterActive}
        label="Active"
        name="filterAcitve"
        onChange={(e) => handleFilterActive(e.target.value)}
        select
        value={filterActive}
        variant="outlined"
        size="small"
      >
        {filterActiveOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </Toolbar>
  );
};

MenuBar.propTypes = {
  className: PropTypes.string,
  handleDetailOpen: PropTypes.func,
  updateFilters: PropTypes.func,
};

export default MenuBar;
