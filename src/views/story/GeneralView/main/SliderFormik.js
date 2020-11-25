import { Slider } from '@material-ui/core';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const SliderFormik = ({ name }) => {
  // This isn't an input, so instead of using the values in 'field' directly,
  // we'll use 'meta' and 'helpers'.
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const [initialValue, setInitialValue] = useState(null);

  const { value } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    setInitialValue(value);
    return () => {};
  }, []);

  return (
    <>
      {initialValue && (
        <Slider
          defaultValue={initialValue}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          onChange={(event, newValue) => setValue(newValue)}
          step={10}
          marks
          min={80}
          max={200}
        />
      )}
    </>
  );
};

SliderFormik.propTypes = {
  name: PropTypes.string,
};

export default SliderFormik;
