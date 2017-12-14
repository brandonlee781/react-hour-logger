import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleDrawer } from '../../actions';
import { client } from '../../store';
import { RANDOM_DONT_BE_A } from '../../constants/queries';
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

interface DispatchProps {
  toggleDrawer: () => void;
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => {
  return {
    toggleDrawer: () => dispatch(toggleDrawer()),
  };
};

interface Response {
  randomDontBeA: {
    dontBeA: {
      phrase: string;
    }
  };
}

export class AppClass extends React.Component<AppProps & DispatchProps> {
  async componentWillMount() {
    try {
      const response = await client.query<Response>({ query: RANDOM_DONT_BE_A });
      document.title = response.data.randomDontBeA.dontBeA.phrase;
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppContainer>
            <SideNav toggleDrawer={this.props.toggleDrawer}/>
            <AppBody>
              <Route exact={true} path="/work/" component={Home}/>
              <Route path="/work/projects" component={Projects}/>
              <Route path="/work/invoices" component={Invoices}/>
              <Route path="/work/login" component={Login}/>
            </AppBody>
          </AppContainer>
        </MuiThemeProvider>
      </Router>
    );
  }
}

// export const App = AppClass;

export const App = connect(mapStateToProps, mapDispatchToProps)(AppClass);
