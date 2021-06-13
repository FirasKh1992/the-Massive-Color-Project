import {useState} from 'react';
import { arrayMove } from 'react-sortable-hoc'



const usePaletteFormHook= initialPalettes => {
    
    const [colors, setColors] = useState(initialPalettes[0].colors);
    const [open, setOpen] = useState(false);
    
    return {
        colors,
        open,
        addNewColor: (newColor) => {
            setColors(oldColors => [...oldColors, newColor])
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
            let rand ;
            let randColor;
            let isDuplicateColor=true;
            while(isDuplicateColor){
                rand = Math.floor(Math.random() * allColors.length);
                randColor = allColors[rand];
                isDuplicateColor=colors.some(color => color.name === randColor.name)
            }
            setColors(oldColors => [...colors, randColor]);
        },
        handleDrawerOpen : () => {
            setOpen(true);
        },
        handleDrawerClose : () => {
            setOpen(false);
        }
   
    }
}

export default usePaletteFormHook;