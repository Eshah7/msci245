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

const MyPage = () => {
    const classes = useStyles();

    const [movieTitle, setMovieTitle] = React.useState('');

    const handleMovieTitleChange = (event) => {
        setMovieTitle(event.target.value);
    }

    const [youtubeID, setYoutubeID] = React.useState("");

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


                    <Grid Item>

                        <Typography variant="h3" gutterBottom component="div">
                            Movie Trailers
                        </Typography>

                    </Grid>

                    <Box sx={{ m: 1 }} />

                    <Grid Item>

                        <SearchBar
                            label="Movie Title"
                            onSearch={setMovieTitle}
                            onChange={handleMovieTitleChange}

                        />
                        <FormHelperText> Enter a movie name to watch its trailer! (Ex. 12 Angry Men) </FormHelperText>

                    </Grid>

                   

                    <Box sx={{ m: 2 }} />
                    <Grid Item>
                        <Button variant="contained" color="primary">
                            Search Trailers
                        </Button>
                    </Grid>

                    <Box sx={{ m: 3 }} />

                    <Grid Item>
                        <YoutubeVideo embedId="oR_e9y-bka0" />
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

const YoutubeVideo = (props) => (
    <div className="video-responsive">
        <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${props.embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
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

export default MyPage;