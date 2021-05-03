import { RoleType, User } from '@src/types';

export const authUser: User = {
  id: 1,
  firstName: 'Luciano',
  lastName: 'Frizzera',
  roleTypeId: RoleType.ADMIN,
  userName: 'lucaju@gmail.com',
  avatarUrl: 'lucaju.jpg',
  token: 'TOKEN-123',
};

export default {
  authUser,
};
