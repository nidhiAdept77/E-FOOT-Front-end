// ** Icons Import
import { Heart, Facebook, Instagram, Mail, Youtube } from 'react-feather'
import { FormattedMessage } from 'react-intl'
import { Col, Row } from 'reactstrap'

// import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25 right-content'>
        <Row>
          <Col>
            <a href="https://www.facebook.com/efoot.nl/" target="_blank">
              <Facebook className="left-icon" size={14} />
            </a>
            <a href="https://www.instagram.com/efoot_official/" target="_blank">
              <Instagram className="left-icon" size={14} />
            </a>
            <a href="https://www.youtube.com/channel/UCbjU3jneYH219L76ePLTYzA?view_as=subscriber/" target="_blank">
              <Youtube className="left-icon" size={14} />
            </a>
            <a href="http://info@fifa-toernooi.nl" target="_blank">
              <Mail className="left-icon" size={14} />
            </a>
          </Col>
          <Col>
            <span className="float-right footer_class" >
              <a href="/terms-of-use">
                <FormattedMessage id={"Terms Of Use"} />
              </a>{" "} - {" "}
              <a href='/privacy-policy'>
                <FormattedMessage id={"Privacy Policy"} />

              </a>
            </span>
          </Col>
        </Row>
        <hr className='footer_hr' style={{ display: "none" }} />
      </span>

      <span className='float-md-right left-content'>
        Made with
        <Heart size={14} /> {' '}
        Adept Digitals
      </span>
    </p>
  )
}

export default Footer
