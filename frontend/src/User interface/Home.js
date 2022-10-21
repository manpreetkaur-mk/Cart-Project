import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {Grid,TextField,FormControl} from '@mui/material'
import Swal from 'sweetalert2'

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { getData ,postDataAndImage} from '../FetchNodeServices';
import { Button } from '@mui/material';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import Paper from '@mui/material/Paper';
import ShoppingCartComponent from './ShoppingCartComponent';
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import {makeStyles,} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Avatar } from '@mui/material';



/////////////////////////////////////////////



const drawerWidth = 240;
const drawerWidthtwo = 700;

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    paddingTop: 65,
    width: 250,
    height: "100%"
  },
  avatar: {
    margin: "0.5rem auto",
    padding: "1rem",
    width: theme.spacing(13),
    height: theme.spacing(13)
  },
  listItem: {
    color: "tan"
  },
  root:{
    display:'flex',
    justifyContent:'center',
    alignItem:'center',
    paddingTop:50,
    paddingLeft:60,
    paddingRight:90,
    paddingBottom:90

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
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function Home(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [opent, setOpent] = React.useState(false);
  const [page_to_display, setPageToDisplay] = React.useState('Women');
  // const [isLoaded, setIsLoaded] = React.useState(false);

  const [qty, setQty] = useState(0);
  var dispatch = useDispatch();

  const [categoryList, setCategoryList] = useState([]);
  const [all_products, setAllProducts] = useState([]);

  let navigate = useNavigate();
  const classes = useStyles();

 
  const navigateto =()=>{
    navigate('/dashboard')
  }

  const navigatetoProceed =()=>{
    navigate('/signin')
  }

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const toggleSlider = () => {
    setOpent(!opent);
  };

  const fetchAllItem = async () => {
    var result = await getData("getProductbyId");
    // console.log("RESULT", result);
    setCategoryList(Object.keys(result));
    setAllProducts(result);
    // setIsLoaded(true);
  };

  useEffect(function () {
      fetchAllItem();


  }, []);

  var cart = useSelector(state => state.cart)
  var cartitems = Object.values(cart);
  // console.log("CARTT-->", cartitems);



  var totalamount = cartitems.reduce((a, b) => getTotalAmount(a, b), 0)
  function getTotalAmount(p1, p2) {
    var price = p2.offerprice > 0 ? p2.offerprice * p2.qty : p2.price * p2.qty
    return (price + p1)
  }



  const sideList = () => (
    <Box sx={{width:drawerWidthtwo}} className={classes.menuSliderContainer} component="div">
             <div style={{textAlign:'center',fontWeight:'bold',fontSize:32}}> YOUR CART </div>

      <List>
      {cartitems.map((item, index) => (
       

        <ListItem>

          <List style={{display:'flex',flexDirection:'row'}}>
        
            <ListItem>
              <img style={{width:100}} src={item.image}/>
            </ListItem>
            <ListItem style={{fontWeight:'bold'}}>
            {item.productName}
            </ListItem>
            <ListItem >
            {item.price}  
            x
             {item.qty}
            </ListItem>
            <ListItem>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

          <Avatar onClick={() => handleQtyChange(item, -1)} sx={{ bgcolor: 'grey', color: 'black', fontSize: 15, fontWeight: 'bold', margin: 3 }} variant="square">     -
   </Avatar>
   <div sx={{ display: 'flex', fontSize: 15, fontWeight: 'bold' }}>{item.qty}</div>

           <Avatar onClick={() => handleQtyChange(item, +1)} sx={{ bgcolor: 'grey', color: 'black', fontSize: 15, fontWeight: 'bold', margin: 3 }} variant="square">
     +
   </Avatar>
   </div>

            </ListItem>
            <ListItem style={{fontWeight:'bold'}}>
            {item.price * item.qty}
            </ListItem>
          </List>
        </ListItem>
      ))}
    </List>


    <Divider />
  
  <div style={{paddingLeft:200,display:'flex',alignItems:'center',width:380,paddingTop:50}}>
    <span style={{fontWeight:'bold',fontSize:18}}>Net Amount:</span>
    <span style={{fontWeight:'bold',fontSize:18,marginLeft:'auto'}}>&#8377;{totalamount}
</span> 
  </div>



  <div className={classes.root} >
     
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
                
              
           
                <Grid xs={12} style={{padding:10,alignItems:'center'}}>
    <Button  onClick={()=>navigatetoProceed()} variant="contained" fullWidth style={{background:'black',color:'#FFF',fontWeight:'bold',fontSize:18}}>Proceed</Button>
  </Grid>

                {/* <Grid item xs={12}>
               <Button fullWidth variant="contained" startIcon={<Save />}>Save</Button>
                    </Grid> */}
                    

            </Grid>
        </div>
  </div>
    </Box>
  );

  const showCategories = () => {
    return categoryList.map((item) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <br /> <Button onClick={() => setPageToDisplay(item)} fullWidth style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{item}</Button>
          <br />
        </div>
      )
    })
  }

  const handleQtyChange = (ele, op) => {
    let cart_items = [...cartitems]
    let index = cart_items.findIndex(element => element.productid === ele.productid);
    if(index > -1)
    {
      cart_items[index].qty =  cart_items[index].qty + (op?op:1);
      if(cart_items[index].qty < 1)
        cart_items.splice(index, 1);
    }
    else
      cart_items.push(ele);

    dispatch({ type: "UPDATE_ITEM", payload: cart_items});
  }


  
  const showProduct = (items) => {
    return items.map((item) => {
      return (
        <div >
         <Card sx={{ maxWidth: 250 }}>
            <CardHeader style={{ textAlign: 'center' }}
              title={item.productName} />
            {/* <img src={item.image}/> */}
            <CardMedia
              component="img"
              height="194"
              image={item.image}

            />
            <Typography style={{ textAlign: 'center', marginTop: 10 }}>Price : {item.price}</Typography>
            <Typography style={{ textAlign: 'center', marginTop: 10 }}> Description : {item.productDescription}</Typography>
            <CardActions style={{  }} disableSpacing>
              <ShoppingCartComponent
                {...item}
                handleUpdate={() => handleQtyChange(item)}
              />
            </CardActions>
          </Card>

          {/* <Grid container style={{width:"100%",marginTop:23}} >
          <Grid style={{ display: 'flex',width:'100%',marginRight:"17%"}}>

            <FormControl style={{ fontFamily: 'Red Hat Display', fontWeight: 400, fontSize: 14, color: '#00003F',width:"100%"}}>
            First name
            <TextField style={{ marginTop: 4 }} placeholder='Enter Email ID'></TextField>
          </FormControl>            

            <FormControl style={{ fontFamily: 'Red Hat Display', fontWeight: 400, fontSize: 14, color: '#00003F',marginLeft:'4%',width:"100%" }}>
            Last name
            <TextField style={{ marginTop: 4}} placeholder='Enter Email ID'></TextField>
          </FormControl> 
         

          </Grid>
        </Grid> */}
          <br />
          <br />
        </div>
      )
    })
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar sx={{backgroundColor:'#34D48F',color:'black'}} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          🍉 Fresh Food & Fare
          </Typography> 

          <Button style={{
            position: 'absolute',
            left: '80%',
            bottom: '20%',
            color: 'black'
          }}
            onClick={navigateto}
          >
            Admin Pannel
          </Button>

          <ShoppingCartSharpIcon style={{
            position: 'absolute',
            left: '95%',
            bottom: '30%'
          }} onClick={toggleSlider}
          >

          </ShoppingCartSharpIcon>


          <Drawer open={opent} anchor="right" onClose={toggleSlider}>
            {sideList()}
          </Drawer>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}

        <List>
          {showCategories()}
          <Divider />
        </List>

      </Drawer>

      <Main open={open}>
        <DrawerHeader />
       


        {showProduct([...all_products[page_to_display]])}


      </Main>
    </Box>
  );
}

