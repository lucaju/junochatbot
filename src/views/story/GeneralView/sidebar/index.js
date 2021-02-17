import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
// import Visibility sfrom './Visibility';
// import Authors from './Authors';
import FeaturedImage from './FeaturedImage';
// import Permalink from './Permalink';

const SideBar = ({ errors, handleBlur, handleChange, touched, values }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      {/* <Permalink
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        touched={touched}
        values={values}
      /> */}
      {/* {values.general_published && (
        <Visibility
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          values={values} />
      )} */}
      {/* <Authors
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        touched={touched}
        values={values}
      /> */}
      <FeaturedImage name="general.featuredImage" />
    </Box>
  );
};

SideBar.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default SideBar;
