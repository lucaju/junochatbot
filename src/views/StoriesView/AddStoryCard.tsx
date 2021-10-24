import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface AddStoryCardProps {
  openDialog: () => void;
}

const AddStoryCard: FC<AddStoryCardProps> = ({ openDialog }) => {
  const { t } = useTranslation();
  return (
    <Card sx={{ width: 325, borderStyle: 'dashed' }} variant="outlined">
      <CardActionArea onClick={openDialog}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <AddCircleIcon fontSize="large" sx={{ mr: 1, color: 'primary.light' }} />
            <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
              {t('stories:createStory')}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AddStoryCard;
