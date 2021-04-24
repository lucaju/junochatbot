import ForumIcon from '@material-ui/icons/Forum';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { MenuType } from '../Menu';
import { RoleType } from '../../../../types';

export const adminMenu: MenuType[] = [
  {
    title: 'Stories',
    tKey: 'common:stories',
    path: '/app/stories',
    icon: ForumIcon,
    restricted: [RoleType.ADMIN, RoleType.INSTRUCTOR],
  },
  {
    title: 'Users',
    tKey: 'common:users',
    path: '/app/users',
    icon: PeopleAltIcon,
    restricted: [RoleType.ADMIN, RoleType.INSTRUCTOR],
  },
  {
    title: 'Users Groups',
    tKey: 'usersGroups',
    path: '/app/groups',
    icon: GroupWorkIcon,
    restricted: [RoleType.ADMIN],
  },
];
