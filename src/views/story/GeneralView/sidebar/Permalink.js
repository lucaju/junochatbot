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

const Permalink = ({ slug }) => {
  const classes = useStyles();

  return (
    <Box p={2} className={classes.permalinkPanel} width={'100%'}>
      <Typography variant="h6" gutterBottom>
        Permalink
      </Typography>
      <TextField
        // error={Boolean(touched.firstName && errors.firstName)}
        fullWidth
        // helperText={touched.firstName && errors.firstName}
        label="URL slug"
        name="url-slug"
        // onBlur={handleBlur}
        // onChange={handleChange}
        value={slug}
        className={classes.marginBottom}
      />
      <Link
        color="inherit"
        component={RouterLink}
        to={`/play/${slug}`}
        variant="body2"
        target="_blank"
      >
        {`https://www.chatstories.ca/play/${slug}`}
      </Link>
    </Box>
  );
};

Permalink.propTypes = {
  slug: PropTypes.string,
};

export default Permalink;
