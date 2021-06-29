import { Card, Typography } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { Tag } from '@src/types';

interface TagCardProps {
  handleEditClick: (groupId: number) => void;
  tag: Tag;
}

const TagCard: FC<TagCardProps> = ({ handleEditClick, tag }) => {
  const [elevation, setElevation] = useState(0);

  const mouseOver = () => setElevation(6);
  const mouseOut = () => setElevation(0);

  return (
    <Card
      elevation={elevation}
      onClick={() => handleEditClick(tag.id)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      sx={{ cursor: 'pointer', width: 'max-content', m: 1, p: 1, borderRadius: 0.5 }}
    >
      <Typography variant="body2" sx={{ textTransform: 'uppercase' }}>
        {tag.name}
      </Typography>
    </Card>
  );
};

export default TagCard;
