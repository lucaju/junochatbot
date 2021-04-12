import ForumIcon from '@material-ui/icons/Forum';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { MenuType } from '../Menu';

export const adminMenu: MenuType[] = [
  {
    title: 'Stories',
    tKey: 'common:stories',
    path: '/app/stories',
    icon: ForumIcon,
    restricted: [1, 2],
  },
  {
    title: 'Users',
    tKey: 'common:users',
    path: '/app/users',
    icon: PeopleAltIcon,
    restricted: [1, 2],
  },
  {
    title: 'Users Groups',
    tKey: 'usersGroups',
    path: '/app/groups',
    icon: GroupWorkIcon,
    restricted: [1],
  },
];
