import React,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import {Save,ClearAll,List} from '@mui/icons-material';
import Swal from 'sweetalert2'
import {useSelector,useDispatch} from "react-redux"
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const useStyles = makeStyles({
    root:{
       display:'flex',
       justifyContent:'center',
       alignItem:'center',
       paddingTop:50,
       paddingLeft:60,
       paddingRight:90

    },
    subdiv:{

        display:'flex',
        justifyContent:'center',
        alignItem:'center',
        width:500,
        height:550,
        marginTop:20,
        padding:20,
        background:'#ecf0f1',
        borderRadius:5
  },
  roottwo:{
    display:'flex',
    justifyContent:'center',
    alignItem:'center',
    paddingTop:50,
    paddingRight:90

 },
 subdivtwo:{

     display:'flex',
     justifyContent:'center',
     alignItem:'center',
     width:400,
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
export default function PlaceOrder(props) {
    const classes = useStyles();

    var user=useSelector(state=>state.user)
    // var userData=Object.values(user)[0]
    var cart=useSelector(state=>state.cart)
    // console.log(cart)

    var keys=Object.keys(cart)

    var cartitems=Object.values(cart)
    console.log("cart items ->>>>>>>>>>>>>>>>>>",cartitems)



    var totalamount = cartitems.reduce((a,b)=>getTotalAmount(a,b),0)
    function getTotalAmount(p1,p2){
     var price=p2.offerprice>0?p2.offerprice*p2.qty:p2.price*p2.qty
     return(price+p1)
    }

    const showList=()=>{
      return (
        <Grid item xs={12} style={{ background: '#fff', borderRadius: 10, marginTop: 30, width: '80%', padding: 10 }}>
                       
                       <div style={{padding:10,display:'flex',alignItems:'center'}}>
      <span style={{fontWeight:'bold',fontSize:18}}>Cart Items({keys.length})</span>
      <span style={{fontWeight:'bold',fontSize:18,marginLeft:'auto'}}>Total: &#8377;{totalamount}</span> 
    </div>
    <List>
      {cartitems.map((item, index) => (
        <ListItem button >
          <ListItemIcon>
           <img  alt="category"  src={item.image} style={{width:80,borderRadius:10}} />
          </ListItemIcon>
          <div style={{width:'60%', display:'flex',flexDirection:'column',padding:5}}>
          <ListItemText primary={item.productname}  style={{fontWeight:'bold'}} />
          <ListItemText primary= {item.offerprice > 0 ? (
                <div
                  style={{ fontSize: 18, fontWeight: "500", letterSpacing: 1 }}
                >
                  <s
                    style={{
                      color: "#353b48",
                      fontSize: 14,
                      fontWeight: "500",
                      letterSpacing: 1,
                    }}
                  >
                    &#8377; {item.price}  
                  </s>{" "}
                 
                 
                  &#8377;{item.offerprice} x {item.qty}
                  <div
                    style={{
                      
                      display:'flex',
                      color: "darkgreen",
                      fontSize: 18,
                      fontWeight: "500",
                      letterSpacing: 1,
                    }}
                  >
                    You Save &#8377; {(item.price - item.offerprice)*item.qty} 
                   <span style={{marginLeft:'auto'}}>
                   &#8377;{item.offerprice * item.qty}
                   </span>
                
                  </div>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      width:280,
                      fontSize: 18,
                      fontWeight: "bold",
                      letterSpacing: 2,
                    }}
                  >
                    &#8377;{item.price} x {item.qty}
                  </div>
                  <div
                    style={{
                      display:'flex',
                     
                      color: "darkgreen",
                      fontSize: 18,
                      fontWeight: "500",
                      letterSpacing: 1,
                    }}
                  >
                    &nbsp;
                    <span style={{marginLeft:'auto'}}>
                   &#8377;{item.price * item.qty}
                   </span>
                  </div>
                  
                </>
              )}  />
           </div>
           
        </ListItem>
      ))}
    </List>
    
                        </Grid>
  
      )
    }

  return (
   <div style={{display:'flex',justifyContent:'column'}}>
     <div className={classes.root} >
      <div>
   
      </div>
        <div className={classes.subdiv}>
            <Grid container spacing={2}>
            <Grid item xs={12} >
               
               <Grid container spacing={1}> 
               <Grid item xs={6}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{fontSize:18,letterSpacing:1,fontWeight:800}}>
                        Shipping Details  
                    </div>
                  </div>
                  </Grid>
                
                </Grid>


                </Grid>

                <Grid item xs={12}>
                 <TextField  fullWidth variant="outlined"  label="Enter First Name"/>    
                </Grid>

                <Grid item xs={12}>
                 <TextField  fullWidth variant="outlined"  label="Enter Last Name"/>    
                </Grid>
                <Grid item xs={6}>
                 <TextField  fullWidth variant="outlined"  label="Enter Country"/>    
                </Grid>
           
                <Grid item xs={6}>
                 <TextField  fullWidth variant="outlined"  label="Enter State"/>    
                </Grid>
                <Grid item xs={6}>
                 <TextField  fullWidth variant="outlined"  label="Enter City"/>    
                </Grid>
           
                <Grid item xs={6}>
                 <TextField  fullWidth variant="outlined"  label="Enter pincode"/>    
                </Grid>
                <Grid item xs={12}>
                 <TextField  fullWidth variant="outlined"  label="Enter address"/>    
                </Grid>
                
              
           


                {/* <Grid item xs={12}>
               <Button fullWidth variant="contained" startIcon={<Save />}>Save</Button>
                    </Grid> */}
                    

            </Grid>
        </div>

     </div>
     <div className={classes.roottwo} >
        <div className={classes.subdivtwo}>
            <Grid container spacing={2}>
            <Grid item xs={12} >
               
               <Grid container spacing={1}> 
               <Grid item xs={6}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{fontSize:18,letterSpacing:1,fontWeight:800}}>
                        Your Products 😇
                    </div>

                    <div>
              {showList()}
                </div>
                  </div>
                
                  </Grid>
                 
                </Grid>

                <Grid style={{paddingTop:350}} item xs={12}>
               <Button fullWidth variant="contained" startIcon={<Save />}>Proceed to Checkout</Button>
                    </Grid>
                </Grid>

                
                <Grid>

               


{/* {showList()} */}



                </Grid>

             
            

            </Grid>
        </div>

     </div>
       
   </div>
  )
}
