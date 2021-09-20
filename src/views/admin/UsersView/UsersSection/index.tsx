import { Box } from '@mui/material';
import { HandleFilterType } from '@src/types';
import React, { FC, useState } from 'react';
import Collection from './Collection';
import Details from './details';
import MenuBar from './menubar';

const UsersSection: FC = () => {
  const [currentUserId, setCurrentUserId] = useState<number | undefined>();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filters, setFilters] = useState<Map<string, number | string>>(new Map());
  const [groupId, setGroupId] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  const handleDetailOpen = (userId?: number) => {
    setCurrentUserId(userId);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentUserId(undefined);
    setDetailsOpen(false);
  };

  const updateFilters = ({ type, value, reset }: HandleFilterType) => {
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleFilterByGroup = async (value: number | undefined) => {
    if (value === -1) value = undefined;
    setGroupId(value);
  };

  const handleSearch = async (value: string | undefined) => {
    setSearchQuery(value);
  };

  return (
    <Box>
      <Details open={detailsOpen} handleClose={handleDetailClose} userId={currentUserId} />
      <MenuBar
        handleDetailOpen={handleDetailOpen}
        handleFilterByGroup={handleFilterByGroup}
        updateFilter={updateFilters}
        handleSearch={handleSearch}
      />
      <Box mt={3} maxHeight={'calc(100vh - 154px)'} sx={{ overflowY: 'scroll' }}>
        <Collection
          groupId={groupId}
          filters={filters}
          handleDetailOpen={handleDetailOpen}
          searchQuery={searchQuery}
        />
      </Box>
    </Box>
  );
};

export default UsersSection;
