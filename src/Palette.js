import React, { useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar'

import PaletteFooter from './PaletteFooter'
import { withStyles } from "@material-ui/styles";
import styles from './styles/PaletteStyles'




function Palette(props) {
    const {classes}=props;
    const { colors, paletteName, emoji, id } = props.palette;
    const [level, setLevel] = useState(500);
    const [format, setFormat] = useState("hex");



    const changeLevel = (newLevel) => {
        setLevel(newLevel);

    }
    const changeFormat = (val) => {
        setFormat(val);

    }

 
    const colorBoxes = colors[level].map(color => (
        <ColorBox
            background={color[format]}
            name={color.name}
            key={color.id}
            MoreURL={`/palette/${id}/${color.id}`}
            showingFullPalette={true} />
    ));
    
    return (
        <div>
            <div className={classes.Palette}>
                <Navbar level={level} changeLevel={changeLevel} handleChange={changeFormat} showingAllColors />

                <div className={classes.colors}>
                    {colorBoxes}
                </div>

            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    )
}

export default withStyles(styles)(Palette);