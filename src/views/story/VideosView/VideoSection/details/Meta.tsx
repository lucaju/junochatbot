import { Box, Grid, IconButton, Skeleton, Typography } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Video } from '@src/types';
import { DateTime, Duration } from 'luxon';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MetaProps {
  handleRefresh: () => Promise<void>;
  values: Partial<Video>;
  youtubeVideoId?: string;
}

const Meta: FC<MetaProps> = ({ handleRefresh, values, youtubeVideoId }) => {
  const { t } = useTranslation(['videos', 'common']);
  const [loading, setLoading] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {
    if (youtubeVideoId && values.title === '') fetchData();
    // if (youtubeVideoId) setLoading(false);
  }, [values.title]);

  const fetchData = async () => {
    setLoading(true);
    await handleRefresh();
    setRefreshed(true);
    setLoading(false);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={11}>
          <Typography sx={{ textTransform: 'capitalize' }} variant="caption">
            {t('common:title')}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {loading ? <Skeleton /> : <b>{values.title}</b>}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="refresh"
            disabled={loading || refreshed}
            onClick={fetchData}
            sx={{ mt: 1 }}
          >
            <RefreshIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={8}>
          <Typography sx={{ textTransform: 'capitalize' }} variant="caption">
            {t('channel')}
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            {loading ? <Skeleton /> : values.channelTitle}
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Box display="flex" flexDirection="row" justifyContent="flex-end" mt={2.5}>
            <CalendarTodayIcon
              fontSize="small"
              sx={{ mt: 0.5, mr: 0.5, opacity: 0.7, fontSize: '12px' }}
            />
            <Typography gutterBottom variant="subtitle2">
              {loading ? (
                <Skeleton width={50} />
              ) : (
                values.publishedAt && DateTime.fromISO(values.publishedAt).toFormat('yyyy')
              )}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box display="flex" flexDirection="row" justifyContent="flex-end" mt={2.5}>
            <AccessTimeIcon
              fontSize="small"
              sx={{ mt: 0.5, mr: 0.5, opacity: 0.7, fontSize: '12px' }}
            />
            <Typography gutterBottom variant="subtitle2">
              {loading ? (
                <Skeleton width={50} />
              ) : (
                values.duration && Duration.fromISO(values.duration).toFormat('hh:mm:ss')
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Meta;
