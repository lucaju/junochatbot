import {
  Box,
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useApp } from 'src/overmind';
import UserCard from './UserCard';
import UsersListHeader from './UsersListHeader';

const userTableWidth = 425;

const useStyles = makeStyles(() => ({
  container: {
    maxHeight: '75vh',
    overflowY: 'scroll',
    maxWidth: userTableWidth,
  },
  pagination: { maxWidth: userTableWidth },
}));

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const UsersList = ({ filters, groupId, handleDetailOpen }) => {
  const classes = useStyles();
  const { actions, state } = useApp();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(null);

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

  const handleChangeRowsPerPage = (event) => setRowsPerPage(event.target.value);
  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleEditClick = (userID) => handleDetailOpen(userID);

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

  const onRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <>
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
          <TableContainer className={classes.container}>
            <Table stickyHeader>
              <UsersListHeader
                handleDetailOpen={handleDetailOpen}
                onRequestSort={onRequestSort}
                order={order}
                orderBy={orderBy}
              />
              <TableBody>
                {stableSort(filterItems(), getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      handleEditClick={handleEditClick}
                      tabIndex={-1}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            className={classes.pagination}
            component="div"
            count={filterItems().length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
          />
        </PerfectScrollbar>
      )}
    </>
  );
};

UsersList.propTypes = {
  filters: PropTypes.object,
  groupId: PropTypes.any,
  handleDetailOpen: PropTypes.func,
};

export default UsersList;
