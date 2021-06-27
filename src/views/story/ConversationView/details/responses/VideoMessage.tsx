import { Box, Grid, IconButton, MenuItem, Select, useTheme, Zoom } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useAppState, useActions } from '@src/overmind';
import { Tag, Video } from '@src/types';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PayloadComp } from './Collection';

interface VideoMessageProps {
  content: PayloadComp;
  handleRemove: (index: string) => void;
  handleUpdate: (index: string, value: PayloadComp) => void;
  index: string;
  isDragging?: boolean;
}

type sourceOptionType = {
  id: string;
  label: string;
};

const defaultSourceOption: sourceOptionType = { id: '-1', label: 'Choose' };

const VideoMessage: FC<VideoMessageProps> = ({
  content,
  handleRemove,
  handleUpdate,
  index,
  isDragging = false,
}) => {
  const theme = useTheme();
  const { videos } = useAppState();
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

    return () => {};
  }, [content]);

  useEffect(() => {
    type !== content.payload.type ? setSource(-1) : setSource(content.payload.source[0] as number);

    const options = type === 'tag' ? videos.tagCollection : videos.collection;
    const mappedOptions = options.map((s: Tag | Video) => ({
      id: s.id.toString(),
      label: 'title' in s ? s.title : s.name,
    }));

    setSourceOptions([defaultSourceOption, ...mappedOptions]);
    return () => {};
  }, [type]);

  const handleChangeType = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: 'tag' | 'video';
      event: Event | React.SyntheticEvent<Element, Event>;
    }>
  ) => {
    const value = event.target.value;
    if (value !== 'tag' && value !== 'video') return;
    setType(value);
  };

  const handleChangeSource = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: number;
      event: Event | React.SyntheticEvent<Element, Event>;
    }>
  ) => {
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        width: '100%',
        backgroundColor: theme.palette.action.hover,
        '&:focus-within': {
          boxShadow: `${theme.palette.primary.light} 0px 0px 5px 1px !important`,
        },
        transition: theme.transitions.create(['box-shadow'], {
          duration: theme.transitions.duration.standard,
        }),
        boxShadow: hover
          ? 'rgb(0 0 0 / 20%) 0px 0px 10px 1px'
          : isDragging
          ? `${theme.palette.primary.light} 0px 0px 5px 1px !important`
          : 0,
      }}
    >
      <Grid container direction="row" spacing={2}>
        <Grid item>
          <Box display="flex" flexDirection="column" alignItems="center" mt={0.5}>
            <YouTubeIcon />
            {type === 'tag' && <ShuffleIcon sx={{ mt: 1 }} />}
          </Box>
        </Grid>
        <Grid item>
          <Select
            label={t('common:type')}
            name="type"
            onChange={handleChangeType}
            sx={{
              width: '12ch',
              textTransform: 'capitalize',
            }}
            value={type}
          >
            <MenuItem sx={{ textTransform: 'capitalize' }} value="tag">
              {t('tag')}
            </MenuItem>
            <MenuItem sx={{ textTransform: 'capitalize' }} value="video">
              {t('video')}
            </MenuItem>
          </Select>
        </Grid>
        <Grid item xs>
          <Select displayEmpty fullWidth name="source" onChange={handleChangeSource} value={source}>
            {sourceOptions.map(({ id, label }) => (
              <MenuItem
                key={id}
                disabled={id === '-1'}
                sx={{ textTransform: 'capitalize' }}
                value={id}
              >
                {label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Zoom in={hover}>
            <IconButton
              aria-label="delete"
              onClick={() => handleRemove(index)}
              size="small"
              sx={{ ml: 1 }}
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
