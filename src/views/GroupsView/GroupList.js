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
import GroupRow from './GroupRow';

const useStyles = makeStyles(() => ({
  container: {
    maxHeight: '70vh',
    overflowY: 'scroll',
  },
}));

const GroupList = ({ filters, handleDetailOpen, ...rest }) => {
  const classes = useStyles();
  const { actions, state } = useApp();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await actions.users.getGroups();
      setIsLoading(false);
    };
    fetchData();
    return () => {};
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEditClick = (id) => {
    handleDetailOpen(id);
  };

  const filterItems = () => {
    return state.users.groups.filter((group) => {
      if (filters.size === 0) return true;
      let match = true;
      for (const [prop, value] of filters.entries()) {
        match = group[prop] === value;
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
                    <TableCell>Description</TableCell>
                    <TableCell>Institution</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterItems()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((group) => (
                      <GroupRow
                        key={group.id}
                        group={group}
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

GroupList.propTypes = {
  filters: PropTypes.object,
  handleDetailOpen: PropTypes.func,
};

export default GroupList;
