import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DisplayAllCategory from './DisplayAllCategory';
import { useNavigate } from 'react-router-dom';
import DisplayAllProduct from './DisplayAllProducts'
import OrderSummary from './OrderSummary';
import Category from './Category';

export default function ListItems(props) {

  const navigate = useNavigate();



  const handleClick=(view)=>{
    props.setComponent(view)
      }
  return(
    <div>

  
     <ListItem button >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
<ListItemText primary="Category" onClick={()=>handleClick(<DisplayAllCategory  setComponent={props.setComponent}/>)}>Category</ListItemText>    
</ListItem>

<ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
<ListItemText primary="Product" onClick={()=>handleClick(<DisplayAllProduct  setComponent={props.setComponent}/>)}>Product</ListItemText>    
</ListItem>

{/* <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
<ListItemText primary="Order summary" onClick={()=>handleClick(<OrderSummary  setComponent={props.setComponent}/>)} >Order Summary</ListItemText>    
</ListItem> */}


  

  </div>
 
);
  }