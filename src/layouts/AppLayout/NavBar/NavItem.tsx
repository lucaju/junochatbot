import { Box, Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useApp } from '../../../overmind';
import React, { FC } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

interface NavItemProps {
  path: string;
  title: string;
  isCompact: boolean;
  icon: any;
}

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
  title: {
    marginRight: 'auto',
    textTransform: 'capitalize',
  },
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

const NavItem: FC<NavItemProps> = ({ path, icon: Icon, title, isCompact }) => {
  const classes = useStyles();
  const { state } = useApp();

  if (path.includes(':storyId')) {
    const storyID = state.story.currentStory?.id;
    path = storyID ? path.replace(':storyId', storyID.toString()) : '/app';
  }

  return (
    <>
      {isCompact ? (
        <Button
          activeClassName={classes.active}
          className={clsx(classes.button, classes.buttonCompact)}
          component={RouterLink}
          to={path}
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
          to={path}
          fullWidth
        >
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
        </Button>
      )}
    </>
  );
};

export default NavItem;
