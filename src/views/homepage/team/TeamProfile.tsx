import { Avatar, Box, Stack, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

export interface TeamProfileProps {
  email?: string;
  institution?: string;
  name: string;
  picture?: string;
}

const TeamProfile: FC<TeamProfileProps> = (props) => {
  const { email, institution, name, picture } = props;

  const hanfleClick = () => {
    if (!email) return;
    window.location.href = `mailto:${email}`;
  };

  return (
    <Box
      component={motion.div}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1, originX: 0 }}
      m={1}
      onClick={hanfleClick}
    >
      <Stack direction="row" columnGap={1}>
        <Avatar
          component={motion.div}
          whileHover={{ rotate: -30, boxShadow: 'rgba(0,0,0,0.3) 0px 0px 3px 1px' }}
          alt={name}
          src={`/assets/team/${picture}`}
          sx={{ width: 48, height: 48, cursor: email ? 'pointer' : 'default' }}
        />
        <Stack>
          <Typography variant="body1" fontWeight={600}>
            {name}
          </Typography>
          <Typography sx={{ lineHeight: '1.3rem' }} variant="overline">
            {institution}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TeamProfile;
