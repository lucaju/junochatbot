import {
  Box,
  Card,
  Chip,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useRefresh } from 'muuri-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { ContextRelation } from '@src/types';

interface ContextCardProps {
  className: string;
  context: ContextRelation;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: { width: 350 },
  cardContent: {
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    BorderLeftColor: palette.background.paper,
    backgroundColor: palette.background.default,
    padding: spacing(1),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    '&:last-child': { paddingBottom: spacing(1) },
  },
  cardHover: {
    backgroundColor: palette.background.paper,
    borderLeftWidth: 0,
  },
  outputLabel: { textDecoration: 'underline' },
  tag: { marginRight: spacing(1) },
}));

const ContextCard: FC<ContextCardProps> = ({ className, context, ...rest }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [elevation, setElevation] = useState(0);
  const cardRef = useRef<any | undefined>();
  const [size, setSize] = useState();

  const { name, inputs, outputs } = context;

  //Use effects to refrech Muuri after elements sets its size
  useEffect(() => {
    setSize(cardRef.current.offsetWidth);
  }, []);

  useRefresh([size]);

  const mouseOver = () => {
    setHover(true);
    setElevation(1);
  };

  const mouseOut = () => {
    setHover(false);
    setElevation(0);
  };

  return (
    <Card
      ref={cardRef}
      className={clsx(classes.root, className)}
      elevation={elevation}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      {...rest}
    >
      <CardContent
        classes={{
          root: clsx(classes.cardContent, hover && classes.cardHover),
        }}
      >
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>

        {inputs && (
          <Box>
            <Typography gutterBottom variant="overline">
              Inputs
            </Typography>
            <Box>
              {inputs.map((input) => (
                <Chip
                  key={input}
                  className={classes.tag}
                  label={input.toUpperCase()}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        {outputs && (
          <Box>
            <Typography gutterBottom variant="overline">
              Outputs
            </Typography>
            <Box>
              {outputs.map((output) => (
                <Chip
                  key={output}
                  className={classes.tag}
                  label={output.toUpperCase()}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ContextCard;
