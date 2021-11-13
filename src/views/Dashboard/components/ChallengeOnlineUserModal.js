import React from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import {
  setAddEditPopup,
  setAddEditPopupData
} from "@src/redux/actions/layout"
import { useSelector, useDispatch } from "react-redux"
import Row from "reactstrap/lib/Row"
import Col from "reactstrap/lib/Col"
import {CONSTANTS} from '@src/utils/CONSTANTS'
import Avatar from '@components/avatar'

function privateChallengeModal() {
  const { addEditPopup, addEditPopupData } = useSelector(
    (state) => state.layout
  )
  const dispatch = useDispatch()
  return (
    <div className="vertically-centered-modal">
      <Modal
        isOpen={addEditPopup}
        toggle={() => dispatch(setAddEditPopup(false))}
        className="modal-dialog-centered modal-xs"
      >
        <ModalHeader toggle={() => dispatch(setAddEditPopup(false))}>
          <Row>
            <Col>
              <Avatar size='sm' imgClassName='rounded' className='mr-75' img={`${window.location.origin}/rank.png`}  imgHeight='42' imgWidth='42' />
              {/* <img src={`${window.location.origin}/rank.png`}/> */}
            </Col>
            <Col>
              <span>{addEditPopupData?.userName ? addEditPopupData.userName : "User has not provided username yet"}</span>
            </Col>
            {addEditPopupData?.rank ? (<><p>{CONSTANTS.GAME_RANK.find(rank => rank.value === addEditPopupData?.rank)?.label}</p></>) : ""}
          </Row>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Button
                color="primary"
                onClick={() => dispatch(setAddEditPopup(false))}
              >
                Challenge
              </Button>
            </Col>
            <Col>
              <Button
                color="primary"
                onClick={() => dispatch(setAddEditPopup(false))}
              >
                View
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default privateChallengeModal
