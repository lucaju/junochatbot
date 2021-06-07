import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';

interface ContextsProps {
  index: number;
  activeTabIndex: number;
}

const useStyles = makeStyles(() => ({
  uppercase: { textTransform: 'uppercase' },
}));

const Contexts: FC<ContextsProps> = ({ index, activeTabIndex }) => {
  const classes = useStyles();
  const { t } = useTranslation(['intents']);

  return (
    <Box role="tabpanel" hidden={activeTabIndex !== index}>
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Typography variant="h6" className={classes.uppercase}>
          {t('contexts')}
        </Typography>
      </Box>
      <Grid container direction="row" justify="space-between" spacing={3}>
        <Grid item xs={6}>
          <Collection type="input" />
        </Grid>
        <Grid item xs={6}>
          <Collection type="output" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contexts;
