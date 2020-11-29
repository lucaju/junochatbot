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
import TagRow from './TagRow';

const Collection = ({ handleDetailOpen, tags }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEditClick = (userID) => {
    handleDetailOpen(userID);
  };

  return (
    <>
      <PerfectScrollbar>
        <Box minWidth={750}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Intents</TableCell>
                <TableCell>Videos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tags.slice(0, limit).map((tag) => (
                <TagRow
                  key={tag.id}
                  tag={tag}
                  handleEditClick={handleEditClick}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={tags.length}
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
  tags: PropTypes.array.isRequired,
  handleDetailOpen: PropTypes.func,
};

export default Collection;
