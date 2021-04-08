import ForumIcon from '@material-ui/icons/Forum';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { MenuType } from '../Menu';

const PATH = '/app';

export const adminMenu: MenuType[] = [
  {
    title: 'Stories',
    tKey: 'stories',
    href: `${PATH}/stories`,
    icon: ForumIcon,
    restricted: [1, 2],
  },
  {
    title: 'Users',
    tKey: 'users',
    href: `${PATH}/users`,
    icon: PeopleAltIcon,
    restricted: [1, 2],
  },
  {
    title: 'Users Groups',
    tKey: 'usersGroups',
    href: `${PATH}/groups`,
    icon: GroupWorkIcon,
    restricted: [1],
  },
];
