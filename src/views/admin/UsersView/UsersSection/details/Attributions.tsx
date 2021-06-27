import { Grid, MenuItem, TextField } from '@material-ui/core';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState } from '@src/overmind';
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
  const { session, users } = useAppState();
  const { t } = useTranslation(['users', 'common']);
  const [groupsOptions, setGroupsOptions] = useState<UserGroup[] | undefined>();

  useEffect(() => {
    setGroupsOptions(users.groups);
    return () => {};
  }, [users.groups]);

  return (
    <>
      <Grid item md={session.isAdmin ? 5 : 3} xs={12}>
        {session.isAdmin && (
          <TextField
            disabled={!session.isAdmin ? true : false}
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
            {users.roleTypes.map((value) => (
              <MenuItem key={value} sx={{ textTransform: 'capitalize' }} value={value}>
                {t(value)}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>
      <Grid item md={session.isAdmin ? 7 : 9} xs={12}>
        {groupsOptions && (
          <TextField
            disabled={!session.isAdmin ? true : false}
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
            {users.groups.map(({ id, name }) => (
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
