import {
  Box,
  CircularProgress,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Page from '@src/components/Page';
import { useAppState, useActions } from '@src/overmind';
import { NotificationType, Story } from '@src/types';
import { isError } from '@src/util/utilities';
import BottomBar from './BottomBar';
import Main from './main';
import SideBar from './sidebar';

const GeneralView: FC = () => {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { story, ui } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['storyGeneral', 'common', 'errorMessages, deleteDialog']);
  const [isLoading, setIsLoading] = useState(false);
  const [storyData, setStoryData] = useState<Story | undefined>(story.currentStory);

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!storyId) return navigate('/app', { replace: true });

    const getStory = async () => {
      setIsLoading(true);
      const story = await actions.story.getStory(Number(storyId));
      if (isError(story)) return navigate('/app', { replace: true });

      const _story = { ...story };
      if (!_story.author) _story.author = '';
      setStoryData(_story);

      actions.ui.setPageTitle(story.title);

      setIsLoading(false);
    };

    !story.currentStory ? getStory() : actions.ui.setPageTitle(story.currentStory.title);

    return () => {};
  }, []);

  const formValidation = Yup.object().shape({
    id: Yup.number(),
    title: Yup.string().trim().max(125).required(t('common:required')),
    author: Yup.string(),
    languageCode: Yup.string(),
    synopsis: Yup.string(),
    imageUrl: Yup.mixed(),
    uploadFile: Yup.mixed(),
    published: Yup.number(),
    publishedDate: Yup.mixed(),
    botAvatar: Yup.string(),
    botName: Yup.string(),
    botPersona: Yup.string(),
    botDelay: Yup.number(),
  });

  const submit = async (values: Story) => {
    if (!storyData) return;
    const response = actions.story.updateStory({ storyData, values });

    const type = isError(response) ? NotificationType.ERROR : NotificationType.SUCCESS;

    const message = isError(response) ? 'errorMessages:somethingWentWrong' : t('storyUpdated');

    actions.ui.showNotification({ message, type });
  };

  return (
    <Page title={ui.pageTitle}>
      {isLoading ? (
        <Box display="flex" height="100%" justifyContent="center" alignItems="flex-start">
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : storyData ? (
        <>
          <Formik
            enableReinitialize={true}
            initialValues={storyData}
            onSubmit={submit}
            validationSchema={formValidation}
          >
            {({
              dirty,
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Container maxWidth={false} sx={{ height: 'calc(100vh - 64px - 68px - 36px)' }}>
                  <Stack
                    direction={isSM ? 'column' : 'row'}
                    alignItems={isSM ? 'stretch' : 'flex-start'}
                  >
                    <Box flexGrow={1} pr={2}>
                      <Main
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        values={values}
                      />
                    </Box>
                    <SideBar values={values} />
                  </Stack>
                  <Box ml={3} mr={3}>
                    <BottomBar
                      dirty={dirty}
                      isSubmitting={isSubmitting}
                      publishedField={'published'}
                      publishedDateField="publishedDate"
                    />
                  </Box>
                </Container>
              </form>
            )}
          </Formik>
        </>
      ) : (
        ''
      )}
    </Page>
  );
};

export default GeneralView;
