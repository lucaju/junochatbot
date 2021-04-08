//GENERAL
export interface Language {
  value: string;
  name: string;
}

export interface RoleType {
  value: number;
  name: string;
}

export interface ErrorMessage {
  errorMessage: string;
}

//UI
export enum NotificationType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
}

export interface Notification {
  open: boolean;
  message: string;
  type: NotificationType;
}

//USER
export interface Credential {
  email?: string;
  password?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  roleTypeId: number;
  active: boolean;
  createdDate?: string;
  updatedDate?: string;
  avatarUrl?: string | any;
  groupId?: number | string;
  token?: string;
}

export interface UserGroup {
  id: number;
  name: string;
  description: string;
  institution: string;
  active: boolean;
  createdDate?: string;
  updatedDate?: string;
}

//STORY
export interface Story {
  id: number;
  title: string;
  imageUrl: string;
  owner: User; //not present
  languageCode: string;
  publishedAt: string;
  publishedDate: string;
  active: boolean;
  synopsis: string;
  botAvatar: string;
  botName: string;
  botPersona: string;
  botDelay: number;
};

//VIDEOS
export interface Tag {
  id: number;
  name: string;
  active: boolean;
};

export interface Video {
  id: number;
  url: string;
  imageUrl: string;
  title: string;
  channelName: string;
  publishedAt: string; //not present yet
  duration: string; //not present yet
  active: boolean;
  description?: string;
  tags?: Tag[];
};

//filter

export type HandleFilterType = {
  type: string;
  value: number;
  reset?: boolean;
};