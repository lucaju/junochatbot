import {
  Avatar,
  Box,
  Chip,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import mock from 'src/mockData';
import { useApp } from 'src/overmind';

const useStyles = makeStyles((theme) => ({
  marginLeft: { marginLeft: theme.spacing(1) },
  autocomplete: {
    width: '-webkit-fill-available',
    marginBottom: theme.spacing(1),
  },
  chip: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

const Authors = ({ authors, handleAuthorsChange }) => {
  const classes = useStyles();
  const { state } = useApp();
  const [showInput, setShowInput] = useState(false);

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  return (
    <Box p={2} mt={1} width={'100%'}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems="center"
        justify="flex-start"
        mb={1}
      >
        <Typography variant="h6">Authors</Typography>
        <IconButton
          aria-label="add"
          size="small"
          className={classes.marginLeft}
          onClick={handleShowInput}
        >
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Box
        width={'100%'}
        diplay="flex"
        flexDirection="row"
        alignItems="center"
        justify="flex-start"
        flexWrap="wrap"
      >
        {showInput && (
          <Autocomplete
            fullWidth
            id="authors"
            options={mock.dataUsers}
            getOptionLabel={({ firstName, lastName }) =>
              `${firstName} ${lastName}`
            }
            className={classes.autocomplete}
            onBlur={handleShowInput}
            filterSelectedOptions
            size={'small'}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add author"
                onBlur={handleShowInput}
              />
            )}
          />
        )}
        {authors.map(({ id, firstName, lastName, avatar }) => (
          <Chip
            key={id}
            avatar={
              avatar ? (
                <Avatar
                  alt={`${firstName} ${lastName}`}
                  src={`/assets/users/images/${avatar}`}
                />
              ) : null
            }
            icon={!avatar ? <AccountCircleIcon /> : null}
            variant="outlined"
            size="small"
            label={`${firstName} ${lastName}`}
            onDelete={
              state.session.user.id === id || state.session.isStudent === id
                ? null
                : () => handleAuthorsChange('delete', { id })
            }
            className={classes.chip}
          />
        ))}
      </Box>
    </Box>
  );
};

Authors.propTypes = {
  authors: PropTypes.array,
  handleAuthorsChange: PropTypes.func,
};

export default Authors;
