import { useState, Fragment } from 'react'
import { isObjEmpty } from '@utils'
import { Link, User } from 'react-feather'
import { Form, Label, Input, Button, Row, Col, FormGroup } from 'reactstrap'
import {getFieldValue} from '../../../utils'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
const BankDetailsTabContent = ({ data }) => {
  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: data.dob || new Date() }
  })

  const onSubmit = data => {
    
  }

  return (
    <Form onSubmit={e => e.preventDefault()}>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <Label for='accountNumber'>Account Benficiary</Label>
            <Input
              type='url'
              id='accountNumber'
              name='accountNumber'
              defaultValue={data.accountNumber || ''}
              placeholder='Account Benficiary'
              className={classnames({
                'is-invalid': errors.accountNumber
              })}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='ibanNumber'>IBAN Number</Label>
            <Input
              id='ibanNumber'
              name='ibanNumber'
              defaultValue={data.ibanNumber || ''}
              placeholder='X-box Id'
              className={classnames({
                'is-invalid': errors.ibanNumber
              })}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='paypalEmail'>Paypal Email</Label>
            <Input
              id='paypalEmail'
              name='paypalEmail'
              defaultValue={data.paypalEmail || ''}
              placeholder="Paypal Email"
              className={classnames({
                'is-invalid': errors.paypalEmail
              })}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Col>
        <Col className='mt-1' sm='12'>
          <Button.Ripple className='mr-1' color='primary'>
            Save changes
          </Button.Ripple>
          <Button.Ripple color='secondary' outline>
            Cancel
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  )
}

export default BankDetailsTabContent
