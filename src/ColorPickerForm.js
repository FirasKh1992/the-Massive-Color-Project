import React, { useEffect, useState } from 'react';
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import useInputState from './hooks/useInputState';
import styles from './styles/ColorPickerFormStyles'

function ColorPickerForm(props) {
    const [newColorName, handleColorChange, reset] = useInputState("");
    const [currentColor, setColor] = useState('teal');
    const { paletteIsFull, addNewColor, colors, classes } = props;


    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", value => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isColorUnique", value => {
            return colors.every(
                ({ color }) => color !== currentColor
            );
        });

    })

    const updateCurrentColor = newColor => {
        setColor(newColor.hex);
    }

    const addColor = () => {
        const newColor = { color: currentColor, name: newColorName }
        addNewColor(newColor);
        reset();
    }

    return (
        <div>
            < ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} className={classes.picker} />
            <ValidatorForm onSubmit={addColor}>
                <TextValidator
                    value={newColorName}
                    className={classes.colorNameInput}
                    name="newColorName"
                    placeholder="Color name"
                    variant="filled"
                    margin="normal"
                    onChange={handleColorChange}
                    validators={["required", "isColorUnique", "isColorNameUnique"]}
                    errorMessages={["Enter color name", "Color already used", "Color name must be unique"]} />
                <Button
                    variant='contained'
                    type='submit'
                    color='primary'
                    disabled={paletteIsFull}
                    style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
                    className={classes.addColor}
                >
                    {paletteIsFull ? "Palette is full" : "Add Color"}
                </Button>

            </ValidatorForm>
        </div>
    )

}

export default withStyles(styles)(ColorPickerForm);