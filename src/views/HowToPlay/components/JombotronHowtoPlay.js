import React from 'react'
import { Row, Col, Jumbotron, Container  } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import icon from "../../../assets/images/11111.png"

export default function JombotronHowtoPlay() {
    return (
        <Row className="mt-2 ml-2 mr-2 mb-3 newclass p-3" >
            <Col className="jumbotron-container mb-2"  md="6">
                <Jumbotron fluid className="jumbotron-div how-to-play-Jumbotron">
                    {/* <Container fluid className="jumbotron-text">
                        <h1 className="display-3"><FormattedMessage id="How To Play" /></h1>
                        <p className="lead"><FormattedMessage id="Play as a Pro not as noob." /></p>
                    </Container> */}
                </Jumbotron>
            </Col>
            <Col className="jumbotron-container mb-2"  md="6">
                {/* <Jumbotron fluid className="jumbotron-div how-to-play-Jumbotron"> */}
                    <Container fluid className="jumbotron-text text-center" style={{marginTop:"25%"}}>
                        <h1 className="display-3 " ><FormattedMessage id="How To Play" /></h1>
                        <p className="lead"><FormattedMessage id="Play as a Pro not as noob." /></p>
                        <hr className='mt-2' style={{maxWidth:"140px", height:"10px"}} />
                        <img src={icon} height="100" />
                   
                    </Container>
                   
                {/* </Jumbotron> */}
            </Col>
        </Row>
    )
}
