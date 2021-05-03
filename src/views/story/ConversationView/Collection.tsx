import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import FlareRoundedIcon from '@material-ui/icons/FlareRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import NfcRoundedIcon from '@material-ui/icons/NfcRounded';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import React, { FC, useEffect, useState } from 'react';
import NoContent from '@src/components/NoContent';
import { useApp } from '@src/overmind';
import { Intent } from '@src/types';
import IntentCard from './IntentCard';

interface CollectionProps {
  handleDetailOpen: (value: string) => void;
  filters: Map<string, string>;
  searchQuery: string | undefined;
  isLoading?: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    width: '98%',
    marginTop: spacing(1),
    marginBottom: spacing(1),
    marginLeft: spacing(1.5),
    marginRight: spacing(1.5),
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

const Collection: FC<CollectionProps> = ({ handleDetailOpen, filters, searchQuery, isLoading = false }) => {
  const classes = useStyles();
  const { state } = useApp();
  const [filteredItems, setFilteredItems] = useState<Intent[]>([]);

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
        const match = item.displayName.toLowerCase().match(searchQuery.toLowerCase());
        return match;
      });
  };

  const showSkeleton = (qty = 10) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton key={i} className={classes.card} height={50 + Math.random() * 100} variant="rect" />
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
        <MuuriComponent>
          {filteredItems.map((intent) => (
            <IntentCard
              key={intent.name}
              className={classes.card}
              handleEditClick={handleDetailOpen}
              intent={intent}
            />
          ))}
        </MuuriComponent>
      )}
    </Box>
  );
};

export default Collection;
