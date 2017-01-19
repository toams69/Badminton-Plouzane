import axios from 'axios'; 

export const UPDATE_CONTEST = 'UPDATE_CONTEST';
export const UPDATE_CONTEST_SUCCESS = 'UPDATE_CONTEST_SUCCESS';
export const UPDATE_CONTEST_FAILURE = 'UPDATE_CONTEST_FAILURE';

export const DELETE_CONTEST = 'DELETE_CONTEST';
export const DELETE_CONTEST_SUCCESS = 'DELETE_CONTEST_SUCCESS';
export const DELETE_CONTEST_FAILURE = 'DELETE_CONTEST_FAILURE';

export const GET_CONTESTS = 'GET_CONTESTS';
export const GET_CONTESTS_SUCCESS = 'GET_CONTESTS_SUCCESS';
export const GET_CONTESTS_FAILURE = 'GET_CONTESTS_FAILURE';

export const CREATE_NEW_CONTEST = 'CREATE_NEW_CONTEST';
export const UPDATE_FIELD = "UPDATE_FIELD";


export const SELECT_CONTEST_TO_EDIT = 'SELECT_CONTEST_TO_EDIT';
export const EDIT_CONTEST = 'EDIT_CONTEST';
export const EDIT_CONTEST_SUCCESS = 'EDIT_CONTEST_SUCCESS';
export const EDIT_CONTEST_FAILURE = 'EDIT_CONTEST_FAILURE';

export const GET_CONTEST = 'GET_CONTEST';

const ROOT_URL = 'http://localhost:3002/api';

export function getAllContests() {
  const request = axios.get(`${ROOT_URL}/contests`);
  return {
    type: GET_CONTESTS,
    payload: request
  };
}

export function getAllContestsSuccess(contests) {
  return {
    type: GET_CONTESTS_SUCCESS,
    payload: contests
  };
}

export function updateContest(contest) {
  let request = null;
  if (!contest["_id"]) {
    request = axios.post(`${ROOT_URL}/contests`, contest);
  } else {

    request = axios.post(`${ROOT_URL}/contests`+"/"+contest["_id"], {"operation": "update", "contest": contest});
  }
  return {
    type: UPDATE_CONTEST,
    payload: request
  };
}

export function updateContestSuccess(contest) {
  return {
    type: UPDATE_CONTEST_SUCCESS,
    payload: contest
  };
}

export function updateContestFailure(error) {
  return {
    type: UPDATE_CONTEST_FAILURE,
    payload: error
  };
}

export function deleteContest(id) {
  const request = axios.post(`${ROOT_URL}/contests/`+id, {"operation": "delete"});
  return {
    type: DELETE_CONTEST,
    payload: request
  };
}

export function deleteContestSuccess() {
  return {
    type: DELETE_CONTEST_SUCCESS
  };
}

export function deleteContestFailure(error) {
  return {
    type: DELETE_CONTEST_FAILURE,
    payload: error
  };
}

export function createNewContest() {
  return {
    type: CREATE_NEW_CONTEST
  };
}

export function updateField(key, value) {
  return {
    type: UPDATE_FIELD,
    key: key,
    value: value
  };
}

export function getContest(contest) {
   return {
    type: GET_CONTEST,
    contest: contest
  };
}