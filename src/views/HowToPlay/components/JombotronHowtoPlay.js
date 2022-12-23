import React from 'react'
import { Row, Col, Jumbotron, Container } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import icon from "../../../assets/images/11111.png"
import { BiFootball } from 'react-icons/bi'

export default function JombotronHowtoPlay() {
    return (
        <>
            <Row className="mb-3 how_to_play-main">
                <Col className="jumbotron-container   mb-2 position-absolute" md="12">
                    <Jumbotron fluid className="jumbotron-div how-to-play-Jumbotron2">
                        {/* <Container fluid className="jumbotron-text">
                        <h1 className="display-3"><FormattedMessage id="How To Play" /></h1>
                        <p className="lead"><FormattedMessage id="Play as a Pro not as noob." /></p>
                    </Container> */}
                    </Jumbotron>
                </Col>
                <Col className="jumbotron-container mb-2 ml-auto p-relative jumbotron-container-how-to-play" md="6">
                    {/* <Jumbotron fluid className="jumbotron-div how-to-play-Jumbotron"> */}
                    <Container fluid className="jumbotron-text text-center jumbo_text  " style={{ marginTop: "15%" }}>
                        <h1 className="display-3  jumbotron-container-how-to-play-h3" ><FormattedMessage id="How To Play" /></h1>
                        <p className="lead display-6 small_text"><FormattedMessage id="Play as a Pro not as noob." /><br></br>
                            <BiFootball className='mt-1' size={30} /></p>

                        {/* <hr className='mt-2' style={{ maxWidth: "140px", height: "10px" }} />
                        <img src={icon} height="100" /> */}

                    </Container>

                    {/* </Jumbotron> */}
                </Col>
            </Row>
            <Row className="mt-2 ml-2 mr-2 mb-3 newclass p-3 d-none"  >
                <Col className="jumbotron-container mb-2" md="6">
                    <Jumbotron fluid className="jumbotron-div how-to-play-Jumbotron">
                        {/* <Container fluid className="jumbotron-text">
                        <h1 className="display-3"><FormattedMessage id="How To Play" /></h1>
                        <p className="lead"><FormattedMessage id="Play as a Pro not as noob." /></p>
                    </Container> */}
                    </Jumbotron>
                </Col>
                <Col className="jumbotron-container mb-2" md="6">
                    {/* <Jumbotron fluid className="jumbotron-div how-to-play-Jumbotron"> */}
                    <Container fluid className="jumbotron-text text-center" style={{ marginTop: "25%" }}>
                        <h1 className="display-3 " ><FormattedMessage id="How To Play" /></h1>
                        <p className="lead"><FormattedMessage id="Play as a Pro not as noob." /></p>
                        <hr className='mt-2' style={{ maxWidth: "140px", height: "10px" }} />
                        <img src={icon} height="100" />

                    </Container>

                    {/* </Jumbotron> */}
                </Col>
            </Row>
        </>
    )
}
