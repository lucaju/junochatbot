import { Box, Button, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';

const Responses: FC = () => {
  const { currentIntent } = useAppState().intents;
  const { videos } = useAppState();
  const actions = useActions();
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>();
  const [refCurrentHeight, setRefCurrentHeight] = useState(0);

  // update div scroll
  useEffect(() => {
    if (!ref.current) return;
    autoScroll();
  }, [currentIntent?.messages, refCurrentHeight]);

  const autoScroll = () => {
    setTimeout(() => {
      if (!ref.current) return;
      if (refCurrentHeight > 0 && refCurrentHeight < ref.current.scrollHeight) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
      setRefCurrentHeight(ref.current.scrollHeight);
    }, 0);
  };

  const addTextMessage = () => actions.intents.addTextMessage();
  const addVideoMessage = () => actions.intents.addVideoMessage();
  const addVideoTagMessage = () => actions.intents.addVideoTagMessage();

  const SpecialKeyword = ({ code }: { code: string }) => (
    <Typography
      component="span"
      fontWeight={600}
      sx={{
        px: 0.5,
        borderRadius: 1,
        border: ({ palette }) => `1px solid ${palette.primary.dark}`,
        backgroundColor: ({ palette }) => alpha(palette.primary.light, 0.2),
      }}
      variant="inherit"
    >
      {code}
    </Typography>
  );

  return (
    <Box ref={ref} height="100%" sx={{ overflow: 'auto' }}>
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Box display="flex" flexDirection="row" my={1.5}>
          <Button color="primary" onClick={addTextMessage} startIcon={<AddCircleOutlineIcon />}>
            {t('intents:addText')}
          </Button>
          <Tooltip
            disableHoverListener={videos.collection.length > 0}
            title={videos.collection.length === 0 && `${t('videos:noVideosYet')}`}
          >
            <span>
              <Button
                color="primary"
                disabled={videos.collection.length === 0}
                onClick={addVideoMessage}
                startIcon={<AddCircleOutlineIcon />}
              >
                {t('intents:addVideo')}
              </Button>
            </span>
          </Tooltip>
          <Tooltip
            disableHoverListener={videos.tagCollection.length > 0}
            title={videos.tagCollection.length === 0 && `${t('tags:noTagsYet')}`}
          >
            <span>
              <Button
                color="primary"
                disabled={videos.tagCollection.length === 0}
                onClick={addVideoTagMessage}
                startIcon={<AddCircleOutlineIcon />}
              >
                {t('intents:addVideoTag')}
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" m={2}>
        <Typography variant="overline">
          {t('common:type')} <SpecialKeyword code="$" /> {t('intent:responseAccessParameters')}
        </Typography>
        <Typography variant="overline">
          {t('common:type')} <SpecialKeyword code="#" />{' '}
          {t('intent:responseAccessContextParameters')}
        </Typography>
      </Box>
      <Collection />
    </Box>
  );
};

export default Responses;
