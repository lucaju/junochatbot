import { Grid, MenuItem, TextField } from '@material-ui/core';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '@src/overmind';
import { User, UserGroup } from '@src/types';

interface AttributionsProps {
  errors: FormikErrors<User>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<User>;
  values: Partial<User>;
}

const Attributions: FC<AttributionsProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  const { state } = useApp();
  const { t } = useTranslation(['users', 'common']);
  const [groupsOptions, setGroupsOptions] = useState<UserGroup[] | undefined>();

  useEffect(() => {
    setGroupsOptions(state.users.groups);
    return () => {};
  }, [state.users.groups]);

  return (
    <>
      <Grid item md={state.session.isAdmin ? 5 : 3} xs={12}>
        {state.session.isAdmin && (
          <TextField
            disabled={!state.session.isAdmin ? true : false}
            error={Boolean(touched.roleTypeId && errors.roleTypeId)}
            fullWidth
            label={t('role')}
            name="roleTypeId"
            onBlur={handleBlur}
            onChange={handleChange}
            select
            sx={{ textTransform: 'capitalize' }}
            value={values.roleTypeId}
            variant="outlined"
          >
            {state.users.roleTypes.map((value) => (
              <MenuItem key={value} sx={{ textTransform: 'capitalize' }} value={value}>
                {t(value)}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>
      <Grid item md={state.session.isAdmin ? 7 : 9} xs={12}>
        {groupsOptions && (
          <TextField
            disabled={!state.session.isAdmin ? true : false}
            error={Boolean(touched.groupId && errors.groupId)}
            fullWidth
            label={t('common:group')}
            name="groupId"
            onBlur={handleBlur}
            onChange={handleChange}
            select
            sx={{ textTransform: 'capitalize' }}
            value={values.groupId}
            variant="outlined"
          >
            {state.users.groups.map(({ id, name }) => (
              <MenuItem key={id} sx={{ textTransform: 'capitalize' }} value={id}>
                {t(name)}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>
    </>
  );
};

export default Attributions;
