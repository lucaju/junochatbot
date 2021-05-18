import { Box, Grid, IconButton, makeStyles, MenuItem, Select, Zoom } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import TheatersIcon from '@material-ui/icons/Theaters';
import { useApp } from '@src/overmind';
import { Tag, Video } from '@src/types';
import clsx from 'clsx';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PayloadComp } from './Collection';

interface VideoMessageProps {
  index: string;
  content: PayloadComp;
  handleRemove: (index: string) => void;
  handleUpdate: (index: string, value: PayloadComp) => void;
  isDragging?: boolean;
}

type sourceOptionType = {
  id: string;
  label: string;
};

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  capitalize: { textTransform: 'capitalize' },
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
  dropdowSource: {
    width: '12ch',
    textTransform: 'capitalize',
  },
  dropdownType: {
    width: '12ch',
    textTransform: 'capitalize',
  },
  marginTop: { marginTop: spacing(1) },
  removeButton: { marginLeft: spacing(1) },
}));

const defaultSourceOption: sourceOptionType = { id: '-1', label: 'Choose' };

const VideoMessage: FC<VideoMessageProps> = ({
  index,
  content,
  handleRemove,
  handleUpdate,
  isDragging = false,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['intents', 'common']);
  const [hover, setHover] = useState(false);
  const [type, setType] = useState<'tag' | 'video'>(content.payload.type);
  const [source, setSource] = useState(-1);
  const [sourceOptions, setSourceOptions] = useState<sourceOptionType[]>([defaultSourceOption]);

  useEffect(() => {
    setType(content.payload.type);

    typeof content.payload.source[0] !== 'string'
      ? setSource(content.payload.source[0])
      : setSource(-1);
  }, [content]);

  useEffect(() => {
    type !== content.payload.type ? setSource(-1) : setSource(content.payload.source[0] as number);

    const options = type === 'tag' ? state.videos.tagCollection : state.videos.collection;
    const mapptedOptions = options.map((s: Tag | Video) => ({
      id: s.id.toString(),
      label: 'title' in s ? s.title : s.name,
    }));

    setSourceOptions([defaultSourceOption, ...mapptedOptions]);
  }, [type]);

  const handleChangeType = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value !== 'tag' && value !== 'video') return;
    setType(value);
  };

  const handleChangeSource = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSource(value);

    const payload: PayloadComp = {
      id: index,
      payload: {
        type,
        source: [value],
      },
    };
    handleUpdate(index, payload);
  };

  return (
    <Box
      minHeight={56}
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
            <TheatersIcon />
            {type === 'tag' && <ShuffleIcon className={classes.marginTop} />}
          </Box>
        </Grid>
        <Grid item>
          <Select
            className={classes.dropdownType}
            label={t('common:type')}
            name="type"
            onChange={handleChangeType}
            value={type}
          >
            <MenuItem className={classes.capitalize} value="tag">
              {t('tag')}
            </MenuItem>
            <MenuItem className={classes.capitalize} value="video">
              {t('video')}
            </MenuItem>
          </Select>
        </Grid>
        <Grid item xs>
          <Select displayEmpty fullWidth name="source" onChange={handleChangeSource} value={source}>
            {sourceOptions.map(({ id, label }) => (
              <MenuItem key={id} className={classes.capitalize} disabled={id === '-1'} value={id}>
                {label}
              </MenuItem>
            ))}
          </Select>
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

export default VideoMessage;
