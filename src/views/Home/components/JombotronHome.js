import React from 'react'
import { Button, Col, Container, Jumbotron, Row } from 'reactstrap'
import { useHistory } from 'react-router-dom'

export default function JombotronHome() {

    const history = useHistory()

    const handleClick = () => {
        history.push('/create-challenge')
    }

    return (
        <Row className="mb-2 " style={{ marginLeft: "2px", marginRight: "2px" }}>
            <Col className="jumbotron-container home-page-container">
                <Jumbotron fluid className="jumbotron-div homepage-jumbotron">
                    <div className="jumbotron-overlay position-absolute" style={{ borderRadius: "50px 50px 0px 0px" }}></div>
                    <Container fluid className="jumbotron-button position-relative ml-2 mt-5">
                        <Button.Ripple className="m-auto mt-5 j_btn" color='gradient-primary' onClick={handleClick}>Play Now</Button.Ripple>
                    </Container>
                </Jumbotron>
            </Col>
        </Row>
    )
}
