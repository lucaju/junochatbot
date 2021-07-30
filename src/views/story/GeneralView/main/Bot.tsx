import {
  Box,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useAppState } from '@src/overmind';
import { Story } from '@src/types';
import { getIcon } from '@src/util/icons';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import BotDelaySlider from './BotDelaySlider';

interface BotProps {
  errors: FormikErrors<Story>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<Story>;
  values: Story;
}

const Bot: FC<BotProps> = ({ errors, handleBlur, handleChange, touched, values }) => {
  const { story } = useAppState();
  const { t } = useTranslation();

  const theme = useTheme();
  const isLG = useMediaQuery(theme.breakpoints.down('lg'));
  const isXL = useMediaQuery(theme.breakpoints.between('lg', 'xl'));

  return (
    <Stack direction="column" spacing={2}>
      <Typography gutterBottom variant="h6">
        {t('storyGeneral:characterBot')}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="flex-start" p={1}>
        <Box flexGrow={1}>
          <TextField
            error={Boolean(touched['botName'] && errors['botName'])}
            fullWidth
            label={t('common:name')}
            name="botName"
            onBlur={handleBlur}
            onChange={handleChange}
            sx={{ textTransform: 'capitalize' }}
            value={values.botName}
            variant="standard"
          />
        </Box>
        <Box width="50px" ml={2} sx={{ mt: '-3px' }}>
          <TextField
            fullWidth
            label={t('storyGeneral:avatar')}
            name="botAvatar"
            select
            onBlur={handleBlur}
            onChange={handleChange}
            sx={{ textTransform: 'capitalize' }}
            value={values.botAvatar}
            variant="standard"
          >
            {story.icons.map(({ value }) => {
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
      <Box p={1}>
        <TextField
          error={Boolean(touched['botPersona'] && errors['botPersona'])}
          fullWidth
          label={t('storyGeneral:persona')}
          name="botPersona"
          multiline
          rows={2}
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{ textTransform: 'capitalize' }}
          value={values.botPersona}
          variant="outlined"
        />
      </Box>
      <Box width={isLG ? '100%' : isXL ? '75%' : '50%'} p={1}>
        <Box>
          <Typography
            sx={{
              fontSize: '0.75rem',
              color: 'text.secondary',
            }}
          >
            {t('storyGeneral:messageDelay')}
          </Typography>
        </Box>
        <BotDelaySlider />
      </Box>
    </Stack>
  );
};

export default Bot;
