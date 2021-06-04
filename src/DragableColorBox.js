import React from 'react';
import { withStyles } from '@material-ui/styles';
const styles = {
    root: {
        height: "25%",
        width: "20%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
    }
}
function DragableColoBox(props) {
    const { classes } = props;
    return (
        <div className={classes.root} style={{ backgroundColor: props.color }}>
            {props.name}
        </div>
    )
}

export default withStyles(styles)(DragableColoBox);