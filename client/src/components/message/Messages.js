import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Message from "./Message";
import CircularProgress from "@material-ui/core/CircularProgress"
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { getAllMessages } from "../../actions/messageActions";

const useStyles = makeStyles(theme => ({
    loading: {
        padding: "100px 0",
        textAlign: "center"
    }
}))

const Messages = () => {
    const classes  = useStyles();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({messages: [], count: 0});
    const getAllMessages = (skip, limit) => {
        axios.get(`/api/message/all/?skip=${skip}&limit=${limit}`)
             .then(res => {
                 if(loading) setLoading(false);
                 setData({messages: [...data.messages, ...res.data.messages], count: res.data.count});
             })
    }
    useEffect(() => {
        getAllMessages(0, 20);
    }, [])
    return (
        <React.Fragment>
            {
                loading ?
                  <div className={classes.loading}><CircularProgress color="secondary" /></div> : 
                  <div className={classes.root}>
                        <InfiniteScroll dataLength={data.messages.length} 
                        next={() => getAllMessages(data.messages.length, 20)}
                        loader={<div style={{textAlign: "center"}}><CircularProgress /></div>}
                        hasMore={data.messages.length < data.count }
                        endMessage={<p style={{textAlign: "center"}}><b>No More messages</b></p>}>
                            {
                                data.messages.map((msg, key) => <Message key={key} message={msg} />)
                            }
                        </InfiniteScroll>
                  </div>
            }
        </React.Fragment>
           
    )
}


export default Messages