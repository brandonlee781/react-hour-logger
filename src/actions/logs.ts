import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { Log } from '../constants/types';
export const REQUEST_LOGS = 'REQUEST_LOGS';
export const RECEIVE_LOGS = 'RECEIVE_LOGS';
export const RECEIVE_LOGS_FAILED = 'RECEIVE_LOGS_FAILED';
export const FILTER_LOGS = 'FILTER_LOGS';

axios.defaults.adapter = require('axios/lib/adapters/http');
const api = axios.create({
  baseURL: 'https://www.branlee.me/api/v1/logs',
  headers: {
    'Authorization': 'Bearer 935dce7e662f66a454041422ccfab4289deebf4c',
  },
});

export function requestLogs() {
  return {
    type: REQUEST_LOGS,
  };
}

export function receiveLogs(logs: Log[]) {
  return {
    type: RECEIVE_LOGS,
    payload: logs,
  };
}

export function recieveLogsFailed() {
  return {
    type: RECEIVE_LOGS_FAILED,
  };
}

export function filterLogs(filter: string) {
  return {
    type: FILTER_LOGS,
    payload: filter,
  };
}

export function fetchLogs() {
  return async function(dispatch: Dispatch<{}>) {
    try {
      dispatch(requestLogs());
      const res: AxiosResponse = await api.get('/'); 
      dispatch(receiveLogs(res.data));
    } catch (err) {
      console.error(err);
      dispatch(recieveLogsFailed());
    }
  };
}
