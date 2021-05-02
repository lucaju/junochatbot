import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, {
  FC,
  Fragment,
  KeyboardEvent,
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Part as PartType, TrainingPhrase } from '../../../../../types';
import EntitiesMenu from './EntitiesMenu';
import Part from './Part';
import { SelectionDataType, useSnapSelectionToWord, useUpdateParts } from './parts';

interface PhraseProps {
  name?: string;
  parts: PartType[];
  type?: string;
  timesAddedCount?: number;
  handleChange: (value: TrainingPhrase) => void;
  handleDelete: (value?: string) => void;
}

const useStyles = makeStyles(({ shape, spacing }) => ({
  editable: {
    flexGrow: 1,
    '&:focus-visible': { outlineStyle: 'none' },
  },
  margin: { marginLeft: spacing(1) },
}));

const Phrase: FC<PhraseProps> = ({
  name,
  parts,
  type = 'EXAMPLE',
  timesAddedCount = 1,
  handleChange,
  handleDelete,
}) => {
  const classes = useStyles();
  const TypRef = useRef<any | undefined>();
  const [hover, setHover] = useState(false);
  const [changed, setChanged] = useState(false);
  const [_parts, _setParts] = useState<PartType[]>(parts);
  const [contextMenuAnchorEl, setContextMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [entityValue, setEntityValue] = useState<string | undefined>();

  useEffect(() => {
    if (!changed) return;
    const updatedPhrase: TrainingPhrase = {
      name,
      type,
      parts: _parts,
      timesAddedCount,
    };
    handleChange(updatedPhrase);
    setChanged(false);
    return () => {};
  }, [changed]);

  const handleBlur = () => {
    if (contextMenuOpen) return;
    updatePhrase();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const textContent = event.currentTarget.textContent;
    if (!textContent) return;

    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      updatePhrase();
      return;
    }

    //check text length. DialogFlow limit: 768 -> https://cloud.google.com/dialogflow/quotas#es-agent_1
    if (textContent.length >= 768) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const handleSelectionChange = (event: SyntheticEvent<HTMLElement, Event>) => {
    if (contextMenuOpen) return;

    const selection = window.getSelection();
    if (!selection) return;
    if (selection.type !== 'Range') return;
    // @ts-ignore
    if (selection.baseNode !== selection.extentNode) {
      selection.removeAllRanges();
      return;
    }
    // @ts-ignore
    if (selection.baseOffset === selection.extentOffset) return;

    // console.log(selection);

    // console.log('via selection');
    openContextMenu(event.currentTarget);
  };

  const handleHihglightClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (contextMenuOpen) return;
    const entityType = event.currentTarget.dataset.entityType;
    if (!entityType) return;
    // console.log('via click span');
    openContextMenu(event.currentTarget, entityType);
  };

  const handleProcessSelection = (entityName: string) => {
    const selection = window.getSelection();
    if (!selection) {
      handleEntitiesMenuClose();
      return;
    }

    useSnapSelectionToWord(selection);

    const selectionData = getSelectionData(selection);
    if (!selectionData) {
      handleEntitiesMenuClose();
      return;
    }

    updatePhrase({ ...selectionData, entityName });

    selection.removeAllRanges();
    handleEntitiesMenuClose();
  };

  const getSelectionData = (selection: Selection) => {
    const range = selection.getRangeAt(0);
    const textContent = range.commonAncestorContainer.textContent;
    if (!textContent) return;

    const { startOffset, endOffset } = range;
    const content = textContent.substring(startOffset, endOffset);

    return { startOffset, endOffset, content };
  };

  const openContextMenu = async (anchor: HTMLElement, contextValue?: string) => {
    if (contextMenuOpen) return;
    if (contextValue) setEntityValue(contextValue);
    setContextMenuAnchorEl(anchor);
    setContextMenuOpen(true);
  };

  const updatePhrase = (selectionData?: SelectionDataType) => {
    const element = TypRef.current as HTMLElement;
    const protoParts: PartType[] = useUpdateParts(element, selectionData);

    //if no parts, remove phrase
    if (protoParts.length === 0) {
      handleDelete(name);
      return;
    }

    //update parts the component internally
    _setParts(protoParts);
    setChanged(true);
  };

  const handleEntitiesMenuClose = () => {
    setEntityValue(undefined);
    setContextMenuAnchorEl(null);
    setContextMenuOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      my={1}
      p={1}
      boxShadow={hover || name?.startsWith('new-') ? 1 : 0}
      borderRadius="borderRadius"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <EntitiesMenu
        handleProcessSelection={handleProcessSelection}
        handleClose={handleEntitiesMenuClose}
        anchorEl={contextMenuAnchorEl}
        open={contextMenuOpen}
        value={entityValue}
      />
      {!changed && (
        <Typography
          ref={TypRef}
          className={classes.editable}
          contentEditable={true}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onSelect={handleSelectionChange}
          suppressContentEditableWarning={true}
        >
          {_parts.length > 0 && (
            <>
              {_parts[0].entityType && <Part />}
              {_parts.map((part, i) => (
                <Fragment key={i}>
                  {i !== 0 && part.entityType && _parts[i - 1]?.entityType && <Part />}
                  <Part
                    type={part.entityType ? 'semantic' : 'text'}
                    part={part}
                    handleClick={handleHihglightClick}
                  />
                </Fragment>
              ))}
              {_parts[_parts.length - 1].entityType && <Part />}
            </>
          )}
        </Typography>
      )}
      {hover && (
        <IconButton
          aria-label="delete"
          className={classes.margin}
          size="small"
          onClick={() => handleDelete(name)}
        >
          <HighlightOffIcon fontSize="inherit" />
        </IconButton>
      )}
    </Box>
  );
};

export default Phrase;
