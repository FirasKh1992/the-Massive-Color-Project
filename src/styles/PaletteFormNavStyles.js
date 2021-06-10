import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constants';
const drawerWidth = DRAWER_WIDTH;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    hide: {
        display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        marginRight: 20,
        marginLeft: 12
    },
    navBtns: {
        marginRight: "1rem",
        "& a": {
            textDecoration: "none"
        },
        "@media (max-width: 575.98px)": {
            marginRight: "0.5rem"

        },
    },
    button: {
        margin: "0 0.5rem",
        "@media (max-width: 575.98px)": {
           margin:"0 0.2rem",
           padding:"0.3rem"
            
        },

    }
}))

export default useStyles;