import { Stack } from '@material-ui/core';
import Page from '@src/components/Page';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ResearchActivities from './activities/Activities';
import Hero from './Hero';
import Intro from './Intro';
import Pedagogical from './pedagogical/Pedagogical';
import Sponsors from './sponsors/Sponsors';
import Stories from './stories/Stories';
import Team from './team/Team';
import Topbar from './topbar/Topbar';

const HomeView: FC = () => {
  const { t } = useTranslation(['home']);

  return (
    <Page title={t('Home')}>
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
    </Page>
  );
};

export default HomeView;
