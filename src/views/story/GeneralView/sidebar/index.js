import {
  Box,
  Button,
  Divider,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
  Link,
} from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// import { useApp } from 'src/overmind';

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
  statusPanel: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey['100']
        : theme.palette.grey['700'],
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
  },
}));

const SideBar = () => {
  const classes = useStyles();
  //   const { state, actions } = useApp();
  const { isSubmitting } = useState();

  const handleDeleteButton = () => {
    console.log('delete');
  };

  const values = {
    permalink: 'after-life2',
    public: true,
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Box p={2} className={classes.statusPanel} width={'100%'}>
        <Typography variant="h6" gutterBottom>
          Permalink
        </Typography>
        <TextField
          // error={Boolean(touched.firstName && errors.firstName)}
          fullWidth
          // helperText={touched.firstName && errors.firstName}
          label="URL slug"
          name="url-slig"
          // onBlur={handleBlur}
          // onChange={handleChange}
          value={values.permalink}
          className={classes.marginBottom}
        />
        <Link
          color="inherit"
          component={RouterLink}
          to={`/play/${values.permalink}`}
          variant="body2"
          target="_blank"
        >
          {`https://www.chatstories.ca/play/${values.permalink}`}
        </Link>
      </Box>
      <Box p={2} mt={1}>
        <Typography variant="h6" gutterBottom>
          Visibility
        </Typography>
        <TextField
          // error={Boolean(touched.language && errors.language)}
          label="Status"
          name="status"
          // onBlur={handleBlur}
          // onChange={handleChange}
          select
          value={values.public}
        >
          <MenuItem key={'private'} value={false}>
            Private
          </MenuItem>
          <MenuItem key={'public'} value={true}>
            Public
          </MenuItem>
        </TextField>
      </Box>
      <Box p={2} mt={1}>
        <Typography variant="h6" gutterBottom>
          Collaborators
        </Typography>
      </Box>
    </Box>
  );
};

export default SideBar;
