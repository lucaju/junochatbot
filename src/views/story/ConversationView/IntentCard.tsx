import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { useRefresh } from 'muuri-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Intent } from '../../../types';
import Context from './components/context';
import Message from './components/message';

interface ContextCardProps {
  className: string;
  intent: Intent;
}

const useStyles = makeStyles(({ shape, spacing, palette }) => ({
  root: {
    // width: 350
  },
  cardContent: {
    padding: spacing(1),
    paddingLeft: spacing(2),
    paddingRight: 0,
    '&:last-child': { paddingBottom: spacing(1) },
  },
  cardHover: { cursor: 'pointer' },
  column: {
    // paddingLeft: spacing(1),
    paddingRight: spacing(1),
  },
  training: {
    borderRadius: shape.borderRadius,
    borderColor: '#eee',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: palette.action.hover,
    width: 'fit-content',
    padding: spacing(0.5),
  },
  message: {
    backgroundColor: '#f3f3f3',
    marginBottom: -spacing(1),
    marginTop: -spacing(1),
    paddingTop: spacing(1),
    paddingRight: spacing(1),
    paddingLeft: spacing(1),
  },
}));

const ContextCard: FC<ContextCardProps> = ({ className, intent, ...rest }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(1);
  const cardRef = useRef<any | undefined>();
  const [size, setSize] = useState();
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

  const {
    name,
    displayName,
    inputContextNames,
    trainingPhrases,
    outputContexts,
    parameters,
    messages,
  } = intent;

  console.log(intent);

  //Use effects to refrech Muuri after elements sets its size
  useEffect(() => {
    setSize(cardRef.current.offsetWidth);
  }, []);

  useRefresh([size]);

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
      ref={cardRef}
      className={clsx(classes.root, className, hover && classes.cardHover)}
      elevation={elevation}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      {...rest}
    >
      <CardContent classes={{ root: classes.cardContent }}>
        <Grid container direction="row">
          <Grid className={classes.column} item xs={isLarge ? 3 : 5}>
            <Typography variant="h6">{displayName}</Typography>
          </Grid>
          {isLarge && (
            <>
              <Grid className={classes.column} item xs={1}>
                {/* <Box className={classes.training}> */}
                <Typography variant="body1">
                  {trainingPhrases ? trainingPhrases.length : 0}
                </Typography>
                {/* </Box> */}
              </Grid>
              <Grid className={classes.column} item xs={2}>
                <>
                  {inputContextNames && inputContextNames?.length > 0 && (
                    <>
                      <Typography variant="overline">Input</Typography>
                      {inputContextNames.map((inContext) => (
                        <Context key={inContext} type="in" name={inContext} />
                      ))}
                    </>
                  )}
                  {outputContexts && outputContexts?.length > 0 && (
                    <>
                      <Typography variant="overline">Output</Typography>
                      {outputContexts.map((outContext) => (
                        <Context
                          key={outContext.name}
                          type="out"
                          name={outContext.name}
                          lifespanCount={outContext.lifespanCount}
                        />
                      ))}
                    </>
                  )}
                </>
              </Grid>
              <Grid className={classes.column} item xs={2}>
                {parameters &&
                  parameters.map((param) => (
                    <Typography key={param.displayName} variant="body1">
                      {`${param.displayName} (${param.entityTypeDisplayName})`}
                    </Typography>
                  ))}
              </Grid>
            </>
          )}
          <Grid className={classes.message} item xs={isLarge ? 4 : 7}>
            {messages.map((message, i) => {
              if ('payload' in message) {
                return (
                  <Message
                    key={i}
                    type="payload"
                    text={
                      typeof message.payload.source === 'string'
                        ? message.payload.source
                        : message.payload.source.join(', ')
                    }
                    variation={message.payload.type === 'TAG'}
                  />
                );
              } else if (message.text.text) {
                return (
                  <Message
                    key={i}
                    type="text"
                    text={message.text.text[0]}
                    variation={message.text.text.length > 1}
                  />
                );
              }
            })}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContextCard;
