import React,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import {Save,ClearAll,List} from '@mui/icons-material';
import Swal from 'sweetalert2'
import { postDataAndImage } from '../FetchNodeServices';
import DisplayAllCategory from './DisplayAllCategory';




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
        width:800,
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
export default function Category(props) {
    const classes = useStyles();

    const [categoryName, setcategoryName] = useState("");
  
    const [image,setImage]=useState({bytes:""})

    const addCategory = async()=>{
      var formData = new FormData()
      formData.append('categoryName',categoryName)
      formData.append('image',image.bytes)
      var result=await postDataAndImage('insertCategory',formData) 

      if(result)
      {
      Swal.fire({
      
       text: 'Category Added Succesfully',
       imageUrl: "/logo.jpg",
       
       imageAlt: 'Custom image',
       icon:'success'
     })
      }
      else
      {
       Swal.fire({
          
           text: 'Fail to add category',
           imageUrl: '/logo.jpg',
            
           imageAlt: 'Custom image',
           icon:'error'
         })  
      }

    }

    


    const handleImage=(event)=>{
      console.log(event.target.files[0]);
      setImage({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  }


  return (
   <div className={classes.root} >
        <div className={classes.subdiv}>
            <Grid container spacing={2}>
            <Grid item xs={12} >
               
               <Grid container spacing={1}> 
               <Grid item xs={6}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{fontSize:18,letterSpacing:1,fontWeight:800}}>
                        Category  
                    </div>
                  </div>
                  </Grid>
                  {/* <Grid item xs={6} className={classes.center}>
                    <div>
                     <Button  startIcon={<List />} variant="contained">Category List</Button>   
                     </div>   
                   </Grid> */}
                </Grid>


                </Grid>

                <Grid item xs={12}>
                 <TextField  fullWidth variant="outlined" onChange={(event)=> setcategoryName(event.target.value)} label="Enter Category"/>    
                </Grid>
                
                <Grid item xs={6}>
                <label htmlFor="contained-button-file">
        <input onChange={(event)=>handleImage(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
        <Button   fullWidth variant="contained" component="span">
          Upload Image
        </Button>
      </label>    
                </Grid>
            <Grid item xs={6} className={classes.center} >

            <Avatar alt="Image" variant="rounded" src={image.filename}  />
                </Grid>


                <Grid item xs={12}>
               <Button fullWidth onClick={addCategory} variant="contained" startIcon={<Save />}>Save</Button>
                    </Grid>
                    {/* <Grid item xs={6}>
               <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid> */}

            </Grid>
        </div>

     </div>
  )
}
