import React, { useState } from "react";



import { Button, Avatar } from '@mui/material';

import { ShoppingCartOutlined } from '@mui/icons-material';

export default function ShoppingCartComponent(props) {
  return (
    <div>
        <div><Button onClick={() => props.handleUpdate()} sx={{ margin: 3, width: 180, background: 'grey', color: 'black' }} variant="contained" endIcon={<ShoppingCartOutlined />}>
          Add to cart
        </Button></div> :
    </div>
  )
}

/*
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

          <Avatar onClick={() => props.handleUpdate(-1)} sx={{ bgcolor: 'grey', color: 'black', fontSize: 15, fontWeight: 'bold', margin: 3 }} variant="square">
            -
          </Avatar>

          <div sx={{ display: 'flex', fontSize: 15, fontWeight: 'bold' }}>{props.qty?props.qty:0}</div>

          <Avatar onClick={() => props.handleUpdate(+1)} sx={{ bgcolor: 'grey', color: 'black', fontSize: 15, fontWeight: 'bold', margin: 3 }} variant="square">
            +
          </Avatar>

        </div>
        */