import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Message as MessageType, Payload, Text } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
import useMessage from './hooks';
import SortableItem from './SortableItem';
import TextMessage from './TextMessage';
import VideoMessage from './VideoMessage';

interface CollectionProps {
  messageList: MessageType[];
}

export interface TextComp extends Text {
  id: string;
}

export interface PayloadComp extends Payload {
  id: string;
}

type MessageTypeComp = TextComp | PayloadComp;

const Collection: FC<CollectionProps> = ({ messageList }) => {
  const { updateAllMessage } = useMessage();
  const sensors = useSensors(useSensor(PointerSensor));
  const [list, setList] = useState<MessageTypeComp[]>([]);
  const [reordered, setReordered] = useState(false);

  useEffect(() => {
    const _list = messageList.map((item, i) => {
      const _item: TextComp | PayloadComp = { id: i.toString(), ...item };
      return _item;
    });
    setList(_list);
    return () => {};
  }, [messageList]);

  useEffect(() => {
    if (!reordered) return;
    setReordered(false);
    handleupdateValues(list);
  }, [reordered]);

  const handleRemove = (index: string) => {
    const updatedList = list.filter((message) => message.id !== index);
    setList(updatedList);
    handleupdateValues(updatedList);
  };

  const handleUpdate = (index: string, updatedMessage: MessageTypeComp) => {
    const updatedList = list.map((message) => {
      if (message.id === index) return updatedMessage;
      return message;
    });
    setList(updatedList);
    handleupdateValues(updatedList);
  };

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

  const handleupdateValues = (updatedList: MessageTypeComp[]) => {
    const updatedValues: MessageType[] = updatedList.map((messageComp) => {
      const { id, ...message } = messageComp;
      return message;
    });
    updateAllMessage(updatedValues);
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleReoder} sensors={sensors}>
      <SortableContext items={list.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
        {list.map((message) => (
          <SortableItem key={message.id} id={message.id}>
            {'text' in message ? (
              <TextMessage
                index={message.id}
                content={message}
                handleRemove={handleRemove}
                handleUpdate={handleUpdate}
              />
            ) : (
              <VideoMessage
                index={message.id}
                content={message}
                handleRemove={handleRemove}
                handleUpdate={handleUpdate}
              />
            )}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default Collection;
