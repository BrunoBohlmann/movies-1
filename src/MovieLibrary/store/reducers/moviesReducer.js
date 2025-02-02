import { LOAD_MOVIES } from "../../../actionTypes";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_MOVIES:
      return [...new Set([...state, ...payload])];

    default:
      return state;
  }
}
