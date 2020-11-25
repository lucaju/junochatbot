import {
  Box,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
  permalinkPanel: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey['100']
        : theme.palette.grey['900'],
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
  },
}));

const Permalink = ({ errors, handleBlur, handleChange, touched, values }) => {
  const classes = useStyles();

  return (
    <Box p={2} className={classes.permalinkPanel} width={'100%'}>
      <Typography variant="h6" gutterBottom>
        Permalink
      </Typography>
      <TextField
        error={Boolean(touched.slug && errors.slug)}
        fullWidth
        helperText={touched.slug && errors.slug}
        label="URL slug"
        name="slug"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.slug}
        className={classes.marginBottom}
      />
      <Link
        color="inherit"
        component={RouterLink}
        to={`/play/${values.slug}`}
        variant="body2"
        target="_blank"
      >
        {`https://www.chatstories.ca/play/${values.slug}`}
      </Link>
    </Box>
  );
};

Permalink.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Permalink;
