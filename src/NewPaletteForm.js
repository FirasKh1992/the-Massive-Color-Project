
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from "@material-ui/core/Button";


import DraggableColorList from './DraggableColorList';

import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
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
    const { palettes, maxColors, savePalette, history } = props;
    const classes = useStyles();

    const { 
        colors,
        addNewColor,
        onSortEnd,
        removeColor,
        clearColors,
        addRandomColor,
        open,
        handleDrawerOpen,
        handleDrawerClose,
    } = usePaletteFormHook(palettes);

    
    
    const paletteIsFull = colors.length >= maxColors;



    const theme = useTheme();



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
                palettes={palettes}
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

                <ColorPickerForm
                    addNewColor={addNewColor}
                    paletteIsFull={paletteIsFull}
                    colors={colors}
                />


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