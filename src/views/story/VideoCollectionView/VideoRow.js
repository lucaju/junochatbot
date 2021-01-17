import {
  Box,
  Card,
  CardMedia,
  Chip,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import VimeoIcon from './assets/VimeoIcon';
import YoutubeIcon from './assets/YoutubeIcon';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 90,
    maxHeight: 60,
  },
  chip: { marginRight: theme.spacing(1) },
  textCenter: { textAlign: 'center' },
}));

const VideoRow = ({ video, handleEditClick }) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(null);

  return (
    <TableRow
      hover
      key={video.id}
      onMouseEnter={() => setIsHover(video.id)}
      onMouseLeave={() => setIsHover(null)}
    >
      <TableCell padding="checkbox">
        {isHover === video.id && (
          <IconButton
            color="primary"
            aria-label="Edit"
            component="span"
            onClick={() => handleEditClick(video.id)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </TableCell>
      <TableCell>
        <Box alignItems="center" display="flex">
          <Card className={classes.card}>
            <CardMedia
              component="img"
              image={`/assets/stories/images/${video.image}`}
            />
          </Card>
        </Box>
      </TableCell>
      <TableCell>{video.title}</TableCell>
      <TableCell className={classes.textCenter}>
        {video.provider === 'youtube' && <YoutubeIcon fontSize="large" />}
        {video.provider === 'vimeo' && <VimeoIcon fontSize="large" />}
      </TableCell>
      <TableCell>
        {video.tags &&
          video.tags.map(({ name }) => (
            <Chip
              className={classes.chip}
              key={name}
              label={name}
              variant="outlined"
            />
          ))}
      </TableCell>
    </TableRow>
  );
};

VideoRow.propTypes = {
  video: PropTypes.object.isRequired,
  handleEditClick: PropTypes.func,
};

export default VideoRow;
