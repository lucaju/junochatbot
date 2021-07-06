import { Box, Skeleton } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useAppState } from '@src/overmind';
import { ContextRelation } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ContextCard from './ContextCard';

interface CollectionProps {
  searchQuery: string | undefined;
  isLoading?: boolean;
}

const Collection: FC<CollectionProps> = ({ isLoading = false, searchQuery }) => {
  const { intents } = useAppState();
  const { t } = useTranslation(['contexts', 'common']);

  const [filteredItems, setFilteredItems] = useState<ContextRelation[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [searchQuery, intents.contexts]);

  const items = () => {
    return intents.contexts.filter((item) => {
      if (!searchQuery) return item;
      const match = item.name.toLowerCase().match(searchQuery.toLowerCase());
      return match;
    });
  };

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton key={i} height={150} sx={{ m: 1 }} variant="rectangular" />
    ));
  };

  return (
    <Box>
      {!isLoading && filteredItems.length === 0 && (
        <NoContent align="left" heading={t('noContextsYet')} size="large" />
      )}
      <AnimatePresence initial={false}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 700: 2, 1150: 3, 1300: 4 }}>
          <Masonry>
            {isLoading
              ? showSkeleton(4)
              : filteredItems.map((context) => (
                  <Box
                    key={context.name}
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <ContextCard context={context} />
                  </Box>
                ))}
          </Masonry>
        </ResponsiveMasonry>
      </AnimatePresence>
    </Box>
  );
};

export default Collection;
