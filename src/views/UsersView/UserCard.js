import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import { json } from 'overmind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { APP_URL } from '../../config/config.js';

const useStyles = makeStyles(({ palette, spacing }) => ({
  avatar: { marginRight: spacing(2) },
  avatarIcon: {
    height: 40,
    width: 40,
  },
  blockIcon: {
    marginLeft: spacing(1.5),
    color: palette.grey[400],
  },
  editButton: { marginTop: -spacing(1) },
  tableCell: {
    borderBottom: 0,
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
  },
}));

const UserRow = ({ handleEditClick, user }) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(null);

  const { id, firstName, lastName, userName, active, avatarUrl, groups } = user;

  return (
    <TableRow
      onMouseEnter={() => setIsHover(id)}
      onMouseLeave={() => setIsHover(null)}
    >
      <TableCell classes={{ root: classes.tableCell }} colSpan={2}>
        <Card raised={isHover === id}>
          <CardContent>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={2}>
                <Avatar
                  className={classes.avatar}
                  // src={avatarUrl && `/uploads/assets${avatarUrl}`}
                  src={
                    avatarUrl &&
                    `${APP_URL}/uploads/assets${avatarUrl}`
                  }
                >
                  {!avatarUrl && (
                    <AccountCircleIcon className={classes.avatarIcon} />
                  )}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography
                  color={active ? 'textPrimary' : 'textSecondary'}
                  variant="button"
                >
                  {firstName} {lastName}
                </Typography>
                <Typography
                  color={active ? 'textPrimary' : 'textSecondary'}
                  variant="body2"
                >
                  {userName}
                </Typography>
                {groups?.length > 0 && (
                  <Typography
                    color={active ? 'textPrimary' : 'textSecondary'}
                    variant="caption"
                  >
                    {groups.map((group) => group.name).join(' • ')}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={1}>
                <Grid container direction="column" justify="space-between">
                  <Grid item xs={6}>
                    {isHover === id ? (
                      <IconButton
                        className={classes.editButton}
                        onClick={() => handleEditClick(json(user))}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    ) : (
                      <Box height={35} />
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {!active && (
                      <BlockIcon
                        className={classes.blockIcon}
                        fontSize="small"
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TableCell>
    </TableRow>
  );
};

UserRow.propTypes = {
  handleEditClick: PropTypes.func,
  user: PropTypes.object.isRequired,
};

export default UserRow;
