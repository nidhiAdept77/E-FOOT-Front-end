import React, { useState, useEffect } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import {
  toggleAdminDisputeModal,
  setAddEditPopupData
} from "@src/redux/actions/layout"
import { useSelector, useDispatch } from "react-redux"
import Row from "reactstrap/lib/Row"
import Col from "reactstrap/lib/Col"
import Avatar from '@components/avatar'
import { useHistory } from 'react-router-dom'


function AdminResolveDisputeModal() {
  const history = useHistory()
  const { toggleAdminDisputePopup, addEditPopupData } = useSelector(
    (state) => state.layout
  )

  const [challengeInfo, setChallengeInfo] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    setChallengeInfo(addEditPopupData)
    return () => {
      setChallengeInfo({})
    }
  }, [addEditPopupData])
  
  const handleChallengeButton = () => {
    dispatch(toggleAdminDisputeModal(false))
  }

  const navigateToUserDashboard = () => {
    dispatch(toggleAdminDisputeModal(false))
  }

  const ChallengeInfo = () => {

    const {
      _id,
      status,
      type,
      consoleId,
      gameId,
      challenger,
      acceptor,
      createdAt,
      gameImage,
      gameName,
      consoleName,
      challengerName,
      acceptorName,
      challengerScore,
      opponentScore,
      mode
    } = challengeInfo

    const download = (imgUrl, text) => {
      const element = document.createElement("a")
      const file = new Blob([imgUrl], {type: "image/*"})
      element.href = URL.createObjectURL(file)
      element.download = `${text}.jpg`
      element.click()
    }
    
    return (<div className="mt-2 mb-4">
      <Row>
      <Col md={2}>
      <Avatar imgClassName='rounded' className='mr-75' img={gameImage} imgHeight='120' imgWidth='120' />
      </Col>
      <Col md={4}>
        <Row>
          <Col><b>Game: </b></Col>
          <Col>{gameName}</Col>
        </Row>
        <Row>
          <Col><b>Console: </b></Col>
          <Col>{consoleName}</Col>
        </Row>
        <hr />
        <Row>
          <Col><b>Challenger: </b></Col>
          <Col>{challengerName}</Col>
        </Row>
        <Row>
          <Col><b>Acceptor: </b></Col>
          <Col>{acceptorName}</Col>
        </Row>
      </Col>
      <Col md={4}>
        <Row>
          <Col><b>Challenger uploaded scores: </b></Col>
        </Row>
        <Row>
          <Col><b>Own: </b></Col>
          <Col>{challengerScore?.my ? challengerScore?.my : "Not uploaded."}</Col>
        </Row>
        <Row>
          <Col><b>Acceptor's: </b></Col>
          <Col>{challengerScore?.opponent ? challengerScore?.opponent : "Not uploaded."}</Col>
        </Row>
        <hr />
        <Row>
          <Col><b>Acceptor uploaded scores: </b></Col>
        </Row>
        <Row>
          <Col><b>Own: </b></Col>
          <Col>{opponentScore?.my ? opponentScore?.my : "Not uploaded."}</Col>
        </Row>
        <Row>
          <Col><b>Acceptor's: </b></Col>
          <Col>{opponentScore?.opponent ? opponentScore?.opponent : "Not uploaded."}</Col>
        </Row>
      </Col>
    </Row>
    <hr />
    <Row>
      <Col className="mt-1"><b>Uploaded Proofs: </b></Col>
    </Row>
    <Row className="mt-1">
      <Col md={12}>
        <Row>
          <Col md={6}>
            <Row>
              <Col>
                <b>Challenger's Proof: </b>
              </Col>
            </Row>
            <Row>
              <Col>
                {challengerScore?.proof ? (<Avatar imgClassName='rounded' className='mr-75' img={challengerScore?.proof} imgHeight='240' imgWidth='240' />) : "No proof uploaded"}
              </Col>
            </Row>
            {challengerScore?.proof ? (<Row className="mt-1">
              <Col>
                <Button
                  download
                  color="primary"
                  onClick={() => download(challengerScore?.proof, "Challenger")}
                >
                  Download
                </Button>
              </Col>
            </Row>) : ""}
          </Col>
          <Col md={6}>
          <Row>
              <Col>
                <b>Acceptor's Proof: </b>
              </Col>
            </Row>
            <Row>
              <Col>{opponentScore?.proof ? (<Avatar imgClassName='rounded' className='mr-75' img={opponentScore?.proof} imgHeight='240' imgWidth='240' />) : "No proof uploaded"}</Col>
            </Row>
            {opponentScore?.proof ? (<Row className="mt-1">
              <Col>
                <Button
                  download
                  color="primary"
                  onClick={() => download(opponentScore?.proof, "Acceptor")}
                >
                  Download
                </Button>
              </Col>
            </Row>) : ""}
          </Col>
        </Row>
      </Col>
    </Row>
    <hr />
    
    </div>)
  }

  return (
    <div className="vertically-centered-modal">
      <Modal
        isOpen={toggleAdminDisputePopup}
        toggle={() => dispatch(toggleAdminDisputeModal(false))}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={() => dispatch(toggleAdminDisputeModal(false))}>
          Resolve Dispute
        </ModalHeader>
        <ModalBody>
          {challengeInfo ? <ChallengeInfo /> : <span>No information available, please contact help support if error persists</span>}
          <Row>
            <Col>
              <Button
                color="primary"
                onClick={handleChallengeButton}
              >
                Cancel
              </Button>
            </Col>
            <Col className="text-right">
              <Button
                color="primary"
                onClick={navigateToUserDashboard}
              >
                Save Changes
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AdminResolveDisputeModal
