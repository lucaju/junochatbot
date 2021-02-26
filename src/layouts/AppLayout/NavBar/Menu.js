import { Box, List, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import NavItem from './NavItem';
import { useApp } from 'src/overmind';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('navMenu');

  return (
    <Box className={compactMode ? classes.listCompacted : classes.listExanded}>
      <List>
        {items.map(({ href, icon, restricted, title, tKey }) => {
          if (restricted && !restricted.includes(state.session.user.roleTypeId)) return;
          return (
            <NavItem
              key={title}
              isCompact={compactMode}
              icon={icon}
              href={href}
              title={t(tKey)}
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
