import { FETCH_ORG_DETAIL } from "../actions";export default function(state = {}, action) {  switch (action.type) {    case FETCH_ORG_DETAIL:      let temp = state;      temp[action.payload.orgID] = action.payload;      console.log("orgsReducer send: ", Object.keys(temp).map(obj => obj));      return Object.assign({}, state, temp);    default:      return state;  }}