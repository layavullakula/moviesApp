import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Header from '../header'
import Trend from '../Trend'
import Rated from '../Rated'
import Original from '../Original'
import Footer from '../Footer'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('layaMoviesApp')
  if (jwtToken === undefined) {
    console.log(jwtToken)
    return <Redirect to="/" />
  }

  return (
    <div className="back">
      <div className="home-bg-poster">
        <Header />

        <div className="home-bg-content">
          <h1 className="home-banner-heading">F9</h1>
          <p className="home-banner-para">
            Dominic Toretto and his crew battle the most skilled assassin and
            high-performance driver theyve ever encountered: his forsaken
            brother.
          </p>
          <button className="home-banner-button" type="button">
            play
          </button>
        </div>
      </div>
      <div style={{color: 'white'}}>
        <Trend />
        <Rated />
        <Original />
        <Footer />
      </div>
    </div>
  )
}
export default Home
