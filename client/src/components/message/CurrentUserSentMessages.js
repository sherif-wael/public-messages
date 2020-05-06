import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getMessagesSentByUser} from "../../actions/messageActions";
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


const CurrentUserSentMessages = ({sentMessages, loading, getMessagesSentByUser}) => {
    const classes = useStyles();
    useEffect(() => {
        getMessagesSentByUser()
    }, [])
    
    return (
        <div className={classes.root}>
            {
                loading ?
                  <div className={classes.centered}><CircularProgress color="secondary" /></div> : 
                !sentMessages.length ? 
                  <Typography variant="body1" component="p" color="textSecondary" className={classes.centered}
                  >No Messages Sent</Typography>  :
                  <div className={classes.messages}>
                      {
                          sentMessages.map((message, key) => <Message message={message} key={key}/>)
                      }
                  </div>
            }
        </div>
    )
}

function mapStateToProps(state){
    return {
        sentMessages: state.message.messages,
        loading: state.message.loading
    }
}

export default connect(mapStateToProps, {getMessagesSentByUser})(CurrentUserSentMessages)