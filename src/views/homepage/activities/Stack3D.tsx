import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import Card, { ActivityProps } from './Card';

interface Stack3DProps {
  activities: ActivityProps[];
  showContent: (activity: ActivityProps) => void 
}

const Stack3D: FC<Stack3DProps> = ({ activities, showContent }) => {
  const [index, _setIndex] = useState<number>(0);
  const [exitX, setExitX] = useState<string | number>('100%');

  const currentActivity = activities[index];
  const nextActivity = index + 1 < activities.length ? activities[index + 1] : activities[0];

  const setIndex = (value: number) => {
    value > activities.length - 1 ? _setIndex(0) : _setIndex(value);
  };

  const autoSwitch = () => {
    setExitX(250);
    setIndex(index + 1);
  }

  // let timer = window.setInterval(autoSwitch, 10000)

  const stopAutoplay = () => {
    // window.clearInterval(timer);
  }

  return (
    <motion.div
      style={{
        width: 330,
        height: 320,
        position: 'relative',
      }}
    >
      <AnimatePresence initial={false}>
        <Card
          key={index + 1}
          initial={{
            scale: 0,
            y: 105,
            opacity: 0,
          }}
          animate={{
            scale: 0.75,
            y: -60,
            opacity: 0.5,
          }}
          transition={{
            scale: { duration: 0.2 },
            opacity: { duration: 0.4 },
          }}
          activity={nextActivity}
        />
        <Card
          key={index}
          animate={{
            scale: 1,
            y: 0,
            opacity: 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            opacity: {
              duration: 0.2,
            },
          }}
          exitX={exitX}
          setExitX={setExitX}
          index={index}
          setIndex={setIndex}
          drag="x"
          activity={currentActivity}
          showContent={showContent}
          stopAutoplay={stopAutoplay}
        />
      </AnimatePresence>
    </motion.div>
  );
};

export default Stack3D;
