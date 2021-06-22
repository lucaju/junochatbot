import { Box, Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Collection from './Collection';

interface ContextsProps {
  activeTabIndex: number;
  index: number;
}

const Contexts: FC<ContextsProps> = ({ activeTabIndex, index }) => {
  const { t } = useTranslation(['intents']);

  return (
    <Box hidden={activeTabIndex !== index} role="tabpanel">
      <Box display="flex" flexDirection="column" alignItems="center" my={1.5}>
        <Typography variant="h6" sx={{ textTransform: 'uppercase' }}>
          {t('contexts')}
        </Typography>
      </Box>
      <Grid container direction="row" justifyContent="space-between" spacing={3}>
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
