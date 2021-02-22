import {
    IconButton,
    makeStyles,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(() => ({
  headerVisuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const headCells = [{ id: 'firstName', label: 'Sort' }];

const UsersListHeader = ({ handleDetailOpen, onRequestSort, order, orderBy }) => {
  const classes = useStyles();

  const createSortHandler = (property) => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <IconButton
            color="primary"
            variant="outlined"
            onClick={() => handleDetailOpen({})}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.headerVisuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

UsersListHeader.propTypes = {
  handleDetailOpen: PropTypes.func,
  onRequestSort: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

export default UsersListHeader;
