import {
  Button,
  Card as CardMui,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState } from '@src/overmind';

export interface ActivityProps {
  description?: string;
  link?: string;
  mediaType: string;
  picture: string;
  title: string;
}

interface CardProps {
  index?: number;
  initial?: object;
  animate: object;
  transition: object;
  exitX?: string | number;
  drag?: 'x' | 'y';
  setExitX?: (value: string | number) => void;
  setIndex?: (value: number) => void;
  activity: ActivityProps;
  showContent?: (activity: ActivityProps) => void;
  stopAutoplay?: () => void;
}

const Card: FC<CardProps> = ({
  index = 0,
  initial,
  animate,
  transition,
  exitX,
  drag,
  setExitX,
  setIndex,
  activity,
  showContent,
  stopAutoplay,
}) => {
  const { t } = useTranslation(['home']);
  const { ui } = useAppState();
  const lang = ui.languageCode ?? 'en_CA';

  const { link, mediaType, picture } = activity;
  //@ts-ignore
  const title = activity[`title_${lang}`];
  //@ts-ignore
  const description = activity[`description_${lang}`];

  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
    clamp: false,
  });

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!setExitX || !setIndex || !stopAutoplay) return;
    stopAutoplay();
    info.offset.x < -100 ? nextCard(1) : nextCard(-1);
  };

  const nextCard = (side = 1) => {
    if (!setExitX || !setIndex) return;
    setExitX(250 * side);
    setIndex(index + 1);
  };

  const handleCardActionClick = () => {
    if (!showContent || !stopAutoplay) return;
    stopAutoplay();
    showContent(activity);
  };

  return (
    <motion.div
      style={{
        width: 330,
        height: 250,
        position: 'absolute',
        top: 0,
        x: x,
        rotate: rotate,
        cursor: 'grab',
      }}
      whileTap={{ cursor: 'grabbing' }}
      drag={drag ? drag : undefined}
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      onDragEnd={handleDragEnd}
      initial={initial}
      animate={animate}
      transition={transition}
      exit={{
        x: exitX,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
    >
      <CardMui
        component={motion.div}
        elevation={0}
        sx={{ maxWidth: 345 }}
        //@ts-ignore
        style={{ scale: scale }}
      >
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
            <Button onClick={handleCardActionClick} size="small">
              {t(mediaType === 'video' ? 'watch' : 'read')}
            </Button>
          </CardActions>
        )}
      </CardMui>
    </motion.div>
  );
};

export default Card;
