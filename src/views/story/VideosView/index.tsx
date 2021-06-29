import { Container, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import Page from '@src/components/Page';
import { useAppState, useActions } from '@src/overmind';
import { isError } from '@src/util/utilities';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import TagsSection from './TagsSection';
import VideosSection from './VideoSection';

const VideosView: FC = () => {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { ui } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['videos', 'common']);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!storyId) return navigate('/app', { replace: true });

    const getStory = async () => {
      setIsLoading(true);
      const story = await actions.story.getStory(Number(storyId));
      if (isError(story)) return navigate('/app', { replace: true });
      setIsLoading(false);
      actions.ui.setPageTitle(story.title);
    };

    getStory();

    return () => {};
  }, []);

  return (
    <Page title={ui.pageTitle}>
      <Container maxWidth={false}>
        {!isLoading && (
          <Grid
            container
            direction={isMobile ? 'column-reverse' : 'row'}
            spacing={5}
            flexWrap="nowrap"
          >
            <Grid item xs={12} sm={8} md={8} lg={9}>
              <VideosSection />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={3}>
              <TagsSection />
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
};

export default VideosView;
