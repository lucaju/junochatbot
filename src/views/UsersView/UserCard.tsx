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
import { useRefresh } from 'muuri-react';
import React, { FC, useState } from 'react';
import { APP_URL } from '../../config/config.js';
import { User } from '../../types';

interface UserCarddProps {
  className: string;
  user: User;
  handleEditClick: (userId: number) => void;
}

const useStyles = makeStyles(({ palette, spacing }) => ({
  avatar: { marginRight: spacing(2) },
  avatarIcon: {
    height: 40,
    width: 40,
  },
  editButton: { marginTop: -spacing(1) },
}));

const UserCard: FC<UserCarddProps> = ({
  className,
  user,
  handleEditClick,
  ...rest
}) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(1);

  useRefresh([user]);

  const { firstName, lastName, userName, avatarUrl } = user;

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
      className={className}
      elevation={elevation}
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
              <Typography variant="button">
                {firstName} {lastName}
              </Typography>
              <Typography variant="body2">{userName}</Typography>
            </Box>
          </Box>
          <Box width={40}>
            {hover && (
              <IconButton
                className={classes.editButton}
                onClick={() => handleEditClick(user.id)}
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

export default UserCard;
