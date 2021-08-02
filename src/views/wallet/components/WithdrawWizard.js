import React, { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import { DollarSign } from 'react-feather'
import { RiPaypalLine } from "react-icons/ri"
import PaypalDetails from './PaypalDetails'
import WithdrawAmount from './WithdrawAmount'


export default function WithdrawWizard({modalClose}) {
    const [stepper, setStepper] = useState(null)
    const [selectedMethod, setSelectedMethod] = useState(null)
    const ref = useRef(null)
    
    const handlePaymentMethodClick = (paymentId) => {
        setSelectedMethod(paymentId)
    }

    const closeModal = () => {
        setSelectedMethod(null)
        setStepper(null)
        modalClose()
    }
    
    const steps = [
        {
        id: 'paypal-id',
        title: 'Paypal Details',
        subtitle: 'Select You linked paypal details to get amount.',
        icon: <RiPaypalLine size={18} />,
        content: <PaypalDetails stepper={stepper} type='wizard-horizontal' selectedMethod={selectedMethod} handlePaymentMethodClick={handlePaymentMethodClick} />
        },
        {
        id: 'amount-selection',
        title: 'Amount Selection',
        subtitle: 'Enter Amount to be withdraw',
        icon: <DollarSign size={18} />,
        content: <WithdrawAmount stepper={stepper} type='wizard-horizontal' selectedMethod={selectedMethod} modalClose={closeModal} />
        }
    ]

    return (
        <div className='horizontal-wizard'>
            <Wizard 
                type='modern-horizontal'
                options={{
                  linear: true
                }}   
                instance={el => setStepper(el)} 
                ref={ref} 
                steps={steps} />
        </div>
    )
}
