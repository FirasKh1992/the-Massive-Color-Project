import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import {Link} from 'react-router-dom';
import { withStyles } from "@material-ui/styles";

const styles={
    Palette:{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    colors:{
        height:"90%",
    },
    goBack:{
        height:"50%",
        width: "20%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
       opacity:1,
       background:"black",
     "& a":{
        color:"white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255,255,255,0.3)",
        fontSize: "1rem",

        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
     
     }
 
}

}

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = { format: "hex" }
        this.changeFormat = this.changeFormat.bind(this);


    }
    changeFormat(val) {
        this.setState({ format: val })

    }
    gatherShades(palette, colorToFilterBy) {

        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors) {

            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy))


        }

        return shades.slice(1);
    }
    render() {
        const {format}= this.state;
        const {paletteName,emoji,id}= this.props.palette;
        const {classes}=this.props;
        const colorBoxes = this._shades.map(shade => (
            <ColorBox
                name={shade.name}
                key={shade.name}
                background={shade[format]}
                showingFullPalette={false}
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                
                <div
                    className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}className="back-button">Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}
export default withStyles(styles) (SingleColorPalette);