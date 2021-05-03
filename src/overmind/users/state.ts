import { RoleType, User, UserGroup } from '@src/types';

type State = {
  list: User[];
  groups: UserGroup[];
  roleTypes: RoleType[];
};

export const state: State = {
  list: [] as User[],
  groups: [] as UserGroup[],
  roleTypes: [RoleType.ADMIN, RoleType.INSTRUCTOR, RoleType.STUDENT],
};
