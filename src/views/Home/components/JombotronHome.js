import React from 'react'
import { Button, Col, Container, Jumbotron, Row } from 'reactstrap'
import { useHistory } from 'react-router-dom'

export default function JombotronHome() {

    const history = useHistory()

    const handleClick = () => {
        history.push('/create-challenge')
    }

    return (
        <Row className="mb-2">
            <Col className="jumbotron-container home-page-container">
                <Jumbotron fluid className="jumbotron-div homepage-jumbotron">
                    <div className="jumbotron-overlay position-absolute"></div>
                    <Container fluid className="jumbotron-button position-relative">
                        <Button.Ripple color='gradient-success' onClick={handleClick}>Play Now</Button.Ripple>
                    </Container>
                </Jumbotron>
            </Col>
        </Row>
    )
}
