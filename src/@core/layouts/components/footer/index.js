// ** Icons Import
import { Heart, Facebook, Instagram, Mail, Youtube} from 'react-feather'
// import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        <a href="https://www.facebook.com/efoot.nl/" target="_blank">
          <Facebook className="left-icon" size={14} />
        </a>
        <a href="https://www.instagram.com/fifa_toernooi.nl/" target="_blank">
          <Instagram className="left-icon" size={14} />
        </a>
        <a href="https://www.youtube.com/channel/UCbjU3jneYH219L76ePLTYzA?view_as=subscriber/" target="_blank">
          <Youtube className="left-icon" size={14} />
        </a>
        <a href="http://info@fifa-toernooi.nl" target="_blank">
          <Mail className="left-icon" size={14} />
        </a>
      </span>
      <span className='float-md-right d-none d-md-block'>
        Made with
        <Heart size={14} /> {' '}
        Adept Infotech
      </span>
    </p>
  )
}

export default Footer
