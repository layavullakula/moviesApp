import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const apiUrl =
  'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=a397ffe4fb056264d42c73b9b7e86920'

class Login extends Component {
  state = {name: '', pass: '', error: false, errorMsg: ''}

  username = event => {
    this.setState({name: event.target.value})
  }

  password = event => {
    this.setState({pass: event.target.value})
  }

  loginDetailsQuick = async event => {
    event.preventDefault()
    const {name, pass} = this.state
    const response = await fetch(
      'https://api.themoviedb.org/3/authentication/token/new?api_key=a397ffe4fb056264d42c73b9b7e86920',
    )
    const data = await response.json()
    const userDetails = {
      username: name,
      password: pass,
      request_token: data.request_token,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response2 = await fetch(apiUrl, options)
    const data2 = await response2.json()
    if (response2.ok === true) {
      this.submitSuccess(data2.request_token)
    } else {
      this.setState({error: true, errorMsg: data2.status_message})
    }
  }

  submitSuccess = token => {
    const {history} = this.props
    Cookies.set('layaMoviesApp', token, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  render() {
    const {error, errorMsg} = this.state
    return (
      <div className="bg-login-big ">
        <img
          src="https://fontmeme.com/permalink/210714/641caaa974542b79c6ec98772c2fe686.png"
          alt="moviesLogo"
          className="moviesLogo"
        />
        <form className="bg-login-card">
          <h1>Sign In</h1>
          <div className="label-input">
            <label htmlFor="username ">USERNAME</label>
            <input
              onChange={this.username}
              id="username"
              type="text"
              className="login-input"
            />
          </div>
          <div className="label-input">
            <label htmlFor="password">PASSWORD</label>
            <input
              onChange={this.password}
              id="password"
              type="password"
              className="login-input"
            />
          </div>
          <p className="login-error">{error && errorMsg}</p>
          <button
            className="login-button"
            type="submit"
            onClick={this.loginDetailsQuick}
          >
            Sign in
          </button>
        </form>
      </div>
    )
  }
}

export default Login
