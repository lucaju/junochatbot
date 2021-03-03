import {
  Box,
  CircularProgress,
  Container,
  makeStyles
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

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.background.dark,
    minHeight: '100%',
    paddingBottom: spacing(3),
    paddingTop: spacing(3),
  },
  container: { height: 'calc(100vh - 64px - 68px - 36px)' },
}));

const title = 'Juno Chatbot';

const formValidation = Yup.object().shape({
  title: Yup.string().trim().max(125).required('Title is required'),
  languageCode: Yup.string(),
  synopsis: Yup.string(),
  image: Yup.mixed(),
  published: Yup.bool(),
  active: Yup.bool(),
  botAvatar: Yup.string(),
  botName: Yup.string(),
  botPersona: Yup.string(),
  botDelay: Yup.number(),
});

const GeneralView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [storyData, setStoryData] = useState(null);
  const [submitType, setSubmitType] = useState(null);

  const [submitSuccess, setSubmitSuccess] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!state.story.currentStory.id) navigate('/app', { replace: true });

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

  // eslint-disable-next-line no-unused-vars
  const submit = async (values) => {
    console.log(values);
    // setSubmitSuccess(null);
    // const res = await actions.story.updateStory(values);
    // setSubmitSuccess(!!res);

    // //
    // const message = (res) ? 'Story Updated' : 'Error: Something went wrong!';
    // const type = (res) ? 'success' : 'error';
    // actions.ui.showNotification({ message, type });
  };

  // eslint-disable-next-line no-unused-vars
  const updateStoryStatus = async () => {
    //TODO
  };

  // eslint-disable-next-line no-unused-vars
  const updateFeaturedImage = async () => {
    //TODO
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
            enableReinitialize={true}
            initialValues={storyData}
            onSubmit={async (values) => {
              console.log(values)
              // submitType === 'delete'
              //   ? await deleteStory(values)
              //   : await submit(values);
              // setSubmitType(null);
            }}
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
                <Box flexGrow={1} height="100%">
                  <Container className={classes.container} maxWidth={false}>
                    <Box
                      alignItems="flex-start"
                      display="flex"
                      flexDirection="row"
                      className={classes.bar}
                    >
                      <Box flexGrow={1} maxWidth="800px" pr={2}>
                        <Main
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          touched={touched}
                          values={values}
                        />
                      </Box>
                      <Box width="330px">
                        <SideBar values={values} />
                      </Box>
                    </Box>
                  </Container>
                </Box>
                <Box>
                  <BottomBar
                    dirty={dirty}
                    handleDelete={() => setDeleteDialogOpen(true)}
                    isSubmitting={isSubmitting}
                    name={'published'}
                    submitSuccess={submitSuccess}
                  />
                </Box>
                <DeleteDialog
                  handleYes={() => {
                    setDeleteDialogOpen(false)
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
