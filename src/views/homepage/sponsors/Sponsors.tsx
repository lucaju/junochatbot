import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Sponsor {
  name: string;
  logo: string;
  link?: string;
}

const Sponsors: FC = () => {
  const { t } = useTranslation(['home']);
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
    console.log(theme.palette.mode)
    return (
      <Box key={name} display="flex" alignItems="center" justifyContent="center" m={2}>
        <img alt={name} src={`/assets/sponsors/${fiilename}`} width="75%" />
      </Box>
    );
  };

  return (
    <Box id="sponsors" display="flex" alignItems="flext-start" pb={10}>
      <Container maxWidth="md">
        <Divider sx={{ mb: 15 }} />
        <Stack spacing={6}>
          <Typography align="center" sx={{ textTransform: 'capitalize' }} variant="h4">
            {t('sponsors')}
          </Typography>
          {isMobileSM ? (
            <Stack direction="row">
              {sponsors && sponsors.map(({ name, logo, link }) => imageLogo(name, logo))}
            </Stack>
          ) : (
            <Grid container spacing={4}>
              {sponsors &&
                sponsors.map(({ name, logo, link }) => (
                  <Grid
                    item
                    key={name}
                    sm={6}
                    md={sponsors.length > 2 ? 4 : 6}
                    lg={sponsors.length === 2 ? 6 : sponsors.length === 3 ? 4 : 3}
                  >
                    <Link href={link} target="blank" rel="noopener noreferrer">
                      {imageLogo(name, logo)}
                    </Link>
                  </Grid>
                ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Sponsors;
