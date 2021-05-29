import { Box, Grid, IconButton, makeStyles, Zoom } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import TextMessageContent from './TextMessageContent';
import { TextComp } from './Collection';

interface TextMessageProps {
  index: string;
  content: TextComp;
  handleRemove: (index: string) => void;
  handleUpdate: (index: string, value: TextComp) => void;
  isDragging?: boolean;
}

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  content: {
    width: '100%',
    backgroundColor: palette.action.hover,
    '&:focus-within': {
      boxShadow: `${palette.primary.light} 0px 0px 5px 1px !important`,
    },
    transition: transitions.create(['box-shadow'], {
      duration: transitions.duration.standard,
    }),
  },
  contentHover: { boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 10px 1px' },
  dragEffect: { boxShadow: `${palette.primary.light} 0px 0px 5px 1px !important` },
  marginTop: { marginTop: spacing(1) },
  removeButton: { marginLeft: spacing(1) },
}));

const TextMessage: FC<TextMessageProps> = ({
  index,
  content,
  handleRemove,
  handleUpdate,
  isDragging = false,
}) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [alternatives, setAlternatives] = useState<string[]>([]);

  useEffect(() => {
    setAlternatives(content.text.text ? content.text.text : []);
    return () => {};
  }, [content]);

  const handleRemoveAlternative = (altIndex: number) => {
    const updatedAlternatives = alternatives.filter((_text: string, i: number) => i !== altIndex);
    setAlternatives(updatedAlternatives);

    if (updatedAlternatives.length === 0) return handleRemove(index);

    const updatedContent = content;
    updatedContent.text.text = updatedAlternatives;
    handleUpdate(index, updatedContent);
  };

  const handleUpdateAlternative = (altIndex: number, value: string) => {
    const updatedAlternatives = alternatives.map((text, i) => {
      if (i === altIndex) return value;
      return text;
    });

    setAlternatives(updatedAlternatives);

    const updatedContent = content;
    updatedContent.text.text = updatedAlternatives;
    handleUpdate(index, updatedContent);
  };

  const addEmpty = () => {
    if (alternatives[alternatives.length - 1] === '') return;
    setAlternatives([...alternatives, '']);
  };

  return (
    <Box
      my={1}
      p={2}
      borderRadius={'borderRadius'}
      className={clsx(
        classes.content,
        hover && classes.contentHover,
        isDragging && classes.dragEffect,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Grid container direction="row" spacing={2}>
        <Grid item>
          <Box display="flex" flexDirection="column" alignItems="center" mt={0.5}>
            <FormatAlignLeftIcon />
            {alternatives.length > 1 && <ShuffleIcon className={classes.marginTop} />}
            <IconButton
              color="primary"
              size="small"
              className={classes.marginTop}
              onClick={addEmpty}
            >
              <AddCircleOutlineIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs>
          {alternatives?.map((content: string, altIndex: number) => (
            <TextMessageContent
              key={altIndex}
              index={altIndex}
              content={content}
              removable={alternatives.length > 1}
              handleRemove={handleRemoveAlternative}
              handleUpdate={handleUpdateAlternative}
            />
          ))}
        </Grid>
        <Grid item>
          <Zoom in={hover}>
            <IconButton
              aria-label="delete"
              className={classes.removeButton}
              size="small"
              onClick={() => handleRemove(index)}
            >
              <HighlightOffIcon />
            </IconButton>
          </Zoom>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextMessage;
