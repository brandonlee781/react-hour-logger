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

export const CREATE_NEW_LOG = gql`
  mutation CreateNewLog(
    $date: String!,
    $startTime: String!,
    $endTime: String!,
    $duration: Float!,
    $projectId: String!,
    $note: String!
  ) {
    createLog ( input: {
      log: {
        date: $date,
        startTime: $startTime,
        endTime: $endTime,
        duration: $duration,
        projectId: $projectId,
        note: $note
      }
    }) {
      log{
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

export const DELETE_LOG = gql`
  mutation DeleteLog($logId: ID!) {
    deleteLog(input: { id: $logId }) {
      numberOfDeleted
    }
  }
`;

export const GET_ALL_INVOICE = gql`
  query GetAllInvoices{
    allInvoices{
      invoices{
        id,
        number,
        hours,
        rate,
        date,
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
  }
`;

export const GET_LOGS_BY_DATE = gql`
  query GetAllLogsByDate($start: String, $end: String, $limit: Int, $offset: Int){
    allLogsByDates(
      input:{
        start: $start,
        end: $end
      },
      options: {
        limit: $limit,
        offset: $offset
      }
    ) {
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

export const CREATE_NEW_INVOICE = gql`
  mutation CreateNewInvoice(
    $date: String!
    $hours: Float!
    $rate: Int!
    $logs: [ID!]!
  ) {
    createInvoice(input: {
      invoice: {
        date: $date,
        hours: $hours,
        rate: $rate,
        logs: $logs
      }
    }) {
      invoice{
        id,
        number,
        hours,
        rate,
        date,
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
  }
`;

export const RANDOM_DONT_BE_A = gql`
  query RandomDontBeA {
    randomDontBeA{
      dontBeA{
        phrase
      }
    }
  }
`;