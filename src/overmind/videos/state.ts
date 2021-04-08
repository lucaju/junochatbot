import type { Video, Tag } from '../../types';

type State = {
  collection: Video[];
  tagCollection:  Tag[];
};

export const state:State = {
  collection: [] as Video[],
  tagCollection: [] as Tag[],
};
