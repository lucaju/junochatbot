import { Box, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { FC } from 'react';

interface AddStoryCardProps {
  openDialog: () => void;
}

const AddStoryCard: FC<AddStoryCardProps> = ({ openDialog }) => (
  <Card
    sx={{
      width: 325,
      borderStyle: 'dashed',
    }}
    variant="outlined"
  >
    <CardActionArea onClick={openDialog}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <AddCircleIcon
            fontSize="large"
            sx={{
              mr: 1,
              color: 'primary.light',
            }}
          />
          <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
            Create a new story
          </Typography>
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default AddStoryCard;
