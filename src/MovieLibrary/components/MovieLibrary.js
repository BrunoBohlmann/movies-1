import React, {
  useEffect,
  Suspense,
  lazy,
  useState,
  useRef,
  useCallback,
} from "react";
import NavBar from "./NavBar";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedMovies } from "../store/actions";
import { getMovies } from "../store/selectors";
import Banner from "./Banner";
import MoviesList from "./MoviesList";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#212121",
    color: "white",
  },
}));

const totalPages = 1000;

export default function MovieLibrary() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const moviesArray = useSelector(getMovies);

  const [loading, setLoading] = useState(true);
  const [allMovies, setAllMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const callMovies = async (num) => {
    setLoading(true);
    console.log(num);
    await dispatch(fetchTopRatedMovies(num));
    setLoading(false);
  };

  useEffect(() => {
    setAllMovies(moviesArray);
  }, [moviesArray]);

  useEffect(() => {
    if (pageNum <= totalPages) {
      callMovies(pageNum);
    }
  }, [pageNum]);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("observando");
          setPageNum((no) => no + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className={classes.root}>
      <NavBar />
      {moviesArray.length && <Banner />}
      {!loading && allMovies.length && (
        <div>
          <MoviesList moviesArray={allMovies} lastElementRef={lastElementRef} />
        </div>
      )}
      {loading && <p>Loading</p>}
    </div>
  );
}
