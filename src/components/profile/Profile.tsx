import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import LanguageIcon from '@material-ui/icons/Language';
import LockIcon from '@material-ui/icons/Lock';
import { APP_URL } from '@src/config/config.js';
import { useApp } from '@src/overmind';
import { UserGroup } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AvatarDialog from './AvatarDialog';
import PasswordDialog from './PasswordDialog';

interface ProfileProps {
  anchor: HTMLDivElement;
  handleClose: () => void;
}

const Profile: FC<ProfileProps> = ({ anchor, handleClose }) => {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['profile', 'common']);

  const open = Boolean(anchor);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [avatardDialogOpen, setAvatardDialogOpen] = useState(false);
  const [group, setGroup] = useState<UserGroup | undefined>();

  useEffect(() => {
    const fetchGroup = async () => {
      if (!state.session.user || !state.session.user.groupId) return;
      const response = await actions.users.getGroup(Number(state.session.user.groupId));
      if (!isError(response)) setGroup(response);
    };
    fetchGroup();
    return () => {};
  }, []);

  const switchAppearenceMode = () => {
    actions.ui.setDarkMode(!state.ui.darkMode);
  };

  const switchLanguage = (event: MouseEvent<HTMLElement>, value: string) => {
    i18n.changeLanguage(value);
    actions.ui.switchLanguage(value);
  };

  const handleSignOut = () => {
    actions.session.signOut();
    navigate('/login', { replace: true });
  };

  return (
    <Popover
      anchorEl={anchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id="profile"
      onClose={handleClose}
      open={open}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignContent="flex-start"
        p={2}
      >
        <Avatar
          src={
            state.session.user?.avatarUrl &&
            `${APP_URL}/uploads/assets${state.session.user.avatarUrl}`
          }
        >
          {!state.session.user?.avatarUrl && <AccountCircleIcon />}
        </Avatar>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignContent="flex-start"
          ml={2}
          pt={0}
        >
          <Typography variant="button">
            {state.session.user?.firstName} {state.session.user?.lastName}
          </Typography>
          <Typography variant="body2">{state.session.user?.userName}</Typography>
          {group && <Typography variant="caption">{group.name}</Typography>}
        </Box>
      </Box>

      <Divider />

      <List sx={{ width: 280 }}>
        <ListItem>
          <ListItemIcon sx={{ minWidth: 40 }}>
            {state.ui.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemIcon>
          <ListItemText id="dark-mode" primary={t('darkMode')} />
          <ListItemSecondaryAction>
            <Switch
              checked={state.ui.darkMode}
              color="primary"
              edge="end"
              inputProps={{ 'aria-labelledby': 'dark-mode' }}
              onChange={switchAppearenceMode}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText id="language" primary={t('language')} />
          <ListItemSecondaryAction>
            <ToggleButtonGroup
              value={state.ui.languageCode}
              exclusive
              onChange={switchLanguage}
              aria-label="language"
            >
              {state.ui.languages.map(({ value, name }) => (
                <ToggleButton key={value} sx={{ height: 28 }} value={value}>
                  {t(`common:${name}`)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Divider />

      <List sx={{ width: 280 }}>
        <ListItem button onClick={() => setAvatardDialogOpen(true)}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={t('changeAvatar')} />
        </ListItem>

        <ListItem button onClick={() => setPasswordDialogOpen(true)}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary={t('changePassword')} />
        </ListItem>
      </List>

      <Divider />

      <Box display="flex" justifyContent="center" mt={2} mb={2}>
        <Button onClick={handleSignOut} size="small" variant="outlined">
          {t('signOut')}
        </Button>
      </Box>

      <AvatarDialog handleClose={() => setAvatardDialogOpen(false)} open={avatardDialogOpen} />

      <PasswordDialog handleClose={() => setPasswordDialogOpen(false)} open={passwordDialogOpen} />
    </Popover>
  );
};

export default Profile;
