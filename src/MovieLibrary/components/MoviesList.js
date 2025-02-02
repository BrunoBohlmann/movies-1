import React, { useState, useRef, useCallback } from "react";
import TMDBImage from "./TMDBImage";

// MUI
import { makeStyles } from "@mui/styles";
import {
  Modal,
  CardActionArea,
  Grid,
  CardContent,
  Card,
  CardMedia,
  Box,
  Typography,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

//MUI Styles
const useStyles = makeStyles({
  listTitle: {
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 10,
  },
  movieListItemContent: {
    color: "white",
    borderBottom: "1px solid white",
    "&:hover": {
      color: "red",
      border: "none",
    },
  },
  modalPoster: {
    alignSelf: "center",
    height: 225,
    width: 450,
  },
});

export default function MoviesList({ moviesArray, lastElementRef }) {
  const classes = useStyles();

  //MoviesArray state
  const [movies, setMovies] = useState(moviesArray);

  //Movie State
  const [selectedMovie, setSelectedMovie] = useState(null);

  //Sort State
  const [sortingType, setSortingType] = useState("");

  //Modal State
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Movie selected
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    handleOpen();
  };

  //Sort change
  const handleSortingChange = (event) => {
    setSortingType(event.target.value);
    setMovies(moviesSort(movies, event.target.value));
  };

  //Sort function
  const moviesSort = (movies, type) => {
    if (type === "name_asc") {
      return filterName(movies);
    } else if (type === "name_desc") {
      return filterName(movies).reverse();
    } else if (type === "rating") {
      return filterRating(movies).reverse();
    }
    return movies;
  };

  //Filter per title
  const filterName = (movies) => {
    return movies.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  };

  //Filter per rating
  const filterRating = (movies) => {
    return movies.sort((a, b) => {
      return a.vote_average - b.vote_average;
    });
  };

  return (
    <Box sx={{ paddingBottom: 5 }}>
      {/* Box para separar el modal de la list */}
      <Box sx={{ justifyItems: "center" }}>
        <Box
          sx={{
            display: "inline-block",
            marginRight: 110,
            marginLeft: 10,
            marginTop: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Movies
          </Typography>
        </Box>

        {/* Sort element*/}
        <Box
          sx={{
            display: "inline-block",
            maxWidth: 200,
          }}
        >
          <Typography
            variant="subtitle2"
            color="secondary"
            sx={{ marginLeft: 2 }}
          >
            Sort by:
          </Typography>

          <SortingOptions
            selectedOption={sortingType}
            onChange={handleSortingChange}
            moviesArray={movies}
          />
        </Box>

        {/* Titulo de lista movies */}
        <Box className={classes.listTitle}></Box>

        {/* Lista de Movies */}
        <Box sx={{ marginLeft: 7 }}>
          <Grid container spacing={0}>
            {movies?.map((movie, index) => {
              if (movies.length - 1 === index) {
                return (
                  <Grid item xs={2.3} ref={lastElementRef}>
                    <MovieListItem
                      key={movie.id}
                      movie={movie}
                      isSelected={selectedMovie === movie}
                      onSelect={handleSelectMovie}
                    />
                  </Grid>
                );
              } else {
                return (
                  <Grid item xs={2.3}>
                    <MovieListItem
                      key={movie.id}
                      movie={movie}
                      isSelected={selectedMovie === movie}
                      onSelect={handleSelectMovie}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
          <Box>
            {selectedMovie && (
              <ExpandedMovieItem
                movie={selectedMovie}
                onClose={handleClose}
                onOpen={open}
                styles={classes}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const ExpandedMovieItem = ({
  movie: {
    title,
    original_title,
    poster_path,
    overview,
    vote_average,
    vote_count,
    backdrop_path,
  },
  onClose,
  onOpen,
}) => {
  const overviewLimit = (overview, n) =>
    overview?.length > n ? `${overview.substr(0, n - 1)} ...` : `${overview}`;

  const classes = useStyles();

  function movieModal() {
    return {
      color: "white",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 600,
      height: 500,
      background: "#211E1E",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  }

  return (
    <Box>
      <Modal
        open={onOpen}
        onClose={onClose}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={movieModal}>
          {/* Img, title and overview */}
          <TMDBImage src={backdrop_path} className={classes.modalPoster} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {title}
          </Typography>
          <Typography sx={{ mt: 2 }}>{overviewLimit(overview, 150)}</Typography>

          {/* Votes */}
          <Box sx={{ marginTop: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ display: "inline", marginRight: 1.5 }}
            >
              Votes: {vote_count}
            </Typography>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              Average: {vote_average}
            </Typography>
          </Box>
          {/* Icons */}
          <Box sx={{ marginTop: 1.3 }}>
            <FavoriteIcon sx={{ marginRight: 2 }} />
            <ThumbUpIcon sx={{ marginRight: 2 }} />
            <ThumbDownIcon />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

function MovieListItem({ movie, onSelect }) {
  const classes = useStyles();

  const handleClick = () => onSelect(movie);

  const { title, poster_path, vote_average } = movie;

  return (
    <Card
      sx={{
        maxWidth: 200,
        margin: "10px",
        maxHeight: 310,
        backgroundColor: "#212121",
        borderRadius: 1,
        boxShadow: "0px 20px 25px -10px rgba(0,0,0, 1)",
      }}
      className={classes.movieListItem}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="250"
          image={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
        <CardContent className={classes.movieListItemContent}>
          <Typography variant="subtitle2" component="div">
            {vote_average}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function SortingOptions({ selectedOption, onChange }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 150, height: 30 }}>
      <Select
        sx={{ backgroundColor: "#212121", color: "white", height: 40 }}
        value={selectedOption}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="name_asc">A to Z</MenuItem>
        <MenuItem value="name_desc">Z to A</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
      </Select>
    </FormControl>
  );
}
