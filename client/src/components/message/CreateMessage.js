import React, {useState} from "react";
import {createMessage} from "../../actions/messageActions";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 1600,
        margin: "0 auto",
        padding: "50px 200px",
        [theme.breakpoints.down("xs")]: {
            padding: "30px 20px"
        },
        [theme.breakpoints.down("sm")]: {
            padding: "30px 30px"
        },
        [theme.breakpoints.down("md")]: {
            padding: "50px 40px"
        }
    },
    textarea: {
        backgroundColor: "transparent",
        width: "100%",
        fontSize: 18,
        resize: "none",
        border: "none",
        outline: "none",
        marginTop: 15
    },
    flex:{
        display: "flex",
        marginBottom: 15
    },
    input: {
        flexGrow: 1,
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        margin: "0 10px",
        fontSize: 18
    },
    label: {
        color: theme.palette.text.secondary
    },
    paper: {
        boxShadow: theme.shadows[2],
        padding: theme.spacing(1),
        margin: theme.spacing(2)
    },
    button: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        "&:hover": {
            backgroundColor: red[700]
        }
    }
}))

const CreateMessage = ({createMessage}) => {
    const classes = useStyles();
    const [messageData, setMessageData] = useState({body: "", reciever: ""});
    
    return (
        <div className={classes.root}>
         <Paper className={classes.paper}>
            <div className={classes.flex}>
                <p className={classes.label}>To:</p>
                <input type="text" defaultValue="all"
                onChange={e => setMessageData({...messageData, reciever: e.target.value})} 
                className={classes.input} />
            </div>
            <Divider />
            <textarea placeholder="write something..." rows="5"
            className={classes.textarea} 
            onChange={e => setMessageData({...messageData, body: e.target.value})}></textarea>
           </Paper>
           <div style={{textAlign: "center"}}>
               <Button variant="contained" onClick={() => createMessage(messageData)}
                    className={classes.button}>Create</Button>
             </div>
        </div>
    )
}

export default connect(() => ({}), {createMessage})(CreateMessage)