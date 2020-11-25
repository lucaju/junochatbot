import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
// import Visibility from './Visibility';
// import Authors from './Authors';
import FeaturedImage from './FeaturedImage';
import Permalink from './Permalink';

const SideBar = ({ storyData }) => {
  // const handleAuthorsChange = (action, author) => {
  //   if (action === 'delete') {
  //     values.authors = values.authors.filter((usr) => usr.id !== author.id);
  //   }
  //   if (action === 'add') {
  //     values.authors = [...values.authors, author];
  //   }
  // };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Permalink slug={storyData.slug} />
      {/* {storyData.general.published && (
        <Visibility isPublic={storyData.general.public} />
      )} */}
      {/* <Authors
        authors={storyData.general.authors}
        handleAuthorsChange={handleAuthorsChange}
      /> */}
      <FeaturedImage imageFile={storyData.general.featuredImage} />
    </Box>
  );
};

SideBar.propTypes = {
  storyData: PropTypes.object,
};

export default SideBar;
