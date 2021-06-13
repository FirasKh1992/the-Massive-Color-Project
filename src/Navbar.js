import React, { useState } from 'react';
import { Link } from 'react-router-dom';



import { IconButton, MenuItem, Select, Snackbar } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from '@material-ui/styles';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';



function Navbar(props) {


    const { handleChange, level, changeLevel, showingAllColors, classes } = props;
    const [format, setFormat] = useState("hex");
    const [open, setOpen] = useState(false);

    const handleFormatChange = (e) => {
        setFormat(e.target.value);
        setOpen(true);
        handleChange(e.target.value);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    return (
        <div className={classes.Navbar}>
            <div className={classes.logo}>
                <Link to='/'>reactcolorpicker</Link>
            </div>
            { showingAllColors && <div >
                <span>level:{level}</span>
                <div className={classes.slider}>
                    <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={changeLevel}
                    />
                </div>
            </div>
            }
            <div className={classes.selectContainer}>
                <Select value={format} onChange={handleFormatChange}>
                    <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                    <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={open}
                autoHideDuration={3000}
                message={<span id="message-id">Format Changed to {format}</span>}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                onClose={closeSnackbar}
                action={[
                    <IconButton onClick={closeSnackbar} color="inherit" key="close" aria-label="close">
                        <CloseIcon />
                    </IconButton>
                ]}
            >

            </Snackbar>

        </div>

    );
}

export default withStyles(styles)(Navbar);