import {
  Box,
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
import VideoRow from './VideoRow';

const useStyles = makeStyles(() => ({
  imageCell: { width: 120 },
  providerCell: { width: 80 },
}));

const Collection = ({ handleDetailOpen, videos }) => {
  const classes = useStyles();
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
                <TableCell className={classes.imageCell}></TableCell>
                <TableCell>Title</TableCell>
                <TableCell className={classes.providerCell}>Provider</TableCell>
                <TableCell>Tags</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.slice(0, limit).map((video) => (
                <VideoRow
                  key={video.id}
                  video={video}
                  handleEditClick={handleEditClick}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={videos.length}
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
  className: PropTypes.string,
  videos: PropTypes.array.isRequired,
  handleDetailOpen: PropTypes.func,
};

export default Collection;
