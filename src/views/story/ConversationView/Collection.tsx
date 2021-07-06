import { Box, Skeleton } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useAppState } from '@src/overmind';
import { Intent } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IntentCard from './intentCard/';

interface CollectionProps {
  handleDetailOpen: (value?: string) => void;
  filters: Map<string, string>;
  searchQuery: string | undefined;
  isLoading?: boolean;
}

const Collection: FC<CollectionProps> = ({
  handleDetailOpen,
  filters,
  searchQuery,
  isLoading = false,
}) => {
  const { intents } = useAppState();
  const { t } = useTranslation(['intents']);

  const [filteredItems, setFilteredItems] = useState<Intent[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, intents.collection]);

  const items = () => {
    return intents.collection
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
      <Skeleton
        key={i}
        height={100 + Math.random() * 100}
        sx={{ my: 1, mx: 1.5 }}
        variant="rectangular"
      />
    ));
  };

  return (
    <Box>
      {!isLoading && filteredItems.length == 0 && (
        <NoContent align="left" heading={t('noIntentsYet')} size="large" />
      )}
      <AnimatePresence initial={false}>
        {isLoading
          ? showSkeleton(4)
          : filteredItems.map((intent) => (
              <IntentCard key={intent.name} handleEditClick={handleDetailOpen} intent={intent} />
            ))}
      </AnimatePresence>
    </Box>
  );
};

export default Collection;
