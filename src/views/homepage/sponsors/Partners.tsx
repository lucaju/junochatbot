import { Box, Link, Stack, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Partner {
  name: string;
  logo: string;
  link?: string;
}

const Partners: FC = () => {
  const { t } = useTranslation();
  const [partners, setPartners] = useState<Partner[]>();

  const theme = useTheme();
  const isMobileSM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetch('./assets/partners/partners.json')
      .then((res) => res.json())
      .then((res: Partner[]) => setPartners(res))
      .catch((err) => console.log(err));
  }, []);

  const imageLogo = (name: string, file: string) => {
    const fiilename = theme.palette.mode === 'light' ? file : `white_${file}`;
    return (
      <Box key={name} display="flex" alignItems="center" justifyContent="center" m={2}>
        <img alt={name} src={`/assets/partners/${fiilename}`} width={150} />
      </Box>
    );
  };

  return (
    <Stack spacing={3}>
      <Typography align="center" sx={{ textTransform: 'capitalize' }} variant="h4">
        {t('home:partners')}
      </Typography>
      <Stack direction={isMobileSM ? 'column' : 'row'} justifyContent="center">
        {partners &&
          partners.map(({ name, logo, link }) => (
            <Link key={name} href={link} target="blank" rel="noopener noreferrer">
              {imageLogo(name, logo)}
            </Link>
          ))}
      </Stack>
    </Stack>
  );
};

export default Partners;
