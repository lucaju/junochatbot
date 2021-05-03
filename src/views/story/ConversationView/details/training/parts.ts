import { Part } from '@src/types';

export type SelectionDataType = {
  startOffset: number;
  endOffset: number;
  content: string;
  entityName: string;
};

export const useSnapSelectionToWord = (selection: Selection) => {
  // Detect if selection is backwards
  const range = document.createRange();
  // @ts-ignore
  range.setStart(selection.anchorNode, selection.anchorOffset);
  // @ts-ignore
  range.setEnd(selection.focusNode, selection.focusOffset);
  const backwards = range.collapsed;
  range.detach();

  // modify() works on the focus of the selection
  const endNode = selection.focusNode;
  const endOffset = selection.focusOffset;
  selection.collapse(selection.anchorNode, selection.anchorOffset);

  const direction = backwards ? ['backward', 'forward'] : ['forward', 'backward'];

  // @ts-ignore
  selection.modify('move', direction[0], 'character');
  // @ts-ignore
  selection.modify('move', direction[1], 'word');
  // @ts-ignore
  selection.extend(endNode, endOffset);
  // @ts-ignore
  selection.modify('extend', direction[1], 'character');
  // @ts-ignore
  selection.modify('extend', direction[0], 'word');
};

export const useUpdateParts = (element: HTMLElement, newEntity?: SelectionDataType) => {
  let protoParts: Part[] = [];

  Array.from(element.childNodes).forEach((el: HTMLElement) => {
    //discard nodes other than text or element<span>, or empty textContent
    if (el.nodeType !== Node.TEXT_NODE && el.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    if (el.nodeType === Node.ELEMENT_NODE && el.nodeName !== 'SPAN') return;

    const textContent = el.textContent;
    if (!textContent || textContent?.trim().length === 0) return;

    //if two adjacents regular text parts, join text with previous
    if (
      (!el.dataset || !el.dataset.entityType) &&
      protoParts.length > 0 &&
      !protoParts[protoParts.length - 1].entityType
    ) {
      protoParts[protoParts.length - 1].text += textContent;
      return;
    }

    //recreate parts
    if (!newEntity || !textContent.includes(newEntity.content)) {
      const part: Part = { text: textContent };
      if (el.dataset?.alias) part.alias = el.dataset.alias;
      if (el.dataset?.entityType) part.entityType = el.dataset.entityType;
      if (el.dataset?.userDefined) part.userDefined = !!el.dataset.userDefined;

      protoParts = [...protoParts, part];
      return;
    }

    //create new part
    if (newEntity) {
      const newParts = createSemanticParts(textContent, newEntity);
      protoParts = [...protoParts, ...newParts];
    }
  });

  return protoParts;
};

const createSemanticParts = (
  textContent: string,
  { startOffset, endOffset, entityName }: SelectionDataType
) => {
  let newParts: Part[] = [];

  let preText = textContent.substring(0, startOffset - 1);
  if (preText.length !== 0) {
    const partPre: Part = { text: preText };
    newParts = [...newParts, partPre];
  }

  const highlightText = textContent.substring(startOffset, endOffset);
  const partHighlight: Part = {
    text: highlightText,
    alias: highlightText,
    entityType: entityName,
    userDefined: true,
  };
  newParts = [...newParts, partHighlight];

  const posText = textContent.substring(endOffset + 1);
  if (posText.length !== 0) {
    const partPos: Part = { text: posText };
    newParts = [...newParts, partPos];
  }

  return newParts;
};
