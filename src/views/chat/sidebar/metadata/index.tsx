import { Box, IconButton, Popover, Typography } from '@material-ui/core';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import { useActions, useAppState } from '@src/overmind';
import { json } from 'overmind';
import React, { FC, MouseEvent, useState } from 'react';
import Attribute from './Attribute';

interface BotResponseDetailsProps {
  speechId: string;
}

const BotResponseDetails: FC<BotResponseDetailsProps> = ({ speechId }) => {
  const { intents } = useActions();
  const { metadata } = useAppState(({ chat }) => chat._chatLog[speechId]);
  const debug = useAppState(({ chat }) => chat.debug);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const { intent, intentDetectionConfidence, outputContexts, queryText, sentimentAnalysisResult } =
    metadata ?? {};

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (debug) console.log({ dialogFlowResponseDetail: json(metadata) });
    setAnchorEl(event.currentTarget);
  };

  const extractContextName = (name: string) => {
    const matchName = name.match(/contexts\/(.+)/);
    const shortName = matchName ? matchName[1] : '';
    return shortName;
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick} size="small" sx={{ mb: -0.75, mr: -0.75 }}>
        <BubbleChartIcon sx={{ width: 16, height: 16 }} />
      </IconButton>
      {open && (
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
          {queryText && <Attribute name="Query Text" value={queryText} />}
          {intent && <Attribute name="Intent" value={intent.displayName} />}
          {intentDetectionConfidence && (
            <Attribute name="Confidence" value={intentDetectionConfidence} />
          )}
          {sentimentAnalysisResult && (
            <>
              <Attribute name="Sentimental Analysis" />
              <Attribute
                level={1}
                name="Magniture"
                value={sentimentAnalysisResult.queryTextSentiment.magnitude}
              />
              <Attribute
                level={1}
                name="Score"
                value={sentimentAnalysisResult.queryTextSentiment.score}
              />
            </>
          )}
          {outputContexts && (
            <>
              <Attribute name="Contexts" />
              {outputContexts.map(({ name, lifespanCount, parameters }) => (
                <>
                  <Attribute
                    key={name}
                    level={1}
                    name={extractContextName(name)}
                    value={`lifespan ${lifespanCount}`}
                  />
                  {parameters &&
                    Object.entries(parameters).map(([key, value], i) => (
                      <Attribute
                        key={`param-${i}`}
                        level={2}
                        name={key}
                        value={typeof value === 'string' ? value : JSON.stringify(value)}
                      />
                    ))}
                </>
              ))}
            </>
          )}
        </Popover>
      )}
    </>
  );
};

export default BotResponseDetails;
