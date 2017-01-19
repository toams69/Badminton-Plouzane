import axios from 'axios'; 

export const UPDATE_TEAM = 'UPDATE_TEAM';
export const UPDATE_TEAM_SUCCESS = 'UPDATE_TEAM_SUCCESS';
export const UPDATE_TEAM_FAILURE = 'UPDATE_TEAM_FAILURE';

export const DELETE_TEAM = 'DELETE_TEAM';
export const DELETE_TEAM_SUCCESS = 'DELETE_TEAM_SUCCESS';
export const DELETE_TEAM_FAILURE = 'DELETE_TEAM_FAILURE';

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

export function updateTeam(team) {
  let request = null;
  if (!team._id) {
    request = axios.post(`${ROOT_URL}/teams`, team);
  } else {
    request = axios.post(`${ROOT_URL}/teams`+"/"+team._id, {"operation": "update", "team": team});
  }
  return {
    type: UPDATE_TEAM,
    payload: request
  };
}

export function updateTeamSuccess(team) {
  return {
    type: UPDATE_TEAM_SUCCESS,
    payload: team
  };
}

export function updateTeamFailure(error) {
  return {
    type: UPDATE_TEAM_FAILURE,
    payload: error
  };
}

export function deleteTeam(id) {
  const request = axios.post(`${ROOT_URL}/teams/`+id, {"operation": "delete"});
  return {
    type: DELETE_TEAM,
    payload: request
  };
}

export function deleteTeamSuccess() {
  return {
    type: DELETE_TEAM_SUCCESS
  };
}

export function deleteTeamFailure(error) {
  return {
    type: DELETE_TEAM_FAILURE,
    payload: error
  };
}

export function updateField(key, value) {
  return {
    type: UPDATE_FIELD,
    key: key,
    value: value
  };
}

export function getTeam(team) {
   return {
    type: GET_TEAM,
    team: team
  };
}