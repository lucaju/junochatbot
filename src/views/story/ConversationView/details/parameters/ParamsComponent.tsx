import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  TextField,
  Zoom,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useApp } from '@src/overmind';
import { Parameter as ParameterType } from '@src/types';
import clsx from 'clsx';
import React, { ChangeEvent, FC, FocusEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DefaultValuePanel from './DefaultValuePanel';
import PromptsPanel from './PromptsPanel';
import useParameter from './hooks';

interface ParamsComponentProps {
  name?: string;
  param: ParameterType;
}

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  bottomBar: { backgroundColor: palette.action.hover },
  content: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: palette.action.hover,
    '&:focus-within': {
      boxShadow: `${palette.primary.light} 0px 0px 5px 1px !important`,
    },
    transition: transitions.create(['box-shadow'], {
      duration: transitions.duration.standard,
    }),
  },
  contentHover: { boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 10px 1px' },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: transitions.create('transform', {
      duration: transitions.duration.shortest,
    }),
  },
  expandOpen: { transform: 'rotate(180deg)' },
  removeButton: { marginLeft: spacing(1) },
}));

const ParamsComponent: FC<ParamsComponentProps> = ({ name = '', param }) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['intents']);
  const { removeParameter, updateParameter } = useParameter();

  const [_param, set_param] = useState(param);
  const [doUpdate, setDoUpdate] = useState(false);

  const [entityTypeDisplayName, setEntityTypeDisplayName] = useState('');
  const [value, set_value] = useState('');
  const [isList, setIsList] = useState(!!param.isList);
  const [mandatory, setMandatory] = useState(!!param.mandatory);

  const [hover, setHover] = useState(false);
  const [bottomPanelActive, setBottomPanelActive] = useState(0);

  useEffect(() => {
    set_param(param);

    if (param.value) set_value(param.value);
    if (param.entityTypeDisplayName) setEntityTypeDisplayName(param.entityTypeDisplayName);
    if (param.isList) setIsList(param.isList);
    if (param.mandatory) setMandatory(param.mandatory);

    return () => {};
  }, [param]);

  useEffect(() => {
    if (doUpdate) {
      update();
      setDoUpdate(false);
    }
    return () => {};
  }, [doUpdate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    switch (target.name) {
      case 'displayName':
        set_param({ ..._param, displayName: target.value });
        return;
      case 'entityTypeDisplayName':
        setEntityTypeDisplayName(target.value);
        set_param({ ..._param, entityTypeDisplayName: target.value });
        return;
      case 'value':
        set_value(target.value);
        set_param({ ..._param, value: target.value });
        return;
      case 'isList':
        set_param({ ..._param, isList: target.checked });
        setIsList(target.checked);
        setDoUpdate(true);
        return;
      case 'mandatory':
        set_param({ ..._param, mandatory: event.currentTarget.checked });
        setMandatory(target.checked);
        setDoUpdate(true);
        return;
    }
  };
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    if (target.name === 'value') {
      if (target.value.indexOf('$') !== 0) {
        const $value = `$${target.value}`;
        set_value($value);
        set_param({ ..._param, value: $value });
      }
    }
    setDoUpdate(true);
  };

  const handleChangeEntity = (event: ChangeEvent<HTMLInputElement>) => {
    // const value = Number(event.target.value);
    // console.log(value);
    // set_param({ ..._param, set_entityTypeDisplayName: value });
    // setDoUpdate(true);
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
    updateParameter(name, _param);
  };

  const handleOpenBottomPanel = (panelId: number) => {
    setBottomPanelActive(panelId);
  };

  const handleCloseBottomPanel = () => {
    setBottomPanelActive(0);
  };

  return (
    <Box
      my={1}
      borderRadius={'borderRadius'}
      className={clsx(classes.content, hover && classes.contentHover)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box display="flex" flexDirection="column" p={2}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
            <TextField
              fullWidth
              label={t('name')}
              name="displayName"
              value={_param.displayName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs>
            {/* <FormControl>
              <InputLabel >{t('entity')}</InputLabel>
              <Select
                fullWidth
                name="entityTypeDisplayName"
                value={entityTypeDisplayName}
                onChange={handleChangeEntity}
              >
                {state.intents.entities.map(({ id, name }) => (
                  <MenuItem key={id} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <TextField
              fullWidth
              label={t('entity')}
              name="entityTypeDisplayName"
              value={entityTypeDisplayName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              label={t('value')}
              name="value"
              value={value}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Zoom in={hover}>
              <IconButton
                aria-label="delete"
                className={classes.removeButton}
                size="small"
                onClick={() => removeParameter(name, _param.displayName)}
              >
                <HighlightOffIcon />
              </IconButton>
            </Zoom>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" flexDirection="row" mt={1} px={2} py={0.5} className={classes.bottomBar}>
        <FormControlLabel
          control={
            <Switch
              name="isList"
              color="primary"
              size="small"
              checked={isList}
              onChange={handleChange}
            />
          }
          label={t('isList')}
        />
        <FormControlLabel
          control={
            <Switch
              name="mandatory"
              color="primary"
              size="small"
              checked={mandatory}
              onChange={handleChange}
            />
          }
          label={t('required')}
        />
        <Button disabled={bottomPanelActive === 1} onClick={() => handleOpenBottomPanel(1)}>
          {t('defaultValue')}
        </Button>
        {_param.mandatory && (
          <Button disabled={bottomPanelActive === 2} onClick={() => handleOpenBottomPanel(2)}>
            {t('prompts')}
          </Button>
        )}
        {bottomPanelActive !== 0 && (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: bottomPanelActive !== 0,
            })}
            size="small"
            onClick={handleCloseBottomPanel}
          >
            <ExpandMoreIcon />
          </IconButton>
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
  );
};

export default ParamsComponent;
