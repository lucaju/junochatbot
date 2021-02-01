import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  //   Card,
  //   CardContent,
  //   TextField,
  //   InputAdornment,
  //   SvgIcon,
  makeStyles,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const Toolbar = ({ handleDetailOpen, className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-start">
        <Button
          color="primary"
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleDetailOpen({})}
        >
          Add user
        </Button>
      </Box>
      {/* <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box> */}
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  handleDetailOpen: PropTypes.func,
};

export default Toolbar;
