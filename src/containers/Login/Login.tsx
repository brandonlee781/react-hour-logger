// tslint:disable:no-any
import * as React from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography
} from 'material-ui';
import { LoginWrapper, LoginCard } from './Login.style';

const storage = window.localStorage;

interface Props {
  history: any;
}

interface State {
  email: string;
  password: string;
  warning: string;
}

class LoginComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      warning: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (event: any, name: any) => {
    this.setState({ [name]: event.target.value });
  }

  submitLogin = async (): Promise<void> => {
    console.log('submitted');
    const res = await axios.post('https://www.branlee.me/api/auth/token', {
      email: this.state.email,
      password: this.state.password
    });
    if (res.status === 200) {
      console.log(storage);
      storage.setItem('token', res.data.access_token);
      this.props.history.push('/');
    } else {
      this.setState({
        warning: 'Incorrect User Name or Password'
      });
    }
  }

  render() {
    return (
      <LoginWrapper>
        <LoginCard>
          <Typography type="headline" component="h2">
            Sign In
          </Typography>
          <Typography type="body2" component="p" color="error">
            {this.state.warning}
          </Typography>
          <form>
            <TextField
              id="email"
              label="Email"
              fullWidth={true}
              value={this.state.email}
              onChange={(event: any) => this.handleChange(event, 'email')}
            />
            <TextField
              type="password"
              id="password"
              label="Password"
              fullWidth={true}
              value={this.state.password}
              onChange={(event: any) => this.handleChange(event, 'password')}
            />
            <Button 
              raised={true} 
              color="primary" 
              style={{marginTop: '8px'}}
              onClick={this.submitLogin}
            >
              Submit
            </Button>
          </form>
        </LoginCard>
      </LoginWrapper>
    );
  }
}

export const Login = LoginComponent;