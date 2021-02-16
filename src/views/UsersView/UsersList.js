import {
  Box,
  Card,
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useApp } from 'src/overmind';
import UserRow from './UserRow';

const useStyles = makeStyles(() => ({
  container: {
    maxHeight: '70vh',
    overflowY: 'scroll',
  },
}));

const UsersList = ({ filters, groupId, handleDetailOpen, ...rest }) => {
  const classes = useStyles();
  const { actions, state } = useApp();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (state.session.isAdmin) await actions.users.getGroups();
      fetchUsers();
    };
    fetchData();
    return () => {};
  }, [state.session.user.group]);

  useEffect(() => {
    fetchUsers();
    return () => {};
  }, [groupId]);

  const fetchUsers = async () => {
    setIsLoading(true);
    await actions.users.getUsers(groupId);
    setIsLoading(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEditClick = (userID) => {
    handleDetailOpen(userID);
  };

  const filterItems = () => {
    return state.users.list
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
      });
  };

  return (
    <Card className={classes.root} {...rest}>
      {isLoading ? (
        <Box
          display="flex"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress
            className={classes.spinner}
            size={60}
            thickness={4}
          />
        </Box>
      ) : (
        <PerfectScrollbar>
          <Box minWidth={750}>
            <TableContainer className={classes.container}>
              <Table stickyHeader>
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
                  {filterItems()
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
            </TableContainer>
          </Box>
          <TablePagination
            component="div"
            count={filterItems().length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PerfectScrollbar>
      )}
    </Card>
  );
};

UsersList.propTypes = {
  filters: PropTypes.object,
  groupId: PropTypes.any,
  handleDetailOpen: PropTypes.func,
};

export default UsersList;
