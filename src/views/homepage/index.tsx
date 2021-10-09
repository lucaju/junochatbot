import { Box, Stack, Typography } from '@mui/material';
import Page from '@src/components/Page';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ResearchActivities from './activities';
import Hero from './Hero';
import Intro from './Intro';
import Pedagogical from './pedagogical';
import Sponsors from './sponsors';
import Stories from './stories';
import Team from './team';
import Topbar from './topbar';

const HomeView: FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ScrollTo = (anchorName?: string) => {
    if (!anchorName) anchorName = 'top';
    const anchor = document.querySelector(`#${anchorName}`);

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const location = anchorName === 'top' ? '/' : `/#${anchorName}`;
    }
  };

  return (
    <Page title={t('common:homepage')}>
      {/* <ThemeProvider theme={theme(false)}> */}
      <Stack>
        <Box display="flex" justifyContent="center" mt={6} mb={-6}>
          <Typography textAlign="center" variant="overline">
            {t('common:betterOnChrome')}
          </Typography>
        </Box>
        <Topbar onAnchor={ScrollTo} />
        <Hero />
        <Intro />
        <Stories />
        <Pedagogical />
        <ResearchActivities />
        <Team />
        <Sponsors />
      </Stack>
      {/* </ThemeProvider> */}
    </Page>
  );
};

export default HomeView;
