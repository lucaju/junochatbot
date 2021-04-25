import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import clsx from 'clsx';
import { useRefresh } from 'muuri-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Intent } from '../../../types';
import Contexts from './cardComponents/Contexts';
import Message from './cardComponents/Message';
import Paramenter from './cardComponents/Parameter';

interface ContextCardProps {
  className: string;
  intent: Intent;
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

const ContextCard: FC<ContextCardProps> = ({ className, intent, ...rest }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(1);
  const cardRef = useRef<any | undefined>();
  const [size, setSize] = useState();

  const {
    name,
    displayName,
    inputContextNames,
    trainingPhrases,
    outputContexts,
    parameters,
    messages,
  } = intent;

  // console.log(intent);

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
        <Grid container direction="row" spacing={1}>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="row">
              <Typography variant="subtitle1">{displayName}</Typography>
              <Box
                display="flex"
                flexDirection="row"
                ml={2}
                pt={0.25}
                color="text.secondary"
              >
                <FitnessCenterIcon fontSize="small" />
                <Typography variant="body2">
                  {trainingPhrases ? trainingPhrases.length : 0}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={2}>
            {parameters &&
              parameters.map((param) => <Paramenter parameter={param} />)}
          </Grid>

          <Grid item xs={6}>
            <Box pt={0.5}>
              {messages.map((message, i) => (
                <Message key={i} message={message} />
              ))}
            </Box>
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
