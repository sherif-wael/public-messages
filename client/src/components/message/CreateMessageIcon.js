import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import red from "@material-ui/core/colors/red";
import {withRouter} from "react-router"

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        right: 30,
        bottom: 40,
        borderRadius: "50%",
        padding: theme.spacing(2),
        boxShadow: theme.shadows[1],
        cursor: "pointer",
        zIndex: "2",
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        "&:hover": {
            backgroundColor: red[700],
            boxShadow: theme.shadows[3]
        }
    }
}))

const CreateMessageIcon = ({history}) => {
    const classes = useStyles();
    return (
        <div className={classes.root} onClick={() => history.push("/createMessage")}><CreateIcon /></div>
    )
}

export default withRouter(CreateMessageIcon);