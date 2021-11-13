import {Component} from 'react'
import {Link} from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import Cookie from 'js-cookie'
import Header from '../header'
import './index.css'

class Account extends Component {
  logout = () => {
    Cookie.remove('layaMoviesApp')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const name = localStorage.getItem('username')
    const pass = localStorage.getItem('password')

    return (
      <div>
        <div className="headerr link">
          <div className="header-left">
            <Link to="/">
              <img
                src="https://fontmeme.com/permalink/210710/55ab60ca647c2354be85cd4f62b86670.png"
                alt="logo"
                className="logo"
              />
            </Link>
            <Link to="/">
              <h4 className="header-home">Home</h4>
            </Link>
            <h4 className="header-popular">MyList</h4>
          </div>
          <div>
            <button type="submit" onClick={this.details} className="profilePic">
              <CgProfile
                style={{width: '40px', height: '40px', color: 'white'}}
              />
            </button>
          </div>
        </div>
        <div className="header-bg-none">
          <Header />
        </div>
        <div className="account-bg">
          <h1 className="account-heading">Account</h1>
          <hr className="horizon" />
          <div className="account-flex">
            <label htmlFor="member">Member ship </label>
            <div>
              <p className="account-p" id="member">
                {name}
              </p>
            </div>
          </div>
          <p className="pas" id="member">
            Password: {pass.replace(pass.slice(0, pass.length), '********')}
          </p>
          <hr className="horizon" />
          <div className="account-flex">
            <label htmlFor="member">Plan details:</label>
            <p className="account-p" id="member">
              Premium
            </p>
            <button type="button">Ultra HD</button>
          </div>
        </div>
        <hr />
        <div className="accountButton">
          <button className="buttonList" onClick={this.logout} type="submit">
            Logout
          </button>
        </div>
      </div>
    )
  }
}
export default Account
