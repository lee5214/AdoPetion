import { combineReducers } from "redux";import auth from "./authReducer";import jobsList from "./jobReducer";import likedJobs from "./likesReducer";import { petsByOrg } from "./petsReducer";import orgsDetailList from "./orgsReducer";export default combineReducers({  auth,  jobsList,  likedJobs,  petsByOrg,  orgsDetailList});