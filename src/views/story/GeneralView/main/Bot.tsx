import {
  Box,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../../../overmind';
import { Story } from '../../../../types';
import { getIcon } from '../../../../util/icons';
import BotDelaySlider from './BotDelaySlider';

interface BotProps {
  errors: FormikErrors<Story>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<Story>;
  values: Story;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  avatarSelectBox: { marginTop: '-5px' },
  capitalize: { textTransform: 'capitalize' },
  marginBottom: { marginBottom: spacing(1) },
  label: {
    fontSize: '0.75rem',
    color: palette.text.secondary,
  },
}));

const Bot: FC<BotProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['storyGeneral', 'common']);

  return (
    <>
      <Typography className={classes.capitalize} variant="h6" gutterBottom>
        {t('characterBot')}
      </Typography>
      <Box
        p={1}
        display="flex"
        flexDirection="row"
        width="100%"
        alignItems="flex-start"
      >
        <Box flexGrow={1} mr={2}>
          <TextField
            className={clsx(classes.marginBottom, classes.capitalize)}
            error={Boolean(touched['botName'] && errors['botName'])}
            fullWidth
            label={t('common:name')}
            name="botName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.botName}
          />
        </Box>
        <Box width="50px" className={classes.avatarSelectBox}>
          <TextField
            className={classes.capitalize}
            fullWidth
            label={t('avatar')}
            name="botAvatar"
            select
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.botAvatar}
          >
            {state.story.icons.map(({ value }) => {
              const Icon = getIcon(value);
              return (
                <MenuItem key={value} value={value}>
                  <Icon fontSize="small" />
                </MenuItem>
              );
            })}
          </TextField>
        </Box>
      </Box>
      <Box p={1} width="100%">
        <TextField
          className={clsx(classes.marginBottom, classes.capitalize)}
          error={Boolean(touched['botPersona'] && errors['botPersona'])}
          fullWidth
          label={t('persona')}
          name="botPersona"
          multiline
          rowsMax={2}
          rows={2}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.botPersona}
          variant="outlined"
        />
      </Box>
      <Box p={1} width="50%" minWidth={'330px'}>
        <Box>
          <Typography className={classes.label}>{t('messageDelay')}</Typography>
        </Box>
        <BotDelaySlider name="botDelay" />
      </Box>
    </>
  );
};

export default Bot;
