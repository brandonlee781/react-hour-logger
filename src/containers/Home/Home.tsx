import * as React from 'react';
import * as moment from 'moment';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Dispatch } from 'redux';
import { RouterProps } from 'react-router';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './home-cal.css';
BigCalendar.momentLocalizer(moment);

import { changeHomeSelected, toggleNewLogForm } from '../../actions';
import { 
  HomeList, 
  HomeListItemNew, 
  NavDrawer, 
  HomeNavHeader,
  HomeCalToolbar,
  HomeCalEvent,
  HomeCalMonthEvent,
} from '../../components';
import { 
  Link, 
  Log, 
  Project, 
  StoreStateType, 
  GET_HOME_LOGS, 
  GET_ALL_PROJECTS, 
  CREATE_NEW_LOG, 
  DELETE_LOG,
  QUERY_LIMIT,
} from '../../constants';
import { HomeAddIcon, HomeBody, HomeBodyHeader, HomeBodyTitle, HomeContainer } from './Home.style';
interface Result<T> {
  error: Error;
  loading: boolean;
  items: T[];
  fetchMore?: () => void;
}

interface ApolloProps extends RouterProps {
  projects?: Result<Project>;
  logs?: Result<Log>;
  links?: Result<Link>;
  createNewLog?: () => void;
  deleteLog?: (logId: string) => void;
}

interface ReduxProps {
  drawerOpen?: boolean;
  newLogFormShown?: boolean;
  selected?: string;
  list?: boolean;
}
const mapStateToProps = (state: StoreStateType): ReduxProps => {
  return {
    drawerOpen: state.ui.drawerOpen,
    newLogFormShown: state.ui.home.newLogFormShown,
    selected: state.ui.home.selected,
    list: state.ui.home.list,
  };
};

interface DispatchProps {
  changeHomeSelected?: (payload: string) => Dispatch<void>;
  toggleNewLogForm?: () => void;
}
const mapDispatchToProps = (dispatch: Dispatch<StoreStateType>): DispatchProps => {
  return {
    changeHomeSelected: (payload: string) => dispatch(changeHomeSelected(payload)),
    toggleNewLogForm: () => dispatch(toggleNewLogForm())
  };
};

type Props = ApolloProps & ReduxProps & DispatchProps;

class HomeComponent extends React.PureComponent<Props> {
  checkDeleteLog = (logId: string) => {
    if (window.confirm('Are you sure you want to delete this log entry?')) {
      this.props.deleteLog(logId);
    }
  }
  render() {
    return (
      <HomeContainer>
        <NavDrawer 
          header={<HomeNavHeader title="Log Entries"/>}
          drawerOpen={this.props.drawerOpen}
          links={this.props.links.items}
          linksLoading={this.props.links.loading}
          changeSelected={this.props.changeHomeSelected}
        />
          <MediaQuery minWidth={960}>
          {(match) => (
            <HomeBody mobile={match}>
              <HomeBodyHeader>
                <HomeBodyTitle>
                  {this.props.projects.loading ? 
                    'Recent Log Entries' :
                    (this.props.links.items.filter(l => l.selected))[0].title
                  }
                </HomeBodyTitle>
                <HomeAddIcon onClick={this.props.toggleNewLogForm}>+</HomeAddIcon>
                <HomeListItemNew 
                  open={this.props.newLogFormShown} 
                  projects={this.props.projects.items}
                  toggle={this.props.toggleNewLogForm}
                  currentProject={this.props.selected}
                  createNewLog={this.props.createNewLog}
                />
              </HomeBodyHeader>
              {this.props.list ?
                <HomeList
                  loading={this.props.logs.loading}
                  logs={this.props.logs.items}
                  getMoreLogs={this.props.logs.fetchMore}
                  deleteLog={this.checkDeleteLog}
                /> :
                <BigCalendar
                  events={this.props.logs.items}
                  selectable={true}
                  showMultiDayTimes={true}
                  titleAccessor={(e) => e.project.name}
                  allDayAccessor={(e) => false}
                  startAccessor={(e) => new Date(e.date + ' ' + e.startTime)}
                  endAccessor={(e) => new Date(e.date + ' ' + e.endTime)}
                  formats={{ dateFormat: 'D', dayFormat: 'ddd M/D' }}
                  components={{
                    toolbar: HomeCalToolbar,
                    month: {
                      event: HomeCalMonthEvent,
                    },
                    week: {
                      event: HomeCalEvent,
                    },
                    day: {
                      event: HomeCalEvent,
                    },
                    agenda: {
                      // tslint:disable-next-line:no-any
                      event: (prop: any) => <div><strong>{prop.event.project.name}:</strong> {prop.event.note}</div>,
                    },
                  }}
                />
              }
            </HomeBody>
          )}
          </MediaQuery>
      </HomeContainer>
    );
  }
}

