import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, IconButton, Typography, useTheme, Zoom } from '@mui/material';
import { useActions, useAppState } from '@src/overmind';
import { Part as PartType, TrainingPhrase } from '@src/types';
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
import EntitiesMenu from './EntitiesMenu';
import {
  getSelectionData,
  removePart,
  SelectionDataType,
  updateParts,
  updatePartSemantic,
} from './helper';
import Part from './Part';

interface PhraseProps {
  name?: string;
  parts: PartType[];
  timesAddedCount?: number;
  type?: string;
}

//DialogFlow limit: 768 -> https://cloud.google.com/dialogflow/quotas#es-agent_1
const CHART_MAX_LIMIT = 768;

const Phrase: FC<PhraseProps> = ({
  name = 'new-',
  parts,
  timesAddedCount = 1,
  type = 'EXAMPLE',
}) => {
  const { intents } = useAppState();
  const actions = useActions();
  const theme = useTheme();

  const TypRef = useRef<any | undefined>();
  const [hover, setHover] = useState(false);
  const [changed, setChanged] = useState(false);
  const [_parts, _setParts] = useState<PartType[]>(parts);

  const [contextMenuAnchorRef, setContextMenuAnchorRef] = useState<
    'none' | 'anchorEl' | 'anchorPosition'
  >('none');
  const [contextMenuAnchorPos, setContextMenuAnchorPos] = useState<{ top: number; left: number }>();
  const [contextMenuAnchorEl, setContextMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [parameterAlias, setParameterAlias] = useState<string | undefined>();

  useEffect(() => {
    if (name?.includes('new-')) TypRef.current.focus();
  }, []);

  useEffect(() => {
    if (!changed) return;
    const updatedPhrase: TrainingPhrase = {
      name,
      type,
      parts: _parts,
      timesAddedCount,
    };
    actions.intents.updatePhrase(updatedPhrase);

    setChanged(false);
  }, [changed]);

  const handleBlur = () => {
    if (contextMenuOpen) return;
    processUpdatePhrase();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const textContent = event.currentTarget.textContent;
    if (!textContent) return;

    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      processUpdatePhrase();
      return;
    }

    if (textContent.length >= CHART_MAX_LIMIT) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const handleSelectionChange = (event: SyntheticEvent<HTMLElement, Event>) => {
    if (intents.currentIntent?.isFallback) return;
    if (contextMenuOpen) return;

    const selection = window.getSelection();
    if (!selection) return;
    if (selection.type !== 'Range') return;
    // @ts-ignore
    if (selection.baseNode !== selection.extentNode) {
      return selection.removeAllRanges();
    }
    // @ts-ignore
    if (selection.baseOffset === selection.extentOffset) return;

    setContextMenuAnchorRef('anchorPosition');
    const mouseEvent = event.nativeEvent;
    //@ts-ignore
    setContextMenuAnchorPos({ top: mouseEvent.pageY, left: mouseEvent.pageX });
    openContextMenu();
  };

  const handleHihglightClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (intents.currentIntent?.isFallback) return;
    if (contextMenuOpen) return;

    const paramAlias = event.currentTarget.dataset.alias;
    if (!paramAlias) return;

    setContextMenuAnchorRef('anchorEl');
    setContextMenuAnchorEl(event.currentTarget);

    openContextMenu(paramAlias);
  };

  const handleAddPart = (entityName: string, paramName?: string) => {
    const selection = window.getSelection();
    if (!selection) return handleEntitiesMenuClose();

    const selectionData = getSelectionData(selection);
    if (!selectionData) return handleEntitiesMenuClose();

    processUpdatePhrase({ ...selectionData, entityName }, paramName);

    selection.removeAllRanges();
    handleEntitiesMenuClose();
  };

  const handleUpdatePart = (currentAlias: string, entityName?: string, paramName?: string) => {
    if (!entityName) return;

    const element = TypRef.current as HTMLElement;
    const protoParts: PartType[] = updatePartSemantic(element, entityName, currentAlias);

    //update parts the component internally
    _setParts(protoParts);

    //schedule changes
    setChanged(true);

    actions.intents.isSinglePhraseParam(currentAlias)
      ? actions.intents.updateParameterByAlias({ alias: currentAlias, entityName: entityName })
      : paramName && actions.intents.addParameter(entityName);
  };

  const handleRemovePart = (currentAlias?: string) => {
    if (!currentAlias) return;
    const element = TypRef.current as HTMLElement;
    const protoParts: PartType[] = removePart(element, currentAlias);

    //update parts the component internally
    _setParts(protoParts);

    //schedule changes
    setChanged(true);

    if (actions.intents.isSinglePhraseParam(currentAlias)) {
      actions.intents.removeParameterByDisplayName(currentAlias);
    }

    handleEntitiesMenuClose();
  };

  const openContextMenu = async (contextValue?: string) => {
    if (contextMenuOpen) return;
    if (contextValue) setParameterAlias(contextValue);
    setContextMenuOpen(true);
  };

  const processUpdatePhrase = (selectionData?: SelectionDataType, paramName?: string) => {
    const element = TypRef.current as HTMLElement;
    const protoParts: PartType[] = updateParts(element, selectionData);

    if (protoParts.length === 0) return handleRemovePhrase(name);

    //update parts the component internally
    _setParts(protoParts);

    //schedule changes
    setChanged(true);

    if (!selectionData) return;

    //add new Parameter
    if (!paramName) actions.intents.addParameter(selectionData.entityName);
  };

  const handleEntitiesMenuClose = () => {
    setParameterAlias(undefined);
    setContextMenuAnchorEl(null);
    setContextMenuOpen(false);
  };

  const handleRemovePhrase = (name: string) => {
    actions.intents.removePhrase(name);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      my={1.5}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        p={1}
        onMouseEnter={() => setHover(true)}
        sx={{
          minWidth: 50,
          boxShadow: hover ? 'rgb(0 0 0 / 20%) 0px 0px 10px 1px' : 0,
          borderStartStartRadius: 12,
          borderStartEndRadius: 12,
          borderEndStartRadius: 12,
          backgroundColor: theme.palette.action.hover,
          '&:focus-within': {
            boxShadow: `${theme.palette.primary.light} 0px 0px 5px 1px !important`,
          },
          transition: theme.transitions.create(['box-shadow'], {
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        {contextMenuOpen && (
          <EntitiesMenu
            addPart={handleAddPart}
            anchorEl={contextMenuAnchorEl}
            anchorPos={contextMenuAnchorPos}
            anchorReference={contextMenuAnchorRef}
            handleClose={handleEntitiesMenuClose}
            open={contextMenuOpen}
            removePart={handleRemovePart}
            updatePart={handleUpdatePart}
            value={parameterAlias}
          />
        )}
        {!changed && (
          <Typography
            ref={TypRef}
            contentEditable={true}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onSelect={handleSelectionChange}
            suppressContentEditableWarning={true}
            sx={{
              flexGrow: 1,
              '&:focus-visible': { outlineStyle: 'none' },
            }}
          >
            {_parts.length > 0 && (
              <>
                {_parts[0].entityType && <Part />}
                {_parts.map((part, i) => (
                  <Fragment key={i}>
                    {i !== 0 && part.entityType && _parts[i - 1]?.entityType && <Part />}
                    <Part
                      index={i}
                      handleClick={handleHihglightClick}
                      part={part}
                      type={part.entityType ? 'semantic' : 'text'}
                    />
                  </Fragment>
                ))}
                {_parts[_parts.length - 1].entityType && <Part />}
              </>
            )}
          </Typography>
        )}
      </Box>
      <Zoom in={hover}>
        <IconButton
          aria-label="delete"
          onClick={() => handleRemovePhrase(name)}
          size="small"
          sx={{ right: 4, bottom: 12 }}
        >
          <HighlightOffIcon fontSize="inherit" />
        </IconButton>
      </Zoom>
    </Box>
  );
};

export default Phrase;
