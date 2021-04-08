import type { RoleType, User, UserGroup } from '../../types';

type State = {
  list: User[];
  groups:  UserGroup[];
  roleTypes: RoleType[];
};

export const state:State = {
  list: [] as User[],
  groups: [] as UserGroup[],
  roleTypes: [
    { value: 1, name: 'admin' },
    { value: 2, name: 'instructor' },
    { value: 3, name: 'student' },
  ],
};
