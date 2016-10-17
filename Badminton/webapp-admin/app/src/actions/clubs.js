import axios from 'axios'; 

export const UPDATE_CLUB = 'UPDATE_CLUB';
export const UPDATE_CLUB_SUCCESS = 'UPDATE_CLUB_SUCCESS';
export const UPDATE_CLUB_FAILURE = 'UPDATE_CLUB_FAILURE';

export const DELETE_CLUB = 'DELETE_CLUB';
export const DELETE_CLUB_SUCCESS = 'DELETE_CLUB_SUCCESS';
export const DELETE_CLUB_FAILURE = 'DELETE_CLUB_FAILURE';

export const GET_CLUBS = 'GET_CLUBS';
export const GET_CLUBS_SUCCESS = 'GET_CLUBS_SUCCESS';
export const GET_CLUBS_FAILURE = 'GET_CLUBS_FAILURE';

export const CREATE_NEW_CLUB = 'CREATE_NEW_CLUB';
export const UPDATE_FIELD = "UPDATE_FIELD";


export const SELECT_CLUB_TO_EDIT = 'SELECT_CLUB_TO_EDIT';
export const EDIT_CLUB = 'EDIT_CLUB';
export const EDIT_CLUB_SUCCESS = 'EDIT_CLUB_SUCCESS';
export const EDIT_CLUB_FAILURE = 'EDIT_CLUB_FAILURE';

export const GET_CLUB = 'GET_CLUB';

const ROOT_URL = 'http://localhost:3002/api';

export function getAllClubs() {
  const request = axios.get(`${ROOT_URL}/clubs`);
  return {
    type: GET_CLUBS,
    payload: request
  };
}

export function getAllClubsSuccess(clubs) {
  return {
    type: GET_CLUBS_SUCCESS,
    payload: clubs
  };
}

export function updateClub(club) {
  let request = null;
  if (club.isNew) {
    request = axios.post(`${ROOT_URL}/clubs`, club);
  } else {

    request = axios.post(`${ROOT_URL}/clubs`+"/"+club["_id"], {"operation": "update", "club": club});
  }
  return {
    type: UPDATE_CLUB,
    payload: request
  };
}

export function updateClubSuccess(club) {
  return {
    type: UPDATE_CLUB_SUCCESS,
    payload: club
  };
}

export function updateClubFailure(error) {
  return {
    type: UPDATE_CLUB_FAILURE,
    payload: error
  };
}

export function deleteClub(id) {
  const request = axios.post(`${ROOT_URL}/clubs/`+id, {"operation": "delete"});
  return {
    type: DELETE_CLUB,
    payload: request
  };
}

export function deleteClubSuccess() {
  return {
    type: DELETE_CLUB_SUCCESS
  };
}

export function deleteClubFailure(error) {
  return {
    type: DELETE_CLUB_FAILURE,
    payload: error
  };
}

export function createNewClub() {
  return {
    type: CREATE_NEW_CLUB
  };
}

export function updateField(key, value) {
  return {
    type: UPDATE_FIELD,
    key: key,
    value: value
  };
}

export function getClub(club) {
   return {
    type: GET_CLUB,
    club: club
  };
}