import ForumIcon from '@material-ui/icons/Forum';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { RoleType } from '@src/types';
import { MenuType } from '../Menu';

export const adminMenu: MenuType[] = [
  {
    title: 'Stories',
    tKey: 'stories',
    path: '/app/stories',
    icon: ForumIcon,
    restricted: [RoleType.ADMIN, RoleType.INSTRUCTOR],
  },
  {
    title: 'Users',
    tKey: 'users',
    path: '/app/users',
    icon: PeopleAltIcon,
    restricted: [RoleType.ADMIN, RoleType.INSTRUCTOR],
  },
];
