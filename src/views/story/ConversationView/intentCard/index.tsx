import { Box, Card, CardContent, Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Intent } from '@src/types';
import General from './General';
import Contexts from './Contexts';
import Message from './Message';
import Paramenter from './Parameter';

interface ContextCardProps {
  className: string;
  intent: Intent;
  handleEditClick: (value?: string) => void;
}

const useStyles = makeStyles(({ shape, spacing, palette }) => ({
  root: {},
  cardContent: {
    '&:last-child': { paddingBottom: spacing(2) },
  },
  cardHover: { cursor: 'pointer' },
  context: {
    backgroundColor: palette.background.default,
    overflowX: 'auto',
  },
}));

const ContextCard: FC<ContextCardProps> = ({ className, intent, handleEditClick, ...rest }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
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

  const mouseOver = () => {
    setHover(true);
    setElevation(6);
  };

  const mouseOut = () => {
    setHover(false);
    setElevation(1);
  };

  return (
    <Card
      className={clsx(classes.root, className, hover && classes.cardHover)}
      elevation={elevation}
      onClick={() => handleEditClick(name)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      {...rest}
    >
      <CardContent classes={{ root: classes.cardContent }}>
        <Grid container direction="row" spacing={1}>
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
          <Box
            className={classes.context}
            display="flex"
            flexDirection="row"
            alignItems="center"
            mx={-2}
            mt={1}
            mb={-2}
            px={2}
            py={1}
          >
            <>
              {inputContextNames && inputContextNames.length > 0 && (
                <Contexts type="input" contexts={inputContextNames} />
              )}
              {outputContexts && outputContexts.length > 0 && (
                <Contexts type="output" contexts={outputContexts} />
              )}
            </>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ContextCard;