import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  useMediaQuery,
  useTheme,
  Zoom,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useActions, useAppState } from '@src/overmind';
import { Payload } from '@src/types';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface VideoMessageProps {
  message: Payload;
  isDragging?: boolean;
}

type sourceOptionType = {
  id: string;
  label: string;
};

const VideoMessage: FC<VideoMessageProps> = ({ message, isDragging = false }) => {
  const theme = useTheme();
  const { videos } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['intents', 'common']);

  const defaultSourceOption: sourceOptionType = { id: '-1', label: t('common:Choose') };

  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [hover, setHover] = useState(false);
  const [source, setSource] = useState('-1');
  const [sourceOptions, setSourceOptions] = useState<sourceOptionType[]>([defaultSourceOption]);

  useEffect(() => {
    //update options
    const options = message.payload.type === 'tag' ? videos.tagCollection : videos.collection;
    const mappedOptions = options.map((option) => ({
      id: option.id.toString(),
      label: 'title' in option ? option.title : option.name,
    }));

    setSourceOptions([defaultSourceOption, ...mappedOptions]);
    setSource('-1');
    return () => {};
  }, []);

  useEffect(() => {
    const sourceValue = message.payload.source;
    setSource(sourceValue === '' ? '-1' : sourceValue);

    return () => {};
  }, [message.payload.source]);

  const handleChangeSource = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: string;
      event: Event | React.SyntheticEvent<Element, Event>;
    }>
  ) => {
    const value = event.target.value;
    actions.intents.updateVideoSource({
      messageId: message.id,
      source: value,
    });
  };

  const handleRemove = () => {
    if (!message.id) return;
    actions.intents.removeMessage(message.id);
  };

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      flexGrow={1}
      spacing={0}
      my={1}
      ml={3}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        minHeight={56}
        p={2}
        borderRadius={'borderRadius'}
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
              {message.payload.type === 'tag' && <ShuffleIcon sx={{ mt: 1 }} />}
            </Box>
          </Grid>
          <Grid item xs>
            <Select
              displayEmpty
              fullWidth
              name="source"
              onChange={handleChangeSource}
              value={source}
              variant="standard"
            >
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
        </Grid>
      </Box>
      <Zoom in={hover}>
        <IconButton
          aria-label="delete"
          onClick={handleRemove}
          size="small"
          sx={{ right: 16, bottom: 16 }}
        >
          <HighlightOffIcon />
        </IconButton>
      </Zoom>
    </Stack>
  );
};

export default VideoMessage;
