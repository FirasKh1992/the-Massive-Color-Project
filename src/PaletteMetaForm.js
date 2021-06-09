import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useInputState from './hooks/useInputState';
function PaletteMetaForm(props){
    const {handleSubmit}=props;
    const [open, setOpen] = useState(false);
    const [newPaletteName, handlePalleteNameChange] = useInputState("");

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                        <TextValidator
                            label="Palette name"
                            name="newPaletteName"
                            value={newPaletteName}
                            onChange={handlePalleteNameChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette name", "Palette name had been used"]}
                        />

                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'>
                            Save Palette
                        </Button>

                    </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default PaletteMetaForm;