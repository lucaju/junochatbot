import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@material-ui/core';
import { Video } from '@src/types';
import React, { FC, useState } from 'react';

interface VideoCardProps {
  handleEditClick: (value: number) => void;
  video: Video;
}

const VideoCard: FC<VideoCardProps> = ({ handleEditClick, video }) => {
  const [hover, setHover] = useState(1);

  const mouseOver = () => setHover(6);
  const mouseOut = () => setHover(1);

  return (
    <Card
      elevation={hover ? 6 : 1}
      onClick={() => handleEditClick(video.id)}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      sx={{  m: 1, cursor: 'pointer' }}
    >
      <CardMedia image={video.imageUrl} sx={{ height: 180 }} title={video.title} />
      <CardContent>
        <Box>
          <Typography gutterBottom noWrap variant="subtitle1">
            {video.title}
          </Typography>
        </Box>
        {video.tags && video.tags.length > 0 && (
          <Box
            display="flex"
            flexDirection="row"
            height={40}
            mt={2}
            mb={-2}
            mx={-2}
            px={2}
            sx={{ overflowX: 'auto' }}
          >
            {video.tags.map(({ id, name }) => (
              <Chip
                key={id}
                label={name.toUpperCase()}
                size="small"
                sx={{ mr: 1 }}
                variant="outlined"
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
