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
import VideoCard from './VideoCard';

const useStyles = makeStyles(({ spacing}) => ({
  card: {
    minWidth: 300,
    margin: spacing(1)
  },
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
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
    >
      {videos.slice(0, limit).map((video) => (
        <VideoCard className={classes.card} key={video.id} video={video} />
      ))}
    </Box>
  );
};

Collection.propTypes = {
  className: PropTypes.string,
  videos: PropTypes.array.isRequired,
  handleDetailOpen: PropTypes.func,
};

export default Collection;
