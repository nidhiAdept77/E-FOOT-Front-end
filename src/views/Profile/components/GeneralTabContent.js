import { Fragment, useState } from 'react'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from 'reactstrap'

const GeneralTabs = ({ data }) => {
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  const [avatar, setAvatar] = useState(data.avatar ? data.avatar : '')

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = data => {

  }

  return (
    <Fragment>
      <Media>
        <Media className='mr-25' left>
          <Media object className='rounded mr-50' src={avatar} alt='Generic placeholder image' height='80' width='80' />
        </Media>
        <Media className='mt-75 ml-1' body>
          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
            Upload
            <Input type='file' onChange={onChange} hidden accept='image/*' />
          </Button.Ripple>
          <Button.Ripple color='secondary' size='sm' outline>
            Reset
          </Button.Ripple>
          <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
        </Media>
      </Media>
      <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label for='userName'>Username</Label>
              <Controller
                defaultValue={data.userName}
                control={control}
                as={Input}
                id='userName'
                name='userName'
                placeholder='Username'
                innerRef={register({ required: true })}
                onChange={e => setValue('userName', e.target.value)}
                className={classnames({
                  'is-invalid': errors.userName
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='email'>E-mail</Label>
              <Controller
                defaultValue={data.email}
                control={control}
                as={Input}
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                innerRef={register({ required: true })}
                onChange={e => setValue('email', e.target.value)}
                className={classnames({
                  'is-invalid': errors.email
                })}
                disabled
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='name'>First Name</Label>
              <Controller
                defaultValue={data.firstName}
                control={control}
                as={Input}
                id='name'
                name='firstName'
                placeholder='Name'
                innerRef={register({ required: true })}
                onChange={e => setValue('firstName', e.target.value)}
                className={classnames({
                  'is-invalid': errors.firstName
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='name'>Last Name</Label>
              <Controller
                defaultValue={data.lastName}
                control={control}
                as={Input}
                id='name'
                name='lastName'
                placeholder='Name'
                innerRef={register({ required: true })}
                onChange={e => setValue('lastName', e.target.value)}
                className={classnames({
                  'is-invalid': errors.lastName
                })}
              />
            </FormGroup>
          </Col>
          <Col className='mt-2' sm='12'>
            <Button.Ripple type='submit' className='mr-1' color='primary'>
              Save changes
            </Button.Ripple>
            <Button.Ripple color='secondary' outline>
              Cancel
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </Fragment>
  )
}

export default GeneralTabs
