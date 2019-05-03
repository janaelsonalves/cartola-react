export const GET_ATHLETES = "GET_ATHLETES";
export const GET_ONE_ATHLETE = "GET_ONE_ATHLETE";
export const GET_MARKET_STATUS = "GET_MARKET_STATUS";

export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export function getAthletes() {
  return { type: GET_ATHLETES };
}

export function getOneAthlete(id) {
  return { type: GET_ATHLETES, id };
}

export function getMarketStatus() {
  return { type: GET_MARKET_STATUS };
}

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
