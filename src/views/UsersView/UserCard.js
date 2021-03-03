import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import { json } from 'overmind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { APP_URL } from '../../config/config.js';

const useStyles = makeStyles(({ palette, spacing }) => ({
  avatar: { marginRight: spacing(2) },
  avatarIcon: {
    height: 40,
    width: 40,
  },
  cardInactive: {
    backgroundColor: palette.background.default,
    opacity: 0.7,
  },
  editButton: { marginTop: -spacing(1) },
}));

const UserRow = ({ className, handleEditClick, user, ...rest }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(1);

  const { firstName, lastName, userName, active, avatarUrl, groups } = user;

  const mouseOver = () => {
    setHover(true);
    setElevation(6);
  };

  const mouseOut = () => {
    setHover(false);
    setElevation(1);
  };

  return (
    <Card
      className={clsx(
        classes.root,
        className,
        !active && classes.cardInactive
      )}
      elevation={active ? elevation : elevation-1}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Box width={60}>
            <Avatar
              className={classes.avatar}
              // src={avatarUrl && `/uploads/assets${avatarUrl}`}
              src={avatarUrl && `${APP_URL}/uploads/assets${avatarUrl}`}
            >
              {!avatarUrl && (
                <AccountCircleIcon className={classes.avatarIcon} />
              )}
            </Avatar>
          </Box>
          <Box flexGrow={1}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                color={active ? 'textPrimary' : 'textSecondary'}
                variant="button"
              >
                {firstName} {lastName}
              </Typography>
              <Typography
                color={active ? 'textPrimary' : 'textSecondary'}
                variant="body2"
              >
                {userName}
              </Typography>
              {groups?.length > 0 && (
                <Typography
                  color={active ? 'textPrimary' : 'textSecondary'}
                  variant="caption"
                >
                  {groups.map((group) => group.name).join(' • ')}
                </Typography>
              )}
            </Box>
          </Box>
          <Box width={40}>
            {hover && (
              <IconButton
                className={classes.editButton}
                onClick={() => handleEditClick(json(user))}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

UserRow.propTypes = {
  className: PropTypes.string,
  handleEditClick: PropTypes.func,
  user: PropTypes.object.isRequired,
};

export default UserRow;
