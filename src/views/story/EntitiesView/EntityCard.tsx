import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useRefresh } from 'muuri-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Entity } from '../../../types';

interface EntityCardProps {
  className: string;
  entity: Entity;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: { width: 320 },
  cardContent: {
    backgroundColor: palette.background.default,
    padding: spacing(1),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    '&:last-child': { paddingBottom: spacing(1) },
  },
  cardHover: { backgroundColor: palette.background.paper },
  outputLabel: {
    textDecoration: 'underline',
  },
}));

const EntityCard: FC<EntityCardProps> = ({ className, entity, ...rest }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(0);
  const cardRef = useRef<any | undefined>();
  const [size, setSize] = useState();

  const { category, description, extendable, name, outputFormat } = entity;

  //Use effects to refrech Muuri after elements sets its size
  useEffect(() => {
    setSize(cardRef.current.offsetWidth);
  }, []);

  useRefresh([size]);

  const mouseOver = () => {
    setHover(true);
    setElevation(1);
  };

  const mouseOut = () => {
    setHover(false);
    setElevation(0);
  };

  return (
    <Card
      ref={cardRef}
      className={clsx(classes.root, className)}
      elevation={elevation}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      {...rest}
    >
      <CardContent
        classes={{
          root: clsx(classes.cardContent, hover && classes.cardHover),
        }}
      >
        <Box display="flex" flexDirection="row">
          <Typography gutterBottom variant="button">
            {category}
          </Typography>
          <Box flexGrow={1} />
          {extendable && (
            <Typography gutterBottom variant="overline">
              Extendable
            </Typography>
          )}
        </Box>
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>
        <Typography gutterBottom variant="body2">
          {description}
        </Typography>
        <Typography gutterBottom variant="body2">
          <span className={classes.outputLabel}>Output Format</span>:{' '}
          {outputFormat}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EntityCard;
