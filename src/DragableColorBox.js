import React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlined'
import styles from './styles/DraggableColorBoxStyles';


const DragableColoBox=SortableElement((props) => {
    const { classes,handleClick,name,color } = props;
    return (
        <div
            className={classes.root}
            style={{ backgroundColor: color }}>
            <div className={classes.boxContent}>
               <span>{name}</span> 
              <DeleteOutlineIcon className={classes.deleteIcon} onClick={handleClick}/>
            </div>
        </div>

    )
})

export default withStyles(styles)(DragableColoBox);