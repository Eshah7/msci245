import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Alert from '@material-ui/lab/Alert';

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

const useStyles = makeStyles((theme) => ({
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
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    color: 'darkslategray',
    backgroundColor: 'aliceblue',
    padding: 8,
    borderRadius: 4,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const MainGridContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4),
}))

const Home = () => {
  const classes = useStyles();

  const [selectedMovie, setSelectMovie] = React.useState('');
  const handleSelectMovieChange = (event) => {
    setSelectMovie(event.target.value);
  };

  const [enteredTitle, setEnteredTitle] = React.useState('');
  const handleEnteredTitleChange = (event) => {
    setEnteredTitle(event.target.value);
  };

  const [enteredReview, setEnteredReview] = React.useState('');
  const handleEnteredReviewChange = (event) => {
    setEnteredReview(event.target.value);
  };

  const [selectedRating, setSelectedRating] = React.useState('');
  const handleSelectedRatingChange = (event) => {
    setSelectedRating(event.target.value);
  }

  const validationCheck = () => {
    if (enteredTitle === "") {
      alert ("Missing: Please Enter a Review Title");   
    }

    else if (enteredReview === "") {
      alert ("Missing: Please Enter a Review");
    } 

    else if (selectedRating === "") {
      alert ("Missing: Please Enter a Rating");
    } else {
      alert("Successful: Your Submission has been Recieved");
    }

  }

  return (
    <Paper
      className={classes.paper}
    >
      <Box
        sx={{
          height: '100vh',
          opacity: opacityValue,
          overflow: "hidden"
        }}
      >
        <MainGridContainer
          container
          spacing={2}
          style={{ maxWidth: '50%' }}
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Typography variant="h3" gutterBottom component="div">
            <strong>Crossover: Leave a Movie Review</strong>
          </Typography>

          <Grid>
            <Grid Item>
              <MovieSelection
                classes={classes.formControl}
                selectedMovie={selectedMovie}
                handleSelectMovieChange={handleSelectMovieChange}
              />

            </Grid>
            <Box sx={{ m: 2 }} />
            <Grid Item>
              <ReviewTitle
                classes={classes.root}
                enteredTitle={enteredTitle}
                handleEnteredTitleChange={handleEnteredTitleChange}
              />

            </Grid>
            <Box sx={{ m: 2 }} />

            <Grid Item>
              <ReviewBody
                classes={classes.root}
                enteredReview={enteredReview}
                handleEnteredReviewChange={handleEnteredReviewChange}
              />
            </Grid>
            <Box sx={{ m: 2 }} />

            <Grid Item>
              <ReviewRating
                selectedRating={selectedRating}
                handleSelectedRatingChange={handleSelectedRatingChange}
              />
            </Grid>
            <Box sx={{ m: 2 }} />

            <Grid Item>
              <Button variant="contained" color="primary" onClick = {() => { validationCheck() }}>
                Submit Review
              </Button>
            </Grid>


          </Grid>

        </MainGridContainer>

      </Box>
    </Paper>
  );
}

const MovieSelection = (props) => (
  <div>
    <FormControl className={props.classes.formControl}>
      <InputLabel id="MovieSelect">Movie Titles</InputLabel>
      <Select
        labelId="MovieSelect"
        id="MovieSelect"
        value={props.selectedMovie}
        onChange={props.handleSelectMovieChange}
      >
        <MenuItem value={1}>American Psycho</MenuItem>
        <MenuItem value={2}>In the Heights</MenuItem>
        <MenuItem value={3}>The Handmaiden</MenuItem>
        <MenuItem value={4}>Blade Runner</MenuItem>
        <MenuItem value={5}>Titane</MenuItem>

      </Select>

      <FormHelperText> Select a movie to review from the list! </FormHelperText>
    </FormControl>
  </div>
);

const ReviewTitle = (props) => (
  <div>
    <form className={props.classes.root} noValidate autoComplete="off">
      <TextField
        id="ReviewTitle"
        label="Review Title"
        variant="outlined"
        value={props.enteredTitle}
        onChange={props.handleEnteredTitleChange} />
    </form>
    <FormHelperText> Give a name to your review so others can find it! </FormHelperText>
  </div>
);

const ReviewBody = (props) => (
  <div>
    <form className={props.classes.root} noValidate autoComplete="off">
      <TextField
        id="ReviewBody"
        label="Review"
        multiline
        rows={4}
        defaultValue="Enter Review"
        variant="outlined"
        value={props.enteredReview}
        onChange={props.handleEnteredReviewChange}
        inputProps={{ maxLength: 200 }} />

    </form>
    <FormHelperText> Enter your movie review (Ex. Music, Acting, Cinematography) [Max 200 Characters] </FormHelperText>
  </div>
);

const ReviewRating = (props) => (
  <div>
    <FormControl component="fieldset">
      <FormLabel component="legend">Rate the Movie</FormLabel>
      <RadioGroup aria-label="rating" name="rating1" value={props.selectedRating} onChange={props.handleSelectedRatingChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>

      <FormHelperText> 1 being the worst, and 5 being the best movie you have ever watched! </FormHelperText>
    </FormControl>

  </div>

);




export default Home;