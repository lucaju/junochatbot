import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { useActions, useAppState } from '@src/overmind';
import { Message as MessageType } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import SortableItem from './SortableItem';
import TextMessage from './TextMessage';
import VideoMessage from './VideoMessage';

const Collection: FC = () => {
  const { currentIntent } = useAppState().intents;
  const actions = useActions();
  const sensors = useSensors(useSensor(PointerSensor));

  const [list, setList] = useState<MessageType[]>([]);
  const [reordered, setReordered] = useState(false);

  useEffect(() => {
    setList(currentIntent?.messages ?? []);
  }, [currentIntent?.messages]);

  useEffect(() => {
    if (!reordered) return;
    actions.intents.reorderMessages(list);
    setReordered(false);
  }, [reordered]);

  const handleReoder = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    setList((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });

    setReordered(true);
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleReoder} sensors={sensors}>
      <SortableContext
        items={list.map(({ id }) => id as string)}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence initial={false}>
          {list.map((message) => (
            <Box
              key={message.id}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SortableItem id={message.id as string}>
                {'text' in message ? (
                  <TextMessage message={message} />
                ) : (
                  <VideoMessage message={message} />
                )}
              </SortableItem>
            </Box>
          ))}
        </AnimatePresence>
      </SortableContext>
    </DndContext>
  );
};

export default Collection;
