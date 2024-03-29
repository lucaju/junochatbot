import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  Button,
  Collapse,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Switch,
  TextField,
  useMediaQuery,
  useTheme,
  Zoom,
} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';
import { useActions, useAppState } from '@src/overmind';
import type { Parameter as ParameterType } from '@src/types';
import { intentParamColorPalette, sortBy } from '@src/util/utilities';
import React, { ChangeEvent, FC, FocusEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DefaultValuePanel from './DefaultValuePanel';
import PromptsPanel from './PromptsPanel';

interface ExpandMoreProps extends IconButtonProps {
  expand: number;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ParamsComponentProps {
  index: number;
  name?: string;
  param: ParameterType;
}

//LIMITS
//Dialogflow Limit: https://cloud.google.com/dialogflow/quotas#es-agent_1
const PARAM_NAME_CHAR_LIMIT = 29;

const ParamsComponent: FC<ParamsComponentProps> = ({ index, name = '', param }) => {
  const theme = useTheme();
  const { intents } = useAppState();
  const actions = useActions();
  const { t } = useTranslation();

  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [_param, set_param] = useState(param);
  const [doUpdate, setDoUpdate] = useState(false);

  const [entityTypeDisplayName, setEntityTypeDisplayName] = useState('');
  // const [value, set_value] = useState('');
  // const [isList, setIsList] = useState(!!param.isList);
  const [mandatory, setMandatory] = useState(!!param.mandatory);

  const [hover, setHover] = useState(false);
  const [bottomPanelActive, setBottomPanelActive] = useState(0);

  const entitiesList = sortBy([...intents.entities], 'name');

  useEffect(() => {
    set_param(param);

    // if (param.value) set_value(param.value);
    if (param.entityTypeDisplayName) setEntityTypeDisplayName(param.entityTypeDisplayName);
    if (param.mandatory) setMandatory(param.mandatory);
  }, [param]);

  useEffect(() => {
    if (doUpdate) {
      update();
      actions.intents.updateParamsOnPhrases({ originalName: param.displayName, newParam: _param });
      setDoUpdate(false);
    }
  }, [doUpdate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    switch (target.name) {
      case 'displayName':
        if (
          target.value.trim().length > PARAM_NAME_CHAR_LIMIT &&
          entityTypeDisplayName < target.value.trim()
        ) {
          return;
        }
        // eslint-disable-next-line no-case-declarations
        const trimmedValue = target.value.trim();
        set_param({ ..._param, displayName: trimmedValue, value: `$${trimmedValue}` });
        // set_value(`$${trimmedValue}`);
        return;
      // case 'value':
      //   set_value(target.value);
      //   set_param({ ..._param, value: target.value });
      //   return;
      case 'mandatory':
        set_param({ ..._param, mandatory: event.currentTarget.checked });
        setMandatory(target.checked);
        setDoUpdate(true);
        return;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    // const target = event.currentTarget;
    // if (target.name === 'value') {
    //   if (target.value.indexOf('$') !== 0) {
    //     const $value = `$${target.value}`;
    //     set_value($value);
    //     set_param({ ..._param, value: $value });
    //   }
    // }
    setDoUpdate(true);
  };

  const handleChangeEntity = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setEntityTypeDisplayName(value);
    set_param({ ..._param, entityTypeDisplayName: value });
    setDoUpdate(true);
  };

  const handleUpdateDefault = (value: string) => {
    if (value === '') {
      set_param({ ..._param, defaultValue: undefined });
      handleCloseBottomPanel();
      return;
    }
    set_param({ ..._param, defaultValue: value });
    setDoUpdate(true);
  };

  const handleUpdatePrompts = (updatedPrompts: string[]) => {
    set_param({ ..._param, prompts: updatedPrompts });
    setDoUpdate(true);
  };

  const update = () => {
    actions.intents.updateParameter(_param);
  };

  const handleRemoveParameter = () => {
    actions.intents.removeParameter(name);
  };

  const handleOpenBottomPanel = (panelId: number) => {
    setBottomPanelActive(panelId);
  };

  const handleCloseBottomPanel = () => {
    setBottomPanelActive(0);
  };

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      flexGrow={1}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        my={1}
        borderRadius={'borderRadius'}
        sx={{
          width: '100%',
          borderWidth: 1,
          borderLeftWidth: 4,
          borderStyle: 'solid',
          borderColor: theme.palette.action.hover,
          borderLeftColor: intentParamColorPalette[index],
          '&:focus-within': {
            boxShadow: `${theme.palette.primary.light} 0px 0px 5px 1px !important`,
          },
          transition: theme.transitions.create(['box-shadow'], {
            duration: theme.transitions.duration.standard,
          }),
          boxShadow: hover ? 'rgb(0 0 0 / 20%) 0px 0px 10px 1px' : 0,
        }}
      >
        <Box display="flex" flexDirection="column" p={2}>
          <Grid container direction={isSM ? 'column' : 'row'} spacing={2}>
            <Grid item xs>
              <TextField
                fullWidth
                label={t('common:name')}
                name="displayName"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ textTransform: 'capitalize' }}
                value={_param.displayName}
                variant="standard"
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                label={t('common:entity')}
                name="entityTypeDisplayName"
                onChange={handleChangeEntity}
                select
                SelectProps={{
                  MenuProps: {
                    sx: { maxHeight: 300 },
                  },
                }}
                sx={{ textTransform: 'capitalize' }}
                value={entityTypeDisplayName}
                variant="standard"
              >
                {entitiesList.map(({ id, name }) => (
                  <MenuItem key={id} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* <Grid item xs>
              <TextField
                disabled
                fullWidth
                label={t('common:value')}
                name="value"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ textTransform: 'capitalize' }}
                value={value}
                variant="standard"
              />
            </Grid> */}
          </Grid>
        </Box>
        <Box
          display="flex"
          flexDirection={isSM ? 'column' : 'row'}
          mt={1}
          px={2}
          py={0.5}
          sx={{ backgroundColor: ({ palette }) => alpha(palette.text.primary, 0.02) }}
        >
          <Stack direction="row" justifyContent="center">
            <FormControlLabel
              control={
                <Switch
                  checked={mandatory}
                  color="primary"
                  name="mandatory"
                  onChange={handleChange}
                  size="small"
                />
              }
              label={t('common:required')}
              sx={{ textTransform: 'capitalize' }}
            />
          </Stack>
          <Stack direction="row" justifyContent="center">
            {_param.mandatory && (
              <Button
                disabled={bottomPanelActive === 2}
                onClick={() => handleOpenBottomPanel(2)}
                size="small"
              >
                {t('common:prompts')}
              </Button>
            )}
          </Stack>
          {bottomPanelActive !== 0 && (
            <ExpandMore expand={bottomPanelActive} onClick={handleCloseBottomPanel} size="small">
              <ExpandMoreIcon />
            </ExpandMore>
          )}
        </Box>
        <Collapse in={bottomPanelActive === 1} timeout="auto" unmountOnExit>
          <DefaultValuePanel
            defaultValue={_param.defaultValue}
            handleUpdateDefault={handleUpdateDefault}
          />
        </Collapse>
        <Collapse in={bottomPanelActive === 2} timeout="auto" unmountOnExit>
          <PromptsPanel prompts={_param.prompts} handleUpdate={handleUpdatePrompts} />
        </Collapse>
      </Box>
      <Zoom in={hover}>
        <IconButton
          aria-label="delete"
          onClick={handleRemoveParameter}
          size="small"
          sx={{ right: 16, bottom: 8 }}
        >
          <HighlightOffIcon />
        </IconButton>
      </Zoom>
    </Stack>
  );
};

export default ParamsComponent;
