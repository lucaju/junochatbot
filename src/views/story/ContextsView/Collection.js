import {
  Box,
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
import ContextRow from './ContextRow';

const Collection = ({ contexts }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <PerfectScrollbar>
        <Box minWidth={750}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Input</TableCell>
                <TableCell>Output</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contexts.slice(0, limit).map((context) => (
                <ContextRow key={context.id} context={context} />
              ))}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={contexts.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </PerfectScrollbar>
    </>
  );
};

Collection.propTypes = {
  contexts: PropTypes.array.isRequired,
};

export default Collection;
