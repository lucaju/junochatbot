import { Box, List } from '@material-ui/core';
import { useApp } from '@src/overmind';
import { RoleType } from '@src/types';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import NavItem from './NavItem';

export type MenuType = {
  title: string;
  tKey: string;
  path: string;
  icon?: any;
  restricted?: RoleType[];
};

interface MenuProps {
  compactMode: boolean;
  items: MenuType[];
}

const Menu: FC<MenuProps> = ({ compactMode, items }) => {
  const { state } = useApp();
  const { t } = useTranslation(['navMenu', 'common']);

  return (
    <Box
      sx={{
        padding: compactMode ? 0.5 : 2,
        pt: compactMode ? 2 : 0,
      }}
    >
      <List>
        {items.map(({ path, icon, restricted, title, tKey }) => {
          if (
            restricted &&
            state.session.user &&
            !restricted.includes(state.session.user.roleTypeId)
          )
            return;
          return (
            <NavItem key={title} isCompact={compactMode} icon={icon} path={path} title={t(tKey)} />
          );
        })}
      </List>
    </Box>
  );
};

export default Menu;
