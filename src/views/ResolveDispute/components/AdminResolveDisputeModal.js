import React, { useState, useEffect } from "react"
import { Button, Modal, ModalHeader, ModalBody, Card, CardHeader, CardTitle, CardBody, CardText, CustomInput } from "reactstrap"
import {
  toggleAdminDisputeModal,
  setAddEditPopupData
} from "@src/redux/actions/layout"
import { useSelector, useDispatch } from "react-redux"
import Row from "reactstrap/lib/Row"
import Col from "reactstrap/lib/Col"
import Avatar from '@components/avatar'
import { useHistory } from 'react-router-dom'
import { CONSTANTS } from "../../../utils/CONSTANTS"
import { resolveChallengeDispute } from "../../../redux/actions/challenges"

function AdminResolveDisputeModal() {
  const { toggleAdminDisputePopup, addEditPopupData } = useSelector(
    (state) => state.layout
  )

  const [challengeInfo, setChallengeInfo] = useState({})
  const [whoIsWinner, setWhoIsWinner] = useState("")

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

  const resolveDispute = () => {
    const data = {
      _id: challengeInfo?._id,
      challengerStatus: "",
      opponentStatus: "",
      status: challengeInfo?.status,
      challenger: challengeInfo?.challenger,
      acceptor: challengeInfo?.acceptor
    }
    if (whoIsWinner === CONSTANTS.CHALLENGER) {
      data.challengerStatus = CONSTANTS.STATUS.WIN
      data.opponentStatus = CONSTANTS.STATUS.LOSE
    } else if (whoIsWinner === CONSTANTS.ACCEPTOR) {
      data.opponentStatus = CONSTANTS.STATUS.WIN
      data.challengerStatus = CONSTANTS.STATUS.LOSE
    } else if (whoIsWinner === CONSTANTS.STATUS.DRAW) {
      data.challengerStatus = CONSTANTS.STATUS.DRAW
      data.opponentStatus = CONSTANTS.STATUS.DRAW
    }
    data.status = CONSTANTS.STATUS.FINISHED
    dispatch(resolveChallengeDispute(data))
    dispatch(toggleAdminDisputeModal(false))
  }

  const ChallengeInfo = () => {

    const {
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
      const file = new Blob([imgUrl], { type: "image/*" })
      element.href = URL.createObjectURL(file)
      element.download = `${text}.jpg`
      element.click()
    }

    const handleDecideRadio = (event) => {
      setWhoIsWinner(event.target.value)
    }
    const challengerProof = `https://ef-nl.s3.amazonaws.com/${challengeInfo._id + challengeInfo.challenger}`
    const accepterProof = `https://ef-nl.s3.amazonaws.com/${challengeInfo._id + challengeInfo.acceptor}`
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
                  <Avatar imgClassName='rounded' className='mr-75' img={challengerProof} imgHeight='240' imgWidth='240' />
                </Col>
              </Row>
              {challengerProof ? (<Row className="mt-1">
                <Col>
                  <Button
                    download
                    color="primary"
                    onClick={() => download(challengerProof, "Challenger")}
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
                <Col><Avatar imgClassName='rounded' className='mr-75' img={accepterProof} imgHeight='240' imgWidth='240' /></Col>
              </Row>
              {accepterProof ? (<Row className="mt-1">
                <Col>
                  <Button
                    download
                    color="primary"
                    onClick={() => download(accepterProof, "Acceptor")}
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
      <Row>
        <Col><b>Conclude who's the Winner?</b></Col>
      </Row>
      <Row>
        <Col>
          <div className='demo-inline-spacing'>
            <CustomInput type='radio' id='challenger' checked={whoIsWinner === CONSTANTS.CHALLENGER} value={CONSTANTS.CHALLENGER} name='radioDecide' inline label={`Challenger (${challengerName})`} onChange={handleDecideRadio} />
          </div>
        </Col>
        <Col>
          <div className='demo-inline-spacing'>
            <CustomInput type='radio' id='acceptor' checked={whoIsWinner === CONSTANTS.ACCEPTOR} value={CONSTANTS.ACCEPTOR} name='radioDecide' inline label={`Acceptor (${acceptorName})`} onChange={handleDecideRadio} />
          </div>
        </Col>
        <Col>
          <div className='demo-inline-spacing'>
            <CustomInput type='radio' id='draw' checked={whoIsWinner === "draw"} value="draw" name='radioDecide' inline label={`None (Draw)`} onChange={handleDecideRadio} />
          </div>
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
                onClick={resolveDispute}
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
