import React, {useState, useEffect, useRef} from "react";
import {getCurrentProfile, editCurrentProfile} from "../../actions/profileActions";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CircularProgress  from "@material-ui/core/CircularProgress";
import red from "@material-ui/core/colors/red";
import isEmpty from "../../utils/isEmpty";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh"
    },
    box: {
        width: 350,
        boxShadow: theme.shadows[2],
        backgroundColor: "#ffffff",
        padding: theme.spacing(2)
    },
    input: {
        width: "100%",
        marginBottom: theme.spacing(4),
        border: "none",
        borderBottom: "0.5px solid black",
        paddingBottom: theme.spacing(1),
        fontSize: 16,
        outline: "none"
    },
    button: {
        width: "100%",
        backgroundColor: red[500],
        color: theme.palette.getContrastText(red[500]),
        "&:hover": {
            backgroundColor: red[700]
        }
    },
    photo: {
        position: "relative",
        width: 100,
        height: 100,
        margin: "0 auto",
        marginBottom: theme.spacing(2)
    },
    img: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    p: {
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 500,
        color: "gray",
        padding: 0,
        margin: 0
    },
    iconButton: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        borderRadius: 0,
        backgroundColor: theme.palette.grey[100],
    },
    icon: {
        color: theme.palette.getContrastText(theme.palette.grey[100]),
        fontSize: 28
    }
}))

const EditProfile = ({getCurrentProfile, profile, loading, editCurrentProfile}) => {
    const classes = useStyles(); 
    const fileInput = useRef(null);
    const [data, setData] = useState({photo: profile.photo ? profile.photo : "", username: profile.username, name: profile.name});
    console.log(data)
    useEffect(() => {
        getCurrentProfile();
    }, [])
    if(loading || isEmpty(profile)){    
        return <CircularProgress color="secondary"/>
    }
    const setPhoto = e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            setData({...data, photo: reader.result})
        })
        reader.readAsDataURL(file)
    }
    const uploadPhoto = () => {
       fileInput.current.click();
    }
    return (
        <div className={classes.root}>
                  <div className={classes.box}>
                      <div className={classes.photo}>
                          <input type="file" accept="image/*" onChange={e => setPhoto(e)} style={{display: "none"}} ref={fileInput} />
                          <IconButton onClick={uploadPhoto} className={classes.iconButton}><AddAPhotoIcon className={classes.icon}/></IconButton>
                          {
                              data.photo ? 
                                <img src={data.photo} alt="profile photo" className={classes.img}/> : 
                                <p className={classes.p}>{data.name[0]}</p>
                          }
                      </div>
                      <input type="text" value={data.name} placeholder="Name" className={classes.input} 
                      onChange={e => setData({...data, name: e.target.value})} />
                      <input type="text" value={data.username} placeholder="Username" className={classes.input} 
                      onChange={e => setData({...data, username: e.target.value})} />
                      <Button onClick={() => editCurrentProfile(data)} className={classes.button}>Edit</Button>  
                  </div>  
        </div>
    )
}

function mapStateToProps(state){
    return {
        profile: state.profile.profile || {},
        loading: state.profile.loading
    }
}

export default connect(mapStateToProps, {getCurrentProfile, editCurrentProfile})(EditProfile)