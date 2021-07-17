import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useAppState } from '@src/overmind';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface ActivityProps {
  'description_en-CA'?: string;
  'description_fr-CA'?: string;
  link?: string;
  mediaType: string;
  picture?: string;
  'title_en-CA'?: string;
  'title_fr-CA'?: string;
}

interface ActivityCardProps {
  activity: ActivityProps;
  showContent: (activity: ActivityProps) => void;
}

const ActivityCard: FC<ActivityCardProps> = ({ activity, showContent }) => {
  const { t } = useTranslation(['home']);
  const { ui } = useAppState();
  const lang = ui.languageCode ?? 'en_CA';

  const { link, mediaType, picture } = activity;
  //@ts-ignore
  const title = activity[`title_${lang}`];
  //@ts-ignore
  const description = activity[`description_${lang}`];

  const handleCardActionClick = () => {
    if (!showContent) return;
    if (mediaType === 'text') window.open(link, '_blank');
    if (mediaType === 'video') showContent(activity);
  };

  return (
    <Card component={motion.div} elevation={1} sx={{ m: 2 }}>
      {picture && (
        <CardMedia sx={{ height: 140 }} image={`/assets/activities/${picture}`} title={title} />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
      {link && (
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button fullWidth onClick={handleCardActionClick} size="small">
            {t(mediaType === 'video' ? 'watch' : 'read')}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ActivityCard;
