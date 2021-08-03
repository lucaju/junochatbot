import { Stack, ThemeProvider } from '@material-ui/core';
import Page from '@src/components/Page';
import theme from '@src/theme';
import React, { FC } from 'react';
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

  return (
    <Page title={t('common:homepage')}>
      {/* <ThemeProvider theme={theme(false)}> */}
        <Stack>
          <Topbar />
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
