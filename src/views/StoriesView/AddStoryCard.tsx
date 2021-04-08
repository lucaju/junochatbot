import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import clsx from 'clsx';
import React, { FC } from 'react';

interface AddStoryCardProps {
  openDialog: () => void;
  className?: string;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    width: 325,
    borderStyle: 'dashed',
  },
  icon: {
    marginRight: spacing(1),
    color: palette.primary.light,
  },
  uppercase: { textTransform: 'uppercase' },
}));

const AddStoryCard: FC<AddStoryCardProps> = ({
  openDialog,
  className = '',
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      variant="outlined"
      {...rest}
    >
      <CardActionArea onClick={openDialog}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <AddCircleIcon className={classes.icon} fontSize="large" />
            <Typography variant="h6" className={classes.uppercase}>
              Create a new story
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AddStoryCard;
