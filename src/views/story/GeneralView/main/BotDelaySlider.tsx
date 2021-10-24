import { Slider } from '@mui/material';
import { useField } from 'formik';
import React, { FC, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BotDelaySlider: FC = () => {
  const { t } = useTranslation();
  const [, meta, helpers] = useField('botDelay');
  const { value } = meta;
  const { setValue } = helpers;
  const [sliderValue] = useState(value);

  //on characters per millisecond
  const marks = [
    { value: 0, label: t('common:immediately') },
    { value: 80, label: t('common:slow') },
    { value: 100, label: '' },
    { value: 120, label: '' },
    { value: 140, label: '' },
    { value: 160, label: '' },
    { value: 180, label: t('common:fast') },
  ];

  const onChangeCommitted = (event: Event | SyntheticEvent, value: number | number[]) => {
    if (Array.isArray(value)) return;
    setValue(value);
  };

  return (
    <Slider
      aria-labelledby="discrete-slider"
      defaultValue={sliderValue}
      onChangeCommitted={onChangeCommitted}
      marks={marks}
      max={180}
      step={null}
      sx={{ ml: 2, '& .MuiSlider-markLabel': { fontSize: '0.75rem' } }}
    />
  );
};

export default BotDelaySlider;
