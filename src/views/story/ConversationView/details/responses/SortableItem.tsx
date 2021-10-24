/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSortable } from '@dnd-kit/sortable';
import { ListItem } from '@mui/material';
import React, { cloneElement, FC, isValidElement } from 'react';

interface SortableItemProps {
  id: string;
}

const SortableItem: FC<SortableItemProps> = ({ children, id }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  // useEffect(() => {
  //   return () => {};
  // }, []);

  const _transition = transition !== null ? transition : undefined;
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        _transition,
      }
    : undefined;

  const newChildren_ = isValidElement(children) ? cloneElement(children, { isDragging }) : children;

  return (
    <ListItem ref={setNodeRef} style={style} {...attributes} sx={{ p: 0 }}>
      {newChildren_}
    </ListItem>
  );
};

export default SortableItem;
