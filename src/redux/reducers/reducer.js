import { VisibilityFilters } from "../actions/action";
import { SET_VISIBILITY_FILTER } from "../actions/action";

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  athletes: []
};

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    default:
      return state;
  }
}
