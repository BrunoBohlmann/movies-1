import React, { useEffect, Suspense, lazy, useState, useRef } from "react";
import NavBar from "./NavBar";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedMovies } from "../store/actions";
import { getMovies } from "../store/selectors";
const Banner = lazy(() => import("./Banner"));
import MoviesList from "./MoviesList";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#212121",
    color: "white",
  },
}));

export default function MovieLibrary() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const totalPages = 1000;
  const moviesArray = useSelector(getMovies);

  const [loading, setLoading] = useState(true);
  const [allMovies, setAllMovies] = useState(moviesArray);
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  //UseEffect de inicio
  useEffect(() => {
    dispatch(fetchTopRatedMovies(pageNum));
  }, [dispatch]);

  //UseEffect de infinitScroll
  useEffect(() => {
    if (pageNum <= totalPages) {
      callMovies();
    }
    // }
  }, [pageNum]);

  //UseEffect de inicio
  useEffect(() => {
    setLoading(true);
    setAllMovies(moviesArray);
    setLoading(false);
  }, [moviesArray]);

  const callMovies = async () => {
    setLoading(true);
    await dispatch(fetchTopRatedMovies(pageNum));
    setLoading(false);
  };

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <div className={classes.root}>
      <NavBar />
      <Suspense fallback={<h2>Loading</h2>}>
        <Banner />
      </Suspense>
      {!loading && allMovies.length && (
        <div>
          <MoviesList moviesArray={allMovies} />
        </div>
      )}
      <div ref={setLastElement}></div>
    </div>
  );
}
