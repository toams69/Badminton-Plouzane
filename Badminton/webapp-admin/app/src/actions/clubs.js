import axios from 'axios'; 

export const ADD_CLUB = 'ADD_CLUB';
export const ADD_CLUB_SUCCESS = 'ADD_CLUB_SUCCESS';
export const ADD_CLUB_FAILURE = 'ADD_CLUB_FAILURE';

export const DELETE_CLUB = 'DELETE_CLUB';
export const DELETE_CLUB_SUCCESS = 'DELETE_CLUB_SUCCESS';
export const DELETE_CLUB_FAILURE = 'DELETE_CLUB_FAILURE';

export const GET_CLUBS = 'GET_CLUBS';
export const GET_CLUBS_SUCCESS = 'GET_CLUBS_SUCCESS';
export const GET_CLUBS_FAILURE = 'GET_CLUBS_FAILURE';

export const RESET_NEW_CLUB = 'RESET_NEW_CLUB';
export const UPDATE_NEW_CLUB = "UPDATE_NEW_CLUB";

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


export function addClub(values) {
  const request = axios.post(`${ROOT_URL}/clubs`, values);
  return {
    type: ADD_CLUB,
    payload: request
  };
}

export function addClubSuccess(club) {
  return {
    type: ADD_CLUB_SUCCESS,
    payload: club
  };
}

export function addClubFailure(error) {
  return {
    type: ADD_CLUB_FAILURE,
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

export function resetNewClub() {
  return {
    type: RESET_NEW_CLUB
  };
}

export function updateNewClub(property, key, value) {
  return {
    type: UPDATE_NEW_CLUB,
    property: property, key: key, value: value
  };
}