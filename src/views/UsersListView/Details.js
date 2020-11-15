import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 325,
  },
}));

const Details = ({ open, handleDetailClose, currentUserId }) => {
  //   const [open, setOpen] = React.useState(false);

  const submit = () => {
    console.log('submitted');
  };

  return (
    <Dialog
      open={open}
      onClose={handleDetailClose}
      maxWidth="sm"
      aria-labelledby="user-details-dialog"
    >
      {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
      <DialogContent>
        <Box display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row">
              <TextField
                autoFocus
                id="firstName"
                label="First name"
                type="text"
                fullWidth
              />
               <TextField
                id="lasttName"
                label="Last name"
                type="text"
                fullWidth
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        {/* <Box> */}
        <Button onClick={handleDetailClose} color="default">
          Delete
        </Button>
        <Box flexGrow={1} />
        <Button onClick={handleDetailClose} color="primary">
          Cancel
        </Button>
        <Box flexGrow={1} />
        <Button onClick={submit} color="primary" variant="outlined">
          Save
        </Button>
        {/* </Box> */}
      </DialogActions>
    </Dialog>
  );
};

Details.propTypes = {
  open: PropTypes.bool,
  handleDetailClose: PropTypes.func,
  currentUserId: PropTypes.number,
};

export default Details;
