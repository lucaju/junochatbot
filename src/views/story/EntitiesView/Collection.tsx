import { Box, Skeleton } from '@mui/material';
import NoContent from '@src/components/NoContent';
import { useAppState } from '@src/overmind';
import { Entity } from '@src/types';
import { sortBy } from '@src/util/utilities';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import EntityCard from './EntityCard';

interface CollectionProps {
  filters: Map<string, string>;
  isLoading?: boolean;
  searchQuery: string | undefined;
}

const Collection: FC<CollectionProps> = ({ filters, isLoading = false, searchQuery }) => {
  const { intents } = useAppState();
  const { t } = useTranslation();

  const [filteredItems, setFilteredItems] = useState<Entity[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, intents.entities]);

  const items = () => {
    let list = intents.entities
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          match = item[prop as keyof Entity] === value;
          if (match === false) break;
        }
        return match;
      })
      .filter((item) => {
        if (!searchQuery) return item;
        const match = item.name.toLowerCase().match(searchQuery.toLowerCase());
        return match;
      });

    list = sortBy(list, 'name');
    return list;
  };

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton key={i} height={100} sx={{ m: 1 }} variant="rectangular" />
    ));
  };

  return (
    <Box>
      {!isLoading && filteredItems.length === 0 && (
        <NoContent align="left" heading={t('common:noMatch')} size="large" />
      )}
      <AnimatePresence initial={false}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 700: 2, 1150: 3, 1300: 4 }}>
          <Masonry>
            {isLoading
              ? showSkeleton(10)
              : filteredItems.map((entity) => (
                  <Box
                    key={entity.id}
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <EntityCard entity={entity} />
                  </Box>
                ))}
          </Masonry>
        </ResponsiveMasonry>
      </AnimatePresence>
    </Box>
  );
};

export default Collection;
