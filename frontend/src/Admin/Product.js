import React,{useState,useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import {Save,ClearAll,List} from '@mui/icons-material';
import Swal from 'sweetalert2'
import { postDataAndImage,getData } from '../FetchNodeServices';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



const useStyles = makeStyles({
    root:{
       display:'flex',
       justifyContent:'center',
       alignItem:'center',

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
export default function Product(props) {
    const classes = useStyles();

    const [categoryId, setcategoryId] = useState("");
    const [productName, setproductName] = useState("");
    const [productDescription, setproductDescription] = useState("");
    const [price, setprice] = useState(0);
    const [image,setImage]=useState({bytes:""})
    const [listCategory,setListCategory]=useState([])


    const addProduct = async()=>{
      var formData = new FormData()
      formData.append('categoryId',categoryId)
      formData.append('productName',productName)
      formData.append('productDescription',productDescription)
      formData.append('price',price)
      formData.append('image',image.bytes)
      var result=await postDataAndImage('insertProduct',formData) 

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

  const fetchAllCategories=async()=>{
    var result=await getData('getCategory')
    setListCategory(result.data)
   }

   useEffect(function()
   {
     fetchAllCategories()
    
   },[])

  const handleCategoryChange=(event)=>{
    setcategoryId(event.target.value)
  }

  const fillCategory=()=>{
    return listCategory.map((item)=>{
      return <MenuItem value={item.categoryId}>{item.categoryName}</MenuItem>
    })
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
                        Product  
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

                <Grid item xs={6}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryId}
          label="Category Id"
          onChange={(event)=>handleCategoryChange(event)}
        >
          {fillCategory()}
        </Select>
      </FormControl>
            </Grid>

                <Grid item xs={12}>
                 <TextField  fullWidth variant="outlined" onChange={(event)=> setproductName(event.target.value)} label="Enter Product Name"/>    
                </Grid>
                <Grid item xs={12}>
                 <TextField  fullWidth variant="outlined" onChange={(event)=> setproductDescription(event.target.value)} label="Enter Product Description"/>    
                </Grid>
                <Grid item xs={12}>
                 <TextField  fullWidth variant="outlined" onChange={(event)=> setprice(event.target.value)} label="Enter Price"/>    
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
               <Button fullWidth onClick={addProduct} variant="contained" startIcon={<Save />}>Save</Button>
                    </Grid>
                    {/* <Grid item xs={6}>
               <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid> */}

            </Grid>
        </div>

     </div>
  )
}
