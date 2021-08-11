import { CardContent, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Card, { CardProps } from '@material-ui/core/Card';
import { UserGroup } from '@src/types';
import React, { FC, useState } from 'react';

interface GroupCardProps extends CardProps {
  group: UserGroup;
  handleEditClick: (groupId: number) => void;
}

const GroupCard: FC<GroupCardProps> = ({ group, handleEditClick, ...rest }) => {
  const [elevation, setElevation] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const mouseOver = () => setElevation(6);
  const mouseOut = () => setElevation(0);

  return (
    <Card
      elevation={elevation}
      onClick={() => handleEditClick(group.id)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      sx={{
        cursor: 'pointer',
        width: isMobile ? 'max-content' : 'auto',
        mb: isMobile ? 0 : 1,
        mr: isMobile ? 1 : 0,
        my: 2,
        mx: 1
      }}
    >
      <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
        <Typography variant="subtitle1">{group.name}</Typography>
        <Typography variant="body2">
          {group.institution && (
            <Typography component="span" variant="overline">
              {group.institution}
            </Typography>
          )}
          {group.institution && group.description && <>{` | `}</>}
          {group.description && <>{group.description}</>}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
