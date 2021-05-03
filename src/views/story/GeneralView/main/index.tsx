import { Box } from '@material-ui/core';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import { Story as StoryType } from '@src/types';
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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Box mb={2} width={'100%'}>
        <Story
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          values={values}
        />
      </Box>
      <Box mb={2} width={'100%'}>
        <Bot
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          values={values}
        />
      </Box>
    </Box>
  );
};

export default Main;
