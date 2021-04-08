import { Box, List, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import NavItem from './NavItem';
import { useApp } from '../../../overmind';
import { useTranslation } from 'react-i18next';

export type MenuType = {
  title: string;
  tKey: string;
  href: string;
  icon?: any;
  restricted?: number[];
};

interface MenuProps {
  compactMode: boolean;
  items: MenuType[];
}

const useStyles = makeStyles(({ spacing }) => ({
  listCompacted: { padding: spacing(0) },
  listExanded: {
    padding: spacing(2),
    paddingTop: 0,
  },
}));

const Menu: FC<MenuProps> = ({ compactMode, items }) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation('navMenu');

  return (
    <Box className={compactMode ? classes.listCompacted : classes.listExanded}>
      <List>
        {items.map(({ href, icon, restricted, title, tKey }) => {
          if (
            restricted &&
            state.session.user &&
            !restricted.includes(state.session.user.roleTypeId)
          )
            return;
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

export default Menu;
