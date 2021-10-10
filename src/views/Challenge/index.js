import React, { Fragment } from "react"
import { Row, Col, Card } from "reactstrap"
import Breadcrumbs from '@components/breadcrumbs'
import { FormattedMessage } from 'react-intl'
import ChallengeForm from "./ChallegeForm"

const createChallenge = () => {
  
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle={<FormattedMessage id="Challenge" />}
      />
      {/* <Card> */}
        <Row>
          <Col sm="12"><ChallengeForm /></Col>
        </Row>
      {/* </Card> */}
    </Fragment>
  )
}

export default createChallenge