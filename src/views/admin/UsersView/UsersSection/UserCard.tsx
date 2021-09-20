import { Avatar, Box, CardContent, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Card, { CardProps } from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { APP_URL } from '@src/config/config.js';
import { User } from '@src/types';
import React, { FC, useState } from 'react';

interface UserCardProps extends CardProps {
  handleEditClick: (userId: number) => void;
  user: User;
}

const UserCard: FC<UserCardProps> = ({ handleEditClick, user, ...rest }) => {
  const [hover, setHover] = useState(false);

  const { firstName, lastName, userName, avatarUrl, roleTypeId } = user;

  const mouseOver = () => setHover(true);
  const mouseOut = () => setHover(false);

  return (
    <Card
      elevation={hover ? 6 : 1}
      onClick={() => handleEditClick(user.id)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      sx={{ my: 2, mx: 1, cursor: 'pointer' }}
      {...rest}
    >
      <CardContent sx={{ p: '16px !important' }}>
        <Stack alignItems="center" spacing={2}>
          <Box
            sx={{
              padding: 0.25,
              borderRadius: '50%',
              borderStyle: 'solid',
              borderWidth: 4,
              borderColor: ({ palette }) =>
                roleTypeId === 'Admin'
                  ? alpha(palette.primary.light, 0.75)
                  : roleTypeId === 'Instructor'
                  ? alpha(palette.secondary.light, 0.75)
                  : palette.background.default,
            }}
          >
            <Avatar
              sx={{ height: 60, width: 60 }}
              src={avatarUrl && `${APP_URL}/uploads/assets${avatarUrl}`}
            >
              {!avatarUrl && <AccountCircleIcon sx={{ height: 60, width: 60 }} />}
            </Avatar>
          </Box>
          <Box flexGrow={1}>
            <Stack direction="column" alignItems="center">
              {roleTypeId !== 'Student' && (
                <Typography
                  sx={{
                    mt: -0.5,
                    px: 0.5,
                    pt: 0.25,
                    borderRadius: 0.5,
                    backgroundColor: ({ palette }) =>
                      roleTypeId === 'Admin'
                        ? alpha(palette.primary.light, 0.25)
                        : roleTypeId === 'Instructor'
                        ? alpha(palette.secondary.light, 0.25)
                        : alpha(palette.text.secondary, 0.05),
                    textTransform: 'uppercase',
                  }}
                  variant="caption"
                >
                  {roleTypeId}
                </Typography>
              )}
              <Typography align="center" variant="button">
                {firstName} {lastName}
              </Typography>
              <Typography variant="body2">{userName}</Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserCard;

// return (
//   <Card
//     elevation={hover ? 6 : 1}
//     onClick={() => handleEditClick(user.id)}
//     onMouseEnter={mouseOver}
//     onMouseLeave={mouseOut}
//     sx={{ my: 2, mx: 1, cursor: 'pointer' }}
//     {...rest}
//   >
//     <CardContent sx={{ p: '16px !important' }}>
//       <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
//         <Avatar src={avatarUrl && `${APP_URL}/uploads/assets${avatarUrl}`}>
//           {!avatarUrl && <AccountCircleIcon sx={{ height: 40, width: 40 }} />}
//         </Avatar>
//         <Box flexGrow={1}>
//           <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
//             <Typography variant="button">
//               {firstName} {lastName}
//               {roleTypeId !== 'Student' && (
//                 <Typography
//                   sx={{
//                     ml: 1,
//                     px: 0.5,
//                     py: 0.25,
//                     borderRadius: 0.5,
//                     backgroundColor: ({ palette }) =>
//                       roleTypeId === 'Admin'
//                         ? alpha(palette.primary.light, 0.25)
//                         : roleTypeId === 'Instructor'
//                         ? alpha(palette.secondary.light, 0.25)
//                         : alpha(palette.text.secondary, 0.05),
//                   }}
//                   variant="caption"
//                 >
//                   {roleTypeId}
//                 </Typography>
//               )}
//             </Typography>
//             <Typography variant="body2">{userName}</Typography>
//           </Stack>
//         </Box>
//       </Stack>
//     </CardContent>
//   </Card>
// );
