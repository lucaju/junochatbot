import { CardContent, Typography } from '@material-ui/core';
import Card, { CardProps } from '@material-ui/core/Card';
import { UserGroup } from '@src/types';
import React, { FC, useState } from 'react';

interface GroupCardProps extends CardProps {
  group: UserGroup;
  handleEditClick: (groupId: number) => void;
}

const GroupCard: FC<GroupCardProps> = ({ group, handleEditClick, ...rest }) => {
  const [elevation, setElevation] = useState(0);

  const mouseOver = () => setElevation(6);
  const mouseOut = () => setElevation(0);

  return (
    <Card
      elevation={elevation}
      onClick={() => handleEditClick(group.id)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      sx={{ cursor: 'pointer', my: 2, mx: 1 }}
      {...rest}
    >
      <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
        <Typography variant="subtitle1">{group.name}</Typography>
        <Typography variant="body2">
          <Typography component="span" variant="overline">
            {group.description}
          </Typography>{' '}
          | {group.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
