import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Bot from './Bot';
import Story from './Story';
import Ui from './Ui';

const Main = ({ errors, handleBlur, handleChange, touched, values }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justify="flex-start"
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
      {/* <Box width={'100%'}>
        <Ui
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          values={values}
        />
      </Box> */}
    </Box>
  );
};

Main.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Main;
