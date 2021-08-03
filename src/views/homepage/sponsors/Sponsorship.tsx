import { Box, Link, Stack, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Sponsor {
  name: string;
  logo: string;
  link?: string;
}

const Sponsorship: FC = () => {
  const { t } = useTranslation();
  const [sponsors, setSponsors] = useState<Sponsor[]>();

  const theme = useTheme();
  const isMobileSM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetch('./assets/sponsors/sponsors.json')
      .then((res) => res.json())
      .then((res: Sponsor[]) => setSponsors(res))
      .catch((err) => console.log(err));
  }, []);

  const imageLogo = (name: string, file: string) => {
    const fiilename = theme.palette.mode === 'light' ? file : `white_${file}`;
    return (
      <Box key={name} display="flex" alignItems="center" justifyContent="center" m={2}>
        <img alt={name} src={`/assets/sponsors/${fiilename}`} width={150} />
      </Box>
    );
  };

  return (
    <Stack spacing={3}>
      <Typography align="center" sx={{ textTransform: 'capitalize' }} variant="h4">
        {t('home:sponsors')}
      </Typography>
      <Stack direction={isMobileSM ? 'column' : 'row'} justifyContent="center">
        {sponsors &&
          sponsors.map(({ name, logo, link }) => (
            <Link key={name} href={link} target="blank" rel="noopener noreferrer">
              {imageLogo(name, logo)}
            </Link>
          ))}
      </Stack>
    </Stack>
  );
};

export default Sponsorship;
