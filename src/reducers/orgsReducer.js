import { FETCH_ORG_DETAIL } from "../actions";const DefaultState={  list:{}}export default function(state = DefaultState, action) {  switch (action.type) {    case FETCH_ORG_DETAIL:      let temp = state;      temp.list[action.payload.orgID] = action.payload;      temp.newAdded = action.payload.orgID;      return Object.assign({}, state, temp);    default:      return state;  }}