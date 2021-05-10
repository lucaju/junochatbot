import { Grid, makeStyles } from '@material-ui/core';
import React, { FC, useState } from 'react';
import Collection from './Collection';

interface ContextsProps {
  inputContextField: string;
  outputContextField: string;
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const Contexts: FC<ContextsProps> = ({ inputContextField, outputContextField }) => {
  const classes = useStyles();
  const [crossContext, setCrossContext] = useState<string | undefined>();

  return (
    <Grid container direction="row" justify="space-between" spacing={3}>
      <Grid item xs={6}>
        <Collection type="input" fieldName={inputContextField} setCrossContext={setCrossContext} />
      </Grid>
      <Grid item xs={6}>
        <Collection
          type="output"
          fieldName={outputContextField}
          setCrossContext={setCrossContext}
          crossContext={crossContext}
        />
      </Grid>
    </Grid>
  );
};

export default Contexts;
