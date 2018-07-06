import { CLEAR_NEARBY_PETS, FETCH_NEARBY_PETS, FETCH_PETS_BY_ORG } from "../actions";const defaultState = {  list: {}};const petsByOrg = (state = defaultState, action) => {  switch (action.type) {    case FETCH_PETS_BY_ORG:      let temp = state;      temp.list[action.orgID] = action.payload;      return Object.assign({}, state, temp);    default:      return state;  }};const petsNearby = (state = {}, action) => {  switch (action.type) {    case FETCH_NEARBY_PETS:      return Object.assign({}, state, action.payload)    case CLEAR_NEARBY_PETS:      return {}//action.payload    default:      return state;  }};export { petsByOrg, petsNearby };