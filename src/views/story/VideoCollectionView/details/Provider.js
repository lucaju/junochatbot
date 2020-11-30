import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import VimeoIcon from '../assets/VimeoIcon';
import YoutubeIcon from '../assets/YoutubeIcon';

const Provider = ({ name, videoProvider }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    setValue(videoProvider);
    return () => {};
  }, [videoProvider]);

  return (
    <>
      {value === 'youtube' && <YoutubeIcon fontSize="large" />}
      {value === 'vimeo' && <VimeoIcon fontSize="large" />}
    </>
  );
};

Provider.propTypes = {
  name: PropTypes.string,
  videoProvider: PropTypes.string,
};

export default Provider;
