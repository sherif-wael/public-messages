import React, {useState, useEffect} from "react";
import Login from "./Login";
import Signup from "./Signup"
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        padding: "50px 40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh"
    }
}))

const Home = ({history, isAuthenticated}) => {
    const classes = useStyles();
    const [loginForm, setLoginForm] = useState(true);
    useEffect(() => {
        if(isAuthenticated) history.push("/home")
    }, [])
    return (
        <div className={classes.root}>
            {
                loginForm ?
                <Login history={history} setLoginForm={setLoginForm} /> :
                <Signup history={history} setLoginForm={setLoginForm} />
            }
        </div>
    )
}

function mapStateToProps(state){
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Home)