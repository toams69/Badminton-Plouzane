import axios from 'axios'; 

export const GET_CLUBS = 'GET_CLUBS';
export const GET_CLUBS_SUCCESS = 'GET_CLUBS_SUCCESS';
export const GET_CLUBS_FAILURE = 'GET_CLUBS_FAILURE';
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

export function getClub(club) {
   return {
    type: GET_CLUB,
    club: club
  };
}