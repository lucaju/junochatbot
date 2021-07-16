import { Box, Container, Grid, Stack, Typography } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TeamProfile, { TeamProfileProps } from './TeamProfile';

const Team: FC = () => {
  const { t } = useTranslation(['home']);

  const [team, setTeam] = useState<TeamProfileProps[]>();

  useEffect(() => {
    fetch('./assets/team/team.json')
      .then((res) => res.json())
      .then((res: TeamProfileProps[]) => setTeam(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box id="team" display="flex" alignItems="flext-start" py={15}>
      <Container maxWidth="xl">
        <Stack spacing={6}>
          <Typography align="center" sx={{ textTransform: 'capitalize' }} variant="h4">
            {t('team')}
          </Typography>
          <Grid container>
            {team &&
              team.map((profile) => (
                <Grid item key={profile.name} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <TeamProfile {...profile} />
                </Grid>
              ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Team;
