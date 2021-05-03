import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useRefresh } from 'muuri-react';
import React, { FC, useState, useEffect } from 'react';
import { Video } from '@src/types';

interface VideoCardProps {
  className: string;
  video: Video;
  handleEditClick: (value: number) => void;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: { width: 320 },
  cardHover: { cursor: 'pointer' },
  media: { height: 180 },
  meta: {
    backgroundColor: palette.background.default,
    marginTop: spacing(1),
    marginLeft: -spacing(2),
    marginRight: -spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
  tag: { marginRight: spacing(1) },
  tags: {
    height: 40,
    overflowX: 'auto',
    marginBottom: -spacing(2),
    marginLeft: -spacing(2),
    marginRight: -spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
  title: {
    // minHeigh: 316,
  },
}));

const VideoCard: FC<VideoCardProps> = ({
  className,
  handleEditClick,
  video,
  ...rest
}) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(1);

  useEffect(() => {
    return () => {};
  }, [video]);

  useRefresh([video]);

  const mouseOver = () => {
    setHover(true);
    setElevation(6);
  };

  const mouseOut = () => {
    setHover(false);
    setElevation(1);
  };

  // const truncateString = (str:string, num:number) => {
  //   if (str.length <= num) return str;
  //   return `${str.slice(0, num)}...`;
  // };

  return (
    <Card
      className={clsx(classes.root, className, hover && classes.cardHover)}
      elevation={elevation}
      onClick={() => handleEditClick(video.id)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      {...rest}
    >
      <CardMedia
        className={classes.media}
        image={video.imageUrl}
        title={video.title}
      />
      <CardContent>
        <Box className={classes.title}>
          <Typography gutterBottom noWrap variant="subtitle1">
            {video.title}
          </Typography>
        </Box>
        {video.tags && video.tags.length > 0 && (
          <Box
            display="flex"
            flexDirection="row"
            className={classes.tags}
            mt={2}
          >
            {video.tags.map(({ id, name }) => (
              <Chip
                key={id}
                className={classes.tag}
                label={name.toUpperCase()}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
