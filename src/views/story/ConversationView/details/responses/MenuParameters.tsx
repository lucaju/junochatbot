import { Menu, MenuItem } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { getCursorXY } from './helper';
import useParameter from '../parameters/hooks';

interface MenuParametersProps {
  open: boolean;
  target: HTMLElement | undefined;
  inputElement: HTMLInputElement | undefined;
  handleClick: (value: string, position: number) => void;
  handleClose: () => void;
}

type MenuAnchorPositionType = {
  top: number;
  left: number;
};

const MenuParameters: FC<MenuParametersProps> = ({
  inputElement,
  open,
  target,
  handleClick,
  handleClose,
}) => {
  const { params } = useParameter();
  const [charPosition, setCharPosition] = useState(0);
  const [anchorPosition, setAnchorPosition] = useState<MenuAnchorPositionType>({ top: 0, left: 0 });

  useEffect(() => {
    if (open) setAnchorPosition(callAnchorPosition());
    return () => {};
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

  return (
    <Menu
      anchorPosition={anchorPosition}
      anchorReference="anchorPosition"
      open={open}
      onClose={handleClose}
    >
      {params.map(({ value }, i) => (
        <MenuItem
          key={i}
          value={value}
          onClick={() => {
            if (!value) return;
            handleClick(value, charPosition);
          }}
        >
          {value}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MenuParameters;
