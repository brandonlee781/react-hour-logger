import gql from 'graphql-tag';

export const GET_ALL_LOGS = gql`
  query HomeLogs( $limit: Int, $offset: Int ){
    allLogs(options: {
      limit: $limit
      offset: $offset
    }){
      logs{
        id,
        date,
        startTime,
        endTime,
        duration,
        project{
          id,
          name
        },
        note
      }
    }
  }
`;

export const GET_HOME_LOGS = gql`
  query HomeLogs($projectId: String!, $limit: Int, $offset: Int) {
    allLogsByProjectId(
      input: { 
        id: $projectId
      }
      options: { 
        limit: $limit
        offset: $offset
    }) {
      logs {
        id,
        date,
        startTime,
        endTime,
        duration,
        project{
          id,
          name
        },
        note
      }
    }
  }
`;

export const GET_ALL_PROJECTS = gql`
  query HomeProjects {
    allProjects{
      projects{
        id,
        name
      }
    }
  }
`;