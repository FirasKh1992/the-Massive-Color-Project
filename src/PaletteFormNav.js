
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import PaletteMetaForm from './PaletteMetaForm'

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        height: "64px"
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
    navBtns: {
        marginRight:"1rem",
        "& a":{
        textDecoration:"none"
    }
    },
    button:{
        margin: "0 0.5rem"
        
    }
}))


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

           {formShowing && < PaletteMetaForm handleSubmit={handleSubmit} />}
        </div>
    )

}

export default PaletteFormNav;