import React, { Fragment } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Card, CardBody, FormGroup, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const CreateRoomForm = () => {
  return (
    <Card>
      <CardBody>
        <Form>
          <Row>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input type='text' name='name' id='name' placeholder='Name' />
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  Submit
                </Button.Ripple>
                <Button.Ripple outline color='secondary' type='reset'>
                  Reset
                </Button.Ripple>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

function CreateRoom() {


    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Create Room" />} breadCrumbActive={<FormattedMessage id="Create Room" />} />
            <Card>
                <CreateRoomForm />
            </Card>
        </Fragment>
    )
}

export default connect()(CreateRoom)