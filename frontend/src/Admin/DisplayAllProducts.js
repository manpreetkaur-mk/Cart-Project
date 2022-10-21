import React,{useState,useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import {Avatar, Button, Grid} from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getData } from '../FetchNodeServices';
import Product from './Product'
// import Category from './Category';
import { List } from "@mui/icons-material";




const useStyles = makeStyles({
    root:{
       display:'flex',
       justifyContent:'center',
       alignItem:'center',
       paddingBottom:50

    },
    subdiv:{

        display:'flex',
        justifyContent:'center',
        alignItem:'center',
        width:870,
        marginTop:20,
        padding:20,
        background:'#ecf0f1',
        borderRadius:5,
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
export default function DisplayAllProducts(props) {
    const classes = useStyles();

    const [list, setList] = useState([]);

  
  const fetchAllProducts = async () => {

    var result = await getData("getProduct");
    setList(result.data);
    console.log(result.data)

  };

  useEffect(function () {
    fetchAllProducts();
  }, []);



  const handleClick = () => {
    props.setComponent(<Product  setComponent={props.setComponent}/>)
   };
 

  return (
   <div className={classes.root} >
        <div className={classes.subdiv}>
            <Grid container spacing={2}>
            <Grid item xs={12} >
               
               <Grid container spacing={1}> 
               <Grid item xs={6}>
                <div style={{display:'flex',flexDirection:'row',textAlign:'center'}}>
                    <div style={{fontSize:18,letterSpacing:1,fontWeight:800}}>
                        Product List
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={6} className={classes.center}>
                    <div style={{paddingBottom:20}} >
                     <Button onClick={() => handleClick()}startIcon={<List />} variant="contained">Product List</Button>   
                     </div>   
                   </Grid>
                </Grid>


                </Grid>

                <Grid >

                <TableContainer style={{        marginLeft:20
}} component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Image</TableCell>

            <TableCell align="left">Product Name </TableCell>
            <TableCell align="left">Product Description</TableCell>
            <TableCell align="left">Price</TableCell>'            
{/* '           <TableCell align="left">Actions</TableCell> */}

            
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <TableRow
            >
             
             <TableCell align="left">
                <img style={{width:100,height:100}} src={item.image}/>
              </TableCell>
              <TableCell align="left">{item.productName}</TableCell>
              <TableCell align="left">{item.productDescription}</TableCell>
              <TableCell align="left">{item.price}</TableCell>

              
            
            {/* <TableCell  align="left">
              <Button align="left" >Edit</Button>
              <Button align="left">Delete</Button>

              </TableCell> */}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                
                </Grid>
               

              

            </Grid>
        </div>

     </div>
  )
}
