import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import ForumIcon from '@material-ui/icons/Forum';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import type { Intent } from '@src/types';
import { motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import AddFollowUp from './AddFollowUp';
import Contexts from './Contexts';
import Message from './Message';
import Paramenter from './Parameter';
import { useActions } from '@src/overmind';

interface ContextCardProps {
  intent: Intent;
  handleEditClick: (value?: string) => void;
}

const ContextCard: FC<ContextCardProps> = ({ handleEditClick, intent }) => {
  const {
    name,
    displayName,
    inputContextNames,
    trainingPhrases,
    outputContexts,
    parameters,
    messages,
    isFallback,
    parentFollowupIntentName,
  } = intent;
  const actions = useActions();
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));
  const isLG = useMediaQuery(theme.breakpoints.down('lg'));

  const [hover, setHover] = useState(false);
  const trainingSize = trainingPhrases ? trainingPhrases.length : 0;

  const followUpParentDisplayname =
    actions.intents.getIntentDisplayNameByName(parentFollowupIntentName);

  const mouseOver = () => setHover(true);
  const mouseOut = () => setHover(false);

  return (
    <Card
      elevation={hover ? 6 : 1}
      onClick={() => handleEditClick(name)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      sx={{
        my: 1,
        ml: parentFollowupIntentName ? 6 : 1.5,
        mr: 1.5,
        cursor: 'pointer',
      }}
      component={motion.div}
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
    >
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Grid container direction={isLG ? 'column' : 'row'} spacing={1}>
          <Grid item xs={4}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {isFallback && <SettingsBackupRestoreIcon fontSize="small" />}
              <Typography variant="h6">{displayName}</Typography>
            </Stack>

            {parentFollowupIntentName && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <KeyboardReturnIcon sx={{ width: 16, height: 16 }} />
                <Typography variant="overline">{followUpParentDisplayname}</Typography>
              </Stack>
            )}
          </Grid>

          <Grid item xs={2}>
            {parameters &&
              parameters.map((param) => <Paramenter key={param.name} parameter={param} />)}
          </Grid>

          <Grid item xs={6}>
            {messages && (
              <Box pt={0.5}>
                {messages.map((message, i) => (
                  <Message key={i} message={message} />
                ))}
              </Box>
            )}
          </Grid>
        </Grid>

        <Stack
          direction={isSM ? 'column' : 'row'}
          alignItems={isSM ? 'flex-start' : 'center'}
          spacing={2}
          mx={-2}
          mt={1}
          mb={-2}
          px={2}
          py={1}
          sx={{ backgroundColor: ({ palette }) => alpha(palette.text.primary, 0.02) }}
        >
          <Stack
            direction={isSM ? 'column' : 'row'}
            alignItems={isSM ? 'flex-start' : 'center'}
            spacing={2}
            sx={{ overflowX: 'auto' }}
          >
            <Stack direction="row" spacing={1}>
              <ForumIcon fontSize="small" />
              <Typography variant="body2">{trainingSize}</Typography>
            </Stack>

            {inputContextNames && inputContextNames.length > 0 && (
              <>
                <Divider orientation="vertical" flexItem />
                <Contexts contexts={inputContextNames} type="input" />
              </>
            )}

            {outputContexts && outputContexts.length > 0 && (
              <>
                <Divider orientation="vertical" flexItem />
                <Contexts contexts={outputContexts} type="output" />
              </>
            )}
          </Stack>

          <Box flexGrow={1} />

          {hover && <AddFollowUp intent={intent} />}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ContextCard;
