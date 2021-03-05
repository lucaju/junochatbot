import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useRefresh } from 'muuri-react';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

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
  cardInactive: {
    backgroundColor: palette.background.default,
    opacity: 0.7,
  },
}));

const TagCard = ({ className, handleEditClick, tag, ...rest }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(1);
  const cardRef = useRef(null);
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

  const triggerEditTag = () => handleEditClick(tag);

  return (
    <Card
      ref={cardRef}
      className={clsx(
        classes.root,
        className,
        hover && classes.cardHover,
        !tag.active && classes.cardInactive
      )}
      elevation={tag.active ? elevation : elevation - 1}
      onClick={triggerEditTag}
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

TagCard.propTypes = {
  className: PropTypes.string,
  handleEditClick: PropTypes.func,
  tag: PropTypes.object,
};

export default TagCard;
