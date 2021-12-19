import React from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import {
  toggleChallengeModal,
  setAddEditPopupData
} from "@src/redux/actions/layout"
import { useSelector, useDispatch } from "react-redux"
import Row from "reactstrap/lib/Row"
import Col from "reactstrap/lib/Col"
import {CONSTANTS} from '@src/utils/CONSTANTS'
import Avatar from '@components/avatar'
import { useHistory } from 'react-router-dom'
import { setDashboardUserId } from '@src/redux/actions/dashboard'


function privateChallengeModal() {
  const history = useHistory()
  const { toggleChallengePopup, addEditPopupData } = useSelector(
    (state) => state.layout
  )
  const dispatch = useDispatch()

  const handleChallengeButton = () => {
    dispatch(toggleChallengeModal(false))
    history.push("/create-challenge")
  }

  const navigateToUserDashboard = () => {
    if (addEditPopupData?._id) {
      dispatch(setDashboardUserId(addEditPopupData._id))
      dispatch(toggleChallengeModal(false))
      history.push("/dashboard")
    }
  }

  return (
    <div className="vertically-centered-modal">
      <Modal
        isOpen={toggleChallengePopup}
        toggle={() => dispatch(toggleChallengeModal(false))}
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader toggle={() => dispatch(toggleChallengeModal(false))}>
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
                onClick={handleChallengeButton}
              >
                Challenge
              </Button>
            </Col>
            <Col className="text-right">
              <Button
                color="primary"
                onClick={navigateToUserDashboard}
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
