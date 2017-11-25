import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MediaQuery from 'react-responsive';
import { 
  HomeContainer,
  HomeBody,
  HomeBodyHeader,
  HomeBodyTitle,
  HomeAddIcon
} from './Home.style';
import { Link, LogStateType, ProjectStateType, StoreStateType, Log } from '../../constants/types';
import { filterHomeEntries, getHomeLinks } from '../../selectors';
import { changeHomeSelected, toggleNewLogForm } from '../../actions';

import { HomeList, NavDrawer, LoadingSpinner, HomeListItemNew } from '../../components';

interface HomeProps {
  projects: ProjectStateType;
  logs: LogStateType;
  links: Link[];
  drawerOpen: boolean;
  newLogFormShown: boolean;
  filteredLogs: Log[];
}
interface DispatchProps {
  changeHomeSelected: (payload: string) => Dispatch<void>;
  toggleNewLogForm: () => void;
}

const mapStateToProps = (state: StoreStateType) => {
  return {
    projects: state.projects,
    logs: state.logs,
    links: getHomeLinks(state), 
    drawerOpen: state.ui.drawerOpen,
    newLogFormShown: state.ui.home.newLogFormShown,
    filteredLogs: filterHomeEntries(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<StoreStateType>): DispatchProps => {
  return {
    changeHomeSelected: (payload: string) => dispatch(changeHomeSelected(payload)),
    toggleNewLogForm: () => dispatch(toggleNewLogForm())
  };
};

class HomeComponent extends React.Component<HomeProps & DispatchProps> {
  render() {
    return (
      <HomeContainer>
        <NavDrawer 
          header="Log Entries" 
          drawerOpen={this.props.drawerOpen}
          links={this.props.links}
          linksLoading={this.props.projects.isFetching}
          changeSelected={this.props.changeHomeSelected}
        />
        <MediaQuery minWidth={960}>
        {(match) => (
          <HomeBody mobile={match}>
            <HomeBodyHeader>
              <HomeBodyTitle>{(this.props.links.filter(l => l.selected))[0].title}</HomeBodyTitle>
              <HomeAddIcon onClick={this.props.toggleNewLogForm}>+</HomeAddIcon>
              <HomeListItemNew 
                open={this.props.newLogFormShown} 
                projects={this.props.projects.items}
                toggle={this.props.toggleNewLogForm}
              />
            </HomeBodyHeader>
            <LoadingSpinner show={this.props.logs.isFetching}/>
            <HomeList logs={this.props.filteredLogs}/>
          </HomeBody>
        )}
        </MediaQuery>
      </HomeContainer>
    );
  }
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
