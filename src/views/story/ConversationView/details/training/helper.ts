import { Part } from '@src/types';

export type SelectionDataType = {
  content: string;
  endOffset: number;
  entityName: string;
  startOffset: number;
};

export const getSelectionData = (selection: Selection) => {
  snapSelectionToWord(selection);

  const range = selection.getRangeAt(0);
  const textContent = range.commonAncestorContainer.textContent;
  if (!textContent) return;

  const { startOffset, endOffset } = range;
  const content = textContent.substring(startOffset, endOffset);

  return { startOffset, endOffset, content };
};

const snapSelectionToWord = (selection: Selection) => {
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

export const updateParts = (element: HTMLElement, newEntity?: SelectionDataType) => {
  let protoParts: Part[] = [];

  Array.from(element.childNodes).forEach((el: ChildNode) => {
    //discard nodes other than text or element<span>, or empty textContent
    if (el.nodeType !== Node.TEXT_NODE && el.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    if (el.nodeType === Node.ELEMENT_NODE && el.nodeName !== 'SPAN') return;

    const htmlElement: HTMLElement = el as HTMLElement;

    const textContent = el.textContent;
    if (!textContent || textContent?.trim().length === 0) return;

    //if two adjacents regular text parts, join text with previous
    if (
      (!htmlElement.dataset || !htmlElement.dataset.entityType) &&
      protoParts.length > 0 &&
      !protoParts[protoParts.length - 1].entityType
    ) {
      protoParts[protoParts.length - 1].text += textContent;
      return;
    }

    //recreate parts
    if (!newEntity || !textContent.includes(newEntity.content)) {
      const part: Part = { text: textContent };

      const elDataset = htmlElement.dataset;
      if (elDataset) {
        part.alias = htmlElement.dataset.alias;
        part.entityType = htmlElement.dataset.entityType;
        part.userDefined = !!htmlElement.dataset.userDefined;
      }

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
    const partPre: Part = { text: `${preText} ` };
    newParts = [...newParts, partPre];
  }

  const isSys = entityName.includes('sys.');
  const alias = isSys ? entityName.substring(entityName.indexOf('.') + 1) : entityName;

  const highlightText = textContent.substring(startOffset, endOffset);
  const partHighlight: Part = {
    text: highlightText,
    alias: alias,
    entityType: entityName,
    userDefined: true,
  };
  newParts = [...newParts, partHighlight];

  const posText = textContent.substring(endOffset + 1);
  if (posText.length !== 0) {
    const partPos: Part = { text: ` ${posText}` };
    newParts = [...newParts, partPos];
  }

  return newParts;
};

export const updatePartSemantic = (
  element: HTMLElement,
  entityName: string,
  currentAlias: string
) => {
  let protoParts: Part[] = [];

  Array.from(element.childNodes).forEach((el: ChildNode) => {
    //discard nodes other than text or element<span>, or empty textContent
    if (el.nodeType !== Node.TEXT_NODE && el.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    if (el.nodeType === Node.ELEMENT_NODE && el.nodeName !== 'SPAN') return;

    const textContent = el.textContent;
    if (!textContent || textContent?.trim().length === 0) return;

    const htmlElement: HTMLElement = el as HTMLElement;

    //if two adjacents regular text parts, join text with previous
    if (
      (!htmlElement.dataset || !htmlElement.dataset.entityType) &&
      protoParts.length > 0 &&
      !protoParts[protoParts.length - 1].entityType
    ) {
      protoParts[protoParts.length - 1].text += textContent;
      return;
    }

    //recreate parts
    if (htmlElement.dataset.alias !== currentAlias) {
      const part: Part = { text: textContent };

      const elDataset = htmlElement.dataset;
      if (elDataset) {
        part.alias = htmlElement.dataset.alias;
        part.entityType = htmlElement.dataset.entityType;
        part.userDefined = !!htmlElement.dataset.userDefined;
      }

      protoParts = [...protoParts, part];
      return;
    }

    //update part
    if (htmlElement.dataset.alias === currentAlias) {
      const isSys = entityName.includes('sys.');
      const alias = isSys ? entityName.substring(entityName.indexOf('.') + 1) : entityName;

      const part: Part = { text: textContent };
      part.alias = alias;
      part.entityType = entityName;
      part.userDefined = true;

      protoParts = [...protoParts, part];
      return;
    }
  });

  return protoParts;
};

export const removePart = (element: HTMLElement, currentAlias: string) => {
  let protoParts: Part[] = [];

  Array.from(element.childNodes).forEach((el: ChildNode) => {
    //discard nodes other than text or element<span>, or empty textContent
    if (el.nodeType !== Node.TEXT_NODE && el.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    if (el.nodeType === Node.ELEMENT_NODE && el.nodeName !== 'SPAN') return;

    const textContent = el.textContent;
    if (!textContent || textContent?.trim().length === 0) return;

    const htmlElement: HTMLElement = el as HTMLElement;

    //if two adjacents regular text parts, join text with previous
    if (
      (!htmlElement.dataset || !htmlElement.dataset.entityType) &&
      protoParts.length > 0 &&
      !protoParts[protoParts.length - 1].entityType
    ) {
      protoParts[protoParts.length - 1].text += textContent;
      return;
    }

    //recreate parts
    if (htmlElement.dataset.alias !== currentAlias) {
      const part: Part = { text: textContent };

      const elDataset = htmlElement.dataset;
      if (elDataset) {
        part.alias = htmlElement.dataset.alias;
        part.entityType = htmlElement.dataset.entityType;
        part.userDefined = !!htmlElement.dataset.userDefined;
      }

      protoParts = [...protoParts, part];
      return;
    }

    //remove part
    if (htmlElement.dataset.alias === currentAlias) {
      //join adjacents
      if (protoParts.length > 0 && !protoParts[protoParts.length - 1].entityType) {
        protoParts[protoParts.length - 1].text += textContent;
        return;
      }

      //create simple part
      const part: Part = { text: textContent };
      protoParts = [...protoParts, part];
      return;
    }
  });

  return protoParts;
};
