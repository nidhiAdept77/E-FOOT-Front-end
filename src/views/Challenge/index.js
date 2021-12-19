import React, { Fragment } from "react"
import { Row, Col, Card } from "reactstrap"
import Breadcrumbs from '@components/breadcrumbs'
import { FormattedMessage } from 'react-intl'
import ChallengeForm from "./ChallegeForm"

const createChallenge = () => {
  
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Challenge" />} breadCrumbActive={<FormattedMessage id="Create Challenge" />} />
      <Row>
        <Col sm="12"><ChallengeForm /></Col>
      </Row>
    </Fragment>
  )
}

export default createChallenge