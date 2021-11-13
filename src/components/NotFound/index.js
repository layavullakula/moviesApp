import {Link} from 'react-router-dom'

import Header from '../header'
import './index.css'

const NotFound = () => (
  <div style={{background: 'black'}}>
    <Header />
    <div
      style={{
        backgroundSize: '100% 100%',
        minHeight: '85vh',
      }}
      className="imgg"
    >
      <h1 className="lost-head">Lost your way?</h1>
      <p className="pp">
        Sorry, we can’t find that page. You’ll find lots to explore on the home
        page.
      </p>
      <Link to="/">
        <button type="button" className="btn">
          Netflix Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
