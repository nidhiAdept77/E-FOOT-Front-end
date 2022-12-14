import React, { useEffect } from 'react'
import { IoLogoGameControllerB } from 'react-icons/io'
import { Card, CardHeader, CardBody, Media, Button } from 'reactstrap'
import LoaderComponent from '../../components/Loader'
import { FormattedMessage } from 'react-intl'
import Avatar from '@components/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { acceptChallenge, getPaginatedChallenges, removeChallenges, subsChallenges, updateChallenges } from '../../../redux/actions/challenges'
import { getFormattedDateTime } from '@src/utils/'
import { showToastMessage } from '../../../redux/actions/toastNotification'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { CONSTANTS } from '../../../utils/CONSTANTS'

let challengesSubs
export default function GamesComponent() {
  const dispatch = useDispatch()

  const { challenges } = useSelector(state => state.challenges)
  const { user } = useSelector(state => state.auth)

  const handleClick = async (challenge) => {
    if (challenge.challenger !== user._id) {
      const MySwal = withReactContent(Swal)
      const result = await MySwal.fire({
        title: 'Are you sure?',
        text: "You want to accept this match!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, I agree',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1'
        },
        buttonsStyling: false
      })
      if (result.value) {

        const selectedChallenge = document.getElementById(challenge._id)
        selectedChallenge.remove()
        dispatch(acceptChallenge({ _id: challenge._id, status: "accepted", opponent: user._id }))
      }
    } else {
      dispatch(showToastMessage("You can't accept your own challenge!", "error"))
    }
  }

  useEffect(() => {
    dispatch(getPaginatedChallenges(-1, -1, "", "public", CONSTANTS.STATUS.ACTIVE))
    if (challengesSubs?.subscription) {
      challengesSubs.subscription.unsubscribe()
    }
    challengesSubs = dispatch(
      subsChallenges((challenge) => {
        dispatch(updateChallenges(challenge))
      })
    )
    return () => {
      if (challengesSubs?.subscription) {
        challengesSubs.subscription.unsubscribe()
      }
      dispatch(removeChallenges())
    }
  }, [])

  const renderGames = () => {
    return challenges?.map(challenge => {
      let showchallengeclass
      challenge.status === "active" ? showchallengeclass = "showChal" : showchallengeclass = "hideChal"

      // if (challenge.status === "pending") {
      //   let showchallengeclass = "nothing"
      //   showchallengeclass === "showchallenge"
      // } else {
      //   showchallengeclass === "hidechallenge"
      // }

      // challenge.type
      return (

        <div className={showchallengeclass}>

          <div className='card m-1  p-0' id={challenge._id}>
            <div className='card_game'>
              <img className="card-img-top p-1" src={challenge.gameImage} height="100" alt="Card image cap" />
              <div className="card-body">
                <h4 className='text-center'>{challenge.gameName}</h4>
                <hr />
                <h6 className='mb-0'>{challenge.challengerName} |  <small>{challenge.consoleName}</small>  </h6><hr />

                <small>{getFormattedDateTime(challenge.createdAt)}</small>
              </div>
              <div className='card-footer mb-0 p-0 '>
                <small className='text-muted mr-75 p-0  mb-0'>
                  <Button.Ripple className="mr-1 mb-0 btn_challeng" color="primary" block onClick={() => handleClick(challenge)}>
                    Join Match
                  </Button.Ripple>
                </small>
              </div>
            </div>

          </div >


        </div>

        // <div className={showchallengeclass}>
        //   <div key={challenge._id} className='employee-task d-flex justify-content-between align-items-center' id={challenge._id}>
        //     <Media className="challeng_section">
        //       <Avatar imgClassName='rounded' className='mr-75 challenge_img' img={challenge.gameImage} imgHeight='120' imgWidth='120' />
        //       <Media className='my-auto' body>
        //         <h5 className='mb-0'>{challenge.gameName}</h5>
        //         <h6 className='mb-0'>By: {challenge.challengerName}</h6>
        //         <small>{challenge.consoleName}</small>
        //       </Media>
        //     </Media>
        //     <div className='d-flex align-items-center btns_for_public'>
        //       <small className='text-muted challenge_time mr-75'>{getFormattedDateTime(challenge.createdAt)}</small>
        //       <small className='text-muted mr-75'>
        //         <Button.Ripple className="mr-1" color="primary" block onClick={() => handleClick(challenge)}>
        //           Accept
        //         </Button.Ripple>
        //       </small>
        //     </div>
        //   </div>
        // </div>
      )
    })
  }

  return (
    <Card className='chat-widget'>
      <LoaderComponent loading={false} />
      <CardHeader>
        <div className='d-flex align-items-center'>
          <IoLogoGameControllerB size="25" className='mr-2' />
          <h5 className='mb-0'><FormattedMessage id="Game Available" /></h5>
        </div>
      </CardHeader>
      <hr />
      <div className='chat-app-window '>
        <Card className='card-employee-task challenge_card '>
          <CardBody>
            <div className='row'>
              {renderGames()}
            </div>
          </CardBody>
        </Card>
      </div>
    </Card>
  )
}
