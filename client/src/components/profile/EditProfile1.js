import React, {Fragment} from "react";
import {getCurrentProfile, editCurrentProfile} from "../../actions/profileActions";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"


const styles = {
    root: {
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    wrapper: {
        width: "300px",
        padding: "20px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
    },
    input: {
        width: "100%",
        fontSize: "18px",
        padding: "1px",
        margin: "10px 0",
        border: "none",
        borderBottom: "0.5px solid black",
        outline: "none"
    },
    button: {
        width: "100%",
        backgroundColor: red[500],
        margin: "20px 0",
        color: "white",
        fontWeight: "600"
    },
    image: {
        width: "100px",
        height: "100px",
        margin: "0 auto",
        position: "relative",
        marginBottom: "10px"
    },
    avatar: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    upload: {
        position: "absolute",
        width: "100%",
        height: "100%",
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(0,0,0,0.5)",
        zIndex: "2"
    },
    icon: {
        fontSize: "26px",
        color: "gray",
    }
}


class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            photo: "",
            name: "",
            username: ""
        };
        this.fileInput = React.createRef();
        this.choosePhoto = this.choosePhoto.bind(this);
        this.addPhoto = this.addPhoto.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }

    componentDidMount(){
        this.props.getCurrentProfile()
    }
    componentWillReceiveProps({profile}){
        this.setState({photo: profile.photo, username: profile.username, name: profile.name});
    }
    choosePhoto(){
        this.fileInput.current.click();
    }
    addPhoto(e){
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this.setState({photo: reader.result})
        })
        reader.readAsDataURL(file);
    }
    editProfile(){
        let {photo, name, username} = this.state;
        let data = {
            photo: photo || "",
            username: username || "",
            name: name || ""
        }
        this.props.getCurrentProfile(data);
    }
    render(){   
        let {loading} = this.props;
        let {photo, username, name} = this.state;
        return (
            <div style={styles.root}>
              <div>
                {
                    loading ? 
                       <CircularProgress color="secondary" />
                       : 
                       <div style={styles.wrapper}>
                           <div style={styles.image}>
                               {
                                   photo ? 
                                    <img src={photo} alt="profile img"  style={styles.avatar} /> 
                                    : 
                                    <Avatar style={styles.avatar} />
                               }
                               <Fragment>
                                   <div style={styles.upload}>
                                       <IconButton onClick={this.choosePhoto} style={styles.icon} ><AddAPhotoIcon /></IconButton>
                                       <input type="file" accept="image/*" style={{display: "none"}} 
                                       ref={this.fileInput} onChange={e => this.addPhoto(e)} />
                                   </div>
                               </Fragment>
                           </div>
                           <div>
                               <label for="" >Name:</label>
                               <input type="text" defaultValue={name} style={styles.input}
                               onChange={e => this.setState({name: e.target.value})} />
                           </div>
                           <div >
                               <label for="">Username:</label>
                               <input type="text" defaultValue={username} style={styles.input}
                               onChange={e => this.setState({username: e.target.value})} />
                           </div>
                           <Button onClick={this.editProfile} variant="contained" size="small" style={styles.button}>Edit</Button>
                       </div>
                }
              </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        loading: state.profile.loading,
        profile: state.profile.profile || {},
    }
}

export default connect(mapStateToProps, {getCurrentProfile, editCurrentProfile})(EditProfile)