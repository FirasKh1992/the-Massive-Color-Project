import React, { useEffect, useState } from 'react';

import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import useInputState from './hooks/useInputState';


function ColorPickerForm(props){
    const [newColorName, handleColorChange,reset] = useInputState("");
    const [currentColor, setColor] = useState('teal');
    const {paletteIsFull,addNewColor,colors} = props;

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

   const  updateCurrentColor= newColor => {
        setColor(newColor.hex);
    }

    const addColor=() =>{
        const newColor = { color: currentColor, name: newColorName }
        addNewColor(newColor);
        reset();
    }

    return (
        <div>
        < ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} />
                <ValidatorForm onSubmit={addColor}>
                    <TextValidator
                        value={newColorName}
                        name="newColorName"
                        onChange={handleColorChange}
                        validators={["required", "isColorUnique", "isColorNameUnique"]}
                        errorMessages={["Enter color name", "Color already used", "Color name must be unique"]} />
                    <Button
                        variant='contained'
                        type='submit'
                        color='primary'
                        disabled={paletteIsFull}
                        style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
                    >
                        {paletteIsFull ? "Palette is full" : "Add Color"}
                    </Button>

                </ValidatorForm>
        </div>
    )

}

export default ColorPickerForm;