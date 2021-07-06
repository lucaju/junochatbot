import type { ErrorMessage } from '@src/types';

export function isError(param: any): param is ErrorMessage {
  return (param as ErrorMessage).errorMessage !== undefined;
}

export const sortBy = (items: any[], prop: any): any[] => {
  items.sort((a: string, b: string) => {
    const propA = a[prop].toUpperCase(); // ignore upper and lowercase
    const propB = b[prop].toUpperCase(); // ignore upper and lowercase
    if (propA < propB) return -1;
    if (propA > propB) return 1;
    return 0;
  });
  return items;
};

export const intentParamColorPalette = [
  '#ffd6a5ff',
  '#fdffb6ff',
  '#caffbfff',
  '#9bf6ffff',
  '#a0c4ffff',
  '#bdb2ffff',
  '#ffc6ffff',
  '#ffadadff',
];
