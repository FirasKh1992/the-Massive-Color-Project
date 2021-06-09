import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useInputState from './hooks/useInputState';
function PaletteMetaForm(props) {
    const { handleSubmit } = props;
    const [open, setOpen] = useState(true);
    const [newPaletteName, handlePalleteNameChange] = useInputState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
    
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose Palette name</DialogTitle>
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <DialogContent>
                        <DialogContentText>
                           Please enter a name for your new beautiful palette.Make sure 
                           it's unique!.
            </DialogContentText>

                        <TextValidator
                            label="Palette name"
                            name="newPaletteName"
                            value={newPaletteName}
                            fullWidth
                            onChange={handlePalleteNameChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette name", "Palette name had been used"]}
                        />



                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
            </Button>

                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'>
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
     
    );
}

export default PaletteMetaForm;