import {
  AiFillTwitterCircle,
  AiFillGoogleCircle,
  AiFillInstagram,
  AiFillYoutube,
} from 'react-icons/ai'

import './index.css'

const Footer = () => (
  <div className="footer whole-padding">
    <div className="footer-pics">
      <AiFillTwitterCircle />
      <AiFillGoogleCircle />
      <AiFillInstagram />
      <AiFillYoutube />
    </div>
    <p className="footer-foot">Contact Us</p>
  </div>
)
export default Footer
