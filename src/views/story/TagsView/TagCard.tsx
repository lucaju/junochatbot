import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useRefresh } from 'muuri-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Tag } from '../../../types';

interface TagCardProps {
  className: string;
  tag: Tag;
  handleEditClick: (groupId: number) => void;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {},
  cardContent: {
    padding: spacing(1),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    '&:last-child': {
      paddingBottom: spacing(1),
    },
  },
  cardHover: { cursor: 'pointer' },
}));

const TagCard: FC<TagCardProps> = ({ className, tag, handleEditClick, ...rest }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(1);
  const cardRef = useRef<any | undefined>();
  const [size, setSize] = useState();

  //Use effects to refrech Muuri after elements sets its size
  useEffect(() => {
    setSize(cardRef.current.offsetWidth);
  }, []);

  useRefresh([size, tag]);

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
      ref={cardRef}
      className={clsx(
        classes.root,
        className,
        hover && classes.cardHover
      )}
      elevation={elevation}
      onClick={() => handleEditClick(tag.id)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      {...rest}
    >
      <CardContent classes={{ root: classes.cardContent }}>
        <Typography variant="subtitle1">{tag.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default TagCard;
