import { Grid, MenuItem, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useApp } from 'src/overmind';

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

  useEffect(() => {
    const fetchData = async () => await actions.users.getGroups();
    if (state.users.groups.length === 0) fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    setGroups([{ id: -1, name: 'None', active: true }, ...state.users.groups]);
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
          <TextField
            error={Boolean(touched.groupId && errors.groupId)}
            fullWidth
            label="Group"
            name="groupId"
            onBlur={handleBlur}
            onChange={handleChange}
            select
            value={values.groupId}
            disabled={!isAdmin || (values.id && !values.active)}
            variant="outlined"
          >
            {groups
              .filter(({ active }) => active)
              .map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
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
