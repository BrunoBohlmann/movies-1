import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedMovies } from "../store/actions";
import { getMovies } from "../store/selectors";
import MoviesList from "./MoviesList";
import NavBar from "./NavBar";
import { makeStyles } from "@mui/styles";

const Banner = lazy(() => import("./Banner"));

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "black",
    color: "white",
  },
}));

export default function MovieLibrary() {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, []);

  const movies = useSelector(getMovies);

  return (
    <div className={classes.root}>
      <NavBar />
      <Suspense fallback={<h2>Loading</h2>}>
        <Banner />
      </Suspense>
      <div>{movies.length && <MoviesList movies={movies} />}</div>
    </div>
  );
}
