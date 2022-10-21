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
import { getData,postData } from '../FetchNodeServices';
import { AddBox,  ClearAll, Edit,List } from "@mui/icons-material";
import Category from './Category';
import Swal from "sweetalert2";

const useStyles = makeStyles({
    root:{
       display:'flex',
       justifyContent:'center',
       alignItem:'center',
      //  paddingTop:30

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



export default function DisplayAllCategory(props) {
    const classes = useStyles();
    const [list, setList] = useState([]);
   
  const fetchAllCategory = async () => {
    var result = await getData("getCategory");
    setList(result.data);
    console.log(result.data)
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);


  const handleDelete = async (data) => {
    Swal.fire({
      imageUrl: "/logo.jpg",

      title: `Do you want to delete  ?`,
      showDenyButton: true,

      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result = await postData("deletecategory", {
          categoryId: data.categoryId,
        });
        if (result) {
          Swal.fire("Record Deleted Sucessfully...");
          fetchAllCategory();
        } else {
          Swal.fire("Fail to Delete Record....");
        }
      } else if (result.isDenied) {
        Swal.fire("is safe");
      }
    });
    
  };



  const handleClick = () => {
    props.setComponent(<Category  setComponent={props.setComponent}/>)
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
                        Category List
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={6} className={classes.center}>
                    <div>
                     <Button onClick={()=>handleClick()}  startIcon={<List />} variant="contained">Category List</Button>   
                     </div>   
                   </Grid>
                </Grid>


                </Grid>

                <Grid item xs={12}>

                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Category Name </TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="left">Actions</TableCell>

            
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item,key) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell align="left">{item.categoryName}</TableCell>
              
              <TableCell align="left"><img style={{width:100,height:80}} src={item.image}/>
              </TableCell>
            
            <TableCell>
              <Button >Edit</Button>
              <Button onClick={handleDelete}>Delete</Button>

              </TableCell>
              
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
