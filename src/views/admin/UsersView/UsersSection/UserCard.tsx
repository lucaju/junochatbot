import { Avatar, Box, CardContent, IconButton, Stack, Typography } from '@material-ui/core';
import Card, { CardProps } from '@material-ui/core/Card';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import { APP_URL } from '@src/config/config.js';
import { User } from '@src/types';
import React, { FC, useState } from 'react';

interface UserCardProps extends CardProps {
  handleEditClick: (userId: number) => void;
  user: User;
}

const UserCard: FC<UserCardProps> = ({ handleEditClick, user, ...rest }) => {
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(1);

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
      elevation={elevation}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      sx={{ my: 2, mx: 1 }}
      {...rest}
    >
      <CardContent>
        <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-start">
          <Box width={60} mr={2}>
            <Avatar src={avatarUrl && `${APP_URL}/uploads/assets${avatarUrl}`}>
              {!avatarUrl && <AccountCircleIcon sx={{ height: 40, width: 40 }} />}
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
          <Stack width={40} direction="column" spacing={1}>
            {hover && (
              <IconButton onClick={() => handleEditClick(user.id)}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
