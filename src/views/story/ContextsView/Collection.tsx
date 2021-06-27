import { Box, Skeleton } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useAppState } from '@src/overmind';
import { ContextRelation } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ContextCard from './ContextCard';

interface CollectionProps {
  filters: Map<string, string>;
  searchQuery: string | undefined;
  isLoading?: boolean;
}

const Collection: FC<CollectionProps> = ({ filters, isLoading = false, searchQuery }) => {
  const { intents } = useAppState();
  const [filteredItems, setFilteredItems] = useState<ContextRelation[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, intents.contexts]);

  const items = () => {
    return intents.contexts
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          if (prop === 'direction') {
            match = false;
            if (value === 'In' && item.inputs) match = true;
            if (value === 'Out' && item.outputs) match = true;
          } else {
            match = item[prop as keyof ContextRelation] === value;
            if (match === false) break;
          }
        }
        return match;
      })
      .filter((item) => {
        if (!searchQuery) return item;
        const match = item.name.toLowerCase().match(searchQuery.toLowerCase());
        return match;
      });
  };

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton key={i} height={30 + Math.random() * 120} sx={{ m: 1 }} variant="rectangular" />
    ));
  };

  return (
    <Box>
      {!isLoading && filteredItems.length === 0 ? (
        <NoContent />
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1400: 3, 1800: 4 }}>
          <Masonry>
            {isLoading
              ? showSkeleton(10)
              : filteredItems.map((context) => (
                  <ContextCard key={context.name} context={context} />
                ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </Box>
  );
};

export default Collection;
