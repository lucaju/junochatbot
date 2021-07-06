import { Box, Card, CardContent, Grid, Stack, useMediaQuery, useTheme  } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import { Intent } from '@src/types';
import React, { FC, useState } from 'react';
import Contexts from './Contexts';
import General from './General';
import Message from './Message';
import Paramenter from './Parameter';
import { AnimatePresence, motion } from 'framer-motion';

interface ContextCardProps {
  intent: Intent;
  handleEditClick: (value?: string) => void;
}

const ContextCard: FC<ContextCardProps> = ({ handleEditClick, intent }) => {
  const [elevation, setElevation] = useState(1);

  const {
    name,
    displayName,
    inputContextNames,
    trainingPhrases,
    outputContexts,
    parameters,
    messages,
  } = intent;

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));
  const isLG = useMediaQuery(theme.breakpoints.down('lg'));

  const mouseOver = () => setElevation(6);
  const mouseOut = () => setElevation(1);

  return (
    <Card
      elevation={elevation}
      onClick={() => handleEditClick(name)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      sx={{
        my: 1,
        mx: 1.5,
        cursor: 'pointer',

      }}
      component={motion.div}
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
    >
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Grid container  direction={isLG ? 'column' : 'row'} spacing={1}>
          <Grid item xs={4}>
            <General displayName={displayName} trainingPhrases={trainingPhrases} />
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

        {(inputContextNames || inputContextNames) && (
          <Stack
            direction={isSM ? 'column' : 'row'}
            alignItems={isSM ? 'flex-start' : 'center'}
            spacing={1}
            mx={-2}
            mt={1}
            mb={-2}
            px={2}
            py={1}
            sx={{
              backgroundColor: ({ palette }) => alpha(palette.text.primary, 0.02),
              overflowX: 'auto',
            }}
          >
            <>
              {inputContextNames && inputContextNames.length > 0 && (
                <Contexts contexts={inputContextNames} type="input" />
              )}
              {outputContexts && outputContexts.length > 0 && (
                <Contexts contexts={outputContexts} type="output" />
              )}
            </>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default ContextCard;
