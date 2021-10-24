import { Menu, MenuItem } from '@mui/material';
import { useAppState } from '@src/overmind';
import React, { FC, useEffect, useRef, useState } from 'react';
import { getCursorXY } from './helper';

interface MenuParametersProps {
  inputElement: HTMLInputElement | undefined;
  onClose: () => void;
  onSelect: (value: string, position: number) => void;
  open: boolean;
  target: HTMLElement | undefined;
  type: 'parameters' | 'contexts' | null;
}

type MenuAnchorPositionType = {
  top: number;
  left: number;
};

const MenuParameters: FC<MenuParametersProps> = ({
  inputElement,
  onClose,
  onSelect,
  open,
  target,
  type,
}) => {
  const { intents } = useAppState();
  const { currentIntent } = intents;
  const [charPosition, setCharPosition] = useState(0);
  const [anchorPosition, setAnchorPosition] = useState<MenuAnchorPositionType>({ top: 0, left: 0 });
  const [options, setOptions] = useState<string[]>([]);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [context, setContext] = useState<string | undefined>();
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (open) {
      listOptions();
      setAnchorPosition(callAnchorPosition());
      setSubMenuOpen(false);
      setContext(undefined);
    }
  }, [open]);

  const callAnchorPosition = () => {
    if (!inputElement || !target) return { top: 0, left: 0 };

    const rect = target.getBoundingClientRect();
    const cursorPos = inputElement.selectionEnd ?? 0;
    const cursor = getCursorXY(inputElement, cursorPos);
    const margintop = 28;

    setCharPosition(cursorPos);

    return {
      top: rect.top + margintop,
      left: rect.left + cursor.x,
    };
  };

  const listOptions = () => {
    let list: string[] = [];
    if (type === 'parameters' && currentIntent?.parameters) {
      list = currentIntent?.parameters?.map(({ value }) => value ?? '');
    }
    if (type === 'contexts') {
      const inputContexts = currentIntent?.inputContexts
        ? currentIntent.inputContexts.map(({ shortName }) => shortName ?? '')
        : [];

      const outputContexts = currentIntent?.outputContexts
        ? currentIntent.outputContexts.map(({ shortName }) => shortName ?? '')
        : [];

      list = Array.from(new Set([...inputContexts, ...outputContexts]));
    }
    setOptions(list);
  };

  const handleMainClick = (value: string) => {
    type === 'parameters' ? onSelect(value, charPosition) : openSubMenu(value);
  };

  const openSubMenu = (value: string) => {
    setContext(value);
    setSubMenuOpen(true);
  };

  const closeSubMenu = () => {
    setContext(undefined);
    setSubMenuOpen(false);
  };

  const handleSubMenuClick = (value: string) => {
    closeSubMenu();
    onSelect(`${context}.${value}`, charPosition);
  };

  const handleClose = () => {
    closeSubMenu();
    onClose();
  };

  return (
    <>
      <Menu
        autoFocus={false}
        anchorPosition={anchorPosition}
        anchorReference="anchorPosition"
        onBackdropClick={handleClose}
        onClose={handleClose}
        open={open}
      >
        {options.map((value, i) => (
          <MenuItem
            key={i}
            ref={ref}
            onClick={() => handleMainClick(value)}
            selected={value === context}
          >
            {value}
          </MenuItem>
        ))}
      </Menu>
      {type === 'contexts' && subMenuOpen && (
        <Menu
          anchorPosition={{
            top: anchorPosition.top,
            left: anchorPosition.left + (ref.current?.getBoundingClientRect().width ?? 100),
          }}
          anchorReference="anchorPosition"
          onClose={onClose}
          open={subMenuOpen}
        >
          {intents.parameters.map(({ name, displayName }) => (
            <MenuItem key={name} onClick={() => handleSubMenuClick(displayName)}>
              {displayName}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default MenuParameters;
