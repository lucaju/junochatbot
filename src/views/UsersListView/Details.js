import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DeleteDialog from 'src/components/DeleteDialog';
import { useApp } from 'src/overmind';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  dialogSection: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  actionSection: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  avatar: {
    height: 80,
    width: 80,
  },
  avatarIcon: {
    height: 70,
    width: 70,
  },
  inputAvatar: { display: 'none' },
  avatarButton: { marginTop: theme.spacing(1) },
  marginBottom: { marginBottom: theme.spacing(1.5) },
  credentialsSection: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[700],
    marginBottom: theme.spacing(1),
  },
  chip: { marginRight: theme.spacing(1) },
  buttonProgress: { position: 'absolute' },
}));

const Details = ({ open, handleDetailClose, userId }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isAdmin] = useState(state.session.isAdmin);
  const [showPassword, setShowPassword] = useState(false);
  const [submitType, setSubmitType] = useState(null);

  const initialValues = {
    newAvatar: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    language: state.users.defaultLanguage,
    roleType: state.users.defaultRoleType,
    group: state.users.defaultGroup,
    stories: [],
  };

  if (!isAdmin) initialValues.group = state.session.user.group;

  const [userData, setUserData] = useState(initialValues);

  useEffect(() => {
    if (open && userId !== 0) {
      const loadSelectedUserData = async (id) => {
        const selectedUserData = await actions.users.getUser(id);
        selectedUserData.password = '';
        selectedUserData.newAvatar = '';
        setUserData(selectedUserData);
      };
      loadSelectedUserData(userId);
    }
    if (open && userId === 0) {
      setUserData(initialValues);
    }
    return () => {};
  }, [open]);

  const formValidation = Yup.object().shape({
    newAvatar: Yup.string(),
    firstName: Yup.string().trim().required('First name is required'),
    lastName: Yup.string().trim().required('Last name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().max(255),
    language: Yup.string().required(),
    roleType: Yup.string().required(),
    group: Yup.string(),
    stories: Yup.array(),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleDeleteStoryLink = (storyId) => {
    setUserData({
      ...userData,
      stories: userData.stories.filter((story) => story.id !== storyId),
    });
  };

  const handleDeleteButton = () => {
    setDeleteDialogOpen(true);
  };

  const handleCancelButton = () => {
    handleDetailClose();
    open = false;
  };

  // const handleDeleteClose = async (userId) => {
  //   if (userId) await actions.users.deleteUser(userId);
  //   setDeleteDialogOpen(false);
  //   handleDetailClose();
  //   open = false;
  // };

  const submit = async (values) => {
    //add extra info
    values = { ...values, stories: userData.stories };

    const res = await actions.users.save(values);
    if (res) {
      const message = values.id ? 'User updated' : 'User created';
      actions.ui.showNotification({
        type: 'success',
        message
      });
      handleDetailClose();
      open = false;
    } else {
      actions.ui.showNotification({
        type: 'error',
        message: 'Error: Something went wrong!',
      });
    }
    
  };

  const deleteUser = async (values) => {
    console.log(values);
    if (!values.id) return;
    const res = await actions.users.deleteUser(userId);
    if (res) {
      actions.ui.showNotification({
        type: 'success',
        message: 'User removed'
      });
      handleDetailClose();
      open = false;
    } else {
      actions.ui.showNotification({
        type: 'error',
        message: 'Error: Something went wrong!',
      });
    }
    setDeleteDialogOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleDetailClose}
      maxWidth="sm"
      aria-labelledby="user-details-dialog"
    >
      <Formik
        initialValues={userData}
        validationSchema={formValidation}
        enableReinitialize={true}
        // onSubmit={async (values) => await submit(values)}
        onSubmit={async (values) => {
            submitType === 'delete'
              ? await deleteUser(values)
              : await submit(values);
            setSubmitType(null);
          }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent className={classes.dialogContent}>
              <Grid container spacing={3} className={classes.dialogSection}>
                <Grid
                  item
                  md={3}
                  xs={12}
                  container
                  alignItems="center"
                  justify="center"
                  direction="column"
                >
                  <Avatar
                    className={classes.avatar}
                    src={
                      userData.avatar && `/assets/users/images/${values.avatar}`
                    }
                  >
                    {!userData.avatar && (
                      <AccountCircleIcon className={classes.avatarIcon} />
                    )}
                  </Avatar>
                  <input
                    accept="image/*"
                    className={classes.inputAvatar}
                    id="newAvatar"
                    type="file"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    // value={values.newAvatar}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      size="small"
                      className={classes.avatarButton}
                    >
                      <PhotoCamera fontSize="inherit" />
                    </IconButton>
                  </label>
                </Grid>
                <Grid item md={9} xs={12}>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label="First name"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    variant="outlined"
                    className={classes.marginBottom}
                  />
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label="Last name"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    variant="outlined"
                    className={classes.marginBottom}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={3}
                className={clsx(
                  classes.dialogSection,
                  classes.credentialsSection
                )}
              >
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      error={Boolean(touched.password && errors.password)}
                      // helperText={touched.password && errors.password}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={3} className={classes.dialogSection}>
                <Grid item md={3} xs={12}>
                  <TextField
                    error={Boolean(touched.language && errors.language)}
                    fullWidth
                    label="Language"
                    name="language"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    value={values.language}
                    variant="outlined"
                  >
                    {state.users.languages.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    error={Boolean(touched.roleType && errors.roleType)}
                    fullWidth
                    label="Role"
                    name="roleType"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    value={values.roleType}
                    disabled={!isAdmin}
                    variant="outlined"
                  >
                    {state.users.roleTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={5} xs={12}>
                  <TextField
                    error={Boolean(touched.group && errors.group)}
                    fullWidth
                    label="Group"
                    name="group"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    value={values.group}
                    disabled={!isAdmin}
                    variant="outlined"
                  >
                    {state.users.groups.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              {userData.id && (
                <Grid container spacing={3} className={classes.dialogSection}>
                  <Grid item md={12} xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Stories
                    </Typography>
                    {values.stories.length > 0 ? (
                      values.stories.map(({ id, title }) => (
                        <Chip
                          className={classes.chip}
                          key={id}
                          label={title}
                          variant="outlined"
                          onDelete={() => handleDeleteStoryLink(id)}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" gutterBottom>
                        No stories
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              )}
            </DialogContent>
            <DialogActions className={classes.actionSection}>
              {userId !== 0 && (
                <>
                  <Button color="default" onClick={handleDeleteButton}>
                    Delete
                  </Button>
                  <Box flexGrow={1} />
                </>
              )}
              <Button color="primary" onClick={handleCancelButton}>
                Cancel
              </Button>
              <Box flexGrow={1} />
              <Button
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="outlined"
              >
                Save
                {isSubmitting && submitType !== 'delete' && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Button>
            </DialogActions>
            <DeleteDialog
              handleYes={() => {
                setSubmitType('delete');
                handleSubmit();
              }}
              handleNo={() => setDeleteDialogOpen(false)}
              isSubmitting={isSubmitting}
              message="Are you sure you want to delete this user?"
              open={deleteDialogOpen}
              title="Delete User"
            />
          </form>
        )}
      </Formik>
      
      {/* <DeleteDialog
        open={deleteDialogOpen}
        handleDeleteClose={handleDeleteClose}
        userId={userData.id}
      /> */}
    </Dialog>
  );
};

Details.propTypes = {
  open: PropTypes.bool,
  handleDetailClose: PropTypes.func,
  userId: PropTypes.any,
};

export default Details;
