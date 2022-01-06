import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { getMovies } from "../store/selectors";

const useStyles = makeStyles((theme) => ({
  banner: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    objectFit: "contain",
    height: "100vh",
  },
  fadeBottom: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background:
      "linear-gradient(180deg, transparent, rgba(33, 33, 33, 0.9), #222)",
  },
  bannerTitle: {
    width: "40%",
    paddingTop: "5em",
    paddingLeft: "3em",
    zIndex: 99,
  },
  bannerOverview: {
    width: "40%",
    paddingTop: "2em",
    paddingLeft: "3em",
    zIndex: 99,
  },
  bannerImg: {
    objectFit: "cover",
    width: "100%",
    height: "100vh",
    position: "absolute",
  },
}));

const Banner = () => {
  const classes = useStyles();
  const movies = useSelector(getMovies);

  //Numero aleatorio para banner
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const movieBanner = movies[getRandomArbitrary(1, 19)];

  return (
    <div className={classes.banner}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieBanner.backdrop_path}`}
        className={classes.bannerImg}
      />

      <Box className={classes.bannerTitle}>
        <Typography variant="h2">{movieBanner.title}</Typography>
      </Box>
      <Box className={classes.bannerOverview}>
        <Typography variant="p">{movieBanner.overview}</Typography>
      </Box>
      <Box className={classes.fadeBottom} />
    </div>
  );
};

export default Banner;
