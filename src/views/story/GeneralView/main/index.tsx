import { Box, Stack } from '@material-ui/core';
import { Story as StoryType } from '@src/types';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import Bot from './Bot';
import Story from './Story';

interface MainProps {
  errors: FormikErrors<StoryType>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<StoryType>;
  values: StoryType;
}

const Main: FC<MainProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  return (
    <Stack
      // display="flex"
      // justifyContent="flex-start"
      // alignItems="flex-start"
      direction="column"
      spacing={2}
    >
      {/* <Box width={'100%'} mb={2} > */}
        <Story
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          values={values}
        />
      {/* </Box> */}
      {/* <Box width={'100%'} mb={2}> */}
        <Bot
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          values={values}
        />
      {/* </Box> */}
    </Stack>
  );
};

export default Main;
