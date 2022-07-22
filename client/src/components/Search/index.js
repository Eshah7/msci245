import React from 'react';
import Link from '@material-ui/core/Link';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Paper from "@material-ui/core/Paper";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import history from '../Navigation/history';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

const serverURL = "";
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
        color: 'darkslatedgrey',
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

const Search = () => {
    const classes = useStyles();

    const [movieTitle, setMovieTitle] = React.useState('');

    const handleMovieTitleChange = (event) => {
        setMovieTitle(event.target.value);
    }

    const [actorName, setActorName] = React.useState('');

    const handleActorNameChange = (event) => {
        setActorName(event.target.value);
    }

    const [directorName, setDirectorName] = React.useState('');

    const handleDirectorNameChange = (event) => {
        setDirectorName(event.target.value);
    }

    // Return Movies
    const [movies, setMovies] = React.useState([]);

    const callApiSearchMovie = async () => {

        const url = serverURL + "/api/searchMovie";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                title: movieTitle,
                actor: actorName,
                director: directorName
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("New Search", body);
        return body;
    }

    const handleApiSearchMovie = () => {
        callApiSearchMovie()
            .then(res => {
                console.log("callApiSearchMovie returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiSearchMovie parsed: ", parsed)
                setMovies(parsed);
            })
    }

    return (

        <Paper
            className={classes.paper}
        >
            <Appbar />
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

                    <Box sx={{ m: 2 }} />

                    <Grid Item>
                        <Typography variant="h3" gutterBottom component="div">
                            Search for Movies
                        </Typography>
                    </Grid>
                    <Box sx={{ m: 2 }} />

                    <Grid Item>

                        <SearchBar
                            label="Movie Title"
                            onSearch={setMovieTitle}
                            onChange={handleMovieTitleChange}

                        />
                        <FormHelperText> Enter a movie name to find from the list! </FormHelperText>

                    </Grid>
                    <Box sx={{ m: 2 }} />
                    <Grid Item>

                        <SearchBar
                            label="Actor Full Name"
                            onSearch={setActorName}
                            onChange={handleActorNameChange}

                        />
                        <FormHelperText> Enter the Actor's first name + last name (Ex. Esha Shah) </FormHelperText>

                    </Grid>
                    <Box sx={{ m: 2 }} />
                    <Grid Item>

                        <SearchBar
                            label="Director Full Name"
                            onSearch={setDirectorName}
                            onChange={handleDirectorNameChange}

                        />
                        <FormHelperText> Enter the Director's first name + last name (Ex. Esha Shah) </FormHelperText>

                    </Grid>
                    <Box sx={{ m: 2 }} />
                    <Grid Item>
                        <Button variant="contained" color="primary" onClick={() => { handleApiSearchMovie() }}>
                            Search for Movies
                        </Button>
                    </Grid>

                    <Box sx={{ m: 2 }} />

                    <Grid Item>
                        <Typography variant="h4" gutterBottom component="div">
                            Search Results
                        </Typography>

                        <ul>
                            {movies.map(function (movie) {

                                let reviewsList = [];
                                let review = movie.review

                                if (review !== null) {
                                    reviewsList = review.split(",");
                                };

                                return (

                                    <li>
                                        <span> <strong> {"Movie Name: "} </strong> {movie.name} </span>
                                        <li>

                                            <span> <strong> {"Director Name: "} </strong> {movie.directorFullName + " "} </span>
                                            <li>
                                                <span> <strong> {"Average Rating: "} </strong> {movie.avgRating} </span>
                                                <li> <span> <strong> {"Reviews: "} </strong></span> </li>

                                            </li>
                                        </li>

                                        {reviewsList.map(function (review) {
                                            let reviewPart = review.split(":");

                                            return (


                                                <ul>
                                                    <li>
                                                        <span><strong> {"Review Title: "} </strong> {reviewPart[0]} </span>
                                                        <ul> <li> <span><strong> {"Review: "} </strong> {reviewPart[1]}</span> </li> <br></br></ul>

                                                    </li>

                                                </ul>



                                            )

                                        })}



                                    </li>

                                );



                            })}

                        </ul>

                    </Grid>


                </MainGridContainer>

            </Box>
        </Paper >
    )

}


const Appbar = (props) => (
    <div>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "aliceblue",
                            textDecoration: "none"
                        }}
                    >
                        CROSSOVER WATCHED
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button
                            onClick={() => history.push('/search')}
                            sx={{ my: 2, color: "white", display: "block" }}
                            style={{ cursor: "pointer" }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => history.push('/reviews')}
                            sx={{ my: 2, color: "white", display: "block" }}
                            style={{ cursor: "pointer" }}
                        >
                            Reviews
                        </Button>
                        <Button
                            onClick={() => history.push('/myPage')}
                            sx={{ my: 2, color: "white", display: "block" }}
                            style={{ cursor: "pointer" }}
                        >
                            My Page
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    </div>
)

const SearchBar = (props) => (


    <div>
        <TextField
            id="search"
            label={props.label}
            value={props.searchTerm}
            onChange={props.onChange}
            variant="outlined"
            autoComplete="off"
            color="primary"
        />

    </div>

)



export default Search;