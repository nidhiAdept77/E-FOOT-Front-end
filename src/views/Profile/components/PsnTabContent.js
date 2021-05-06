import { useState, Fragment } from 'react'
import { isObjEmpty } from '@utils'
import Avatar from '@components/avatar'
import { Link, User } from 'react-feather'
import { Form, Label, Input, Button, Row, Col, FormGroup } from 'reactstrap'
import {getFieldValue} from '../../../utils'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'

const PsnTabContent = ({ data }) => {
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
            <Label for='playstationId'>Playstation Id</Label>
            <Input
              type='url'
              id='playstationId'
              name='playstationId'
              defaultValue={data.playstationId || ''}
              placeholder='Playstation Id'
              className={classnames({
                'is-invalid': errors.playstationId
              })}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='xBoxId'>Xbox Id</Label>
            <Input
              id='xBoxId'
              name='xBoxId'
              defaultValue={data.xBoxId || ''}
              placeholder='X-box Id'
              className={classnames({
                'is-invalid': errors.xBoxId
              })}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label for='epicGameId'>Epic Games Id</Label>
            <Input
              id='epicGameId'
              name='epicGameId'
              defaultValue={data.epicGameId || ''}
              placeholder="Epic Games Id"
              className={classnames({
                'is-invalid': errors.epicGameId
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

export default PsnTabContent
