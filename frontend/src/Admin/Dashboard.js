import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import ListItems from './ListItems';
import Category from './Category.js'
import { useNavigate } from "react-router-dom";
import Home from '../User interface/Home';
import { Divider } from '@mui/material';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
  },
});




function DashboardContent(props) {
  const classes = useStyles();
  const [view, setView] = React.useState("");
  const setComponent = (v) => {
    setView(v)


  }


  let navigate = useNavigate();

  const navigateto = () => {
    navigate('/Home');
  }





  return (

    <Box className={classes.root}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={navigateto}
            >
              <ArrowBackIosNewTwoToneIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Pannel
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container space={1}>
          <Grid item xs={2}>
            <ListItems setComponent={setComponent} />
          </Grid>
          <Grid item xs={10}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {view}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>

  );
}

export default function Dashboard(props) {
  return <DashboardContent />;
}