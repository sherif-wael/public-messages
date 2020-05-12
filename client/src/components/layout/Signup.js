import React, {useState} from "react";
import {connect} from "react-redux";
import {signup} from "../../actions/authActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";
import {makeStyles} from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    root: {
        width: "400px",
        boxShadow: theme.shadows[2],
        padding: "30px 10px",
        backgroundColor: "#ffffff"
    },
    button: {
        margin: "20px 0",
        width: "100%",
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        "&:hover": {
            backgroundColor: red[700]
        }
    },
    input: {
        marginBottom: 20
    },
    footer: {
        color: theme.palette.text.secondary,
        textAlign: "center"
    },
    toggler: {
        margin: "0 2px",
        color: "blue",
        cursor: "pointer"
    }
}))

const Signup = ({signup, setLoginForm, history}) => {
    const classes = useStyles();
    const [signupData, setSignupData] = useState({username: "", name: "", email: "", password: ""});

    return (
        <div className={classes.root}>
            <Typography variant="h6" component="h6">Signup Form</Typography>
            <form>
                <TextField fullWidth label="Enter name" type="text"
                onChange={e => setSignupData({...signupData, name: e.target.value})} className={classes.input} />
                <TextField fullWidth label="Enter username" type="text" 
                onChange={e => setSignupData({...signupData, username: e.target.value})} className={classes.input} />
                <TextField fullWidth label="Enter email" type="email" 
                onChange={e => setSignupData({...signupData, email: e.target.value})} className={classes.input} />
                <TextField fullWidth label="Enter Password" type="password" 
                onChange={e => setSignupData({...signupData, password: e.target.value})} className={classes.input} />
                <Button variant="contained" className={classes.button} 
                onClick={() => signup(signupData, history)}>Submit</Button>
                <Typography variant="subtitle2" className={classes.footer}>Already have an account? <span
                onClick={() => setLoginForm(true)} className={classes.toggler}>Login</span></Typography>
            </form>
        </div>
    )
}

export default connect(() => ({}), {signup})(Signup)