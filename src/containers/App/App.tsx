import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
// import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
// import { toggleDrawer } from '../../actions';
// import MediaQuery from 'react-responsive';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';
import blue from 'material-ui/colors/blue';
import deepOrange from 'material-ui/colors/deepOrange';
import { AppContainer, AppBody } from './App.style';

import { SideNav } from '../../components';
import {
  Home,
  Projects,
  Invoices,
  Login
} from '../../containers';

export const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      ...deepOrange,
      500: '#E2624B'
    },
  },
});

interface AppProps {

}

// interface DispatchProps {
//   toggleDrawer: () => void;
// }

// const mapStateToProps = () => {
//   return {};
// };

// const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => {
//   return {
//     toggleDrawer: () => dispatch(toggleDrawer()),
//   };
// };

export class AppClass extends React.Component<AppProps> {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppContainer>
            <SideNav toggleDrawer={/*this.props.toggleDrawer*/() => console.log}/>
            <AppBody>
              <Route exact={true} path="/" component={Home}/>
              <Route path="/projects" component={Projects}/>
              <Route path="/invoices" component={Invoices}/>
              <Route path="/login" component={Login}/>
            </AppBody>
          </AppContainer>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export const App = AppClass;

// export const App = connect(mapStateToProps, mapDispatchToProps)(AppClass);
