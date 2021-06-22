import { Menu, MenuItem } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import useParameter from '../parameters/hooks';
import { getCursorXY } from './helper';

interface MenuParametersProps {
  handleClick: (value: string, position: number) => void;
  handleClose: () => void;
  inputElement: HTMLInputElement | undefined;
  open: boolean;
  target: HTMLElement | undefined;
}

type MenuAnchorPositionType = {
  top: number;
  left: number;
};

const MenuParameters: FC<MenuParametersProps> = ({
  handleClick,
  handleClose,
  inputElement,
  open,
  target,
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
      onClose={handleClose}
      open={open}
    >
      {params.map(({ value }, i) => (
        <MenuItem
          key={i}
          onClick={() => {
            if (!value) return;
            handleClick(value, charPosition);
          }}
          value={value}
        >
          {value}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MenuParameters;
