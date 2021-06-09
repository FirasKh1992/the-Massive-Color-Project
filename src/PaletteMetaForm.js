import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useInputState from './hooks/useInputState';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
function PaletteMetaForm(props) {
    const { handleSubmit, hideForm } = props;
   
    const [stage, setStage] = useState('form')
    const [newPaletteName, handlePalleteNameChange] = useInputState("");




    const savePalette = (emoji) => {
        const newPalette = { paletteName: newPaletteName, emoji: emoji.native }
        handleSubmit(newPalette);

    }
    const showeEmojiPicker = () => {
        setStage('emoji');

    }
    return (
        <div>
            <Dialog open={stage === 'emoji'}>
                <DialogTitle id="form-dialog-title">Choose Palette emoji</DialogTitle>
                <Picker title="Pick a Palette emoji " onSelect={savePalette} />
            </Dialog>
            <Dialog open={stage === 'form'} aria-labelledby="form-dialog-title" onClose={hideForm}>
                <DialogTitle id="form-dialog-title">Choose Palette name</DialogTitle>
                <ValidatorForm onSubmit={showeEmojiPicker}>
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
                        <Button onClick={hideForm} color="primary">
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
        </div>
    );
}

export default PaletteMetaForm;