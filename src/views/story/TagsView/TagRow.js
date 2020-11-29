import {
  Button,
  Chip,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import TheatersIcon from '@material-ui/icons/Theaters';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  chip: { marginRight: theme.spacing(1) },
}));

const TagRow = ({ tag, handleEditClick }) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(null);

  const handleClick = (type, id) => {
    console.log(type, id);
  };

  return (
    <TableRow
      hover
      key={tag.id}
      onMouseEnter={() => setIsHover(tag.id)}
      onMouseLeave={() => setIsHover(null)}
    >
      <TableCell padding="checkbox">
        {isHover === tag.id && (
          <IconButton
            color="primary"
            aria-label="Edit"
            component="span"
            onClick={() => handleEditClick(tag.id)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </TableCell>
      <TableCell>{tag.name}</TableCell>
      <TableCell>
        {tag.intents &&
          tag.intents.map(({ id, title }) => (
            <Chip
              className={classes.chip}
              key={id}
              label={title}
              variant="outlined"
              onClick={() => handleClick('intent', id)}
            />
          ))}
      </TableCell>
      <TableCell>
        {tag.videos &&
          tag.videos.map(({ id, title }) => (
            <Button
              key={id}
              className={classes.button}
              startIcon={<TheatersIcon />}
              onClick={() => handleClick('video', id)}
            >
              {title}
            </Button>
          ))}
      </TableCell>
    </TableRow>
  );
};

TagRow.propTypes = {
  tag: PropTypes.object.isRequired,
  handleEditClick: PropTypes.func,
};

export default TagRow;
