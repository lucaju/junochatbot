import { Box, Divider, List, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import NavItem from './NavItem';
import { useApp } from 'src/overmind';

const useStyles = makeStyles(({ spacing }) => ({
  listCompacted: { padding: spacing(0) },
  listExanded: {
    padding: spacing(2),
    paddingTop: 0,
  },
}));

const Menu = ({ compactMode, items }) => {
  const classes = useStyles();
  const { state } = useApp();

  return (
    <Box className={compactMode ? classes.listCompacted : classes.listExanded}>
      <List>
        {items.map(({ href, icon, restricted, title }, i) => {
          if (icon === 'divider') return <Divider key={i} />;
          if (
            restricted &&
            !restricted.includes(state.session.user.roleTypeId)
          ) {
            return;
          }
          return (
            <NavItem
              key={title}
              isCompact={compactMode}
              icon={icon}
              href={href}
              title={title}
            />
          );
        })}
      </List>
    </Box>
  );
};

Menu.propTypes = {
  compactMode: PropTypes.bool,
  items: PropTypes.array,
};

export default Menu;
