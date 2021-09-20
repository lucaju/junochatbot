import { Grid, MenuItem, TextField, Typography } from '@mui/material';
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
  const { t } = useTranslation();
  const [groupsOptions, setGroupsOptions] = useState<UserGroup[] | undefined>();

  useEffect(() => {
    setGroupsOptions(users.groups);
    return () => {};
  }, [users.groups]);

  return (
    <>
      <Grid item md={session.isAdmin ? 3 : 6} xs={12}>
        {session.isAdmin && !values.id ? (
          <TextField
            disabled={!session.isAdmin ? true : false}
            error={Boolean(touched.roleTypeId && errors.roleTypeId)}
            fullWidth
            label={t('users:role')}
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
                {t(`users:${value}`)}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <>
            <Typography sx={{ textTransform: 'capitalize' }} variant="caption">
              {t('users:role')}
            </Typography>
            <Typography>{values.roleTypeId}</Typography>
          </>
        )}
      </Grid>
      <Grid item md={session.isAdmin ? 9 : 6} xs={12}>
        {session.isAdmin ? (
          <>
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
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </>
        ) : (
          <>
            <Typography sx={{ textTransform: 'capitalize' }} variant="caption">
              {t('common:group')}
            </Typography>
            <Typography>{session.user?.group?.name}</Typography>
          </>
        )}
      </Grid>
    </>
  );
};

export default Attributions;
