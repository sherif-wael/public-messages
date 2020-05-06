import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        margin: "5px 0",
        padding: theme.spacing(1),
        color: theme.palette.getContrastText(theme.palette.grey[900]),
        backgroundColor: theme.palette.grey[900],
        transition: theme.transitions.create("opacity", theme.transitions.duration.shorter),
        borderRadius: 5
    },
    fade: {
        opacity: 0
    },
}))

const Alert = ({msg}) => {
    const classes = useStyles();
    const [fade, setFade] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setFade(true)
        }, 1500)
    }, [])
    return(
        <div className={fade ? `${classes.root} ${classes.fade}` : `${classes.root}`}>{msg}</div>
    )
}

export default Alert