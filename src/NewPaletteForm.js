import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';
import DragableColorBox from './DragableColorBox'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
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
    const classes = useStyles();
    const [currentColor, setColor] = useState('teal');
    const [colors, setNewColor] = useState([])
    const [newName, setNewName] = useState("")
    const theme = useTheme();


    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", value => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
    });
    useEffect(() => {
        ValidatorForm.addValidationRule("isColorUnique", value => {
            return colors.every(
                ({ color }) => color !== currentColor
            );
        });
    });

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const updateCurrentColor = (newColor) => {

        setColor(newColor.hex);
    }

    function addNewColor() {
        const newColor = { color: currentColor, name: newName }
        setNewColor(oldColors => [...oldColors, newColor])
        setNewName('');
    }

    function handleChange(evt) {
        setNewName(evt.target.value)

    }
    function handleSubmit() {
        let newName="New test Palette"
        const newPalette = {
            paletteName:newName,
            id:newName.toLowerCase().replace(/ /g,"-"),
            colors:[...colors] }
        props.savePalette(newPalette);
        props.history.push('/');

    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                color="default"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
          </Typography>
                    <Button variant='contained' color='primary' onClick={handleSubmit}>Save Palette</Button>
                </Toolbar>
            </AppBar>
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
                    <Button variant='contained' color='secondary'> Clear Palette</Button>
                    <Button variant='contained' color='primary'> Random Color</Button>

                </div>

                < ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} />
                <ValidatorForm onSubmit={addNewColor}>
                    <TextValidator
                        value={newName}
                        onChange={handleChange}
                        validators={["required", "isColorUnique", "isColorNameUnique"]}
                        errorMessages={["Enter color name", "Color already used", "Color name must be unique"]} />
                    <Button
                        variant='contained'
                        type='submit'
                        color='primary'
                        style={{ backgroundColor: currentColor }}
                    >
                        Add Color</Button>
                </ValidatorForm>


            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />


                {colors.map(color => (
                    <DragableColorBox color={color.color} name={color.name} />
                ))}
            </main>
        </div >
    );
}

export default NewPaletteForm;