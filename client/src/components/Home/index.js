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

//Dev mode
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3029"; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

// Create a theme
const useStyles = makeStyles((theme) => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
    '& > *': {
      margin: theme.spacing(4),
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(4),
    },
    '& > * + *': {
      marginTop: theme.spacing(4),
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

// A main grid container
const MainGridContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4),
}))

// Parent Component
const Review = () => {
  const classes = useStyles();

  const [selectedMovie, setSelectMovie] = React.useState('');
  const handleSelectMovieChange = (event) => {
    setSelectMovie(event.target.value);
    setSubmission(event.target.value = false);
  };

  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [missingTitle, setMissingTitle] = React.useState('');
  const handleEnteredTitleChange = (event) => {
    setEnteredTitle(event.target.value);
    setMissingTitle(event.target.value === "");
    setSubmission(event.target.value = false);
  };


  const [enteredReview, setEnteredReview] = React.useState('');
  const [missingReview, setMissingReview] = React.useState('');
  const handleEnteredReviewChange = (event) => {
    setEnteredReview(event.target.value);
    setMissingReview(event.target.value === "");
    setSubmission(event.target.value = false);
  };

  const [selectedRating, setSelectedRating] = React.useState('');
  const [missingRating, setMissingRating] = React.useState('');
  const handleSelectedRatingChange = (event) => {
    setSelectedRating(event.target.value);
    setMissingRating(event.target.value === "");
    setSubmission(event.target.value = false);
  }

  // Handle submissions
  const [submission, setSubmission] = React.useState();
  const [submissionList, setSubmissionList] = React.useState([])

  const newReview = submissionList.concat({
    selectedMovie: selectedMovie,
    enteredTitle: enteredTitle,
    enteredReview: enteredReview,
    selectedRating: selectedRating,
  })

  // Add Reviews
  const addReviews = () => {
    setSubmissionList(newReview);

    setSelectMovie("");
    setEnteredTitle("");
    setEnteredReview("");
    setSelectedRating("");
  }

  const validationCheck = () => {
    setMissingTitle(enteredTitle === "");
    setMissingReview(enteredReview === "");
    setMissingRating(selectedRating === "");

    if (!(selectedMovie === "") && !(enteredTitle === "") && !(enteredReview === "") && !(selectedRating === "")) {
      addReviews();
      setSubmission(true);
    } else {
      setSubmission(false);
    }
  }

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    handleGetMovies();
  }, [movies]);

  const callApiGetMovies = async () => {

    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Movies List: ", body);
    return body;
  }

  const handleGetMovies = () => {
    callApiGetMovies()
      .then(res => {
        console.log("callApiGetMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetMovies parsed: ", parsed)
        setMovies(parsed);
      });
  }

  // Submit reviews into the mySQL database
  const [userID, setUserID] = React.useState(1);

  const [movieID, setMovieID] = React.useState[[]];

  const callAddReview = async () => {

    const url = serverURL + "/api/addReview";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating

      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("New Review:", body);
    return body;
  }

  const handleAddReview = () => {
    callAddReview()
      .then(res => {
        console.log("callAddReview returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callAddReview parsed: ", parsed)
      });
  }


  return (
    <Paper
      className={classes.paper}
    >
      <Box
        sx={{
          height: "100%",
          opacity: opacityValue,
          overflow: "hidden"
        }}
      >
        <MainGridContainer
          container
          style={{ maxWidth: '100%' }}
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >

          <Grid>
            <Grid Item>
              <Typography variant="h3" gutterBottom component="div">
                Crossover: Movie Review Collection
              </Typography>
            </Grid>


            <Grid Item>
              <MovieSelection
                classes={classes.formControl}
                selectedMovie={selectedMovie}
                handleSelectMovieChange={handleSelectMovieChange}
                movies={movies}
                movieID={movieID}
              />


            </Grid>
            <Box sx={{ m: 2 }} />


            <Grid Item>
              <ReviewTitle
                classes={classes.root}
                enteredTitle={enteredTitle}
                handleEnteredTitleChange={handleEnteredTitleChange}
                missingTitle={missingTitle}
              />

            </Grid>
            <Box sx={{ m: 2 }} />

            <Grid Item>
              <ReviewBody
                classes={classes.root}
                enteredReview={enteredReview}
                handleEnteredReviewChange={handleEnteredReviewChange}
                missingReview={missingReview}
              />

            </Grid>
            <Box sx={{ m: 2 }} />

            <Grid Item>
              <ReviewRating
                selectedRating={selectedRating}
                handleSelectedRatingChange={handleSelectedRatingChange}
                missingRating={missingRating}
              />

            </Grid>
            <Box sx={{ m: 2 }} />

            <Grid Item>
              <Button variant="contained" color="primary" onClick={() => { handleAddReview() }}>
                Submit Review
              </Button>

              {submission && <FormHelperText> <strong><p style={{ color: 'darkgreen' }}>Your review has been submitted!</p></strong> </FormHelperText>}
            </Grid>

            <Box sx={{ m: 4 }} />

            <Grid Item>
              <Typography variant="h4" gutterBottom component="div">
                Crossover's Movie Reviews
              </Typography>

              <ul>
                {submissionList.map(function (reviewItem) {
                  return (
                    <li>
                      <span><strong>{reviewItem.selectedMovie + " - " + reviewItem.enteredTitle}</strong></span>
                      <ul>
                        <li>
                          <span><strong> {"Review: "} </strong> {reviewItem.enteredReview} </span>
                          <li>
                            <span><strong> {"Overall Rating: "} </strong> {reviewItem.selectedRating}</span>
                          </li>
                        </li>
                      </ul>

                    </li>);
                })}
              </ul>

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

        {props.movies.map((movie) => (
          <MenuItem value={movie.name}> {movie.name} </MenuItem>
        ))}

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
    {props.missingTitle && <FormHelperText> <strong><p style={{ color: 'red' }}>Please enter your review title!</p></strong> </FormHelperText>}
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
    <FormHelperText> Enter your movie review (Ex. Music, Cinematography) [Max 200 Char.] </FormHelperText>
    {props.missingReview && <FormHelperText> <strong><p style={{ color: 'red' }}>Please enter your review!</p></strong> </FormHelperText>}
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
      {props.missingRating && <FormHelperText> <strong><p style={{ color: 'red' }}>Please select your rating!</p></strong> </FormHelperText>}
    </FormControl>

  </div>

);


export default Review;