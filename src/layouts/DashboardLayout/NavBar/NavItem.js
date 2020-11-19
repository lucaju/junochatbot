import { Box, Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%',
  },
  buttonExpanded: { justifyContent: 'flex-start' },
  buttonCompact: {
    lineHeight: '12px',
    fontSize: '10px',
    textAlign: 'center',
  },
  icon: { marginRight: theme.spacing(1) },
  title: { marginRight: 'auto' },
  titleCompact: { marginTop: theme.spacing(0.5) },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const NavItem = ({ href, icon: Icon, title, isCompact }) => {
  const classes = useStyles();

  return (
    <>
      {isCompact ? (
        <Button
          activeClassName={classes.active}
          className={clsx(classes.button, classes.buttonCompact)}
          component={RouterLink}
          to={href}
          fullWidth
        >
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            {Icon && <Icon size="20" />}
            <span className={clsx(classes.title, classes.titleCompact)}>
              {title}
            </span>
          </Box>
        </Button>
      ) : (
        <Button
          activeClassName={classes.active}
          className={clsx(classes.button, classes.buttonExpanded)}
          component={RouterLink}
          to={href}
          fullWidth
        >
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
        </Button>
      )}
    </>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
  isCompact: PropTypes.bool,
};

export default NavItem;
