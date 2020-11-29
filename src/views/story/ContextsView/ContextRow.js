import { Chip, makeStyles, TableCell, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  chip: { marginRight: theme.spacing(1) },
}));

const ContextRow = ({ context }) => {
  const classes = useStyles();

  const handleClick = (type, id) => {
    console.log(type, id);
  };

  return (
    <TableRow hover key={context.id}>
      <TableCell>{context.name}</TableCell>
      <TableCell>
        {context.inputs &&
          context.inputs.map(({ id, title }) => (
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
        {context.outputs &&
          context.outputs.map(({ id, title }) => (
            <Chip
              className={classes.chip}
              key={id}
              label={title}
              onClick={() => handleClick('intent', id)}
            />
          ))}
      </TableCell>
    </TableRow>
  );
};

ContextRow.propTypes = {
  context: PropTypes.object.isRequired,
};

export default ContextRow;
