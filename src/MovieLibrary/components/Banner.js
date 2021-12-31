import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedMovies } from "../store/actions";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { lightBlue } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  banner: {
    position: "relative",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.6)",
  },
  fadeBottom: {
    position: "absolute",
    top: "40vh",
    bottom: 0,
    left: 0,
    right: 0,
    background:
      "linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.6), #111)",
  },
  bannerTitle: {
    width: "40%",
    paddingTop: "4em",
    paddingLeft: "3em",
  },
  bannerOverview: {
    width: "40%",
    paddingTop: "4em",
    paddingLeft: "3em",
  },
}));

const Banner = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles(props);

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, []);

  //Numero aleatorio para banner
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const movieBanner = useSelector(
    (state) => state.movies[getRandomArbitrary(1, 19)]
  );

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieBanner.backdrop_path})`,
      }}
      className={classes.banner}
    >
      <Box className={classes.fadeBottom} />
      <Box className={classes.bannerTitle}>
        <Typography variant="h2">{movieBanner.title}</Typography>
      </Box>
      <Box className={classes.bannerOverview}>
        <Typography variant="p">{movieBanner.overview}</Typography>
      </Box>
    </div>
  );
};

export default Banner;
