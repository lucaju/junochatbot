import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useActions, useAppState } from '@src/overmind';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface ActivityProps {
  'description_en-CA'?: string;
  'description_fr-CA'?: string;
  'description_pt-BR'?: string;
  link?: string;
  mediaType: string;
  picture?: string;
  'title_en-CA'?: string;
  'title_fr-CA'?: string;
  'title_pt-BR'?: string;
}

interface ActivityCardProps {
  activity: ActivityProps;
  showContent: (activity: ActivityProps) => void;
}

const ActivityCard: FC<ActivityCardProps> = ({ activity, showContent }) => {
  const { t } = useTranslation();
  const { ui } = useAppState();
  const actions = useActions();

  //check if system language is supported. If not, fallback to the firs language supported
  const lang = actions.ui.isLanguageSupported(ui.languageCode)
    ? ui.languageCode
    : ui.languages[0].value;

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
            {mediaType === 'video' ? t('home:watch') : t('home:read')}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ActivityCard;
