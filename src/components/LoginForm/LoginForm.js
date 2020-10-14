import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';
import {Input, Button} from '../Utils/Utils';
import './LoginForm.css'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  state = {error: null};

  static contextType = UserContext;

  firstInput = React.createRef()

  componentDidMount() {
    this.firstInput.current.focus()
  }

  handleSubmitAuth = ev => {
    ev.preventDefault();
    this.setState({error: null});
    const {user_name, password} = ev.target;
    AuthApiService.postLogin({
      username: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = '';
        password.value = '';
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({error: res.error});
      });
  };

  render() {
    const {error} = this.state;
    return (
      <>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <form className='LoginForm'
          onSubmit={this.handleSubmitAuth}
        >
          <div className='user_name'>
            <label htmlFor='LoginForm__user_name'>
              User name:
            </label>
            <Input
              ref={this.firstInput}
              name='user_name'
              required
              id='LoginForm__user_name'
            />
          </div>
          <div className='password'>
            <label htmlFor='LoginForm__password'>
              Password:
            </label>
            <Input
              name='password'
              type='password'
              required
              id='LoginForm__password'
            />
          </div>
          <footer>
            <Button type='submit'>
              Login
            </Button>
            {' '}
            <Link to='/register'>Need an account?</Link>
          </footer>
        </form>
      </>
    );
  };
};