import React, {useState} from "react";
import {connect} from "react-redux"
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"
import {makeStyles} from "@material-ui/core/styles";
import {login} from "../../actions/authActions";
import FacebookIcon from '@material-ui/icons/Facebook';
import Divider from "@material-ui/core/Divider";
import red from "@material-ui/core/colors/red";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        width: "400px",
        boxShadow: theme.shadows[2],
        padding: "30px 50px",
        backgroundColor: "#ffffff"
    },
    input: {
         width: "100%",
         marginBottom: 20
    },
    button: {
        width: "100%",
        margin: "10px 0 20px",
        backgroundColor: red[500],
        color: theme.palette.getContrastText(red[500]),
        "&:hover": {
            backgroundColor: red[700]
        }
    },
    fbLink: {
        width: "100%",
        padding: "10px",
        margin: "20px 0",
        fontSize: 14
    },
    fbIcon: {
        margin: "0 4px",
    },
    footer: {
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    toggler: {
        color: "blue",
        margin: "0 2px",
        cursor: "pointer"
    }
}))

const Login = ({login, history, setLoginForm}) => {
    const classes = useStyles();
    const [loginData, setLoginData] = useState({email: "", password: ""});
    return (
        <div className={classes.root}>
            {/* <a href="http://localhost:3000/api/auth/facebook">click</a> */}
            <Typography variant="h6" component="h6">Login Form</Typography>
            <form className={classes.form}>
                <TextField  onChange={e => setLoginData({...loginData, email: e.target.value})} label="Enter Email" className={classes.input} type="text"/>
                <TextField  onChange={e => setLoginData({...loginData, password: e.target.value})} label="Enter Password" className={classes.input} type="password"/>
                <Button variant="contained" onClick={() => login(loginData, history)} className={classes.button}>Submit</Button>
            </form>
            <Divider />
            <Button color="primary" variant="contained"  onClick={() => window.location = "https://public-messages.com/api/auth/facebook"} className={classes.fbLink}><FacebookIcon className={classes.fbIcon} /> Login With Facebook</Button>
            <Typography variant="subtitle2" component="p" className={classes.footer}>Don't have an account? 
                       <span className={classes.toggler} onClick={() => setLoginForm(false)}>create account</span></Typography>
        </div>
    )
}

export default connect(() => ({}), {login})(Login)