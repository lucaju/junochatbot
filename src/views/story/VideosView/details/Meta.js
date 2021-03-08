import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RefreshIcon from '@material-ui/icons/Refresh';
import Skeleton from '@material-ui/lab/Skeleton';
import { DateTime, Duration } from 'luxon';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ spacing }) => ({
  capitalize: { textTransform: 'capitalize' },
  extraInfo: { marginTop: spacing(2.5) },
  icon: {
    marginTop: spacing(0.5),
    marginRight: spacing(0.5),
    opacity: 0.7,
    fontSize: '12px',
  },
  refreshButton: { marginTop: spacing(1) },
}));

const Meta = ({ handleRefresh, values, youtubeVideoId }) => {
  const classes = useStyles();
  const { t } = useTranslation(['videos', 'common']);
  const [loading, setLoading] = useState(true);
  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {
    if (youtubeVideoId && values.title === '') fetchData();
    if (youtubeVideoId) setLoading(false);
    return () => {};
  }, [values.title]);

  const fetchData = async () => {
    await handleRefresh();
    setRefreshed(true);
    setLoading(false);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={11}>
          <Typography className={classes.capitalize} variant="caption">
            {t('common:title')}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {loading ? <Skeleton /> : <b>{values.title}</b>}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="refresh"
            className={classes.refreshButton}
            disabled={loading || refreshed}
            onClick={fetchData}
          >
            <RefreshIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={8}>
          <Typography className={classes.capitalize} variant="caption">
            {t('channel')}
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            {loading ? <Skeleton /> : values.channelTitle}
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Box
            display="flex"
            flexDirection="row"
            className={classes.extraInfo}
            justifyContent="flex-end"
          >
            <CalendarTodayIcon className={classes.icon} fontSize="small" />
            <Typography gutterBottom variant="subtitle2">
              {loading ? (
                <Skeleton width={50} />
              ) : (
                DateTime.fromISO(values.publishedAt).toFormat('yyyy')
              )}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box
            display="flex"
            flexDirection="row"
            className={classes.extraInfo}
            justifyContent="flex-end"
          >
            <AccessTimeIcon className={classes.icon} fontSize="small" />
            <Typography gutterBottom variant="subtitle2">
              {loading ? (
                <Skeleton width={50} />
              ) : (
                Duration.fromISO(values.duration).toFormat('hh:mm:ss')
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Meta.propTypes = {
  handleRefresh: PropTypes.func,
  values: PropTypes.object,
  youtubeVideoId: PropTypes.string,
};

export default Meta;
