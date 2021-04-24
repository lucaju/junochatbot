import { RoleType, User } from '../../src/types';

export const dataUsers: User[] = [
  {
    id: 1,
    firstName: 'Luciano',
    lastName: 'Frizzera',
    avatarUrl: 'lucaju.jpg',
    userName: 'lucaju@gmail.com',
    roleTypeId: RoleType.ADMIN,
  },
  {
    id: 2,
    firstName: 'Cao',
    lastName: 'Yu',
    avatarUrl: '',
    userName: 'cao.yu@userName.io',
    roleTypeId: RoleType.STUDENT,
  },
  {
    id: 3,
    firstName: 'Alexa',
    lastName: 'Richardson',
    avatarUrl: '',
    userName: 'alex.ri@userName.io',
    roleTypeId: RoleType.STUDENT,
  },
  {
    id: 4,
    firstName: 'Anje',
    lastName: 'Keizer',
    avatarUrl: '',
    userName: 'anje.keizer@userName.io',
    roleTypeId: RoleType.STUDENT,
  },
  {
    id: 5,
    firstName: 'Clarke',
    lastName: 'Gillebert',
    avatarUrl: '',
    userName: 'clarke.gillebert@userName.io',
    roleTypeId: RoleType.STUDENT,
  },
  {
    id: 6,
    firstName: 'Adam',
    lastName: 'Denisov',
    avatarUrl: '',
    userName: 'adam.denisov@userName.io',
    roleTypeId: RoleType.STUDENT,
  },
  {
    id: 7,
    firstName: 'Ava',
    lastName: 'Gregoraci',
    avatarUrl: '',
    userName: 'ava.gregoraci@userName.io',
    roleTypeId: RoleType.STUDENT,
  },
  {
    id: 8,
    firstName: 'Emilee',
    lastName: 'Simchenko',
    avatarUrl: '',
    userName: 'emilee.simchenko@userName.io',
    roleTypeId: RoleType.STUDENT,
  },
];

export default {
  dataUsers,
};
