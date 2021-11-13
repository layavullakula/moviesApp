import {Component} from 'react'
import {Link} from 'react-router-dom'
import {ImCross} from 'react-icons/im'
import {CgProfile} from 'react-icons/cg'
import {BiSearchAlt2} from 'react-icons/bi'
import {TiThMenu} from 'react-icons/ti'

import './index.css'

class Header extends Component {
  state = {inputDone: false, inputSearch: '', list: false}

  searchMovie = () => {
    this.setState(prevState => ({inputDone: !prevState.inputDone}))
  }

  buttonList = () => {
    this.setState(prevState => ({list: !prevState.list}))
  }

  searchEntered = event => {
    if (event.key === 'Enter') {
      this.setState({inputSearch: event.target.value}, this.passItOn)
    }
  }

  passItOn = () => {
    const {inputSearch} = this.state
    const {passSearch} = this.props
    passSearch(inputSearch)
  }

  render() {
    const {inputDone, list} = this.state
    return (
      <>
        <div className="header ">
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
            <Link to="/popular">
              <h4 className="header-popular">Popular</h4>
            </Link>
          </div>
          <div className="header-right">
            {inputDone && (
              <div className="header-search-input">
                <input
                  type="text"
                  placeholder="search"
                  className="header-input"
                  onKeyDown={this.searchEntered}
                />
                <BiSearchAlt2 />{' '}
              </div>
            )}
            {!inputDone && (
              <Link to="/popular">
                <button
                  type="button"
                  onClick={this.searchMovie}
                  className="searchButton"
                >
                  <BiSearchAlt2 style={{width: '30px', height: '30px'}} />
                </button>
              </Link>
            )}
            <Link to="/account">
              <button type="submit" className="profilePic">
                <CgProfile
                  style={{width: '40px', height: '40px', color: 'white'}}
                />
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="header-small ">
            <div>
              <Link to="/">
                <img
                  src="https://fontmeme.com/permalink/210710/55ab60ca647c2354be85cd4f62b86670.png"
                  alt="logo"
                  className="logo-small"
                />
              </Link>
            </div>
            <div className="header-small-right">
              {inputDone && (
                <div className="header-search-input">
                  <input
                    type="text"
                    placeholder="search"
                    className="searchButton header-input "
                    onChange={this.searchEntered}
                  />
                  <BiSearchAlt2 style={{width: '25px', height: '25px'}} />{' '}
                </div>
              )}
              {!inputDone && (
                <Link to="/popular">
                  <button
                    type="button"
                    onClick={this.searchMovie}
                    className="searchButton"
                  >
                    <BiSearchAlt2 style={{width: '40px', height: '40px'}} />
                  </button>
                </Link>
              )}
              <button
                type="submit"
                className="search-Button"
                onClick={this.buttonList}
              >
                <TiThMenu style={{width: '40px', height: '40px'}} />
              </button>
            </div>
          </div>

          <div className="below-header">
            {list && (
              <>
                <ul className="list">
                  <Link to="/">
                    <li>Home</li>
                  </Link>
                  <Link to="/popular">
                    <li>Popular</li>
                  </Link>
                  <Link to="/account">
                    <li>Account</li>
                  </Link>
                </ul>
                <button
                  onClick={this.buttonList}
                  className="cross-button"
                  type="submit"
                >
                  <ImCross />
                </button>
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}
export default Header
