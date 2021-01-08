import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from 'src/components/DeleteDialog';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';
import BottomBar from './BottomBar';
import Main from './main';
import SideBar from './sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  container: { height: 'calc(100vh - 64px - 68px - 36px)' },
}));

const title = 'Juno Chatbot';

const GeneralView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [storyData, setStoryData] = useState(null);
  const [submitType, setSubmitType] = useState(null);

  const [submitSuccess, setSubmitSuccess] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!state.story.currentStory.id) navigate('/', { replace: true });

    const getStory = async () => {
      await actions.story.getStory(state.story.currentStory.id);
      setStoryData(state.story.currentStory);
      actions.ui.updateTitle(state.story.currentStory.title);
      setIsLoading(false);
    };

    if (state.story.currentStory.new) {
      setStoryData(state.story.currentStory);
      actions.ui.updateTitle(state.story.currentStory.title);
      setIsLoading(false);
    } else {
      getStory();
    }

    return () => {};
  }, []);

  const formValidation = Yup.object().shape({
    slug: Yup.string()
      .required()
      .required('Slug is required to create the permalink'),
    title: Yup.string().trim().max(125).required('Title is required'),
    language: Yup.string().required(),
    general: Yup.object().shape({
      genre: Yup.string(),
      description: Yup.string().max(255),
      featuredImage: Yup.string(),
      // authors: Yup.array(),
      published: Yup.bool().required(),
      public: Yup.bool().required(),
      bot: Yup.object().shape({
        name: Yup.string().max(125),
        biography: Yup.string().max(255),
        avatar: Yup.string().required(),
        speed: Yup.number().required(),
        balloon: Yup.string().required(),
      }),
      user: Yup.object().shape({
        inputPlacehold: Yup.string().required(),
        balloon: Yup.string().required(),
      }),
      ui: Yup.object().shape({
        sidebar: Yup.string().required(),
        // showVideoController: Yup.bool().required(),
      }),
    }),
  });

  const submit = async (values) => {
    setSubmitSuccess(null);
    const res = await actions.story.updateStory(values);
    setSubmitSuccess(!!res);
    if (res) {
      actions.ui.showNotification({
        type: 'success',
        message: 'Story Updated',
      });
    } else {
      actions.ui.showNotification({
        type: 'error',
        message: 'Error: Something went wrong!',
      });
    }
  };

  const deleteStory = async () => {
    const res = await actions.story.deleteStory(state.story.currentStory.id);
    if (!res) {
      setDeleteDialogOpen(false);
      actions.ui.showNotification({
        type: 'error',
        message: 'Error: Something went wrong!',
      });
      return;
    }

    actions.ui.showNotification({
      type: 'success',
      message: 'Story deleted.',
    });

    navigate('/', { replace: true });
  };

  return (
    <Page className={classes.root} title={title}>
      {isLoading ? (
        <Box
          display="flex"
          height="100%"
          justifyContent="center"
          alignItems="flex-start"
        >
          <CircularProgress
            className={classes.spinner}
            size={60}
            thickness={4}
          />
        </Box>
      ) : (
        <>
          <Formik
            initialValues={storyData}
            validationSchema={formValidation}
            enableReinitialize={true}
            onSubmit={async (values) => {
              submitType === 'delete'
                ? await deleteStory(values)
                : await submit(values);
              setSubmitType(null);
            }}
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
                <Box flexGrow={1} height="100%">
                  <Container maxWidth={false} className={classes.container}>
                    <Box
                      alignItems="flex-start"
                      display="flex"
                      flexDirection="row"
                      className={classes.bar}
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
                      <Box width="330px">
                        <SideBar
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          touched={touched}
                          values={values}
                        />
                      </Box>
                    </Box>
                  </Container>
                </Box>
                <Box>
                  <BottomBar
                    dirty={dirty}
                    handleDelete={() => setDeleteDialogOpen(true)}
                    isSubmitting={isSubmitting}
                    name={'general.published'}
                    submitSuccess={submitSuccess}
                  />
                </Box>
                <DeleteDialog
                  handleYes={() => {
                    setSubmitType('delete');
                    handleSubmit();
                  }}
                  handleNo={() => setDeleteDialogOpen(false)}
                  isSubmitting={isSubmitting}
                  message="Are you sure you want to delete this story?"
                  open={deleteDialogOpen}
                  title="Delete Story"
                />
              </form>
            )}
          </Formik>
        </>
      )}
    </Page>
  );
};

export default GeneralView;
