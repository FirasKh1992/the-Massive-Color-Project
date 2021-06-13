import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import MiniPalette from './MiniPalette'
import { withStyles } from '@material-ui/styles';
import { Avatar, Dialog, DialogTitle } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'



import styles from './styles/PaletteListStyles';
function PaletteList(props) {
    const { palettes, classes, deletePalette, history } = props;
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deletingId,setDeleteId] = useState("");
   

    function goToPalette(id) {
        history.push(`/palette/${id}`);

    }
    const openDialog = (id) => {
        setOpenDeleteDialog(true);
        setDeleteId(id);
    }
    const closeDialog = () => {
        setOpenDeleteDialog(false);
        setDeleteId('');
    }
    const handleDelete=(id)=>{
        deletePalette(deletingId);
        setOpenDeleteDialog(false);
    }


    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1 className={classes.heading}>React Colors</h1>
                    <Link to="/palette/new"> Create Palette</Link>
                </nav>

                <TransitionGroup className={classes.palettes}>
                    {palettes.map(palette => (
                        <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                            <MiniPalette
                                {...palette}
                                goToPalette={goToPalette}
                                openDialog={openDialog}
                                key={palette.id}
                                id={palette.id} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>

            </div>
            <Dialog
                open={openDeleteDialog}
                aria-labelledby="delete-dialog-title"
                onClose={closeDialog}>
                <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
                <List>
                    <ListItem button onClick={()=>handleDelete(deletingId)}>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                <CheckIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>Delete</ListItemText>
                    </ListItem>
                    <ListItem button onClick={closeDialog}>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                <CloseIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>Cancel</ListItemText>
                    </ListItem>
                </List>

            </Dialog>
        </div>
    )
}
export default withStyles(styles) (PaletteList);