import { Dispatch } from 'redux';
// import axios, { AxiosResponse } from 'axios';
import { Log } from '../constants/types';
// import { client } from '../store/client';
// import { ApolloQueryResult } from 'apollo-client';
// import gql from 'graphql-tag';
export const REQUEST_LOGS = 'REQUEST_LOGS';
export const RECEIVE_LOGS = 'RECEIVE_LOGS';
export const RECEIVE_LOGS_FAILED = 'RECEIVE_LOGS_FAILED';

// axios.defaults.adapter = require('axios/lib/adapters/http');
// const api = axios.create({
//   baseURL: 'https://www.branlee.me/api/v1/logs',
//   headers: {
//     'Authorization': 'Bearer 935dce7e662f66a454041422ccfab4289deebf4c',
//   },
// });

// const authorization = 
//   'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.ixcKwo-4Ate8Gb88ybx4IBCric40yKSXjDAEePn3IlY';
// const query = gql`
//   {
//     allLogs{
//       logs{
//         id,
//         date,
//         startTime,
//         endTime,
//         duration,
//         project{
//           id,
//           name
//         },
//         note
//       }
//     }
//   }
// `;

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

// interface LogResponse {
//   allLogs: {
//     logs: Log[]
//   };
// }

export function fetchLogs() {
  return async function(dispatch: Dispatch<{}>) {
    try {
      // dispatch(requestLogs());
      // const res: ApolloQueryResult<LogResponse> = await client.query<LogResponse>({
      //   query,
      // });
      // dispatch(receiveLogs(res.data.allLogs.logs));
    } catch (err) {
      console.error(err);
      dispatch(recieveLogsFailed());
    }
  };
}
