import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';


//Dev mode
const serverURL = "http://ov-research-4.uwaterloo.ca:3029"; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#ffffff"
    },
    primary: {
      main: '#ef9a9a',
      light: '#ffcccb',
      dark: '#ba6b6c',
      background: '#eeeeee'
    },
    secondary: {
      main: "#b71c1c",
      light: '#f05545',
      dark: '#7f0000'
    },
  },
});

const MoviePaper = styled(Paper)(({ theme }) => ({
  opacity: 0.7,
  backgroundColor: theme.palette.primary.background,
  padding: 8,
  borderRadius: 4,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const MainGridContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4),
}))

const Home = () => {



  return (
    <ThemeProvider theme={lightTheme}>
      <Box>
        <MainGridContainer
          container
          spacing={1}
          style={{ maxWidth: '50%' }}
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Typography variant="h3" gutterBottom component="div">
            Movie Reviews
          </Typography>

        

        </MainGridContainer>
      </Box>
    </ThemeProvider>
  );
}

/*const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#000000"
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
    '& > *': {
      margin: theme.spacing(3),
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    color: 'white',
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});*/




export default withStyles(styles)(Home);
