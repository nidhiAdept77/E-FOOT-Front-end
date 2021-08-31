// ** Icons Import
import { Heart, Facebook, Instagram, Mail, Youtube} from 'react-feather'
import { FormattedMessage } from 'react-intl'

// import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25 right-content'>
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
        <span className="float-right">
          <a href="/terms-of-use">
            <FormattedMessage id={"Terms Of Use"} />
          </a>{" "} - {" "}
          <a href='/privacy-policy'>
            <FormattedMessage id={"Privacy Policy"} />
            
          </a>
        </span>
      </span>
      <span className='float-md-right left-content'>
        Made with 
        <Heart size={14} /> {' '}
        Adept Infotech
      </span>
    </p>
  )
}

export default Footer
