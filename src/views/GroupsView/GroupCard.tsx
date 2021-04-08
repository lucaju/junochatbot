import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useRefresh } from 'muuri-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { UserGroup } from '../../types';

interface GroupCardProps {
  className: string;
  group: UserGroup;
  handleEditClick: (groupId: number) => void;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: { minWidth: 150 },
  cardContent: {
    padding: spacing(1),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    '&:last-child': {
      paddingBottom: spacing(1),
    },
  },
  cardHover: { cursor: 'pointer' },
  cardInactive: {
    backgroundColor: palette.background.default,
    opacity: 0.7,
  },
}));

const GroupCard: FC<GroupCardProps> = ({
  className,
  group,
  handleEditClick,
  ...rest
}) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(1);
  const cardRef = useRef<any | undefined>();
  const [size, setSize] = useState();

  //Use effects to refresh Muuri after elements sets its size
  useEffect(() => {
    setSize(cardRef.current.offsetWidth);
  }, []);

  useRefresh([size, group]);

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
        hover && classes.cardHover,
        !group.active && classes.cardInactive
      )}
      elevation={group.active ? elevation : elevation - 1}
      onClick={() => handleEditClick(group.id)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      {...rest}
    >
      <CardContent classes={{ root: classes.cardContent }}>
        <Typography variant="subtitle1">{group.name}</Typography>
        <Typography variant="overline">{group.institution}</Typography>
        <Typography variant="body2">{group.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
