import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles/miniPaletteStyle'
import DeleteIcon from "@material-ui/icons/Delete"
function MiniPalette(props) {
    const { classes, paletteName, emoji, colors, handleClick,handleDelete,id} = props;

    const miniColorBoxes = colors.map(color => (
        <div
            className={classes.miniColor}
            style={{ backgroundColor: color.color }}
            key={color.name}>
        </div>
    ));

const deletePalette=(e)=>{
e.stopPropagation();
handleDelete(id);
}
    return (

        <div className={classes.root} onClick={handleClick}>

            <DeleteIcon 
            className={classes.deleteIcon} 
            style={{ transition: "all 0.3s ease-in-out" }}//added styles in order to override material-ui styles
            onClick={deletePalette}
            />

            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5
                className={classes.title}>{paletteName}
                <span
                    className={classes.emoji}>
                    {emoji}
                </span>
            </h5>

        </div>
    )
}


export default withStyles(styles)(MiniPalette);