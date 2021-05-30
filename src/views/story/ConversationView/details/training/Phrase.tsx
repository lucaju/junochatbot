import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Part as PartType, TrainingPhrase } from '@src/types';
import clsx from 'clsx';
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
import useParameter from '../parameters/hooks';
import EntitiesMenu from './EntitiesMenu';
import {
  getSelectionData,
  removePart,
  SelectionDataType,
  updateParts,
  updatePartSemantic,
} from './helper';
import useTrainingPhrases from './hooks';
import Part from './Part';

interface PhraseProps {
  name?: string;
  parts: PartType[];
  type?: string;
  timesAddedCount?: number;
}

//DialogFlow limit: 768 -> https://cloud.google.com/dialogflow/quotas#es-agent_1
const CHART_MAX_LIMIT = 768;

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  content: {
    borderStartStartRadius: spacing(1.5),
    borderStartEndRadius: spacing(1.5),
    borderEndStartRadius: spacing(1.5),
    backgroundColor: palette.action.hover,
    '&:focus-within': {
      boxShadow: `${palette.primary.light} 0px 0px 5px 1px !important`,
    },
    transition: transitions.create(['box-shadow'], {
      duration: transitions.duration.standard,
    }),
    minWidth: 50,
  },
  contentHover: {
    boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 10px 1px',
  },
  editable: {
    flexGrow: 1,
    '&:focus-visible': { outlineStyle: 'none' },
  },
  removeButton: { marginLeft: spacing(1) },
}));

const Phrase: FC<PhraseProps> = ({ name, parts, type = 'EXAMPLE', timesAddedCount = 1 }) => {
  const classes = useStyles();
  const { isSinglePhraseParam, updatePhrase, removePhrase } = useTrainingPhrases();
  const { addParameter, removeParameterByDisplayName, updateParameterByAlias } = useParameter();

  const TypRef = useRef<any | undefined>();
  const [hover, setHover] = useState(false);
  const [changed, setChanged] = useState(false);
  const [_parts, _setParts] = useState<PartType[]>(parts);
  const [contextMenuAnchorEl, setContextMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [parameterAlias, setParameterAlias] = useState<string | undefined>();

  useEffect(() => {
    if (name?.includes('added')) TypRef.current.focus();
    return () => {};
  }, []);

  useEffect(() => {
    if (!changed) return;
    const updatedPhrase: TrainingPhrase = {
      name,
      type,
      parts: _parts,
      timesAddedCount,
    };
    updatePhrase(updatedPhrase);

    setChanged(false);
    return () => {};
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

    openContextMenu(event.currentTarget);
  };

  const handleHihglightClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (contextMenuOpen) return;

    // const entityType = event.currentTarget.dataset.entityType;
    const paramAlias = event.currentTarget.dataset.alias;
    if (!paramAlias) return;

    openContextMenu(event.currentTarget, paramAlias);
  };

  const handleAddPart = (entityName: string) => {
    const selection = window.getSelection();
    if (!selection) return handleEntitiesMenuClose();

    const selectionData = getSelectionData(selection);
    if (!selectionData) return handleEntitiesMenuClose();

    processUpdatePhrase({ ...selectionData, entityName });

    selection.removeAllRanges();
    handleEntitiesMenuClose();
  };

  const handleUpdatePart = (currentAlias: string, entityName?: string) => {
    if (!entityName) return;

    const element = TypRef.current as HTMLElement;
    const protoParts: PartType[] = updatePartSemantic(element, entityName, currentAlias);

    //update parts the component internally
    _setParts(protoParts);

    //schedule changes
    setChanged(true);

    isSinglePhraseParam(currentAlias)
      ? updateParameterByAlias(currentAlias, entityName)
      : addParameter(entityName);
  };

  const handleRemovePart = (currentAlias?: string) => {
    if (!currentAlias) return;
    const element = TypRef.current as HTMLElement;
    const protoParts: PartType[] = removePart(element, currentAlias);

    //update parts the component internally
    _setParts(protoParts);

    //schedule changes
    setChanged(true);

    if (isSinglePhraseParam(currentAlias)) {
      removeParameterByDisplayName(currentAlias);
    }

    handleEntitiesMenuClose();
  };

  const openContextMenu = async (anchor: HTMLElement, contextValue?: string) => {
    if (contextMenuOpen) return;
    if (contextValue) setParameterAlias(contextValue);
    setContextMenuAnchorEl(anchor);
    setContextMenuOpen(true);
  };

  const processUpdatePhrase = (selectionData?: SelectionDataType) => {
    const element = TypRef.current as HTMLElement;
    const protoParts: PartType[] = updateParts(element, selectionData);

    if (protoParts.length === 0) return removePhrase(name);

    //update parts the component internally
    _setParts(protoParts);

    //schedule changes
    setChanged(true);

    //add new Parameter
    if (!selectionData) return;
    addParameter(selectionData.entityName);
  };

  const handleEntitiesMenuClose = () => {
    setParameterAlias(undefined);
    setContextMenuAnchorEl(null);
    setContextMenuOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      my={1}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        p={1}
        className={clsx(classes.content, hover && classes.contentHover)}
        onMouseEnter={() => setHover(true)}
      >
        <EntitiesMenu
          addPart={handleAddPart}
          updatePart={handleUpdatePart}
          removePart={handleRemovePart}
          handleClose={handleEntitiesMenuClose}
          anchorEl={contextMenuAnchorEl}
          open={contextMenuOpen}
          value={parameterAlias}
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
                      index={i}
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
      </Box>
      {hover && (
        <IconButton
          aria-label="delete"
          className={classes.removeButton}
          size="small"
          onClick={() => removePhrase(name)}
        >
          <HighlightOffIcon fontSize="inherit" />
        </IconButton>
      )}
    </Box>
  );
};

export default Phrase;
