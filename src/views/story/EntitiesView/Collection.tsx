import { Box, Skeleton } from '@material-ui/core';
import NoContent from '@src/components/NoContent';
import { useApp } from '@src/overmind';
import { Entity } from '@src/types';
import React, { FC, useEffect, useState } from 'react';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import EntityCard from './EntityCard';

interface CollectionProps {
  filters: Map<string, string>;
  isLoading?: boolean;
  searchQuery: string | undefined;
}

const Collection: FC<CollectionProps> = ({ filters, isLoading = false, searchQuery }) => {
  const { state } = useApp();
  const [filteredItems, setFilteredItems] = useState<Entity[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, state.intents.entities]);

  const items = () => {
    return state.intents.entities
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
              : filteredItems.map((entity) => <EntityCard key={entity.id} entity={entity} />)}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </Box>
  );
};

export default Collection;
