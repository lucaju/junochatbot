import { useSortable } from '@dnd-kit/sortable';
import { ListItem, makeStyles } from '@material-ui/core';
import React, { FC, cloneElement, isValidElement, useEffect } from 'react';

interface SortableItemProps {
  id: string;
}

const useStyles = makeStyles(() => ({
  item: { padding: 0 },
}));

const SortableItem: FC<SortableItemProps> = ({ id, children }) => {
  const classes = useStyles();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  useEffect(() => {
    return () => {};
  }, []);

  const _transition = transition !== null ? transition : undefined;
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        _transition,
      }
    : undefined;

  const newChildren_ = isValidElement(children) ? cloneElement(children, { isDragging }) : children;

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={classes.item}
    >
      {newChildren_}
    </ListItem>
  );
};

export default SortableItem;
