import React, {useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {logout} from "../../actions/authActions";
import {withRouter} from "react-router";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchBar from "./SearchBar";

const useStyles = makeStyles(theme => ({
    root: {
        // justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down("xs")]:{
            display: "block"
        }
    },
    navbarLink: {
        color: "white",
        textDecoration: "none",
        padding: theme.spacing(0, 1, 0, 1),
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: "none"
    },
    logo:{
        flexGrow: 1,
        fontSize: 18,
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
            fontSize: 16,
            fontWight: 500
        },
        [theme.breakpoints.down("xs")]: {
            paddingTop: theme.spacing(1)
        }
    },
    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        [theme.breakpoints.down("xs")]: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        }
    }
}))

const Navbar = ({isAuthenticated, history, logout}) => {
    const classes = useStyles();
    let [anchorEl, setAnchorEl] = useState(null);
    const handleClick = e => setAnchorEl(e.target);
    const handleClose = (path) => {
        if(path) history.push(path)
        setAnchorEl(null)
    };
    return (
        <div>
            <AppBar position="static">
                <Toolbar className={classes.root}>
                    <Typography variant="body1" component="h6" className={classes.logo} >PUBLIC MESSAGES</Typography>
                    <div className={classes.flex}>
                        <SearchBar />
                        {
                        isAuthenticated ?
                        <IconButton onClick={handleClick} color="inherit"><AccountCircle /></IconButton> :
                        <IconButton onClick={handleClick} color="inherit"><MoreVertIcon /></IconButton>
                        }
                    </div>
                </Toolbar>
            </AppBar>
            {
                !isAuthenticated ? 
                    <Menu anchorEl={anchorEl} open={anchorEl ? true : false} keepMounted onClose={handleClose}>
                        <MenuItem onClick={() => handleClose("/messages")}><Link to="/messages" className={classes.link}>messages</Link></MenuItem>
                        <MenuItem onClick={() => handleClose("/")}><Link to="/" className={classes.link}>Login</Link></MenuItem>
                    </Menu> :
                    <Menu anchorEl={anchorEl} keepMounted open={anchorEl ? true : false} onClose={handleClose}>
                        <MenuItem onClick={() => handleClose("/home")}><Link to="/home" className={classes.link}>Profile</Link></MenuItem>
                        <MenuItem onClick={() => handleClose("/edit")}><Link to="/edit" className={classes.link}>Edit</Link></MenuItem>
                        <MenuItem onClick={() => handleClose("/messages")}><Link to="/messages" className={classes.link}>messages</Link></MenuItem>
                        <Divider />
                        <MenuItem  onClick={handleClose} ><Button onClick={() => logout(history)}>Logout</Button></MenuItem>
                    </Menu>
            }
        </div>
    )
}

function mapStateToProps(state){
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {logout})(withRouter(Navbar))