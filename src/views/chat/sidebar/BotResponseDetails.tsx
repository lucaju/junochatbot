import { IconButton, Popover, Typography } from '@material-ui/core';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import { useAppState } from '@src/overmind';
import type { SpeechMessage } from '@src/types';
import { json } from 'overmind';
import React, { FC, MouseEvent, useState } from 'react';

interface BotResponseDetailsProps {
  speech: SpeechMessage;
}

const BotResponseDetails: FC<BotResponseDetailsProps> = ({ speech }) => {
  const { chat } = useAppState();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const { metadata } = speech;
  const { intent, intentDetectionConfidence, queryText } = metadata ?? {};

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (chat.debug) console.log({ dialogFlowResponseDetail: json(metadata) });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick} size="small" sx={{ mb: -0.75, mr: -0.75 }}>
        <BubbleChartIcon sx={{ width: 16, height: 16 }} />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        id="DialogFlow Response Details"
        onClose={handleClose}
        open={open}
        PaperProps={{ sx: { mt: 2, p: 1 } }}
      >
        <Typography mt={0} mb={0.5} paragraph variant="caption">
          DialogFlow Response Detail
        </Typography>
        {queryText && (
          <Typography
            fontSize="0.65rem"
            my={0.25}
            paragraph
            variant="caption"
            sx={{ fontWeight: 700 }}
          >
            Query Text:{' '}
            <Typography my={0.25} fontSize="0.65rem" variant="caption">
              {queryText}
            </Typography>
          </Typography>
        )}
        {intent && (
          <Typography
            fontSize="0.65rem"
            my={0.25}
            paragraph
            variant="caption"
            sx={{ fontWeight: 700 }}
          >
            Intent:{' '}
            <Typography my={0.25} fontSize="0.65rem" variant="caption">
              {intent.displayName}
            </Typography>
          </Typography>
        )}
        {intentDetectionConfidence && (
          <Typography
            fontSize="0.65rem"
            my={0.25}
            paragraph
            variant="caption"
            sx={{ fontWeight: 700 }}
          >
            Confidence:{' '}
            <Typography my={0.25} fontSize="0.65rem" variant="caption">
              {intentDetectionConfidence}
            </Typography>
          </Typography>
        )}
      </Popover>
    </>
  );
};

export default BotResponseDetails;
