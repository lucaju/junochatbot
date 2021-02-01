import {
  Box,
  Card,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import UserRow from './UserRow';

const useStyles = makeStyles(() => ({}));

const UsersList = ({
  handleDetailOpen,
  className,
  users,
  filters,
  ...rest
}) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEditClick = (userID) => {
    handleDetailOpen(userID);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={750}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Stories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) => {
                  if (filters.size === 0) return true;
                  let match = true;
                  for (const [prop, value] of filters.entries()) {
                    match = user[prop] === value;
                    if (match === false) break;
                  }
                  return match;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    handleEditClick={handleEditClick}
                  />
                ))}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </PerfectScrollbar>
    </Card>
  );
};

UsersList.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired,
  handleDetailOpen: PropTypes.func,
  filters: PropTypes.object,
};

export default UsersList;
