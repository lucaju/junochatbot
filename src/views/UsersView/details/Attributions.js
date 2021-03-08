import {
  CircularProgress,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from 'src/overmind';
import { json } from 'overmind';
import { useField } from 'formik';

const useStyles = makeStyles(() => ({
  capitalize: { textTransform: 'capitalize' },
}));

const Attributions = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const { t } = useTranslation(['users', 'common']);
  const [isAdmin] = useState(state.session.isAdmin);
  const [loadingGroupOptions, setLoadingGroupOptions] = useState(false);
  const [groupsOptions, setGroupsOptions] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('groups');
  // eslint-disable-next-line no-unused-vars
  const { value } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    const fetchData = async () => {
      setLoadingGroupOptions(true);
      await actions.users.getGroups();
      setLoadingGroupOptions(false);
    };
    if (state.users.groups.length === 0) fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const groups = [...state.users.groups];
    const activeGroups = groups.filter(({ active }) => active);
    setGroupsOptions(activeGroups);
    return () => {};
  }, [state.users.groups]);

  return (
    <>
      <Grid item md={state.session.isAdmin ? 5 : 3} xs={12}>
        {state.session.isAdmin && (
          <TextField
            className={classes.capitalize}
            error={Boolean(touched.roleTypeId && errors.roleTypeId)}
            fullWidth
            label={t('role')}
            name="roleTypeId"
            onBlur={handleBlur}
            onChange={handleChange}
            select
            value={values.roleTypeId}
            disabled={!isAdmin || (values.id && !values.active)}
            variant="outlined"
          >
            {state.users.roleTypes.map(({ name, value }) => (
              <MenuItem
                className={classes.capitalize}
                key={value}
                value={value}
              >
                {t(name)}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>
      <Grid item md={state.session.isAdmin ? 7 : 9} xs={12}>
        {groupsOptions && (
          <Autocomplete
            disabled={!isAdmin || (values.id && !values.active)}
            filterSelectedOptions
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            id="groups"
            limitTags={3}
            loading={loadingGroupOptions}
            multiple={values.roleTypeId === 1 ? true : false} //todo: allow multiple if admin
            onChange={(event, value, reason) => {
              if (reason === 'blur') return handleBlur();
              setValue(json(value));
            }}
            options={groupsOptions}
            value={values.groups}
            renderInput={(params) => (
              <TextField
                className={classes.capitalize}
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingGroupOptions ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                label={t('common:group')}
                variant="outlined"
                {...params}
              />
            )}
          />
        )}
      </Grid>
    </>
  );
};

Attributions.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Attributions;
