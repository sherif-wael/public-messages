import React from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "./Alert";

const useStyles = makeStyles(theme => ({
    root:{
        position: "absolute",
        top: 50,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
    }
}))
const AlertWrapper = ({alerts}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                alerts.map((alert, i) => <Alert key={i} msg={alert.msg} />)
            }
        </div>
    )
}

function mapStateToProps(state){
    return {
        alerts: state.alert
    }
}

export default connect(mapStateToProps)(AlertWrapper)