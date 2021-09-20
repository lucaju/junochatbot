import { Stack } from '@mui/material';
import { Story as StoryType } from '@src/types';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import Bot from './Bot';
import Story from './Story';

interface MainProps {
  errors: FormikErrors<StoryType>;
  handleBlur: (event: FocusEvent<any>) => void;
  handleChange: (event: ChangeEvent<any>) => void;
  touched: FormikTouched<StoryType>;
  values: StoryType;
}

const Main: FC<MainProps> = ({ errors, handleBlur, handleChange, touched, values }) => {
  return (
    <Stack direction="column" spacing={2}>
      <Story
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        touched={touched}
        values={values}
      />
      <Bot
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        touched={touched}
        values={values}
      />
    </Stack>
  );
};

export default Main;
