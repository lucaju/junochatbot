import {
  Avatar,
  Box,
  Card,
  Chip,
  // Checkbox,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
}));

const Results = ({ className, users, ...rest }) => {
  const classes = useStyles();
  // const [selecteduserIds, setSelecteduserIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isHover, setIsHover] = useState(null);

  const getInitials = (name = '') => {
    return name
      .replace(/\s+/, ' ')
      .split(' ')
      .slice(0, 2)
      .map((v) => v && v[0].toUpperCase())
      .join('');
  };

  // const handleSelectAll = (event) => {
  //   let newSelecteduserIds;

  //   if (event.target.checked) {
  //     newSelecteduserIds = users.map((user) => user.id);
  //   } else {
  //     newSelecteduserIds = [];
  //   }

  //   setSelecteduserIds(newSelecteduserIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selecteduserIds.indexOf(id);
  //   let newSelecteduserIds = [];

  //   if (selectedIndex === -1) {
  //     newSelecteduserIds = newSelecteduserIds.concat(selecteduserIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelecteduserIds = newSelecteduserIds.concat(selecteduserIds.slice(1));
  //   } else if (selectedIndex === selecteduserIds.length - 1) {
  //     newSelecteduserIds = newSelecteduserIds.concat(
  //       selecteduserIds.slice(0, -1)
  //     );
  //   } else if (selectedIndex > 0) {
  //     newSelecteduserIds = newSelecteduserIds.concat(
  //       selecteduserIds.slice(0, selectedIndex),
  //       selecteduserIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelecteduserIds(newSelecteduserIds);
  // };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selecteduserIds.length === users.length}
                    color="primary"
                    indeterminate={
                      selecteduserIds.length > 0 &&
                      selecteduserIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  /> */}
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Stories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  onMouseEnter={() => setIsHover(user.id)}
                  onMouseLeave={() => setIsHover(null)}
                  // selected={selecteduserIds.indexOf(user.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    {isHover === user.id && (
                      <IconButton
                        color="primary"
                        aria-label="Edit"
                        component="span"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                    {/* <Checkbox
                    checked={selecteduserIds.indexOf(user.id) !== -1}
                    onChange={(event) => handleSelectOne(event, user.id)}
                    value="true"
                  /> */}
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar className={classes.avatar} src={user.avatarUrl}>
                        {getInitials(user.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.group}</TableCell>
                  <TableCell>
                    {user.stories.map(({ id, title }) => (
                      <Chip
                        className={classes.chip}
                        key={id}
                        label={title}
                        variant="outlined"
                      />
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired,
};

export default Results;
