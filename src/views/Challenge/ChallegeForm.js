import React, { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import ChallengeRules from './steps/ChallengeRules'
import ChooseGameConsole from './steps/ChooseGameConsole'
import ChooseChallengeType from './steps/ChooseChallengeType'

const ChallengeForm = () => {

  const [stepper, setStepper] = useState(null)
  const ref = useRef(null)

  const steps = [
    {
      id: 'rules-details',
      title: 'Rules',
      subtitle: '',
      content: <ChallengeRules stepper={stepper} type='modern-vertical' />
    },
    {
      id: 'choose-details',
      title: 'Choose Game And Console',
      subtitle: '',
      content: <ChooseGameConsole stepper={stepper} type='modern-vertical' />
    },
    {
      id: 'choose-challenge-type',
      title: 'Create Challenge',
      subtitle: 'Choose Type',
      content: <ChooseChallengeType stepper={stepper} type='modern-vertical' />
    }
  ]

  return (
    <div className='modern-vertical-wizard'>
      <Wizard
        type='modern-vertical'
        ref={ref}
        steps={steps}
        instance={el => setStepper(el)}
      />
    </div>
  )
}

export default ChallengeForm
