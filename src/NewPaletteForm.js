import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from './DraggableColorList';
import useInputState from './hooks/useInputState';
import PaletteFormNav from './PaletteFormNav';
import usePaletteFormHook from './hooks/usePaletteFormHook';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

function NewPaletteForm(props) {
    const { palettes, maxColors,savePalette,history} = props;
    const classes = useStyles();
    const [newColorName, handleColorChange] = useInputState("");
    const { colors, currentColor, updateCurrentColor, addNewColor, onSortEnd, removeColor, clearColors, addRandomColor } = usePaletteFormHook(palettes);
    const paletteIsFull = colors.length >= maxColors;


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

        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

    const theme = useTheme();


    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleSubmit = (newPaletteName) => {
        let PaletteName = newPaletteName;
        const newPalette = {
            paletteName: PaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors: [...colors]
        }
        savePalette(newPalette);
        history.push('/');

    }

    return (
        <div className={classes.root}>
            <PaletteFormNav
                handleDrawerOpen={handleDrawerOpen}
                classes={classes}
                open={open}
                handleSubmit={handleSubmit}
                colors={colors}
              

            />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <Typography variant="h4">
                    Design your palette
                </Typography>
                <div>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={clearColors}
                    > Clear Palette
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={addRandomColor}
                        disabled={paletteIsFull}
                    > Random Color
                     </Button>

                </div>

                < ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} />
                <ValidatorForm onSubmit={addNewColor}>
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


            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList
                    axis="xy"
                    colors={colors}
                    removeColor={removeColor}
                    onSortEnd={onSortEnd}
                />

            </main>
        </div >
    );
}

export default NewPaletteForm;
NewPaletteForm.defaultProps = {
    maxColors: 20
};