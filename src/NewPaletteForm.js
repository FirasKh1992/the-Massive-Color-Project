
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
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
import { mergeClasses } from '@material-ui/styles';
 import useStyles from './styles/newPaletteFormStyles'

const drawerWidth = 400;



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



    const handleSubmit = (newPalette) => {
        newPalette.id=newPalette.paletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors=colors;
        savePalette(newPalette);
        history.push('/');

    }

    return (
        <div className={classes.root}>
            <PaletteFormNav
                handleDrawerOpen={handleDrawerOpen}
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
                <div className={classes.container}>
                    <Typography variant="h4" gutterBottom>
                        Design your palette
                    </Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={clearColors}
                            className={classes.button}
                        > Clear Palette
                    </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.button}
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

                </div>
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