import React,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button} from '@mui/material'
import {Save} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import SignIn from './SignIn';
import { postData } from '../FetchNodeServices';
import PlaceOrder from './PlaceOrder';
import thankyou from './Thankyou';



const useStyles = makeStyles({
    root:{
       display:'flex',
       justifyContent:'center',
       alignItem:'center',
       paddingTop:100

    },
    subdiv:{

        display:'flex',
        justifyContent:'center',
        alignItem:'center',
        width:600,
        marginTop:20,
        padding:20,
        background:'#ecf0f1',
        borderRadius:5
  },
    inputstyle:{
        display:'none'
    },
    center:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }
  });

export default function Login() {
    const classes = useStyles();
    let navigate = useNavigate(); 

    const navigateto = () =>{ 
      navigate('/signin');
    }

    // const navigatetoorder = () =>{ 
    //   navigate('/home');
    // }


    const[username,setusername]=useState("");
    const [password,setpassword]=useState("");

    const handleCheck = async() =>{
      var result = await postData("checkusernameandpassword",{username:username,password:password})
      
      if(result.result){
        navigate('/thankyou');

      }else{
        alert("wrong username or password")
  
        
    }
  }
  

    



  return (
<div className={classes.root} >
        <div className={classes.subdiv}>
            <Grid container spacing={2}>
            <Grid item xs={12} >
               
               <Grid container spacing={1}> 
               <Grid item xs={12}>
                <div style={{display:'flex',flexDirection:'row',textAlign:'center'}}>
                    <div style={{fontSize:20,letterSpacing:1,fontWeight:800}}>
                        Login   
                    </div>
                  </div>
                  </Grid>
                
                </Grid>


                </Grid>

                <Grid item xs={12}>
                 <TextField onChange={(e)=>setusername(e.target.value)}  fullWidth variant="outlined" label="Enter User Name"/>    
                </Grid>

                <Grid item xs={12}>
                 <TextField onChange={(e)=>setpassword(e.target.value)}  fullWidth variant="outlined" label="Enter  Password"/>    
                </Grid>
                
                <Grid style={{paddingLeft:175,paddingTop:20}}>
                  If you are not a member please 
                  <Button onClick={navigateto}>Sign In</Button>
                </Grid>


                <Grid item xs={12}>
               <Button onClick={()=>handleCheck()}  fullWidth variant="contained" startIcon={<Save />}>Log In</Button>
                    </Grid>
                   

            </Grid>
        </div>

     </div>
    )
}
