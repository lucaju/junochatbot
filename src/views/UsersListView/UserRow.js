import {
  Avatar,
  Box,
  Chip,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
  avatarIcon: {
    height: 40,
    width: 40,
  },
  chip: {
    marginRight: theme.spacing(1),
  },
}));

const UserRow = ({ user, handleEditClick }) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(null);

  return (
    <TableRow
      hover
      key={user.id}
      onMouseEnter={() => setIsHover(user.id)}
      onMouseLeave={() => setIsHover(null)}
    >
      <TableCell padding="checkbox">
        {isHover === user.id && (
          <IconButton
            color="primary"
            aria-label="Edit"
            component="span"
            onClick={() => handleEditClick(user.id)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </TableCell>
      <TableCell>
        <Box alignItems="center" display="flex">
          <Avatar
            className={classes.avatar}
            src={user.avatar && `/assets/users/images/${user.avatar}`}
          >
            {!user.avatar && (
              <AccountCircleIcon className={classes.avatarIcon} />
            )}
          </Avatar>
          <Typography color="textPrimary" variant="body1">
            {user.firstName} {user.lastName}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.group}</TableCell>
      <TableCell>
        {user.stories &&
          user.stories.map(({ id, title }) => (
            <Chip
              className={classes.chip}
              key={id}
              label={title}
              variant="outlined"
            />
          ))}
      </TableCell>
    </TableRow>
  );
};

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
  handleEditClick: PropTypes.func,
};

export default UserRow;