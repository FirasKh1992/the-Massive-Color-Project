import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

import { withStyles } from "@material-ui/styles";
import styles from './styles/PaletteStyles'


function SingleColorPalette(props) {

    const { palette, colorId,classes } = props;
    const { paletteName, emoji, id } = palette;

    const [format, setFormat] = useState("hex");
    const _shades = gatherShades(palette, colorId);


    const changeFormat = (val) => {
        setFormat(val);

    }
    function gatherShades(palette, colorToFilterBy) {

        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors) {

            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy))
        }

        return shades.slice(1);
    }

       
     
        const colorBoxes = _shades.map(shade => (
            <ColorBox
                name={shade.name}
                key={shade.name}
                background={shade[format]}
                showingFullPalette={false}
            />
        ))
        
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={changeFormat} showingAllColors={false} />

                <div
                    className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className="back-button">Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
export default withStyles(styles)(SingleColorPalette);