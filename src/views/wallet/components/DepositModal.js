import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap'
import {depositAmount} from '@src/redux/actions/wallet'
import { useDispatch } from 'react-redux'
import {CONSTANTS} from '@src/utils/CONSTANTS'
export default function DepositModal() {
    const dispatch = useDispatch()
    const [centeredModal, setCenteredModal] = useState(false)
    const [active, setActive] = useState()
    const [amount, setAmount] = useState(0)
    const prices = [10, 15, 20, 50, 100, 200]

    const priceView = () => {
        return prices.map((price, index) => {
            return (<Col xs={6} md={4} lg={2} className="text-center" onClick={() => { setActive(index) }}>
                <p className={active === index ? "price-box active" : "price-box"}>
                    ${price}
                </p>
            </Col>)
        })
    }
    
    useEffect(() => {
        if (active >= 0) {
            const price = prices[active]
            setAmount(price + (price * 0.05))
        }
    }, [active])
    const handleClose = () => {
        setActive()
        setAmount(0)
    }
    
    return (
        <div className='theme-primary'>
            <Button.Ripple 
                color="gradient-primary" 
                onClick={() => setCenteredModal(!centeredModal)} 
                block>
                Deposit
            </Button.Ripple>
            <Modal
            isOpen={centeredModal}
            toggle={() => setCenteredModal(!centeredModal)}
            className='modal-dialog-centered modal-lg'
            modalClassName="modal-primary"
            onClosed={handleClose}
            >
            <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Deposit</ModalHeader>
            <ModalBody>
                Select amount you want to  deposit in your Ef-nl Wallet.
                <Row className="mt-2 mb-2">
                    {priceView()}
                </Row>
                <Row>
                    <Col xs={12} className="text-center">
                        <p>
                            Amount to pay including {CONSTANTS.PLATFORM_FEE}% fees:
                        </p>
                        <p>
                            <h2 className="font-bold">${amount}</h2>
                        </p>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {
                    setCenteredModal(!centeredModal)
                    if (amount) {
                        dispatch(depositAmount(amount))
                    }
                }}>
                Accept
                </Button>
            </ModalFooter>
            </Modal>
      </div>

    )
}
