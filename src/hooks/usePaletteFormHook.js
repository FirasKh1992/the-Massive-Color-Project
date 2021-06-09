import React,{useState} from 'react';
import { arrayMove } from 'react-sortable-hoc'
import useInputState from './useInputState'
export default initialPalettes => {
    const [currentColor, setColor] = useState('teal');
    const [colors, setColors] = useState(initialPalettes[0].colors);
    const [newColorName, handleColorChange, resetColorName] = useInputState("");
    
    return {
        colors,
        currentColor,
        updateCurrentColor: newColor => {

            setColor(newColor.hex);
        },

        addNewColor: () => {
            const newColor = { color: currentColor, name: newColorName }
            setColors(oldColors => [...oldColors, newColor])
            resetColorName();
        },
        onSortEnd: ({ oldIndex, newIndex }) => {
            setColors(arrayMove(colors, oldIndex, newIndex))

        },
        removeColor: (colorName) => {
            setColors(colors.filter(color => (
                color.name !== colorName
            )))
        },
        clearColors: () => {
            setColors([]);
        },
        addRandomColor:()=> {
            const allColors = initialPalettes.map(p => p.colors).flat();
            let rand = Math.floor(Math.random() * allColors.length);
            let randColor = allColors[rand]
            setColors(oldColors => [...colors, randColor]);
        }
   
    }
}