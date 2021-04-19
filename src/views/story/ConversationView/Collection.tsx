import {
  Box,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FlareRoundedIcon from '@material-ui/icons/FlareRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import NfcRoundedIcon from '@material-ui/icons/NfcRounded';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import React, { FC, useEffect, useState } from 'react';
import NoContent from '../../../components/NoContent';
import { useApp } from '../../../overmind';
import { Intent } from '../../../types';
import IntentCard from './IntentCard';

interface CollectionProps {
  filters: Map<string, string>;
  searchQuery: string | undefined;
  isLoading?: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    minHeight: 80,
    width: '98%',
    margin: spacing(1),
  },
  container: {
    maxHeight: '83vh',
    overflowY: 'scroll',
  },
  header: {
    padding: spacing(1.5),
  },
  iconHeader: {
    marginRight: spacing(1),
  },
}));

const Collection: FC<CollectionProps> = ({
  filters,
  searchQuery,
  isLoading = false,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const [filteredItems, setFilteredItems] = useState<Intent[]>([]);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, state.intents.collection]);

  const items = () => {
    return state.intents.collection
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          match = item[prop as keyof Intent] === value;
          if (match === false) break;
        }
        return match;
      })
      .filter((item) => {
        if (!searchQuery) return item;
        const match = item.displayName
          .toLowerCase()
          .match(searchQuery.toLowerCase());
        return match;
      });
  };

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton
        key={i}
        className={classes.card}
        height={44}
        width={30 + Math.random() * 100}
        variant="rect"
      />
    ));
  };

  return (
    <Box className={classes.container}>
      {isLoading ? (
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {showSkeleton(4)}
        </Box>
      ) : filteredItems.length === 0 ? (
        <NoContent />
      ) : (
        <>
          <Grid
            className={classes.header}
            container
            direction="row"
            alignItems="center"
          >
            <Grid item xs={isLarge ? 3 : 5}>
              <Box display="flex" alignItems="center">
                <FlareRoundedIcon
                  fontSize="small"
                  className={classes.iconHeader}
                />
                <Typography variant="button">Intent</Typography>
              </Box>
            </Grid>
            {isLarge && (
              <>
                <Grid item xs={1}>
                  <Box display="flex" alignItems="center">
                    <FitnessCenterIcon
                      fontSize="small"
                      className={classes.iconHeader}
                    />
                    {/* <Typography variant="button">Training</Typography> */}
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box display="flex" alignItems="center">
                    <CenterFocusWeakIcon
                      fontSize="small"
                      className={classes.iconHeader}
                    />
                    <Typography variant="button">Contexts</Typography>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box display="flex" alignItems="center">
                    <NfcRoundedIcon
                      fontSize="small"
                      className={classes.iconHeader}
                    />
                    <Typography variant="button">Parameters</Typography>
                  </Box>
                </Grid>
              </>
            )}
            <Grid item xs={isLarge ? 3 : 5}>
              <Box display="flex" alignItems="center">
                <ForumRoundedIcon
                  fontSize="small"
                  className={classes.iconHeader}
                />
                <Typography variant="button">Responses</Typography>
              </Box>
            </Grid>
          </Grid>
          <MuuriComponent>
            {filteredItems.map((intent) => (
              <IntentCard
                key={intent.name}
                className={classes.card}
                intent={intent}
              />
            ))}
          </MuuriComponent>
        </>
      )}
    </Box>
  );
};

export default Collection;
