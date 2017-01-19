import axios from 'axios'; 

export const GET_TEAMS = 'GET_TEAMS';
export const GET_TEAMS_SUCCESS = 'GET_TEAMS_SUCCESS';
export const GET_TEAMS_FAILURE = 'GET_TEAMS_FAILURE';
export const GET_TEAM = 'GET_TEAM';

const ROOT_URL = 'http://localhost:3002/api';

export function getAllTeams() {
  const request = axios.get(`${ROOT_URL}/teams`);
  return {
    type: GET_TEAMS,
    payload: request
  };
}

export function getAllTeamsSuccess(teams) {
  return {
    type: GET_TEAMS_SUCCESS,
    payload: teams
  };
}

export function getTeam(team) {
   return {
    type: GET_TEAM,
    team: team
  };
}