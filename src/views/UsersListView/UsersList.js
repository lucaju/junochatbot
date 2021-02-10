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
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useApp } from 'src/overmind';
import UserRow from './UserRow';

const useStyles = makeStyles(() => ({}));

const UsersList = ({ filters, handleDetailOpen, users, ...rest }) => {
  const classes = useStyles();
  const { state } = useApp();
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
    <Card className={classes.root} {...rest}>
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
                  if (state.session.isAdmin) return true;
                  if (user.active === true) return true;
                })
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
  filters: PropTypes.object,
  handleDetailOpen: PropTypes.func,
  users: PropTypes.array.isRequired,
};

export default UsersList;
