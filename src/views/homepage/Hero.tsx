import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Hero: FC = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const letterAnimation = {
    initial: {
      opacity: 0,
      rotate: -45,
      pathLength: 0,
    },
    animate: {
      opacity: 1,
      rotate: 0,
      pathLength: 1,
      transition: { duration: 2 },
    },
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      minHeight={isMobile ? 380 : 550}
      sx={{
        backgroundImage: 'url(/assets/images/home-hero.png)',
        backgroundPosition: isMobile ? 'bottom center' : 'top center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundOrigin: 'content-box',
      }}
      mt={isMobile ? 10 : 15}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        rowGap={2}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 124.56 32"
          width={isMobile ? 300 : 400}
        >
          <defs>
            <linearGradient
              id="J-linear-gradient"
              x1="0.85"
              y1="16.04"
              x2="28.78"
              y2="16.04"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#00aeef" />
              <stop offset="0.35" stopColor="#229dce" />
              <stop offset="1" stopColor="#687988" />
            </linearGradient>
            <linearGradient
              id="U-linear-gradient"
              x1="29.29"
              y1="17.03"
              x2="60.32"
              y2="17.03"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#00aeef" />
              <stop offset="0.35" stopColor="#229dce" />
              <stop offset="1" stopColor="#687988" />
            </linearGradient>
            <linearGradient
              id="N-linear-gradient"
              x1="63.84"
              y1="17.93"
              x2="94.88"
              y2="17.93"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#00aeef" />
              <stop offset="0.35" stopColor="#229dce" />
              <stop offset="1" stopColor="#687988" />
            </linearGradient>
            <linearGradient
              id="O-linear-gradient"
              x1="92.37"
              y1="15.91"
              x2="123.4"
              y2="15.91"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#00aeef" />
              <stop offset="1" stopColor="#687988" />
            </linearGradient>
          </defs>
          <motion.path
            d="M2.87,23.25A12.93,12.93,0,1,0,17.2,3.35"
            variants={letterAnimation}
            initial="initial"
            animate="animate"
            style={{
              strokeWidth: 5,
              stroke: 'url(#J-linear-gradient)',
              strokeMiterlimit: 10,
              fill: 'none',
            }}
          />
          <motion.path
            d="M52,5.05a13,13,0,1,1-13.93-.28"
            variants={letterAnimation}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
            style={{
              strokeWidth: 5,
              stroke: 'url(#U-linear-gradient)',
              strokeMiterlimit: 10,
              fill: 'none',
            }}
          />
          <motion.path
            d="M69.16,28.65a13,13,0,1,1,13.93.27"
            variants={letterAnimation}
            initial="initial"
            animate="animate"
            transition={{ delay: 1 }}
            style={{
              strokeWidth: 5,
              stroke: 'url(#N-linear-gradient)',
              strokeMiterlimit: 10,
              fill: 'none',
            }}
          />
          <motion.circle
            cx="107.88"
            cy="15.91"
            r="13.02"
            variants={letterAnimation}
            initial="initial"
            animate="animate"
            transition={{ delay: 1.5 }}
            style={{
              strokeWidth: 5,
              stroke: 'url(#O-linear-gradient)',
              strokeMiterlimit: 10,
              fill: 'none',
            }}
          />
        </svg>

        <Typography variant={isMobile ? 'h4' : 'h3'}>{t('home:title')}</Typography>
        <Box sx={{ maxWidth: isMobile ? 350 : 400 }}>
          <Typography textAlign="center" variant={isMobile ? 'subtitle1' : 'h5'}>
            {t('home:subtitle')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
