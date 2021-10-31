import React, { Fragment } from 'react'
import { ArrowRight, ArrowLeft } from 'react-feather'
import { Button } from 'reactstrap'

const ChallengeRules = ({ stepper }) => {


  const onSubmit = () => {
    stepper.next()
  }

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Challenge Rules</h5>
        <small className="text-muted">Please go through it carefully.</small>
        <br />
        <br />
        <p>
          <b>Lorem Ipsum</b> is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>

      <div className='d-flex justify-content-between'>
        <Button.Ripple color='primary' className='btn-prev' onClick={() => {}} outline disabled>
          <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
          <span className='align-middle d-sm-inline-block d-none'>Previous</span>
        </Button.Ripple>
        <Button.Ripple type='submit' color='primary' onClick={onSubmit} className='btn-next'>
          <span className='align-middle d-sm-inline-block d-none'>Next</span>
          <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
        </Button.Ripple>
      </div>
    </Fragment>
  )
}

export default ChallengeRules