
import {useEffect} from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import useInputState from './hooks/useInputState';


function PaletteFormNav(props){
    const [newPaletteName, handlePalleteNameChange] = useInputState("");
    const {classes,open,handleDrawerOpen,handleSubmit,palettes} = props;
  
    useEffect(() => {
       
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });


    return(
     <div>
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
                    <ValidatorForm onSubmit={()=>handleSubmit(newPaletteName)}>
                        <TextValidator
                            label="Palette name"
                            name="newPaletteName"
                            value={newPaletteName}
                            onChange={handlePalleteNameChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette name", "Palette name had been used"]}
                        />

                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'>
                            Save Palette
                        </Button>
                        <Link to='/'>
                            <Button
                                variant='contained'
                                color='secondary'
                                >
                                "Go Back"
                            </Button>
                        </Link>
                    </ValidatorForm>
                </Toolbar>
            </AppBar>
     </div>
    )

}

export default PaletteFormNav;