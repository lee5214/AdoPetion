import { FETCH_ORG_DETAIL } from "../actions";export default function(state = {}, action) {  switch (action.type) {    case FETCH_ORG_DETAIL:      // console.log('orgsReducer',action.payload)      //  if(state.indexOf(action.payload)){      //    return [state]      //  }      //  return [action.payload,...state];      let temp = state;      temp[action.payload.orgID] = action.payload;      console.log("reducer send: ", Object.keys(temp).map(obj => obj));      return Object.assign({}, state, temp);    default:      return state;  }}