import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getMessagesRecievedByUser} from "../../actions/messageActions";
import {makeStyles} from "@material-ui/core/styles";
import Message from "./Message";
import CircularProgress from "@material-ui/core/CircularProgress"
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 200,
        position: "relative"
    },
    centered: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
}))


const CurrentUserRecievedMessage = ({recievedMessages, loading, getMessagesRecievedByUser}) => {
    const classes = useStyles();
    useEffect(() => {
        getMessagesRecievedByUser()
    }, [])
    
    return (
        <div className={classes.root}>
            {
                loading ?
                  <div className={classes.centered}><CircularProgress color="secondary"/></div> : 
                !recievedMessages.length ? 
                <Typography variant="body1" component="p" color="textSecondary" className={classes.centered}
                >No Messages Recieved</Typography> :
                  <div className={classes.messages}>
                      {
                          recievedMessages.map((message, key) => <Message message={message} key={key}/>)
                      }
                  </div>
            }
        </div>
    )
}

function mapStateToProps(state){
    return {
        recievedMessages: state.message.messages,
        loading: state.message.loading
    }
}

export default connect(mapStateToProps, {getMessagesRecievedByUser})(CurrentUserRecievedMessage)