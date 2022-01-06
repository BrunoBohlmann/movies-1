import { LOAD_MOVIES } from "../../actionTypes";

import axios from "axios";

const apikey = "54ffed57deb5a7a8688be4de3007e578";

export function fetchTopRatedMovies(pageNumber) {
  return async function (dispatch) {
    const json = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${pageNumber}`
    );

    return dispatch({
      type: LOAD_MOVIES,
      payload: json.data.results,
    });
  };
}
