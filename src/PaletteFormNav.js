
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Button from "@material-ui/core/Button";
import { ValidatorForm } from "react-material-ui-form-validator";
import PaletteMetaForm from './PaletteMetaForm'
import  useStyles from './styles/PaletteFormNavStyles'


function PaletteFormNav(props) {

    const { open, handleDrawerOpen, handleSubmit, palettes } = props;
    const [formShowing,setFormshowing]=useState(false);
    const classes = useStyles();

    useEffect(() => {

        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

    function showForm(){
        setFormshowing(true);
    }
function hideForm(){
    setFormshowing(false);
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
                        className={clsx(classes.menuButton,
                         {[classes.hide]:open}
                         
                         )}
                    >
                        <AddToPhotosIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A Palette
                    </Typography>

                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to='/'>
                        <Button
                            variant='contained'
                            color='secondary'
                            className={classes.button}
                        >
                            Go Back
                            </Button>
                    </Link>
                    <Button variant="contained" color="primary" onClick={showForm} className={classes.button}>
                      Save
        </Button>
                </div>
            </AppBar>

           {formShowing && < PaletteMetaForm handleSubmit={handleSubmit} hideForm={hideForm} />}
        </div>
    )

}

export default PaletteFormNav;