const homeRedux = connect(mapStateToProps, mapDispatchToProps);

interface Response {
  allLogsByProjectId?: { logs: Log[] };
  allProjects?: { projects: Project[] };
}
const homeLogs = graphql<Response, Props>(GET_HOME_LOGS, {
  options: ({ selected }) =>  {
    return {
      variables: {
        projectId: selected,
        limit: QUERY_LIMIT,
        offset: 0
      },
    };
  },
  props: ({ ownProps, data: { loading, error, allLogsByProjectId, fetchMore } }) => {
    if (!loading) {
      return {
        logs: {
          error: error,
          loading: loading,
          items: allLogsByProjectId.logs,
          fetchMore() {
            return fetchMore({
              variables: {
                offset: allLogsByProjectId.logs.length
              },
              updateQuery: (previousResults, { fetchMoreResult }) => {
                if (!fetchMoreResult) { return previousResults; }
                return {
                  allLogsByProjectId: {
                    __typename: 'LogsType',
                    logs: ([
                      ...previousResults.allLogsByProjectId.logs,
                      ...fetchMoreResult.allLogsByProjectId.logs
                    ])
                  }
                };
              }
            });
          }
        },
      };
    } else {
      return {
        logs: {
          loading: true,
          error: null,
          items: []
        }
      };
    }
  }
});
const homeProjects = graphql<Response, Props>(GET_ALL_PROJECTS, {
  props: ({ ownProps, data: { loading, error, allProjects } }) => {
    if (!loading) {
      return {
        projects: {
          loading,
          error,
          items: allProjects.projects
        },
        links: {
          loading,
          error,
          items: [
            {
              id: '',
              title: 'Recent Log Entries',
              icon: '',
              selected: ownProps.selected === ''
            },
            ...allProjects.projects.map((proj) => {
              return {
                id: proj.id,
                title: proj.name,
                icon: 'folder_open',
                selected: proj.id === ownProps.selected ? true : false
              };
            })
          ]
        }
      };
    } else {
      return { 
        projects: {
          loading,
          error: null,
          items: []
        },
        links: {
          loading,
          error: null,
          items: []
        }
      };
    }
  } 
});
interface NewLogData {
  date: moment.Moment;
  startTime: moment.Moment;
  endTime: moment.Moment;
  projectId: string;
  note: string;
}
const createLogMutation = graphql<Response, Props>(CREATE_NEW_LOG, {
  props: ({ ownProps, mutate }) => ({
    createNewLog: (newLog: NewLogData) => mutate({
      variables: {
        date: newLog.date.format('YYYY-MM-DD'),
        startTime: newLog.startTime.format('HH:mm'),
        endTime: newLog.endTime.format('HH:mm'),
        duration: newLog.endTime.diff(newLog.startTime, 'hours', true),
        projectId: newLog.projectId,
        note: newLog.note
      },
      update: (proxy, { data: { createLog }}) => {
        const data: Response = proxy.readQuery({ query: GET_HOME_LOGS, variables: {
          projectId: ownProps.selected, limit: QUERY_LIMIT, offset: 0 
        }});
        data.allLogsByProjectId.logs.unshift(createLog.log);
        proxy.writeQuery({
          query: GET_HOME_LOGS,
          variables: { projectId: ownProps.selected, limit: QUERY_LIMIT, offset: 0 },
          data
        });
      },
    })
  })
});
const removeLog = graphql<Response, Props>(DELETE_LOG, {
  props: ({ ownProps, mutate }) => ({
    deleteLog: (logId: string) => mutate({
      variables: { logId },
      update: (proxy, { data: { deleteLog } }) => {
        const data: Response = proxy.readQuery({ query: GET_HOME_LOGS, variables: {
          projectId: ownProps.selected, limit: QUERY_LIMIT, offset: 0 
        }});

        data.allLogsByProjectId.logs = data.allLogsByProjectId.logs.filter((l) => l.id !== logId);

        proxy.writeQuery({
          query: GET_HOME_LOGS,
          variables: { projectId: ownProps.selected, limit: QUERY_LIMIT, offset: 0 },
          data
        });
      }
    }),
    
  })
});

export const Home = compose(
  homeRedux,
  removeLog,
  createLogMutation,
  homeLogs,
  homeProjects,
)(HomeComponent);