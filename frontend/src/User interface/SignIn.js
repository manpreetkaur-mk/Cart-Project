import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar } from '@mui/material'
import { Save, ClearAll, List, FitScreen } from '@mui/icons-material';
import Swal from 'sweetalert2'
import { postData, postDataAndImage } from '../FetchNodeServices';
import Thankyou from './Thankyou';
import { useNavigate } from "react-router-dom";
import Login from '../User interface/Login';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    paddingTop: 100

  },
  subdiv: {

    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    width: 800,
    marginTop: 20,
    padding: 20,
    background: '#ecf0f1',
    borderRadius: 5
  },
  inputstyle: {
    display: 'none'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default function SignIn(props) {
  const classes = useStyles();

  // const [categoryName, setcategoryName] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const addUser = async () => {
    var formData = new FormData()
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('username', username)
    formData.append('password', password)

    var result = await postDataAndImage('insertUser', formData)

    if (result) {
      Swal.fire({

        text: 'User Added Succesfully',
        imageUrl: "/logo.jpg",

        imageAlt: 'Custom image',
        icon: 'success'
      })
    }
    else {
      Swal.fire({

        text: 'Fail to add category',
        imageUrl: '/logo.jpg',

        imageAlt: 'Custom image',
        icon: 'error'
      })
    }

  }

  let navigate = useNavigate();

  const navigateto = () => {
    navigate('/login');
  }

  const navigatetothankyou = () => {
    navigate('/thankyou');
  }

  const handleCheckUser = async() =>{
    var result = await postData("checkusername",{username:username})
    if(result.result){
alert("exsisting user name")
    }else{

      var formData = new FormData()
      formData.append('firstname', firstname)
      formData.append('lastname', lastname)
      formData.append('username', username)
      formData.append('password', password)
  
      var result = await postDataAndImage('insertUser', formData)
  
      if (result) {
        Swal.fire({
  
          text: 'User Added Succesfully',
          imageUrl: "/logo.jpg",
  
          imageAlt: 'Custom image',
          icon: 'success'
        })
      }
      else {
        Swal.fire({
  
          text: 'Fail to add category',
          imageUrl: '/logo.jpg',
  
          imageAlt: 'Custom image',
          icon: 'error'
        })
      }
  
    }

  }

  const myfunction=()=>{
    handleCheckUser();
    addUser();
    navigatetothankyou();
  }




  return (
    <div className={classes.root} >
      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid item xs={12} >

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ fontSize: 18, letterSpacing: 1, fontWeight: 800 }}>
                    Sign In
                  </div>
                </div>
              </Grid>

            </Grid>


          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" onChange={(event) => setfirstname(event.target.value)} label="Enter First Name" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" onChange={(event) => setlastname(event.target.value)} label="Enter Last Name" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" onChange={(event) => setusername(event.target.value)} label="Enter UserName" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" onChange={(event) => setpassword(event.target.value)} label="Enter Password" />
          </Grid>
          <Grid style={{ paddingLeft: 225, paddingTop: 20 }}>
            If you are already a member please
            <Button onClick={navigateto}>Log In</Button>
          </Grid>




          <Grid item xs={12}>
            <Button fullWidth onClick={handleCheckUser} variant="contained" startIcon={<Save />}>Sign In</Button>
          </Grid>
          {/* <Grid item xs={6}>
               <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid> */}

        </Grid>
      </div>

    </div>
  )
}
