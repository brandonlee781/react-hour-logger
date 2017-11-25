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
import { Link, LogStateType, ProjectStateType, StoreStateType } from '../../constants/types';
import { changeHomeSelected } from '../../actions';

import { HomeList, NavDrawer, LoadingSpinner, HomeListItemNew } from '../../components';

interface HomeProps {
  projects: ProjectStateType;
  logs: LogStateType;
  links: Link[];
  drawerOpen: boolean;
}
interface DispatchProps {
  changeHomeSelected: (payload: string) => Dispatch<void>;
}

const mapStateToProps = (state: StoreStateType) => {
  return {
    projects: state.projects,
    logs: state.logs,
    links: state.ui.homeDrawer.links,
    drawerOpen: state.ui.drawerOpen
  };
};

const mapDispatchToProps = (dispatch: Dispatch<StoreStateType>): DispatchProps => {
  return {
    changeHomeSelected: (payload: string) => dispatch(changeHomeSelected(payload)) 
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
              <HomeBodyTitle>Recent Log Entries</HomeBodyTitle>
              <HomeAddIcon>+</HomeAddIcon>
              <HomeListItemNew open={true} projects={this.props.projects.items}/>
            </HomeBodyHeader>
            <LoadingSpinner show={this.props.logs.isFetching}/>
            <HomeList logs={this.props.logs.filtered}/>
          </HomeBody>
        )}
        </MediaQuery>
      </HomeContainer>
    );
  }
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
