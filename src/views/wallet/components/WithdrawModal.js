import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import WithdrawWizard from './WithdrawWizard'

export default function WithdrawModal() {
    const [centeredModal, setCenteredModal] = useState(false)
    
    return (
        <div className='theme-primary'>
            <Button.Ripple 
                color="gradient-secondary" 
                onClick={() => setCenteredModal(!centeredModal)} 
                block>
                Withdrawal
            </Button.Ripple>
            <Modal
                isOpen={centeredModal}
                toggle={() => setCenteredModal(!centeredModal)}
                className='modal-dialog-centered modal-lg'
                modalClassName="modal-primary"
            >
            <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Withdrawal</ModalHeader>
            <ModalBody>
                <WithdrawWizard modalClose={() => setCenteredModal(false)} />
            </ModalBody>
            </Modal>
        </div>
    )
}
