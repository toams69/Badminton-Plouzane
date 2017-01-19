import axios from 'axios'; 

export const GET_CONTESTS = 'GET_CONTESTS';
export const GET_CONTESTS_SUCCESS = 'GET_CONTESTS_SUCCESS';
export const GET_CONTESTS_FAILURE = 'GET_CONTESTS_FAILURE';
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

export function getContest(contest) {
   return {
    type: GET_CONTEST,
    contest: contest
  };
}