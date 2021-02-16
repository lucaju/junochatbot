import { IconButton, TableCell, TableRow, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { json } from 'overmind';
const GroupRow = ({ group, handleEditClick }) => {
  const [isHover, setIsHover] = useState(null);

  return (
    <TableRow
      hover
      key={group.id}
      onMouseEnter={() => setIsHover(group.id)}
      onMouseLeave={() => setIsHover(null)}
    >
      <TableCell padding="checkbox">
        {isHover === group.id && (
          <IconButton
            aria-label="Edit"
            color="primary"
            component="span"
            onClick={() => handleEditClick(json(group))}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </TableCell>
      <TableCell>
        <Typography
          color={group.active ? 'textPrimary' : 'textSecondary'}
          variant="body1"
        >
          {group.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          color={group.active ? 'textPrimary' : 'textSecondary'}
          variant="body1"
        >
          {group.description}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          color={group.active ? 'textPrimary' : 'textSecondary'}
          variant="body1"
        >
          {group.institution}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

GroupRow.propTypes = {
  group: PropTypes.object.isRequired,
  handleEditClick: PropTypes.func,
};

export default GroupRow;
