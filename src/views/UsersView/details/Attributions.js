import { Chip, Grid, MenuItem, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useApp } from 'src/overmind';
import { json } from 'overmind';
import { useField } from 'formik';

const Attributions = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  const { state, actions } = useApp();
  const [isAdmin] = useState(state.session.isAdmin);
  const [groups, setGroups] = useState([]);

  const [field, meta, helpers] = useField('groups');
  const { value } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    const fetchData = async () => await actions.users.getGroups();
    if (state.users.groups.length === 0) fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const _groups = [...state.users.groups];
    const activeGroups = _groups.filter(({ active }) => active);
    setGroups(activeGroups);
    return () => {};
  }, [state.users.groups]);

  return (
    <>
      <Grid item md={5} xs={12}>
        <TextField
          error={Boolean(touched.roleTypeId && errors.roleTypeId)}
          fullWidth
          label="Role"
          name="roleTypeId"
          onBlur={handleBlur}
          onChange={handleChange}
          select
          value={values.roleTypeId}
          disabled={!isAdmin || (values.id && !values.active)}
          variant="outlined"
        >
          {state.users.roleTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item md={7} xs={12}>
        {groups.length > 0 && (
          <Autocomplete
            disabled={!isAdmin || (values.id && !values.active)}
            filterSelectedOptions
            getOptionLabel={(groups) => groups.name}
            getOptionSelected={(option, value) => option.id === value.id}
            id="groups"
            multiple
            onChange={(event, value, reason) => {
              if (reason === 'blur') return handleBlur();
              setValue(json(value));
            }}
            options={groups}
            value={values.groups}
            renderInput={(params) => (
              <TextField
                fullWidth
                label="Groups"
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
